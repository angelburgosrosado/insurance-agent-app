"use client";

import { useState, useMemo, useCallback } from "react";
import {
  MyIADProductCategory,
  MyIADQuoteParameters,
} from "@/lib/integrations/crm-myiad";
import { detectTerritoryFromPhone } from "@/lib/lead-routing";
import { getStoredAttribution } from "@/lib/analytics/attribution";

export interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  npn?: string;
  licenseState?: string;
  licenseNumber?: string;
  preferredContactMethod: "phone" | "text" | "email" | "video_consultation";
  preferredTimeOfDay: "morning" | "afternoon" | "evening";
  consent: boolean;
  consentTimestamp?: string;
}

const defaultQuoteParams: Record<MyIADProductCategory, MyIADQuoteParameters> = {
  life: {
    category: "life",
    productSubtype: "indexed_universal_life",
    coverageOrInvestmentAmount: "$500,000",
    termLengthYears: "20 years",
    ageRange: "30-45",
    tobaccoUse: "no",
    notes: "",
  },
  health: {
    category: "health",
    productSubtype: "aca_individual_family",
    coverageOrInvestmentAmount: "Comprehensive Coverage",
    householdMembers: "2-3",
    currentPlanStatus: "Exploring better options",
    notes: "",
  },
  variable_annuity: {
    category: "variable_annuity",
    productSubtype: "deferred_variable_annuity",
    coverageOrInvestmentAmount: "$100,000 - $250,000",
    targetRetirementAge: "60-65",
    riskTolerance: "balanced",
    finraDisclosureAcknowledged: false,
    notes: "",
  },
  strategic_advisory: {
    category: "strategic_advisory",
    productSubtype: "producer_partnership",
    coverageOrInvestmentAmount: "$1,000,000 - $5,000,000+",
    currentPlanStatus: "Independent Practice / Expansion",
    riskTolerance: "growth",
    notes: "",
  },
  "strategic-portfolio": {
    category: "strategic-portfolio",
    productSubtype: "producer_partnership",
    coverageOrInvestmentAmount: "$1,000,000 - $5,000,000+",
    currentPlanStatus: "Independent Practice / Expansion",
    riskTolerance: "growth",
    notes: "",
  },
};

const defaultContact: ContactDetails = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  zipCode: "",
  npn: "",
  licenseState: "",
  licenseNumber: "",
  preferredContactMethod: "phone",
  preferredTimeOfDay: "afternoon",
  consent: false,
};

const US_STATES_AND_TERRITORIES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "PR", "VI", "GU", "MP", "AS", "DC"
]);

