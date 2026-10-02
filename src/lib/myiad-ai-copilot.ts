/**
 * MyIAD AI Copilot & Scenario Synthesizer
 * Intelligent Advisory Engine for Life (IUL), Health/Medicare, and FINRA 2330 Variable Annuities.
 * Provides resilient isomorphic reasoning with seamless Gemini/OpenAI live API bridging.
 */

export interface AssessmentScenario {
  goal: "iul_wealth" | "lifetime_annuity" | "family_protection" | "health_living";
  age: number;
  annualIncome: number;
  dependents: number;
  debt: number;
  calculatedCoverageNeed?: number;
  projectedCashValueAt65?: number;
  estimatedAnnualTaxFreeIncome?: number;
  clientName?: string;
}

export interface VulnerabilityGap {
  title: string;
  severity: "critical" | "moderate" | "advisory";
  description: string;
}

export interface StrategicPillar {
  name: string;
  statutoryRef: string;
  recommendation: string;
}

export interface ScenarioDiagnosticResult {
  headline: string;
  executiveSummary: string;
  vulnerabilityGaps: VulnerabilityGap[];
  strategicPillars: StrategicPillar[];
  recommendedActionSteps: string[];
  suggestedPrompt: string;
  complianceNote: string;
}

export interface CopilotMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  suggestedPrompts?: string[];
  actionCta?: {
    label: string;
    action: "open_assessment" | "schedule_call" | "request_quote";
  };
}

/**
 * Generates an in-depth, structured AI Scenario Diagnostic based on client parameters.
 */
