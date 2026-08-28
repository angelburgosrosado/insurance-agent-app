export interface CampaignRequest {
  product: "military" | "iul" | "annuity" | "funeral" | "dime" | "ltc";
  persona: "veterans" | "business_owners" | "hispanic_families" | "pre_retirees" | "young_families";
  trigger:
    | "protection"
    | "retirement_income"
    | "health_medicare"
    | "legacy_planning"
    | "engineering_clarity"
    | "military_transition"
    | "market_volatility"
    | "tax_season"
    | "retirement_cliff"
    | "general_planning";
  tone: "analytical" | "direct_response" | "empathetic" | "executive";
  lang: "en" | "es";
  seed?: number;
  customNotes?: string;
}

export interface GeneratedCampaignPack {
  product: string;
  persona: string;
  trackedUrl: string;
  themeCategory: string;
  variationId: number;
  generatedAt: string;
  customAngleApplied?: string;
  videoScript: {
    title: string;
    hook: string;
    demonstration: string;
    solution: string;
    cta: string;
    fullText: string;
  };
  youtubeVideo: {
    title: string;
    concept: string;
    chapters: Array<{ timestamp: string; title: string; talkingPoints: string }>;
    visualAids: string[];
    description: string;
  };
  linkedInPost: string;
  paidAd: {
    headline: string;
    hooks: string[];
    primaryText: string;
    description: string;
    ctaButton: string;
  };
  emailBroadcast: {
    subjectA: string;
    subjectB: string;
    previewText: string;
    body: string;
  };
  carouselSlides: Array<{
    slideNumber: number;
    title: string;
    visualCue: string;
    content: string;
  }>;
  complianceDisclosure: string;
}

/**
 * Universal Social Media Bios aligned with Angel Burgos, PE
 */
export const UNIVERSAL_SOCIAL_BIOS = {
  universal: {
    headline: "Strategic Financial Advisor | PE",
    body: "Life • Health • Retirement Income • Legacy Planning\nClear guidance beyond the policy.\n↓ Run free interactive calculators / Book consultation:\nabglco.com",
    characterCount: 168,
  },
  linkedin: {
    name: "LinkedIn Professional Bio & Headline",
    headline: "Strategic Financial Advisor | PE | Florida 0215 Licensed Life, Health & Variable Annuities #G328926 | Founder at AB Global Consulting",
    about: "As a licensed Strategic Financial Advisor (FL License #G328926) with a background as a Professional Engineer (PE), I bring engineering-grade clarity and mathematical precision to family and business wealth protection.\n\nRather than sales hype, we evaluate wealth strategies through contractual floors, tax-free distribution mechanics (IRS Section 7702), and downside insulation.\n\nSpecializations:\n• Indexed Universal Life (IUL) with 0% Downside Floors\n• Guaranteed Lifetime Retirement Annuities (401k/IRA Rollovers)\n• Military & Veteran Asset Shield (VGLI Alternatives & SBP Pension Max)\n• Everest Funeral Concierge 24/7 Price Negotiation ($3,500+ Family Savings)\n• Long-Term Care (Nationwide CareMatters Cash-Indemnity)\n\n📍 Office: Orlando, FL & Puerto Rico | Hablo Español\n📞 Direct: (386) 333-1482 | 🌐 abglco.com",
  },
  facebook: {
    name: "Facebook Community Page Bio",
    headline: "Strategic Financial Advisor | PE — AB Global Consulting",
    about: "Clear guidance beyond the policy. Providing families, veterans, and entrepreneurs with math-backed retirement income, living benefits, and legacy planning across Florida and Puerto Rico. Schedule your complimentary consultation at abglco.com.",
  },
  instagram: {
    name: "Instagram Profile Bio",
    bio: "Strategic Financial Advisor | PE 🛡️\n📈 Life • Health • Retirement • Legacy\n📐 Clear guidance beyond the policy\n🌴 Florida & Puerto Rico (Hablo Español)\n👇 Interactive Simulators & Booking:\nabglco.com",
  },
  youtube: {
    name: "YouTube Channel Description",
    about: "Welcome to AB Global Consulting. Hosted by Angel Burgos, Strategic Financial Advisor & PE. We break down complex financial concepts—Indexed Universal Life (IUL), annuities, Medicare, living benefits, and military pension strategies—into plain-language, engineering-clear models.\n\nOfficial Website: https://abglco.com\nFlorida 0215 License #G328926",
  },
};

/**
 * Maps product ID to root path and canonical title
 */
