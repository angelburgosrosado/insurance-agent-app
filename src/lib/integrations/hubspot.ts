export interface HubSpotLeadPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message?: string;
  source?: string;
  medium?: string;
  campaign?: string;
}

export async function syncLeadToHubSpot(lead: HubSpotLeadPayload): Promise<{ success: boolean; contactId?: string; error?: string; skipped?: boolean }> {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!token) {
    return { success: true, skipped: true, error: "HUBSPOT_ACCESS_TOKEN not set" };
  }

  try {
    const properties: Record<string, string> = {
      firstname: lead.firstName,
      lastname: lead.lastName,
      email: lead.email,
      phone: lead.phone || "",
      hs_lead_status: "NEW",
    };

    const noteContent = `Lead Service: ${lead.service || "General Inquiry"}\nSource: ${lead.source || "Direct"}\nCampaign: ${lead.campaign || "None"}\nMessage: ${lead.message || "None"}`;

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          ...properties,
          message: noteContent,
        },
      }),
    });

    if (response.status === 409) {
      // Contact already exists, update contact instead
      console.log("[HubSpot] Contact already exists, querying and updating...");
      const searchRes = await fetch("https://api.hubapi.com/crm/v3/objects/contacts/search", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: "email",
              operator: "EQ",
              value: lead.email,
            }],
          }],
        }),
      });

      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const contactId = searchData.results?.[0]?.id;
        if (contactId) {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
            method: "PATCH",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ properties }),
          });
          return { success: true, contactId };
        }
      }
      return { success: true };
    }

    if (!response.ok) {
      const err = await response.json().catch(() => null);
      console.error("[HubSpot API Error]", err);
      return { success: false, error: JSON.stringify(err) };
    }

    const data = await response.json();
    return { success: true, contactId: data.id };
  } catch (error) {
    console.error("[HubSpot Dispatch Error]", error);
    return { success: false, error: String(error) };
  }
}