export function generateScenarioDiagnostic(
  scenario: AssessmentScenario,
  lang: "en" | "es" = "en"
): ScenarioDiagnosticResult {
  const isSpanish = lang === "es";
  const { age, annualIncome, dependents, debt, goal } = scenario;

  const yearsToRetirement = Math.max(5, 65 - age);
  const incomeReplacement = annualIncome * Math.min(10, Math.max(5, yearsToRetirement));
  const educationFund = dependents * 75000;
  const finalExpense = 25000;
  const coverageNeed = scenario.calculatedCoverageNeed || (debt + incomeReplacement + educationFund + finalExpense);

  const estimatedMonthlySavings = Math.round((annualIncome * 0.12) / 12);
  const cashValue =
    scenario.projectedCashValueAt65 ||
    Math.round(estimatedMonthlySavings * 12 * ((Math.pow(1 + 0.068, yearsToRetirement) - 1) / 0.068));
  const taxFreeIncome =
    scenario.estimatedAnnualTaxFreeIncome || Math.round(cashValue * 0.075);

  const formattedCoverage = new Intl.NumberFormat(isSpanish ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(coverageNeed);

  const formattedCashValue = new Intl.NumberFormat(isSpanish ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cashValue);

  const formattedTaxFreeIncome = new Intl.NumberFormat(isSpanish ? "es-US" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(taxFreeIncome);

  if (isSpanish) {
    let headline = `Diagnóstico de Protección y Crecimiento Patrimonial (${age} años)`;
    let executiveSummary = `A sus ${age} años con ingresos de $${annualIncome.toLocaleString()}/año y ${dependents} dependientes, su modelo de necesidad patrimonial requiere una cobertura total de ${formattedCoverage}. Con ${yearsToRetirement} años hacia la jubilación, la acumulación estructurada puede proyectar ${formattedCashValue} en valor en efectivo y ${formattedTaxFreeIncome}/año en ingresos libres de impuestos federales bajo el Artículo IRC §7702.`;

    const vulnerabilityGaps: VulnerabilityGap[] = [];
    if (debt > 150000) {
      vulnerabilityGaps.push({
        title: "Exposición Pasiva por Deuda Hipotecaria/Comercial",
        severity: "critical",
        description: `Un saldo de deuda de $${debt.toLocaleString()} sin cobertura con beneficios en vida deja a sus dependientes en riesgo inmediato de liquidación forzada de activos ante incapacidad o fallecimiento.`,
      });
    }
    if (dependents > 0) {
      vulnerabilityGaps.push({
        title: "Fondo Educativo y Remplazo de Ingresos Familiar",
        severity: "critical",
        description: `Proteger a ${dependents} dependientes requiere $${(incomeReplacement + educationFund).toLocaleString()} para garantizar el nivel de vida y costos universitarios sin descapitalizar el patrimonio.`,
      });
    }
    vulnerabilityGaps.push({
      title: "Riesgo de Pérdida en Volatilidad Bursátil",
      severity: "moderate",
      description: "Cuentas tradicionales 401(k)/IRA sufren caídas de mercado severas y tributación como ingreso ordinario al retiro. El diseño IUL con piso del 0% previene pérdidas de capital.",
    });

    const strategicPillars: StrategicPillar[] = [
      {
        name: "Piso de Mercado del 0% (Indexación S&P 500)",
        statutoryRef: "IRC §7702 & §72(e)",
        recommendation: "Garantiza que su valor acumulado nunca disminuya en caídas de mercado, participando en las alzas con tope institucional.",
      },
      {
        name: "Beneficios en Vida Acelerados",
        statutoryRef: "Cláusulas de Enfermedad Crónica/Crítica",
        recommendation: "Acceso anticipado a hasta el 80% del beneficio por muerte libre de impuestos si experimenta cáncer, infarto o pérdida de actividades diarias.",
      },
      {
        name: "Retiros y Préstamos Libres de Impuestos",
        statutoryRef: "Estructura No-MEC IRC §7702A",
        recommendation: `Distribuciones no tributables en retiro proyectadas en ${formattedTaxFreeIncome}/año sin penalidad por edad temprana ni impacto en Medicare.`,
      },
    ];

    return {
      headline,
      executiveSummary,
      vulnerabilityGaps,
      strategicPillars,
      recommendedActionSteps: [
        `Verificar elegibilidad médica para fijar la tarifa preferencial a los ${age} años.`,
        `Estructurar póliza IUL máxima acumulación para evitar clasificación MEC (IRC §7702A).`,
        `Revisar idoneidad FINRA 2330 si contempla transferencia o consolidación de anualidades previas.`,
      ],
      suggestedPrompt: `¿Cómo puedo estructurar una póliza IUL de ${formattedCoverage} para generar ${formattedTaxFreeIncome}/año libre de impuestos?`,
      complianceNote:
        "Este diagnóstico es un modelo ilustrativo y educativo de ingeniería de casos. No constituye asesoría fiscal o legal formal. Las garantías dependen de la solidez financiera de la aseguradora emisora.",
    };
  }

  // English
  let headline = `Protection & Wealth Preservation Diagnostic (Age ${age})`;
  let executiveSummary = `At age ${age} with $${annualIncome.toLocaleString()}/yr earnings and ${dependents} dependent(s), your capitalized family protection baseline indicates a target need of ${formattedCoverage}. Over your remaining ${yearsToRetirement}-year accumulation runway, an institutional IUL structure projects ${formattedCashValue} in policy cash value at age 65, generating up to ${formattedTaxFreeIncome}/yr in federal income-tax-free distributions under IRC §7702.`;

  const vulnerabilityGaps: VulnerabilityGap[] = [];
  if (debt > 150000) {
    vulnerabilityGaps.push({
      title: "Mortgage & Debt Liability Exposure",
      severity: "critical",
      description: `A debt burden of $${debt.toLocaleString()} without living-benefit life coverage places your estate at risk of asset liquidation in the event of disability, critical illness, or premature death.`,
    });
  }
  if (dependents > 0) {
    vulnerabilityGaps.push({
      title: "Income Replacement & College Capitalization Gap",
      severity: "critical",
      description: `Sustaining ${dependents} dependent(s) requires $${(incomeReplacement + educationFund).toLocaleString()} to preserve your household standard of living and fund tuition without drawing down retirement principal.`,
    });
  }
  vulnerabilityGaps.push({
    title: "Market Drawdown & Tax-Deferred Drag",
    severity: "moderate",
    description: "Conventional 401(k) / IRA plans suffer negative market sequence of returns and 100% ordinary income taxation upon withdrawal. A 0% floor asset shield guarantees principal preservation.",
  });

  const strategicPillars: StrategicPillar[] = [
    {
      name: "0% Downside Floor (Indexed Market Upside)",
      statutoryRef: "IRC §7702 & §72(e)",
      recommendation: "Locks in gains at policy anniversary dates with a statutory 0% floor so you never surrender past market earnings to equity corrections.",
    },
    {
      name: "Full Living Benefits Acceleration",
      statutoryRef: "Chronic, Critical & Terminal Riders",
      recommendation: "Accelerates up to 80% of the face amount tax-free if diagnosed with stroke, invasive cancer, heart attack, or cognitive impairment.",
    },
    {
      name: "Tax-Free Distribution Engine",
      statutoryRef: "Non-MEC Guidelines IRC §7702A",
      recommendation: `Enables structured policy loans generating approximately ${formattedTaxFreeIncome}/year in retirement income without triggering capital gains or provisional income taxes.`,
    },
  ];

  return {
    headline,
    executiveSummary,
    vulnerabilityGaps,
    strategicPillars,
    recommendedActionSteps: [
      `Lock in current health tier underwriting before your next age change.`,
      `Design an optimal non-MEC funding chassis to maximize cash accumulation over ${yearsToRetirement} years.`,
      `Conduct a FINRA Rule 2330 suitability evaluation if evaluating annuity rollovers or guaranteed lifetime income.`,
    ],
    suggestedPrompt: `How do I structure a ${formattedCoverage} policy to generate ${formattedTaxFreeIncome}/yr tax-free retirement income?`,
    complianceNote:
      "This diagnostic is an illustrative financial case design model for educational purposes only and does not constitute formal legal, tax, or securities investment advice. Guarantees are subject to the claims-paying ability of the issuing carrier.",
  };
}

/**
 * Intelligent Advisory Knowledge Engine & LLM Bridge.
 * Answers insurance, IUL, living benefits, and FINRA 2330 questions accurately.
 */
export async function generateCopilotResponse(params: {
  query: string;
  history?: CopilotMessage[];
  scenario?: AssessmentScenario;
  lang?: "en" | "es";
}): Promise<{
  content: string;
  suggestedPrompts: string[];
  actionCta?: {
    label: string;
    action: "open_assessment" | "schedule_call" | "request_quote";
  };
}> {
  const { query, scenario, lang = "en" } = params;
  const isSpanish = lang === "es" || /hola|seguro|póliza|anualidad|impuesto/i.test(query);
  const q = query.toLowerCase();

  // If Gemini or OpenAI API keys exist in the environment, attempt live LLM synthesis
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (geminiKey) {
    try {
      const liveAnswer = await callGeminiAdvisoryLLM({ query, scenario, lang: isSpanish ? "es" : "en", apiKey: geminiKey });
      if (liveAnswer) {
        return liveAnswer;
      }
    } catch (err) {
      console.warn("[MyIAD Copilot] Gemini API error, falling back to heuristic engine:", (err as any)?.message);
    }
  } else if (openAiKey) {
    try {
      const liveAnswer = await callOpenAiAdvisoryLLM({ query, scenario, lang: isSpanish ? "es" : "en", apiKey: openAiKey });
      if (liveAnswer) {
        return liveAnswer;
      }
    } catch (err) {
      console.warn("[MyIAD Copilot] OpenAI API error, falling back to heuristic engine:", (err as any)?.message);
    }
  }

  // Built-in Knowledge Base & Reasoning Matrix
  if (q.includes("floor") || q.includes("piso") || q.includes("market crash") || q.includes("caída") || q.includes("0%")) {
    if (isSpanish) {
      return {
        content: `### 🛡️ Cómo Funciona el Piso del 0% en un Seguro IUL

En un **Indexed Universal Life (IUL)**, su dinero **nunca está invertido directamente en la bolsa de valores**. En su lugar, el crecimiento de su valor en efectivo está vinculado al rendimiento de un índice de referencia (como el **S&P 500**):

1. **Piso Garantizado del 0%:** Si el índice cae un **-20%** o **-35%** (como en 2008 o 2020), su tasa de rendimiento asignada es del **0%**. Su saldo previo permanece protegido y no sufre pérdidas de capital.
2. **Tope de Participación (Cap Rate):** En los años en que el mercado sube, usted participa del crecimiento hasta un tope anual (típicamente entre **9% y 11%** en las principales aseguradoras nacionales).
3. **Crecimiento Libre de Impuestos:** Todo el crecimiento está exento de impuestos sobre ganancias de capital bajo el **Artículo IRC §7702**.

> **Ventaja Estratégica:** Al eliminar los años negativos, su dinero nunca tiene que recuperarse de una caída antes de volver a crecer.`,
        suggestedPrompts: [
          "¿Cómo retiro dinero libre de impuestos?",
          "¿Cuál es la diferencia entre IUL y 401(k)?",
          "¿Qué pasa si necesito dinero por enfermedad?",
        ],
        actionCta: {
          label: "Calcular Mi Cobertura con Piso 0%",
          action: "open_assessment",
        },
      };
    }

    return {
      content: `### 🛡️ How the 0% Floor Works in an Indexed Universal Life (IUL)

In an **Indexed Universal Life (IUL)** policy, your cash value is **never directly invested in equities**. Instead, interest is credited based on the performance of a benchmark index such as the **S&P 500**:

1. **Guaranteed 0% Floor:** If the index plunges by **-20%** or **-35%** (such as 2008 or 2020), your credited interest for that crediting period is **0%**. Your principal and prior locked-in gains remain 100% intact.
2. **Institutional Cap Rate:** In positive market years, your account captures upward movement up to an annual cap (typically **9% to 11.5%** among tier-1 national carriers).
3. **Annual Reset Mechanism:** Each year's gains are permanently locked into the contract base, establishing a new floor for subsequent years.

> **Key Takeaway:** By eliminating negative compounding years, you bypass the recovery drag that traditional 401(k) / brokerage portfolios face after market corrections.`,
      suggestedPrompts: [
        "How do tax-free policy loans work?",
        "What is the difference between IUL and Term?",
        "How do living benefits protect me?",
      ],
      actionCta: {
        label: "Calculate My 0% Floor Protection",
        action: "open_assessment",
      },
    };
  }

  if (q.includes("tax") || q.includes("impuesto") || q.includes("irc 7702") || q.includes("7702") || q.includes("irs") || q.includes("free")) {
    if (isSpanish) {
      return {
        content: `### 🏛️ Distribuciones Libres de Impuestos bajo el IRC §7702

El Código de Rentas Internas de los Estados Unidos (IRC) otorga al seguro de vida una categoría tributaria privilegiada:

- **IRC §101(a):** El beneficio por fallecimiento se transfiere a sus beneficiarios **100% libre de impuestos sobre ingresos**.
- **IRC §72(e):** El crecimiento del valor en efectivo dentro de la póliza acumula con **impuestos diferidos**.
- **IRC §7702A:** Siempre que la póliza se financie como un contrato de vida estándar y no como un contrato de dotación modificado (Non-MEC), usted puede acceder a los fondos a través de **préstamos sobre la póliza** sin pagar impuestos sobre la renta a ninguna edad.

> **Importante:** A diferencia de una cuenta IRA o 401(k), no existen requisitos de distribución mínima obligatoria (RMD) a los 73 años, ni penalidad del 10% por retiros antes de los 59½ años.`,
        suggestedPrompts: [
          "¿Cómo evito que mi póliza sea clasificada como MEC?",
          "¿Cuánto puedo retirar anualmente en jubilación?",
          "Deseo hablar con un asesor especializado",
        ],
        actionCta: {
          label: "Agendar Consulta de 15 Minutos",
          action: "schedule_call",
        },
      };
    }

    return {
      content: `### 🏛️ Tax-Free Distribution Architecture Under IRC §7702

The U.S. Internal Revenue Code provides life insurance with a unique trifecta of tax advantages:

- **IRC §101(a):** Death benefits transfer to named beneficiaries **100% exempt from federal and state income taxes**.
- **IRC §72(e):** Internal cash value growth accumulates on a **tax-deferred basis**.
- **Non-MEC Policy Loans (IRC §7702A):** When structured properly within statutory premium deposit limits, you can access your cash value via structured policy loans **completely free of ordinary income tax and capital gains taxes at any age**.

> **Strategic Benefit:** Unlike traditional qualified plans (401k/Traditional IRA), there are **no Required Minimum Distributions (RMDs)** at age 73 and **no 10% IRS early-withdrawal penalty** prior to age 59½.`,
      suggestedPrompts: [
        "How do I prevent MEC status?",
        "Compare IUL vs. Roth IRA for high earners",
        "Request an advisor illustration",
      ],
      actionCta: {
        label: "Schedule 15-Minute Blueprint Review",
        action: "schedule_call",
      },
    };
  }

  if (q.includes("living benefit") || q.includes("beneficio en vida") || q.includes("chronic") || q.includes("crónica") || q.includes("cancer") || q.includes("enfermedad")) {
    if (isSpanish) {
      return {
        content: `### 🩺 Beneficios en Vida: Protección Antes de Fallecer

El seguro de vida moderno no es solo para cuando usted fallece; está diseñado para proteger su patrimonio mientras está vivo:

1. **Enfermedad Crónica:** Si pierde la capacidad de realizar 2 de las 6 actividades de la vida diaria (bañarse, vestirse, comer, transferirse, aseo, continencia) o sufre deterioro cognitivo severo.
2. **Enfermedad Crítica:** Diagnósticos graves como **infarto al miocardio, accidente cerebrovascular (ACV), cáncer invasivo o trasplante de órganos mayores**.
3. **Enfermedad Terminal:** Diagnóstico con expectativa de vida menor a 12 o 24 meses.

> **Acceso a Fondos:** Puede acelerar hasta un **80% de su beneficio por muerte** en pagos en vida libres de impuestos para costear tratamientos, pagar su hipoteca o sostener su familia.`,
        suggestedPrompts: [
          "¿Cómo se compara con un seguro de Long-Term Care tradicional?",
          "¿Qué costo tienen los beneficios en vida?",
          "Diseñar mi plan con beneficios en vida",
        ],
        actionCta: {
          label: "Solicitar Cotización de Beneficios en Vida",
          action: "request_quote",
        },
      };
    }

    return {
      content: `### 🩺 Living Benefits: Accessing Protection While You Are Alive

Modern life contracts function as an immediate financial shield during major health emergencies:

1. **Chronic Illness Rider:** Triggers if you are unable to perform at least 2 of 6 Activities of Daily Living (ADLs: bathing, dressing, eating, transferring, toileting, continence) or suffer severe cognitive impairment.
2. **Critical Illness Acceleration:** Provides tax-free lump-sum payments upon diagnosis of conditions like **invasive cancer, heart attack, stroke, kidney failure, or major organ transplant**.
3. **Terminal Illness Rider:** Accelerates policy proceeds if diagnosed with a certified life expectancy of 12 to 24 months.

> **How it works:** You can accelerate up to **80% of your policy face amount** to replace lost wages, access private care, or settle family obligations without exhausting your liquid savings.`,
      suggestedPrompts: [
        "How does this compare to stand-alone LTC?",
        "Are living benefit payouts taxable?",
        "Request personalized living benefit quote",
      ],
      actionCta: {
        label: "Request Living Benefit Design",
        action: "request_quote",
      },
    };
  }

  if (q.includes("finra") || q.includes("2330") || q.includes("annuity") || q.includes("anualidad") || q.includes("variable") || q.includes("rollover")) {
    if (isSpanish) {
      return {
        content: `### ⚖️ Protocolo de Idoneidad FINRA Regla 2330 para Anualidades Variables

En MyIAD aplicamos una estricta supervisión de idoneidad institucional para toda evaluación de anualidades diferidas variables:

- **Evaluación Obligatoria de Idoneidad:** Revisamos horizonte temporal, necesidad de liquidez, tolerancia al riesgo y costo total antes de sugerir cualquier intercambio bajo la Sección 1035.
- **Riesgo y Volatilidad:** Las anualidades variables están sujetas a fluctuaciones de mercado y pueden perder capital. No son depósitos bancarios asegurados por la FDIC.
- **Garantías de Ingreso:** Los beneficios de retiro garantizado de por vida (GLWB) están respaldados exclusivamente por la fortaleza financiera de la aseguradora emisora.
- **Transparencia en Costos:** Detallamos cargos por rescate, tarifas de administración de subcuentas y gastos de mortalidad (M&E).

> **Aviso Regulatorio:** Revise detenidamente el prospecto oficial con un representante registrado antes de tomar decisiones de inversión.`,
        suggestedPrompts: [
          "¿Qué es un intercambio libre de impuestos Sección 1035?",
          "¿Cómo garantiza una anualidad ingresos de por vida?",
          "Hablar con un asesor con licencia",
        ],
        actionCta: {
          label: "Agendar Revisión de Idoneidad FINRA",
          action: "schedule_call",
        },
      };
    }

    return {
      content: `### ⚖️ FINRA Rule 2330 Suitability Protocol for Variable Annuities

At MyIAD, all variable annuity evaluations follow strict supervisory review and consumer suitability gating:

- **Mandatory Suitability Audit:** Prior to recommending an exchange under Section 1035, advisors verify investment horizon, liquid net worth, risk profile, surrender periods, and total fee impact.
- **Market Risk Disclosure:** Variable annuities are long-term investment vehicles subject to market fluctuation and potential loss of principal. They are not FDIC-insured.
- **Guaranteed Lifetime Withdrawal Benefits (GLWB):** Income riders providing predictable lifetime cash flow are backed solely by the financial strength of the issuing insurance company.
- **Fee Transparency:** Full disclosure of contract expenses, underlying fund management fees, and surrender charge schedules.

> **Supervisory Notice:** Carefully consider the investment objectives, risks, charges, and expenses in the carrier's prospectus before purchasing.`,
      suggestedPrompts: [
        "What is a tax-free Section 1035 Exchange?",
        "How do Guaranteed Lifetime Income Riders work?",
        "Schedule advisor suitability consultation",
      ],
      actionCta: {
        label: "Schedule FINRA Suitability Review",
        action: "schedule_call",
      },
    };
  }

  // Default scenario-aware greeting & advisory analysis
  let contextNote = "";
  if (scenario) {
    contextNote = isSpanish
      ? `\n\n*(Basado en su evaluación: ${scenario.age} años, ingreso de $${scenario.annualIncome.toLocaleString()}, necesidad estimada de $${(scenario.calculatedCoverageNeed || 500000).toLocaleString()})*`
      : `\n\n*(Context: Age ${scenario.age}, $${scenario.annualIncome.toLocaleString()} income, estimated protection need of $${(scenario.calculatedCoverageNeed || 500000).toLocaleString()})*`;
  }

  if (isSpanish) {
    return {
      content: `### 👋 Bienvenido a MyIAD AI Copilot${contextNote}

Soy su asistente de asesoría inteligente para **MyIAD National Insurance Solutions**. Puedo responder preguntas sobre:

1. **Indexed Universal Life (IUL):** Protección de capital con piso del 0%, beneficios en vida y retiro libre de impuestos bajo el Artículo IRC §7702.
2. **Seguros de Salud y Medicare:** Cobertura médica para familias y empresas, optimización de subsidios y planes Advantage/Medigap.
3. **Anualidades con Idoneidad FINRA 2330:** Estrategias de ingresos de por vida y protección de ahorros 401(k) / IRA.
4. **Diseño de Agencia y Productores:** Plataforma para agentes independientes e IMOs en los 50 estados.

¿Qué objetivo específico desea modelar hoy?`,
      suggestedPrompts: [
        "¿Cómo funciona el piso del 0% en el mercado?",
        "¿Cuáles son los beneficios fiscales del IRC §7702?",
        "¿Cómo me protegen los beneficios en vida?",
        "Agendar una consulta de 15 minutos",
      ],
      actionCta: {
        label: "Iniciar Diagnóstico Interactivo de Necesidades",
        action: "open_assessment",
      },
    };
  }

  return {
    content: `### 👋 Welcome to the MyIAD Advisory Copilot${contextNote}

I am your intelligent advisory assistant for **MyIAD National Insurance Solutions**. I can help you analyze and evaluate:

1. **Indexed Universal Life (IUL):** 0% downside market protection, living benefits, and tax-free retirement distributions under IRC §7702.
2. **Health & Medicare Solutions:** Commercial coverage, family health plans, subsidy optimization, and Medicare Advantage / Medigap navigation.
3. **Guaranteed Lifetime Annuities:** Market-protected retirement paycheck modeling under strict FINRA Rule 2330 suitability supervision.
4. **Agency Distribution Engine:** Producer and IMO platform support across all 50 US states.

What specific protection scenario would you like to explore today?`,
    suggestedPrompts: [
      "How does the 0% floor protect my money?",
      "How does IRC §7702 provide tax-free income?",
      "Explain living benefits for critical illness",
      "Schedule a 15-minute advisor consultation",
    ],
    actionCta: {
      label: "Launch AI Needs Assessment",
      action: "open_assessment",
    },
  };
}

/**
 * Optional Gemini live LLM bridge for deep conversational generation
 */
async function callGeminiAdvisoryLLM(options: {
  query: string;
  scenario?: AssessmentScenario;
  lang: "en" | "es";
  apiKey: string;
}): Promise<{ content: string; suggestedPrompts: string[]; actionCta?: any } | null> {
  const { query, scenario, lang, apiKey } = options;

  const systemInstruction = `You are the MyIAD National Insurance Solutions Advisory Copilot (myiad.com).
You specialize in 3 pillars:
1. Life Insurance: Indexed Universal Life (IUL) with 0% market floor and tax-free distributions under IRC §7702. Term with Living Benefits (Chronic, Critical, Terminal illness riders).
2. Health & Medicare: ACA health insurance and Medicare Advantage / Medigap solutions.
3. Annuities: Deferred Variable & Fixed Index Annuities, strictly observing FINRA Rule 2330 suitability standards and risk warnings.
Tone: Professional, authoritative, objective, compliant. Never promise guaranteed investment returns on variable products. Include statutory disclaimers where appropriate.
Respond in ${lang === "es" ? "Spanish" : "English"}.
Keep responses structured, concise, and formatted in clean markdown.`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemInstruction }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `${scenario ? `Client Context: Age ${scenario.age}, Income $${scenario.annualIncome}, Debt $${scenario.debt}, Dependents ${scenario.dependents}, Goal: ${scenario.goal}.\n` : ""}Question: ${query}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 800,
        },
      }),
    }
  );

  if (!response.ok) return null;
  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) return null;

  return {
    content: text,
    suggestedPrompts:
      lang === "es"
        ? [
            "¿Cómo retiro dinero libre de impuestos?",
            "¿Cómo funciona el piso del 0%?",
            "Agendar consulta con un asesor",
          ]
        : [
            "How do tax-free policy loans work?",
            "How does the 0% floor protect against market drops?",
            "Schedule a 15-minute advisor consultation",
          ],
    actionCta: {
      label: lang === "es" ? "Agendar Asesoría de 15 Minutos" : "Schedule 15-Min Advisor Review",
      action: "schedule_call",
    },
  };
}

/**
 * Optional OpenAI live LLM bridge
 */
async function callOpenAiAdvisoryLLM(options: {
  query: string;
  scenario?: AssessmentScenario;
  lang: "en" | "es";
  apiKey: string;
}): Promise<{ content: string; suggestedPrompts: string[]; actionCta?: any } | null> {
  const { query, scenario, lang, apiKey } = options;

  const systemPrompt = `You are the MyIAD Advisory Copilot (myiad.com). You are an expert in Life Insurance (IUL with 0% floor, IRC §7702), Living Benefits (critical/chronic illness), Health/Medicare, and FINRA 2330 compliant annuities. Professional, concise, markdown format. Language: ${lang === "es" ? "Spanish" : "English"}.`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: `${scenario ? `Client Context: Age ${scenario.age}, Income $${scenario.annualIncome}, Debt $${scenario.debt}.\n` : ""}Question: ${query}`,
        },
      ],
      max_tokens: 800,
      temperature: 0.3,
    }),
  });

  if (!response.ok) return null;
  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) return null;

  return {
    content: text,
    suggestedPrompts:
      lang === "es"
        ? [
            "¿Cómo retiro dinero libre de impuestos?",
            "¿Cómo funciona el piso del 0%?",
            "Agendar consulta con un asesor",
          ]
        : [
            "How do tax-free policy loans work?",
            "How does the 0% floor protect against market drops?",
            "Schedule a 15-minute advisor consultation",
          ],
    actionCta: {
      label: lang === "es" ? "Agendar Asesoría de 15 Minutos" : "Schedule 15-Min Advisor Review",
      action: "schedule_call",
    },
  };
}