export function getProductMetadata(productId: CampaignRequest["product"], lang: "en" | "es") {
  const isSpanish = lang === "es";
  switch (productId) {
    case "military":
      return {
        name: isSpanish ? "Escudo Patrimonial Militar y Veteranos" : "Military & Veteran Wealth Shield",
        path: "/tools/military-asset-shield",
        serviceUrl: "/services/military-asset-shield",
        theme: isSpanish ? "Blindaje Militar y Pensión Max" : "Military Transition & Pension Max",
      };
    case "iul":
      return {
        name: isSpanish ? "Seguro Indexado Universal (IUL) con Piso 0%" : "Florida IUL & Tax-Free Retirement",
        path: "/tools/iul-calculator",
        serviceUrl: "/services/life-insurance",
        theme: isSpanish ? "Retiro Libre de Impuestos IRS 7702" : "Retirement Income & Tax-Free Growth",
      };
    case "annuity":
      return {
        name: isSpanish ? "Anualidades de Ingreso Vitalicio Garantizado" : "Guaranteed Lifetime Annuities (401k/IRA)",
        path: "/tools/annuity-estimator",
        serviceUrl: "/services/variable-annuities",
        theme: isSpanish ? "Inmunidad en Retiro y Secuencia de Retornos" : "Sequence of Returns Risk Defense",
      };
    case "funeral":
      return {
        name: isSpanish ? "Everest Funeral Concierge 24/7" : "Everest Funeral Concierge & Final Expense",
        path: "/tools/funeral-cost-savings",
        serviceUrl: "/services/final-expense",
        theme: isSpanish ? "Planificación de Legado y Concierge Funerario" : "Legacy Planning & Funeral Concierge",
      };
    case "dime":
      return {
        name: isSpanish ? "Calculadora de Necesidades D.I.M.E." : "D.I.M.E. Life Needs Framework",
        path: "/tools/life-needs",
        serviceUrl: "/services/life-insurance",
        theme: isSpanish ? "Protección Científica de Ingresos Familiares" : "Engineering Clarity & Protection Needs",
      };
    case "ltc":
      return {
        name: isSpanish ? "Cuidado Prolongado Nationwide CareMatters" : "Nationwide CareMatters LTC Cash Indemnity",
        path: "/tools/ltc-calculator",
        serviceUrl: "/services/long-term-care",
        theme: isSpanish ? "Cuidado Prolongado en Efectivo Directo" : "Health & Long-Term Care Cash Indemnity",
      };
  }
}

/**
 * Autonomous AI Content Synthesis Engine with Multi-Angle Variation Rotations
 */
