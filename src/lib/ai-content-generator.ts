export interface CampaignRequest {
  product: "military" | "iul" | "annuity" | "funeral" | "dime" | "ltc";
  persona: "veterans" | "business_owners" | "hispanic_families" | "pre_retirees" | "young_families";
  trigger: "market_volatility" | "tax_season" | "retirement_cliff" | "military_transition" | "general_planning";
  tone: "analytical" | "direct_response" | "empathetic" | "executive";
  lang: "en" | "es";
  seed?: number;
  customNotes?: string;
}

export interface GeneratedCampaignPack {
  product: string;
  persona: string;
  trackedUrl: string;
  videoScript: {
    title: string;
    hook: string;
    demonstration: string;
    solution: string;
    cta: string;
    fullText: string;
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
      };
    case "iul":
      return {
        name: isSpanish ? "Seguro Indexado Universal (IUL) con Piso 0%" : "Florida IUL & Tax-Free Retirement",
        path: "/tools/iul-calculator",
        serviceUrl: "/services/life-insurance",
      };
    case "annuity":
      return {
        name: isSpanish ? "Anualidades de Ingreso Vitalicio Garantizado" : "Guaranteed Lifetime Annuities (401k/IRA)",
        path: "/tools/annuity-estimator",
        serviceUrl: "/services/variable-annuities",
      };
    case "funeral":
      return {
        name: isSpanish ? "Everest Funeral Concierge 24/7" : "Everest Funeral Concierge & Final Expense",
        path: "/tools/funeral-cost-savings",
        serviceUrl: "/services/final-expense",
      };
    case "dime":
      return {
        name: isSpanish ? "Calculadora de Necesidades D.I.M.E." : "D.I.M.E. Life Needs Framework",
        path: "/tools/life-needs",
        serviceUrl: "/services/life-insurance",
      };
    case "ltc":
      return {
        name: isSpanish ? "Cuidado Prolongado Nationwide CareMatters" : "Nationwide CareMatters LTC Cash Indemnity",
        path: "/tools/ltc-calculator",
        serviceUrl: "/services/long-term-care",
      };
  }
}

/**
 * Autonomous AI Content Synthesis Engine with Financial Direct-Response Frameworks
 */