export function useQuoteAndLeadRouting() {
  const [step, setStep] = useState<number>(1);
  const [category, setCategoryState] = useState<MyIADProductCategory>("life");
  const [quoteParams, setQuoteParams] = useState<MyIADQuoteParameters>(defaultQuoteParams.life);
  const [contact, setContact] = useState<ContactDetails>(defaultContact);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submissionState, setSubmissionState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");
  const [leadId, setLeadId] = useState<string | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState<boolean>(false);
  const [consultationBooked, setConsultationBooked] = useState<boolean>(false);

  // Live territory detection based on phone area code
  const territoryInfo = useMemo(() => {
    return detectTerritoryFromPhone(contact.phone);
  }, [contact.phone]);

  const selectCategory = useCallback((cat: MyIADProductCategory) => {
    setCategoryState(cat);
    setQuoteParams(defaultQuoteParams[cat]);
    setFieldErrors({});
    setServerError("");
  }, []);

  const updateQuoteParam = useCallback((field: keyof MyIADQuoteParameters, value: any) => {
    setQuoteParams((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const updateContact = useCallback((field: keyof ContactDetails, value: any) => {
    setContact((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "consent" && value === true && !prev.consentTimestamp) {
        next.consentTimestamp = new Date().toISOString();
      }
      return next;
    });
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setServerError("");
  }, []);

  const validateStep = useCallback(
    (stepNum: number): boolean => {
      const errors: Record<string, string> = {};

      if (stepNum === 1) {
        if (!category) errors.category = "Please select a coverage category.";
      }

      if (stepNum === 2) {
        if (!quoteParams.productSubtype) {
          errors.productSubtype = "Please select a specific plan structure.";
        }
        if (!quoteParams.coverageOrInvestmentAmount) {
          errors.coverageOrInvestmentAmount = "Please specify a target amount.";
        }
        if (category === "variable_annuity" && !quoteParams.finraDisclosureAcknowledged) {
          errors.finraDisclosureAcknowledged = "FINRA Rule 2330 suitability disclosure acknowledgment is required.";
        }
      }

      if (stepNum === 3) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const zipRegex = /^\d{5}(-\d{4})?$/;
        const phoneDigits = contact.phone.replace(/\D/g, "");

        if (!contact.firstName.trim()) {
          errors.firstName = "First name is required.";
        }
        if (!contact.email.trim()) {
          errors.email = "Email address is required.";
        } else if (!emailRegex.test(contact.email.trim())) {
          errors.email = "Please enter a valid email address.";
        }
        if (!contact.phone.trim()) {
          errors.phone = "Phone number is required.";
        } else if (phoneDigits.length < 10) {
          errors.phone = "Please enter a valid 10-digit phone number.";
        }
        if (!contact.zipCode.trim()) {
          errors.zipCode = "ZIP code is required for regional rates.";
        } else if (!zipRegex.test(contact.zipCode.trim())) {
          errors.zipCode = "Enter a valid 5-digit ZIP code.";
        }

        // Optional Producer Credentials Validation
        if (contact.npn && contact.npn.trim()) {
          const npnVal = contact.npn.trim();
          if (!/^\d{6,10}$/.test(npnVal)) {
            errors.npn = "NPN must be a valid 6 to 10-digit National Producer Number.";
          }
        }

        const licState = (contact.licenseState || "").trim().toUpperCase();
        const licNum = (contact.licenseNumber || "").trim();

        if (licNum) {
          if (!licState) {
            errors.licenseState = "State is required when specifying a license number.";
          }
          if (!/^[A-Za-z0-9\-#]{3,20}$/.test(licNum)) {
            errors.licenseNumber = "License number must be 3-20 characters.";
          }
        }

        if (licState) {
          if (!US_STATES_AND_TERRITORIES.has(licState)) {
            errors.licenseState = "Enter a valid 2-letter state or territory code (e.g. FL, PR).";
          }
        }

        if (!contact.consent) {
          errors.consent = "Affirmative consent is required to submit your quote request.";
        }
      }

      setFieldErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [category, quoteParams, contact]
  );

  const nextStep = useCallback(() => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4));
    }
  }, [step, validateStep]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback(
    (targetStep: number) => {
      if (targetStep < step || validateStep(step)) {
        setStep(targetStep);
      }
    },
    [step, validateStep]
  );

  const submitLead = useCallback(async () => {
    if (!validateStep(3)) {
      setStep(3);
      setSubmissionState("error");
      setServerError("Please correct the highlighted fields before submitting.");
      return;
    }

    setSubmissionState("submitting");
    setServerError("");

    let firstName = contact.firstName.trim();
    let lastName = contact.lastName.trim();
    if (firstName.includes(" ") && !lastName) {
      const parts = firstName.split(/\s+/);
      firstName = parts[0];
      lastName = parts.slice(1).join(" ");
    } else if (!lastName) {
      lastName = "Client";
    }

    const currentUrlParams =
      typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
    const stored = getStoredAttribution();

    const validatedNpn = contact.npn?.trim() || undefined;
    const validatedLicState = contact.licenseState?.trim().toUpperCase() || undefined;
    const validatedLicNum = contact.licenseNumber?.trim() || undefined;

    const submissionPayload = {
      applicantFirstName: firstName,
      applicantLastName: lastName,
      applicantEmail: contact.email.trim(),
      applicantPhone: contact.phone.trim(),
      zipCode: contact.zipCode.trim(),
      territory: territoryInfo.territory,
      npn: validatedNpn,
      licenseState: validatedLicState,
      licenseNumber: validatedLicNum,
      quoteParameters: {
        ...quoteParams,
        category,
        npn: validatedNpn,
        licenseState: validatedLicState,
        licenseNumber: validatedLicNum,
      },
      preferredContactMethod: contact.preferredContactMethod,
      preferredTimeOfDay: contact.preferredTimeOfDay,
      consultationRequested: true,
      consent: contact.consent,
      consentTimestamp: contact.consentTimestamp || new Date().toISOString(),
      consentVersion: "myiad_tcpa_v2.0",
      source: currentUrlParams?.get("utm_source") || stored.source || "myiad.com",
      medium: currentUrlParams?.get("utm_medium") || stored.medium || "quote_selector",
      campaign: currentUrlParams?.get("utm_campaign") || stored.campaign || "consumer_lead_gen",
    };

    try {
      const response = await fetch("/api/leads/quote-routing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionPayload),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMsg = data?.error || "Failed to process your quote request. Please try again.";
        setServerError(errorMsg);
        setSubmissionState("error");
        return;
      }

      const returnedId =
        data.leadId ||
        data.crmPipeline?.crmLeadId ||
        `MYIAD-${new Date().getFullYear()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      setLeadId(returnedId);
      setSubmissionState("success");
      setStep(4);
    } catch (err: any) {
      console.error("[Lead Routing Hook Error]:", err);
      setServerError("Connection error. Please check your network and try again.");
      setSubmissionState("error");
    }
  }, [contact, quoteParams, category, territoryInfo, validateStep]);

  const reset = useCallback(() => {
    setStep(1);
    setCategoryState("life");
    setQuoteParams(defaultQuoteParams.life);
    setContact(defaultContact);
    setFieldErrors({});
    setSubmissionState("idle");
    setServerError("");
    setLeadId(null);
  }, []);

  return {
    step,
    category,
    quoteParams,
    contact,
    fieldErrors,
    submissionState,
    serverError,
    leadId,
    territoryInfo,
    isCalendarModalOpen,
    consultationBooked,
    selectCategory,
    updateQuoteParam,
    updateContact,
    nextStep,
    prevStep,
    goToStep,
    submitLead,
    reset,
    openCalendarModal: () => setIsCalendarModalOpen(true),
    closeCalendarModal: () => setIsCalendarModalOpen(false),
    setConsultationBooked: (val: boolean) => setConsultationBooked(val),
  };
}