export function generateCampaignPack(req: CampaignRequest): GeneratedCampaignPack {
  const isSpanish = req.lang === "es";
  const meta = getProductMetadata(req.product, req.lang);
  const seed = req.seed ?? Math.floor(Math.random() * 1000);
  const varIndex = Math.abs(seed) % 3; // 0, 1, or 2

  const now = new Date();
  const timeString = now.toLocaleTimeString(isSpanish ? "es-ES" : "en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const campaignSlug = `${req.product}_${req.persona}_${req.trigger}_v${varIndex + 1}`;
  const trackedUrl = `https://abglco.com${meta.path}?utm_source=social&utm_medium=ai_campaign&utm_campaign=${campaignSlug}`;

  const compliance = isSpanish
    ? "Asesoría Licenciada 0215 de Florida #G328926 • Código WFG: F6D9U • Angel Burgos, PE • AB Global Consulting • 9501 Satellite Blvd, Suite 105, Orlando, FL 32837. No representa una garantía de rendimientos futuros. Sujeto a lineamientos de suscripción de la aseguradora. Distribuciones bajo Código IRS 7702."
    : "Florida State Licensed 0215 Life, Health & Variable Annuities #G328926 • WFG Agent Code: F6D9U • Angel Burgos, PE • AB Global Consulting. Payouts and guarantees subject to carrier claims-paying ability. Non-taxable loan distributions adhere to IRS Section 7702 guidelines.";

  const customContextEn = req.customNotes ? ` (Focus: ${req.customNotes})` : "";
  const customContextEs = req.customNotes ? ` (Enfoque Especial: ${req.customNotes})` : "";

  // 1. MILITARY VARIATIONS
  if (req.product === "military") {
    const videoHooks = [
      {
        hook: isSpanish
          ? "[0-3s]: (Señalar a la pantalla con el simulador abierto) 'Si estás en servicio activo o saliendo de las Fuerzas Armadas, no aceptes el VGLI hasta ver estos números.'"
          : "[0-3s]: (Point camera at laptop running the Military Asset Shield slider) 'If you are active duty or separating from service, DO NOT blindly sign up for VGLI.'",
        demo: isSpanish
          ? "[4-20s]: (Mover la barra de edad en pantalla de 30 a 65 años) 'Mira esto: el SGLI es barato en servicio activo, pero al salir, el VGLI sube cada 5 años. A los 65 años pagas más de $750 al mes por la misma cobertura. Eso son $180,000 perdidos con $0 en efectivo acumulado.'"
          : "[4-20s]: (Drag the slider from age 30 to 65 on screen) 'Look at this math: SGLI is cheap in uniform. But when you transition to VGLI, the rates spike every 5 years. By age 65, you're paying $750/month. That's over $180k paid with zero equity.'",
        sol: isSpanish
          ? "[21-35s]: 'La alternativa institucional es asegurar un IUL privado antes de salir. Tu tarifa queda fija de por vida, obtienes Beneficios en Vida por lesiones de servicio y cobras el 100% de tu pensión con la estrategia Pension Max.'"
          : "[21-35s]: 'Smart soldiers and veterans lock in a private IUL before separation. Your premium is level for life, you get Living Benefits for service-related illness, and under Pension Max, you keep 100% of your military pension.'",
      },
      {
        hook: isSpanish
          ? "[0-3s]: '¿Por qué el 90% de los oficiales y sargentos que eligen SBP pierden el 6.5% de su pensión para siempre?'"
          : "[0-3s]: 'Why are 90% of retiring military members blindly giving up 6.5% of their pension forever to SBP?'",
        demo: isSpanish
          ? "[4-20s]: 'El plan SBP le descuenta miles cada año de su retiro. Y si su cónyuge fallece antes que usted, el gobierno no le devuelve ni un solo centavo.'"
          : "[4-20s]: 'SBP automatically deducts thousands from your gross retired pay. And if your spouse passes away first, the government keeps 100% of those deductions with zero refund.'",
        sol: isSpanish
          ? "[21-35s]: 'Con la estrategia Pension Max, usted toma el 100% de su pensión completa y protege a su cónyuge con una póliza privada IUL libre de impuestos.'"
          : "[21-35s]: 'With the Pension Max strategy, you elect full 100% retirement pay and protect your spouse with a private, tax-free cash-value life asset.'",
      },
      {
        hook: isSpanish
          ? "[0-3s]: 'Veteranos de Florida y Puerto Rico: si tienen 120 días o menos para salir del servicio activo, miren esto.'"
          : "[0-3s]: 'Active duty service members: If you are within 120 days of ETS or military retirement, stop scrolling.'",
        demo: isSpanish
          ? "[4-20s]: 'Durante esos 120 días pueden calificar para seguros privados con tarifas de salud preferenciales antes de que sus evaluaciones de discapacidad del VA aumenten el costo.'"
          : "[4-20s]: 'During this 120-day window, you can lock in civilian preferred underwriting before VA disability claims complicate approval.'",
        sol: isSpanish
          ? "[21-35s]: 'Esto les da protección nivelada de por vida, acumulación bajo el Código IRS 7702 y Beneficios en Vida por enfermedades de servicio.'"
          : "[21-35s]: 'This guarantees lifetime level rates, tax-free accumulation under IRS 7702, and Living Benefits for service-connected illness.'",
      },
    ];

    const currentHook = videoHooks[varIndex];

    return {
      product: meta.name,
      persona: req.persona,
      themeCategory: meta.theme,
      variationId: varIndex + 1,
      generatedAt: timeString,
      customAngleApplied: req.customNotes,
      trackedUrl,
      complianceDisclosure: compliance,
      videoScript: {
        title: isSpanish
          ? `Guión #${varIndex + 1}: ${varIndex === 0 ? "La Trampa de VGLI" : varIndex === 1 ? "Estrategia Pension Max" : "La Ventana de 120 Días"}${customContextEs}`
          : `Video Reel #${varIndex + 1}: ${varIndex === 0 ? "The $180k VGLI Rate Cliff" : varIndex === 1 ? "The SBP Pension Max Strategy" : "The 120-Day Separation Window"}${customContextEn}`,
        hook: currentHook.hook,
        demonstration: currentHook.demo,
        solution: currentHook.sol,
        cta: isSpanish
          ? `[36-45s]: 'Diseñé este simulador interactivo gratuito. Ingrese a ${trackedUrl} para calcular sus números.'`
          : `[36-45s]: 'I built this free military transition calculator. Hit the link in bio or visit ${trackedUrl} to run your scenario.'`,
        fullText: `${currentHook.hook}\n\n${currentHook.demo}\n\n${currentHook.sol}\n\n[CTA]: ${trackedUrl}`,
      },
      youtubeVideo: {
        title: isSpanish
          ? `[Guía #${varIndex + 1}] SGLI vs VGLI vs Pension Max: Análisis de Ingeniería Financiera para Militares y Veteranos`
          : `[Masterclass #${varIndex + 1}] Military Transition Breakdown: SGLI, VGLI Rate Spikes, and Pension Max Explained`,
        concept: isSpanish
          ? `Desglose matemático de 8 minutos con Angel Burgos, PE, evaluando curvas de costo de VGLI vs IUL nivelado y maximización de pensión militar.`
          : `8-minute mathematical breakdown with Angel Burgos, PE, analyzing VGLI cost curves vs level private IUL and pension optimization.`,
        chapters: [
          {
            timestamp: "0:00",
            title: isSpanish ? "Introducción y la Ventana Crítica de 120 Días" : "Introduction: The 120-Day Transition Window",
            talkingPoints: isSpanish ? "Por qué el cambio de SGLI a VGLI se convierte en un pozo sin fondo." : "Why converting SGLI to VGLI is one of the costliest veteran mistakes.",
          },
          {
            timestamp: "2:05",
            title: isSpanish ? "Curva de Costos de VGLI de los 30 a los 75 Años" : "The Mathematical VGLI Cost Curve",
            talkingPoints: isSpanish ? "Los aumentos de $50/mes a $750/mes y $180,000 en primas no recuperables." : "Rate progression from $50/mo to $750/mo ($180k cumulative).",
          },
          {
            timestamp: "4:30",
            title: isSpanish ? "El Dilema del 6.5% del Plan SBP" : "The 6.5% SBP Deduction Dilemma",
            talkingPoints: isSpanish ? "Cómo conservar el 100% de la pensión militar con la estrategia Pension Max." : "How to keep 100% full retired pay using private tax-free protection.",
          },
          {
            timestamp: "6:45",
            title: isSpanish ? "Demostración en Vivo del Simulador Interactivo" : "Live Simulator Demonstration & Next Steps",
            talkingPoints: isSpanish ? "Cómo calcular su escenario exacto en abglco.com y descargar el reporte." : "Running custom rank and retirement scenarios at abglco.com.",
          },
        ],
        visualAids: [
          "Pantalla con el simulador /tools/military-asset-shield activo",
          "Gráfico de barras de tarifas VGLI vs IUL nivelado",
          "Diagrama de flujo de decisión Pension Max",
        ],
        description: isSpanish
          ? `🎖️ En esta entrega (#${varIndex + 1}), Angel Burgos, PE (Asesor Financiero Estratégico, Lic. FL 0215 #G328926) desglosa la estrategia matemática de protección militar.\n\n📌 CAPÍTULOS:\n0:00 - Introducción y Ventana de 120 Días\n2:05 - Curva de Costos de VGLI\n4:30 - El Dilema del 6.5% de SBP\n6:45 - Demostración en Vivo del Simulador\n\n👉 CALCULA TU ESCENARIO EN VIVO:\n${trackedUrl}\n\n🌐 Agenda una Consulta con Angel Burgos, PE: https://abglco.com/#consultation`
          : `🎖️ In this masterclass edition (#${varIndex + 1}), Angel Burgos, PE (Strategic Financial Advisor, FL Lic. #G328926) breaks down the mathematical truth behind military benefits.\n\n📌 CHAPTERS:\n0:00 - Introduction: The 120-Day Transition Window\n2:05 - The Mathematical VGLI Cost Curve\n4:30 - The 6.5% SBP Deduction Dilemma\n6:45 - Live Simulator Walkthrough\n\n👉 TEST YOUR EXACT RANK AND RETIREMENT NUMBERS:\n${trackedUrl}\n\n🌐 Book a 1-on-1 Strategy Session: https://abglco.com/#consultation`,
      },
      linkedInPost: isSpanish
        ? `🎖️ [Análisis #${varIndex + 1}] El Dilema Financiero de $180,000 en la Transición Militar\n\nAl separarse del servicio activo, muchos soldados y oficiales convierten automáticamente su SGLI de $500k a VGLI.\n\nLa realidad matemática:\n• A los 30 años: VGLI cuesta ~$50/mes.\n• A los 50 años: Salta a ~$180/mes.\n• A los 65 años: Supera los $750/mes ($9,000/año).\n• Costo acumulado a los 75 años: Más de $180,000.\n• Valor en efectivo recuperable: EXACTAMENTE $0.\n\n💡 La Solución Institucional (Pension Max + IUL bajo Código IRS 7702):\n1. Asegurar un IUL con tarifa fija de por vida antes o durante la transición.\n2. Beneficios en Vida por enfermedades o lesiones de servicio.\n3. Acumulación de valor en efectivo libre de impuestos bajo IRS Sec 7702.\n4. Cobrar el 100% de su pensión militar completa.\n\n👉 Simule su rango y años de servicio en nuestro simulador interactivo:\n${trackedUrl}\n\n#Militares #Veteranos #PensionMax #RetiroMilitar #FloridaVeterans #PuertoRico`
        : `🎖️ [Strategic Breakdown #${varIndex + 1}] The $180,000 Transition Dilemma Most Military Veterans Miss\n\nWhen transitioning from active service, members are told to convert their $500,000 SGLI to VGLI.\n\nHere is the financial reality:\n• Age 30: VGLI costs ~$50/mo.\n• Age 50: Jumps to ~$180/mo.\n• Age 65: Exceeds $750/mo ($9,000/year).\n• Cumulative cost by age 75: Over $180,000.\n• Cash equity returned: EXACTLY $0.\n\n💡 The Institutional Alternative (Pension Max + Private IUL):\n1. Lock in private IUL coverage with level lifetime premiums.\n2. Maintain Living Benefits for service-related medical conditions.\n3. Build hundreds of thousands in accessible, tax-free cash reserves under IRS Section 7702.\n4. Keep 100% of your gross military pension instead of forfeiting 6.5% to SBP.\n\n👉 Run your exact rank and years of service on our interactive simulator:\n${trackedUrl}\n\n#MilitaryFinance #Veterans #RetirementPlanning #AssetProtection #PensionMax #SBP`,
      paidAd: {
        headline: isSpanish ? `[Opción #${varIndex + 1}] Veteranos de Florida y PR: ¿SGLI vs VGLI?` : `[Ad #${varIndex + 1}] Military Veterans: Beware the VGLI Rate Cliff`,
        hooks: isSpanish
          ? [
              "Antes de aceptar el VGLI, compare el costo real a 20 años.",
              "¿Sabía que el plan SBP le cuesta 6.5% de su pensión de por vida?",
              "Protección patrimonial fija con Beneficios en Vida para veteranos.",
            ]
          : [
              "Do not convert your SGLI to VGLI before seeing this chart.",
              "Are you giving up 6.5% of your military pension every month to SBP?",
              "Lock in lifetime level rates and tax-free retirement loans.",
            ],
        primaryText: isSpanish
          ? `Al separarse de las Fuerzas Armadas, el costo de VGLI se dispara cada 5 años hasta superar los $750/mes a los 65 años. Conozca cómo el seguro privado IUL fija su tarifa, incluye Beneficios en Vida y le permite cobrar el 100% de su pensión militar (Pension Max). Simule su caso en 60 segundos.`
          : `When leaving active duty, VGLI rates escalate every 5 years to over $750/month at age 65. Discover how a private IUL locks in level rates for life, provides Living Benefits, and lets you keep 100% of your military pension with Pension Max. Run your simulation in 60 seconds.`,
        description: isSpanish ? "Simulador interactivo gratuito con reporte PDF." : "Free interactive military simulator & PDF report.",
        ctaButton: isSpanish ? "Abrir Simulador Militar" : "Calculate My Numbers",
      },
      emailBroadcast: {
        subjectA: isSpanish ? `🎖️ [Variación #${varIndex + 1}] La trampa de $180k del VGLI que nadie te explica` : `🎖️ [Variation #${varIndex + 1}] The $180,000 VGLI rate cliff you need to know`,
        subjectB: isSpanish ? `Cómo conservar el 100% de tu pensión militar (Pension Max)` : `How to keep 100% of your military pension (Pension Max)`,
        previewText: isSpanish ? "Calcula tu costo de transición militar en tiempo real." : "Calculate your exact transition costs in real time.",
        body: isSpanish
          ? `Hola,\n\nSi has servido en las Fuerzas Armadas o estás cerca de tu transición al mundo civil, hay un detalle crítico sobre el seguro de vida que con frecuencia se pasa por alto.\n\nEl SGLI de $500k termina al salir del servicio. Al pasar a VGLI, la prima aumenta de manera exponencial cada 5 años. Para los 65 años, estás pagando más de $750 cada mes por la misma cobertura—acumulando más de $180,000 en primas perdidas sin acumular un solo centavo de valor en efectivo.\n\nAdicionalmente, el plan SBP del gobierno descuenta el 6.5% de tu pensión bruta de por vida.\n\nExiste una alternativa matemática:\n1. Fijar una prima nivelada privada mediante un Seguro Indexado Universal (IUL).\n2. Obtener Beneficios en Vida por enfermedades o lesiones de servicio.\n3. Acumular capital libre de impuestos bajo el Código IRS Sec 7702.\n4. Cobrar el 100% de tu pensión militar completa mediante la estrategia Pension Max.\n\nHemos preparado un simulador interactivo donde puedes ingresar tu rango y años de servicio:\n\n👉 Accede al Simulador Militar Aquí:\n${trackedUrl}\n\nCordialmente,\nAngel Burgos, PE • Asesor Licenciado 0215 #G328926\nAB Global Consulting\n(386) 333-1482`
          : `Hello,\n\nIf you have served in the military or are preparing for your transition to civilian life, there is a critical financial detail that often gets missed.\n\nYour active duty SGLI ends 120 days after separation. When converting to VGLI, premiums escalate every 5 years, topping $750/month by age 65. That totals over $180,000 in sunk costs with $0 in equity returned.\n\nFurthermore, opting into SBP automatically deducts 6.5% of your gross military retired pay forever.\n\nThere is an institutional alternative:\n1. Lock in level lifetime premiums with an Indexed Universal Life (IUL) policy.\n2. Receive Living Benefits for service-related conditions.\n3. Accumulate tax-free cash value under IRS Section 7702.\n4. Keep 100% of your military pension with Pension Max.\n\nWe built an interactive simulator where you can test your exact numbers:\n\n👉 Run the Military Asset Shield Simulator:\n${trackedUrl}\n\nBest regards,\nAngel Burgos, PE • Florida Licensed 0215 Practitioner #G328926\nAB Global Consulting\n(386) 333-1482`,
      },
      carouselSlides: [
        {
          slideNumber: 1,
          title: isSpanish ? `[Ángulo #${varIndex + 1}] El Dilema de $180k del VGLI` : `[Angle #${varIndex + 1}] The $180k VGLI Rate Cliff`,
          visualCue: "Icono de advertencia militar + gráfico de costo ascendente",
          content: isSpanish
            ? "¿Por qué el 90% de los veteranos pagan de más por su seguro tras dejar el servicio activo? Desliza para ver los números."
            : "Why do 90% of military veterans overpay for coverage after leaving service? Swipe for the real math.",
        },
        {
          slideNumber: 2,
          title: isSpanish ? "1. El Aumento de Tarifas de VGLI" : "1. The Escalating VGLI Cost",
          visualCue: "Tabla comparativa: 30 años vs 65 años",
          content: isSpanish
            ? "A los 30 años: $50/mes.\nA los 50 años: $180/mes.\nA los 65 años: $750/mes ($9,000/año).\nTotal acumulado: $180,000+ con $0 de valor en efectivo."
            : "Age 30: $50/mo.\nAge 50: $180/mo.\nAge 65: $750/mo ($9,000/yr).\nCumulative total: $180,000+ with $0 residual equity.",
        },
        {
          slideNumber: 3,
          title: isSpanish ? "2. La Pérdida del 6.5% en SBP" : "2. The 6.5% SBP Pension Cut",
          visualCue: "Icono de pensión militar dividida",
          content: isSpanish
            ? "El plan SBP le descuenta el 6.5% de su pensión de retiro todos los meses. Si su cónyuge fallece primero, todo ese dinero se pierde sin derecho a reembolso."
            : "SBP automatically deducts 6.5% of your retired pay. If your spouse passes first, all those deductions are permanently lost with zero refund.",
        },
        {
          slideNumber: 4,
          title: isSpanish ? "3. La Estrategia Pension Max + IUL" : "3. Pension Max & IRS 7702 IUL",
          visualCue: "Escudo de protección con 0% Floor",
          content: isSpanish
            ? "Fije una prima privada de por vida, cobre el 100% de su pensión y acumule valor en efectivo libre de impuestos bajo el Código IRS Sec 7702."
            : "Lock in lifetime level premiums, keep 100% of your gross military pension, and build tax-free cash under IRS Section 7702.",
        },
        {
          slideNumber: 5,
          title: isSpanish ? "Simule su Caso en 60 Segundos" : "Run Your Scenario in 60 Seconds",
          visualCue: "Botón de acción hacia abglco.com",
          content: isSpanish
            ? `Ingrese a ${trackedUrl} o toque el enlace en la biografía para descargar su reporte PDF personalizado.`
            : `Visit ${trackedUrl} or tap the link in bio to download your custom PDF illustration.`,
        },
      ],
    };
  }

  // 2. GENERAL PRODUCTS (IUL, Annuity, Funeral, DIME, LTC) MULTI-VARIATION ROTATION
  const generalHooks = [
    {
      hook: isSpanish
        ? `[0-3s]: "Si vive en Florida o Puerto Rico y desea proteger su patrimonio familiar, debe conocer esta estrategia antes de tomar una decisión."`
        : `[0-3s]: "If you are planning your retirement in Florida, here is what top financial advisors do to protect capital from market drops."`,
      demo: isSpanish
        ? `[4-20s]: "La mayoría de las personas arriesgan sus ahorros en la bolsa o dependen de pólizas que expiran sin dejar nada. Con nuestra metodología, blindamos su capital con un piso garantizado del 0%."`
        : `[4-20s]: "Most people either take too much market risk or buy term policies that expire with zero equity. Our strategy guarantees a contractual 0% floor against market crashes."`,
      sol: isSpanish
        ? `[21-35s]: "Esto le permite acumular capital libre de impuestos bajo el Código IRS Sec 7702 y proteger a su familia con Beneficios en Vida ante enfermedades graves."`
        : `[21-35s]: "This enables tax-free distributions under IRS Section 7702 while shielding your family with accelerated Living Benefits."`,
    },
    {
      hook: isSpanish
        ? `[0-3s]: "¿Qué pasaría si la bolsa de valores cae un 30% justo el año en que usted decide retirarse?"`
        : `[0-3s]: "What happens to your retirement if the stock market drops 30% right before you start withdrawing?"`,
      demo: isSpanish
        ? `[4-20s]: "Ese fenómeno se llama Riesgo de Secuencia de Retornos, y puede destruir el 50% del poder de compra de su 401(k) o IRA en menos de 3 años."`
        : `[4-20s]: "That is the Sequence of Returns Risk—it can drain 50% of your 401(k) purchasing power in just 3 years."`,
      sol: isSpanish
        ? `[21-35s]: "Estructuramos un piso garantizado donde su dinero captura el crecimiento de los índices, pero sus ganancias quedan bloqueadas para siempre."`
        : `[21-35s]: "We structure a contractual floor where your gains lock in annually and your principal never drops below zero."`,
    },
    {
      hook: isSpanish
        ? `[0-3s]: "La mayoría de las personas cometen el error de elegir una cifra al azar para su seguro de vida."`
        : `[0-3s]: "Most people make the mistake of guessing a random round number for their life insurance policy."`,
      demo: isSpanish
        ? `[4-20s]: "El seguro del trabajo solo cubre 1 año de salario. Si algo le sucede, su familia queda expuesta a la hipoteca, deudas y gastos de educación."`
        : `[4-20s]: "Employer life insurance only covers 1x salary. When you leave or pass, your family faces mortgage debt and education shortfalls."`,
      sol: isSpanish
        ? `[21-35s]: "Aplicamos el método D.I.M.E. para calcular la brecha matemática exacta y proteger su legado sin pagar primas de más."`
        : `[21-35s]: "We apply the D.I.M.E. framework to calculate your exact mathematical shortfall so you never overpay."`,
    },
  ];

  const currentGenHook = generalHooks[varIndex];

  return {
    product: meta.name,
    persona: req.persona,
    themeCategory: meta.theme,
    variationId: varIndex + 1,
    generatedAt: timeString,
    customAngleApplied: req.customNotes,
    trackedUrl,
    complianceDisclosure: compliance,
    videoScript: {
      title: isSpanish
        ? `Guión #${varIndex + 1}: ${meta.name}${customContextEs}`
        : `45-Sec Video #${varIndex + 1}: ${meta.name}${customContextEn}`,
      hook: currentGenHook.hook,
      demonstration: currentGenHook.demo,
      solution: currentGenHook.sol,
      cta: isSpanish
        ? `[36-45s]: "Diseñé un simulador interactivo gratuito. Ingrese a ${trackedUrl} para calcular sus números."`
        : `[36-45s]: "I built a free interactive simulator for you. Visit ${trackedUrl} to calculate your scenario."`,
      fullText: `${currentGenHook.hook}\n\n${currentGenHook.demo}\n\n${currentGenHook.sol}\n\n[CTA]: ${trackedUrl}`,
    },
    youtubeVideo: {
      title: isSpanish
        ? `[Masterclass #${varIndex + 1}] ${meta.name}: Cómo Proteger su Patrimonio con Certeza Matemática y Piso 0%`
        : `[Masterclass #${varIndex + 1}] ${meta.name}: How to Protect Your Family Wealth with Mathematical Certainty & 0% Floor`,
      concept: isSpanish
        ? `Guía educativa completa de 7 a 10 minutos explicando la mecánica detrás de ${meta.name} con modelos de ingeniería financiera.`
        : `Comprehensive 7-10 minute educational masterclass breaking down the mechanics of ${meta.name} using engineering financial models.`,
      chapters: [
        {
          timestamp: "0:00",
          title: isSpanish ? "El Problema de la Planificación Tradicional" : "The Core Flaw in Traditional Planning",
          talkingPoints: isSpanish ? "Por qué depender solo de 401k o pólizas a término deja brechas críticas." : "Why relying strictly on taxable brokerages or expiring term policies creates severe financial risks.",
        },
        {
          timestamp: "2:10",
          title: isSpanish ? "La Mecánica del Piso Garantizado del 0%" : "The Mechanics of the 0% Contractual Floor",
          talkingPoints: isSpanish ? "Cómo indexar a índices bursátiles sin riesgo de pérdida de principal." : "How indexing captures upside without exposing principal to market corrections.",
        },
        {
          timestamp: "4:40",
          title: isSpanish ? "Ventajas Fiscales bajo Código IRS Sección 7702" : "IRS Section 7702 Tax-Free Loan Mechanics",
          talkingPoints: isSpanish ? "Distribución de ingresos libres de impuestos federales." : "Structuring non-taxable distributions via policy loan arbitrage.",
        },
        {
          timestamp: "6:50",
          title: isSpanish ? "Beneficios en Vida y Plan de Acción" : "Accelerated Living Benefits & Execution Blueprint",
          talkingPoints: isSpanish ? "Protección ante enfermedades críticas o crónicas y cómo simular su caso." : "Shielding your wealth from medical crises and launching your interactive simulation.",
        },
      ],
      visualAids: [
        "Demostración interactiva en pantalla de abglco.com",
        "Comparativa de curvas de rendimiento con piso 0% vs caídas de mercado",
        "Lista de verificación descargable (Protection Planning Checklist)",
      ],
      description: isSpanish
        ? `📊 En esta guía educativa (#${varIndex + 1}), Angel Burgos, PE (Asesor Financiero Estratégico, Lic. FL 0215 #G328926) desglosa la estrategia de ${meta.name}.\n\n📌 CAPÍTULOS:\n0:00 - El Problema de la Planificación Tradicional\n2:10 - La Mecánica del Piso Garantizado del 0%\n4:40 - Ventajas Fiscales bajo Código IRS Sección 7702\n6:50 - Beneficios en Vida y Plan de Acción\n\n👉 PRUEBE NUESTRO SIMULADOR INTERACTIVO:\n${trackedUrl}\n\n🌐 Agenda una Consulta Personalizada: https://abglco.com/#consultation`
        : `📊 In this educational video (#${varIndex + 1}), Angel Burgos, PE (Strategic Financial Advisor, Florida 0215 Lic. #G328926) breaks down the institutional strategy for ${meta.name}.\n\n📌 CHAPTERS:\n0:00 - The Core Flaw in Traditional Planning\n2:10 - The Mechanics of the 0% Contractual Floor\n4:40 - IRS Section 7702 Tax-Free Loan Mechanics\n6:50 - Accelerated Living Benefits & Execution Blueprint\n\n👉 LAUNCH THE INTERACTIVE SIMULATOR:\n${trackedUrl}\n\n🌐 Book a 1-on-1 Consultation: https://abglco.com/#consultation`,
    },
    linkedInPost: isSpanish
      ? `📊 [Publicación #${varIndex + 1}] Estrategia Financiera Institucional: ${meta.name}\n\nEn un entorno de volatilidad e inflación, las familias y empresarios en Florida y Puerto Rico buscan certidumbre matemática.\n\nAspectos clave:\n• Piso garantizado del 0% contra caídas bursátiles.\n• Ventajas fiscales bajo el Código IRS Sección 7702.\n• Cobertura de Beneficios en Vida ante enfermedades críticas o crónicas.\n\n👉 Pruebe nuestro simulador interactivo en:\n${trackedUrl}\n\n#Finanzas #SegurosDeVida #RetiroSeguro #Florida #PuertoRico`
      : `📊 [Strategic Post #${varIndex + 1}] Institutional Financial Strategy: ${meta.name}\n\nIn an unpredictable market environment, families and business owners require mathematical certainty rather than speculation.\n\nCore anchors:\n• Contractual 0% downside market loss floor.\n• Tax-favored accumulation and distributions under IRS Section 7702.\n• Accelerated Living Benefits for chronic, critical, or terminal illnesses.\n\n👉 Test your numbers on our interactive simulator:\n${trackedUrl}\n\n#FinancialPlanning #WealthPreservation #IUL #Annuities`,
    paidAd: {
      headline: isSpanish ? `[Opción #${varIndex + 1}] Protección Financiera en Florida: ${meta.name}` : `[Ad #${varIndex + 1}] Florida Retirement & Wealth: ${meta.name}`,
      hooks: isSpanish
        ? [
            "¿Su plan de retiro está protegido ante caídas de la bolsa?",
            "Conozca la alternativa del Código IRS Sec 7702.",
            "Calcule su proyección personalizada en 60 segundos.",
          ]
        : [
            "Is your retirement nest egg protected from market downturns?",
            "Discover the IRS Section 7702 tax-free strategy.",
            "Run your custom scenario in 60 seconds.",
          ],
      primaryText: isSpanish
        ? `Proteja su patrimonio con piso garantizado del 0%, retiros libres de impuestos y Beneficios en Vida. Simule su caso en nuestro portal interactivo con Angel Burgos, PE, asesor licenciado 0215.`
        : `Protect your capital with a guaranteed 0% downside floor, tax-free distributions, and Living Benefits. Run your simulation with licensed practitioner Angel Burgos, PE.`,
      description: isSpanish ? "Simulador interactivo con reporte descargable." : "Interactive simulator with PDF report.",
      ctaButton: isSpanish ? "Abrir Simulador" : "Calculate My Plan",
    },
    emailBroadcast: {
      subjectA: isSpanish ? `📊 [Boletín #${varIndex + 1}] Análisis Financiero: ${meta.name}` : `📊 [Newsletter #${varIndex + 1}] Financial Blueprint: ${meta.name}`,
      subjectB: isSpanish ? `Cómo proteger su patrimonio con piso del 0%` : `How to shield your wealth with a 0% floor`,
      previewText: isSpanish ? "Calcule su proyección en tiempo real." : "Run your interactive scenario in real time.",
      body: isSpanish
        ? `Hola,\n\nEn momentos de volatilidad económica, asegurar su patrimonio familiar con herramientas respaldadas por contrato es la máxima prioridad.\n\nNuestra metodología se fundamenta en:\n1. Piso del 0% contra caídas del mercado.\n2. Retiros libres de impuestos bajo el Código IRS Sec 7702.\n3. Beneficios en Vida ante emergencias de salud.\n\nPuede simular su caso en nuestra herramienta interactiva:\n\n👉 Abrir Simulador:\n${trackedUrl}\n\nAtentamente,\nAngel Burgos, PE • Asesor Licenciado 0215 #G328926\nAB Global Consulting`
        : `Hello,\n\nIn times of economic volatility, securing your family's future with contractually guaranteed strategies is paramount.\n\nOur framework delivers:\n1. 0% Downside floor against market loss.\n2. Tax-free distributions under IRS Section 7702.\n3. Living Benefits for critical and chronic health events.\n\nRun your numbers on our interactive simulator:\n\n👉 Launch Simulator:\n${trackedUrl}\n\nBest regards,\nAngel Burgos, PE • Licensed 0215 Practitioner #G328926\nAB Global Consulting`,
    },
    carouselSlides: [
      {
        slideNumber: 1,
        title: isSpanish ? `[Ángulo #${varIndex + 1}] Protección: ${meta.name}` : `[Angle #${varIndex + 1}] Defense: ${meta.name}`,
        visualCue: "Portada con titular llamativo y logotipo AB Global",
        content: isSpanish ? "Descubra cómo blindar su patrimonio familiar ante cualquier crisis de mercado." : "Discover how to insulate your retirement nest egg from market corrections.",
      },
      {
        slideNumber: 2,
        title: isSpanish ? "1. El Peligro del Riesgo Bursátil" : "1. The Threat of Market Crashes",
        visualCue: "Gráfico de caída de bolsa vs piso del 0%",
        content: isSpanish ? "Una caída de mercado cerca de su retiro puede retrasar su jubilación 5 a 10 años." : "A market downturn in the critical retirement window can destroy decades of compounding.",
      },
      {
        slideNumber: 3,
        title: isSpanish ? "2. La Solución del Piso 0%" : "2. The 0% Downside Floor",
        visualCue: "Escudo con candado de protección",
        content: isSpanish ? "Cuando el mercado cae, su dinero no pierde ni un solo centavo gracias a la garantía contractual." : "When indices drop, your principal and locked gains remain 100% protected.",
      },
      {
        slideNumber: 4,
        title: isSpanish ? "3. Ventajas Fiscales IRS 7702" : "3. IRS 7702 Tax Advantages",
        visualCue: "Icono de ahorro tributario libre de impuestos",
        content: isSpanish ? "Acceda a préstamos de póliza libres de impuestos federales para complementar su jubilación." : "Distribute retirement income tax-free via policy loans under IRS Section 7702.",
      },
      {
        slideNumber: 5,
        title: isSpanish ? "Calcule su Caso en 60 Segundos" : "Calculate Your Plan in 60 Seconds",
        visualCue: "Llamado a la acción hacia abglco.com",
        content: isSpanish ? `Visite ${trackedUrl} para descargar su reporte PDF oficial.` : `Visit ${trackedUrl} to download your official PDF report.`,
      },
    ],
  };
}