export function generateCampaignPack(req: CampaignRequest): GeneratedCampaignPack {
  const isSpanish = req.lang === "es";
  const meta = getProductMetadata(req.product, req.lang);

  const campaignSlug = `${req.product}_${req.persona}_${req.trigger}`;
  const trackedUrl = `https://abglco.com${meta.path}?utm_source=social&utm_medium=ai_campaign&utm_campaign=${campaignSlug}`;

  const compliance = isSpanish
    ? "Asesoría Licenciada 0215 de Florida #G328926 • Código WFG: F6D9U • Angel Burgos • AB Global Consulting • 9501 Satellite Blvd, Suite 105, Orlando, FL 32837. No representa una garantía de rendimientos futuros. Sujeto a lineamientos de suscripción de la aseguradora."
    : "Florida State Licensed 0215 Life, Health & Variable Annuities #G328926 • WFG Agent Code: F6D9U • Angel Burgos • AB Global Consulting. Payouts and guarantees subject to carrier claims-paying ability. Non-taxable loan distributions adhere to IRS Section 7702 guidelines.";

  if (req.product === "military") {
    return {
      product: meta.name,
      persona: req.persona,
      trackedUrl,
      complianceDisclosure: compliance,
      videoScript: {
        title: isSpanish ? "Guión de 45s: La Trampa de Costo de VGLI" : "45-Sec Reel: The $180,000 VGLI Rate Cliff",
        hook: isSpanish
          ? "[0-3s]: (Señalar a la pantalla con el simulador abierto) 'Si estás en servicio activo o saliendo de las Fuerzas Armadas, no aceptes el VGLI hasta ver estos números.'"
          : "[0-3s]: (Point camera at laptop running the Military Asset Shield slider) 'If you are active duty or separating from service, DO NOT blindly sign up for VGLI.'",
        demonstration: isSpanish
          ? "[4-20s]: (Mover la barra de edad en pantalla de 30 a 65 años) 'Mira esto: el SGLI es barato en servicio activo, pero al salir, el VGLI sube cada 5 años. A los 65 años pagas más de $750 al mes por la misma cobertura. Eso son $180,000 perdidos con $0 en efectivo acumulado.'"
          : "[4-20s]: (Drag the slider from age 30 to 65 on screen) 'Look at this math: SGLI is cheap in uniform. But when you transition to VGLI, the rates spike every 5 years. By age 65, you're paying $750/month. That's over $180k paid with zero equity.'",
        solution: isSpanish
          ? "[21-35s]: 'La alternativa institucional es asegurar un IUL privado antes de salir. Tu tarifa queda fija de por vida, obtienes Beneficios en Vida por lesiones de servicio y cobras el 100% de tu pensión con la estrategia Pension Max.'"
          : "[21-35s]: 'Smart soldiers and veterans lock in a private IUL before separation. Your premium is level for life, you get Living Benefits for service-related illness, and under Pension Max, you keep 100% of your military pension.'",
        cta: isSpanish
          ? "[36-45s]: 'Diseñé este simulador interactivo gratuito. Haz clic en el enlace de mi perfil para calcular tus números exactos de retiro.'"
          : "[36-45s]: 'I built this free interactive military simulator. Hit the link in my bio to calculate your rank and retirement numbers right now.'",
        fullText: isSpanish
          ? `[0-3s GANCHO]: "Si estás en servicio activo o saliendo de las Fuerzas Armadas, no aceptes el VGLI hasta ver estos números."\n\n[4-20s DEMOSTRACIÓN]: (Mover la barra en pantalla) "Mira esto: a los 65 años el VGLI supera los $750/mes. Son más de $180,000 en primas con $0 de valor acumulado."\n\n[21-35s SOLUCIÓN]: "Con un IUL privado, fijas tu tarifa de por vida, recibes Beneficios en Vida y cobras el 100% de tu pensión militar sin perder el 6.5% mensual."\n\n[36-45s LLAMADO A LA ACCIÓN]: "Entra a ${trackedUrl} y calcula tu escenario exacto gratis."`
          : `[0-3s HOOK]: "If you are active duty or separating from service, DO NOT blindly sign up for VGLI."\n\n[4-20s DEMONSTRATION]: (Drag the slider on screen) "Look at this: by age 65, VGLI spikes to $750/month. That's $180k lost with zero cash back."\n\n[21-35s SOLUTION]: "With a private IUL, you lock in a lifetime level rate, get Living Benefits, and keep 100% of your military pension with Pension Max."\n\n[36-45s CTA]: "Go to ${trackedUrl} to run your exact transition numbers for free."`,
      },
      linkedInPost: isSpanish
        ? `🎖️ El Dilema de $180,000 que la Mayoría de los Militares y Veteranos Desconocen\n\nAl separarse del servicio activo, muchos soldados y oficiales convierten automáticamente su SGLI de $500k a VGLI.\n\nLa realidad matemática:\n• A los 30 años: VGLI cuesta ~$50/mes.\n• A los 50 años: Salta a ~$180/mes.\n• A los 65 años: Supera los $750/mes ($9,000/año).\n• Costo acumulado a los 75 años: Más de $180,000.\n• Valor en efectivo recuperable: EXACTAMENTE $0.\n\nAl mismo tiempo, el plan SBP descuenta el 6.5% de su pensión militar de por vida. Si su cónyuge fallece primero, el gobierno retiene todo sin reembolso.\n\n💡 La Solución Institucional (Pension Max + IUL bajo Código IRS 7702):\n1. Asegurar un IUL con tarifa fija de por vida antes o durante la transición.\n2. Beneficios en Vida por enfermedades o lesiones de servicio.\n3. Acumulación de valor en efectivo libre de impuestos bajo IRS Sec 7702.\n4. Cobrar el 100% de su pensión de retiro militar.\n\n👉 Simule su rango y años de servicio en nuestro simulador interactivo:\n${trackedUrl}\n\n#Militares #Veteranos #PensionMax #RetiroMilitar #FloridaVeterans #PuertoRico`
        : `🎖️ The $180,000 Transition Dilemma Most Military Veterans Miss\n\nWhen transitioning from active service, members are told to convert their $500,000 SGLI to VGLI.\n\nHere is the financial reality:\n• Age 30: VGLI costs ~$50/mo.\n• Age 50: Jumps to ~$180/mo.\n• Age 65: Exceeds $750/mo ($9,000/year).\n• Cumulative cost by age 75: Over $180,000.\n• Cash equity returned: EXACTLY $0.\n\nMeanwhile, military retirees electing Survivor Benefit Plan (SBP) forfeit 6.5% of their gross retired pay forever with zero refund if their spouse predeceases them.\n\n💡 The Institutional Alternative (Pension Max + Private IUL):\n1. Lock in private IUL coverage with level lifetime premiums.\n2. Maintain Living Benefits for service-related medical conditions.\n3. Build hundreds of thousands in accessible, tax-free cash reserves under IRS Section 7702.\n4. Keep 100% of your gross military pension.\n\n👉 Run your exact rank and years of service on our interactive simulator:\n${trackedUrl}\n\n#MilitaryFinance #Veterans #RetirementPlanning #AssetProtection #PensionMax`,
      paidAd: {
        headline: isSpanish ? "Veteranos de Florida y PR: ¿SGLI vs VGLI?" : "Military Veterans: Beware the VGLI Rate Cliff",
        hooks: isSpanish
          ? [
              "Antes de aceptar el VGLI, compare el costo a 20 años.",
              "¿Sabía que el plan SBP le cuesta 6.5% de su pensión de por vida?",
              "Protección patrimonial fija para militares activos y veteranos.",
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
        subjectA: isSpanish ? "🎖️ La trampa de $180k del VGLI que nadie te explica" : "🎖️ The $180,000 VGLI rate cliff you need to know",
        subjectB: isSpanish ? "Cómo conservar el 100% de tu pensión militar (Pension Max)" : "How to keep 100% of your military pension (Pension Max)",
        previewText: isSpanish ? "Calcula tu costo de transición militar en tiempo real." : "Calculate your exact transition costs in real time.",
        body: isSpanish
          ? `Hola,\n\nSi has servido en las Fuerzas Armadas o estás cerca de tu transición al mundo civil, hay un detalle crítico sobre el seguro de vida que con frecuencia se pasa por alto.\n\nEl SGLI de $500k termina al salir del servicio. Al pasar a VGLI, la prima aumenta de manera exponencial cada 5 años. Para los 65 años, estás pagando más de $750 cada mes por la misma cobertura—acumulando más de $180,000 en primas perdidas sin acumular un solo centavo de valor en efectivo.\n\nAdicionalmente, el plan SBP del gobierno descuenta el 6.5% de tu pensión bruta de por vida.\n\nExiste una alternativa matemática:\n1. Fijar una prima nivelada privada mediante un Seguro Indexado Universal (IUL).\n2. Obtener Beneficios en Vida por enfermedades o lesiones de servicio.\n3. Acumular capital libre de impuestos bajo el Código IRS Sec 7702.\n4. Cobrar el 100% de tu pensión militar completa mediante la estrategia Pension Max.\n\nHemos preparado un simulador interactivo donde puedes ingresar tu rango y años de servicio:\n\n👉 Accede al Simulador Militar Aquí:\n${trackedUrl}\n\nCordialmente,\nAngel Burgos • Asesor Licenciado 0215 de Florida #G328926\nAB Global Consulting\n(386) 333-1482`
          : `Hello,\n\nIf you have served in the military or are preparing for your transition to civilian life, there is a critical financial detail that often gets missed.\n\nYour active duty SGLI ends 120 days after separation. When converting to VGLI, premiums escalate every 5 years, topping $750/month by age 65. That totals over $180,000 in sunk costs with $0 in equity returned.\n\nFurthermore, opting into SBP automatically deducts 6.5% of your gross military retired pay forever.\n\nThere is an institutional alternative:\n1. Lock in level lifetime premiums with an Indexed Universal Life (IUL) policy.\n2. Receive Living Benefits for service-related conditions.\n3. Accumulate tax-free cash value under IRS Section 7702.\n4. Keep 100% of your military pension with Pension Max.\n\nWe built an interactive simulator where you can test your exact numbers:\n\n👉 Run the Military Asset Shield Simulator:\n${trackedUrl}\n\nBest regards,\nAngel Burgos • Florida Licensed 0215 Practitioner #G328926\nAB Global Consulting\n(386) 333-1482`,
      },
      carouselSlides: [
        {
          slideNumber: 1,
          title: isSpanish ? "El Dilema de $180,000 del VGLI Militar" : "The $180,000 VGLI Rate Cliff",
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

  // Dynamic templates for IUL, Annuity, Funeral, DIME, LTC
  return {
    product: meta.name,
    persona: req.persona,
    trackedUrl,
    complianceDisclosure: compliance,
    videoScript: {
      title: isSpanish ? `Guión de 45s: ${meta.name}` : `45-Sec Video: ${meta.name}`,
      hook: isSpanish
        ? `[0-3s]: "Si vive en Florida o Puerto Rico y desea proteger su patrimonio familiar, debe conocer esta estrategia antes de tomar una decisión."`
        : `[0-3s]: "If you are planning your retirement in Florida, here is what top financial advisors do to protect capital from market drops."`,
      demonstration: isSpanish
        ? `[4-20s]: "La mayoría de las personas arriesgan sus ahorros en la bolsa o dependen de pólizas que expiran sin dejar nada. Con nuestra metodología, blindamos su capital con un piso garantizado del 0%."`
        : `[4-20s]: "Most people either take too much market risk or buy term policies that expire with zero equity. Our strategy guarantees a contractual 0% floor against market crashes."`,
      solution: isSpanish
        ? `[21-35s]: "Esto le permite acumular capital libre de impuestos bajo el Código IRS Sec 7702 y proteger a su familia con Beneficios en Vida ante enfermedades graves."`
        : `[21-35s]: "This enables tax-free distributions under IRS Section 7702 while shielding your family with accelerated Living Benefits."`,
      cta: isSpanish
        ? `[36-45s]: "Diseñé un simulador interactivo gratuito. Ingrese a ${trackedUrl} para calcular sus números."`
        : `[36-45s]: "I built a free interactive simulator for you. Visit ${trackedUrl} to calculate your scenario."`,
      fullText: isSpanish
        ? `[0-3s GANCHO]: "Si vive en Florida o Puerto Rico, debe conocer esta estrategia para proteger su patrimonio."\n\n[4-20s DEMO]: "Con un piso del 0%, su dinero nunca pierde ante caídas de bolsa."\n\n[21-35s SOLUCIÓN]: "Retiros libres de impuestos bajo IRS 7702 y Beneficios en Vida."\n\n[36-45s CTA]: "Calcule su caso en ${trackedUrl}."`
        : `[0-3s HOOK]: "Protect your family and retirement capital from market downturns."\n\n[4-20s DEMO]: "0% Downside floor guarantees you never lose principal in a crash."\n\n[21-35s SOLUTION]: "Tax-free policy loans under IRS 7702."\n\n[36-45s CTA]: "Run your numbers at ${trackedUrl}."`,
    },
    linkedInPost: isSpanish
      ? `📊 Estrategia Financiera Institucional: ${meta.name}\n\nEn un entorno de volatilidad e inflación, las familias y empresarios en Florida y Puerto Rico buscan certidumbre matemática.\n\nAspectos clave:\n• Piso garantizado del 0% contra caídas bursátiles.\n• Ventajas fiscales bajo el Código IRS Sección 7702.\n• Cobertura de Beneficios en Vida ante enfermedades críticas o crónicas.\n\n👉 Pruebe nuestro simulador interactivo en:\n${trackedUrl}\n\n#Finanzas #SegurosDeVida #RetiroSeguro #Florida #PuertoRico`
      : `📊 Institutional Financial Strategy: ${meta.name}\n\nIn an unpredictable market environment, families and business owners require mathematical certainty rather than speculation.\n\nCore anchors:\n• Contractual 0% downside market loss floor.\n• Tax-favored accumulation and distributions under IRS Section 7702.\n• Accelerated Living Benefits for chronic, critical, or terminal illnesses.\n\n👉 Test your numbers on our interactive simulator:\n${trackedUrl}\n\n#FinancialPlanning #WealthPreservation #IUL #Annuities`,
    paidAd: {
      headline: isSpanish ? `Protección Financiera en Florida: ${meta.name}` : `Florida Retirement & Wealth: ${meta.name}`,
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
        ? `Proteja su patrimonio con piso garantizado del 0%, retiros libres de impuestos y Beneficios en Vida. Simule su caso en nuestro portal interactivo con Angel Burgos, asesor licenciado 0215.`
        : `Protect your capital with a guaranteed 0% downside floor, tax-free distributions, and Living Benefits. Run your simulation with licensed practitioner Angel Burgos.`,
      description: isSpanish ? "Simulador interactivo con reporte descargable." : "Interactive simulator with PDF report.",
      ctaButton: isSpanish ? "Abrir Simulador" : "Calculate My Plan",
    },
    emailBroadcast: {
      subjectA: isSpanish ? `📊 Análisis Financiero: ${meta.name}` : `📊 Financial Blueprint: ${meta.name}`,
      subjectB: isSpanish ? `Cómo proteger su patrimonio con piso del 0%` : `How to shield your wealth with a 0% floor`,
      previewText: isSpanish ? "Calcule su proyección en tiempo real." : "Run your interactive scenario in real time.",
      body: isSpanish
        ? `Hola,\n\nEn momentos de volatilidad económica, asegurar su patrimonio familiar con herramientas respaldadas por contrato es la máxima prioridad.\n\nNuestra metodología se fundamenta en:\n1. Piso del 0% contra caídas del mercado.\n2. Retiros libres de impuestos bajo el Código IRS Sec 7702.\n3. Beneficios en Vida ante emergencias de salud.\n\nPuede simular su caso en nuestra herramienta interactiva:\n\n👉 Abrir Simulador:\n${trackedUrl}\n\nAtentamente,\nAngel Burgos • Asesor Licenciado 0215 #G328926\nAB Global Consulting`
        : `Hello,\n\nIn times of economic volatility, securing your family's future with contractually guaranteed strategies is paramount.\n\nOur framework delivers:\n1. 0% Downside floor against market loss.\n2. Tax-free distributions under IRS Section 7702.\n3. Living Benefits for critical and chronic health events.\n\nRun your numbers on our interactive simulator:\n\n👉 Launch Simulator:\n${trackedUrl}\n\nBest regards,\nAngel Burgos • Licensed 0215 Practitioner #G328926\nAB Global Consulting`,
    },
    carouselSlides: [
      {
        slideNumber: 1,
        title: isSpanish ? `Protección Financiera: ${meta.name}` : `Financial Defense: ${meta.name}`,
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
