export type ServiceInfo = {
  slug: string;
  title: string;
  titleEs?: string;
  category: "Insurance" | "Retirement" | "Health" | "Concierge";
  categoryEs?: string;
  shortDescription: string;
  shortDescriptionEs?: string;
  tagline: string;
  taglineEs?: string;
  heroImage?: string;
  featuredCarriers: { name: string; highlight: string; highlightEs?: string; link?: string }[];
  keyBenefits: string[];
  keyBenefitsEs?: string[];
  detailedSections: {
    heading: string;
    headingEs?: string;
    content: string;
    contentEs?: string;
    subPoints?: string[];
    subPointsEs?: string[];
  }[];
  externalTools?: {
    name: string;
    description: string;
    url: string;
    isExternal: boolean;
  }[];
  faqs: { question: string; questionEs?: string; answer: string; answerEs?: string }[];
};

export const services: ServiceInfo[] = [
  {
    slug: "life-insurance",
    title: "Life Insurance & Indexed Universal Life (IUL)",
    titleEs: "Seguros de Vida e Indexado Universal (IUL)",
    category: "Insurance",
    categoryEs: "Seguros",
    tagline: "Tax-Advantaged Wealth Preservation & Income Protection",
    taglineEs: "Preservación de Patrimonio con Ventajas Fiscales y Protección Familiar",
    shortDescription: "Protecting families and business continuity with Term, Permanent Whole Life, and Indexed Universal Life (IUL) featuring downside market protection and living benefits.",
    shortDescriptionEs: "Protección patrimonial y familiar mediante Seguros a Término, Vida Entera e Indexado Universal (IUL) con piso garantizado del 0% contra caídas de bolsa y beneficios en vida.",
    featuredCarriers: [
      { name: "Nationwide", highlight: "Nationwide Heritage® & Effortless Life", highlightEs: "Nationwide Heritage® y Effortless Life", link: "https://www.nationwide.com/personal/insurance/life/" },
      { name: "Transamerica", highlight: "Trendsetter® & Financial Foundation IUL", highlightEs: "Trendsetter® y Financial Foundation IUL", link: "https://www.transamerica.com/individual/products/life-insurance" },
      { name: "Pacific Life", highlight: "Pacific Indexed Accumulator & Horizon", highlightEs: "Pacific Indexed Accumulator y Horizon", link: "https://www.pacificlife.com/home/individuals-families/life-insurance.html" },
      { name: "Corebridge Financial", highlight: "QoL Flex Term with Accelerated Living Benefits", highlightEs: "QoL Flex Term con Beneficios en Vida Acelerados" }
    ],
    keyBenefits: [
      "Tax-Free Death Benefit transfer directly to named beneficiaries without probate delays.",
      "Living Benefits riders covering Chronic, Critical, and Terminal illnesses without extra cost.",
      "Indexed Universal Life (IUL) cash value growth linked to market indices with a guaranteed 0% floor against market loss.",
      "Tax-free policy loans and withdrawals for supplemental retirement income or college funding.",
      "Business solutions including Key Person Insurance and Buy-Sell Agreement funding."
    ],
    keyBenefitsEs: [
      "Beneficio por fallecimiento transferido 100% libre de impuestos federales directamente a sus beneficiarios sin retrasos de sucesión.",
      "Cláusulas de Beneficios en Vida para enfermedades crónicas, críticas o terminales sin costo adicional.",
      "Crecimiento de valor en efectivo IUL vinculado a índices de mercado con un piso garantizado del 0% contra caídas bursátiles.",
      "Préstamos de póliza y retiros libres de impuestos bajo el Código IRS Sec 7702 para complementar su jubilación.",
      "Estrategias corporativas como Seguro de Persona Clave y financiamiento de Acuerdos de Compra-Venta (Buy-Sell)."
    ],
    detailedSections: [
      {
        heading: "Indexed Universal Life (IUL) vs. Traditional Term",
        headingEs: "Seguro Indexado Universal (IUL) vs. Seguro a Término Tradicional",
        content: "While term insurance provides affordable temporary protection, Indexed Universal Life (IUL) combines permanent life insurance with flexible cash value accumulation. Your money participates in market index upside (like the S&P 500) up to an annual cap, but is shielded with a guaranteed 0% annual minimum floor when markets decline.",
        contentEs: "Mientras que el seguro a término ofrece protección temporal económica, el Seguro Indexado Universal (IUL) combina seguro permanente con acumulación de capital en efectivo. Su dinero participa de las ganancias de índices como el S&P 500 hasta un tope, pero está 100% protegido con un piso garantizado del 0% cuando el mercado cae.",
        subPoints: [
          "Zero Downside Market Risk: Your principal and previously locked-in gains are never lost due to market corrections.",
          "Tax-Favored Accumulation: Cash value grows tax-deferred under IRS Section 7702.",
          "Arbitrage Policy Loans: Access capital during retirement tax-free while the underlying index interest continues to compound."
        ],
        subPointsEs: [
          "Cero Riesgo de Pérdida en Bolsa: Su principal y ganancias acumuladas quedan blindadas con el piso anual del 0%.",
          "Acumulación con Ventajas Fiscales: El valor en efectivo crece diferido de impuestos bajo la Sección 7702 del IRS.",
          "Préstamos de Arbitraje: Acceda a capital de retiro sin pagar impuestos mientras su dinero sigue acumulando intereses en el índice."
        ]
      },
      {
        heading: "Living Benefits: Financial Protection While You're Alive",
        headingEs: "Beneficios en Vida: Protección Financiera Mientras Usted Vive",
        content: "Modern life insurance policies do far more than pay out upon death. With Accelerated Death Benefit Riders (Living Benefits), you can access a significant portion of your death benefit tax-free if you experience a heart attack, stroke, cancer diagnosis, or chronic loss of daily living activities.",
        contentEs: "Las pólizas modernas van mucho más allá de un beneficio por fallecimiento. Con las cláusulas de Beneficios en Vida Acelerados, usted puede acceder a una parte sustancial de su beneficio libre de impuestos si sufre un infarto, derrame cerebral, diagnóstico de cáncer o incapacidad crónica."
      }
    ],
    faqs: [
      {
        question: "How does the 0% floor in an IUL protect against market losses?",
        questionEs: "¿Cómo protege el piso del 0% en un IUL contra las caídas de la bolsa?",
        answer: "When you fund an IUL, your money is not directly invested in the stock market equities. Instead, the insurer credits interest based on the upward movement of an index (such as the S&P 500). If the index drops by 20% in a year, the insurer applies the contractual 0% floor, meaning your cash value does not lose a single penny due to market depreciation.",
        answerEs: "En un IUL, sus fondos no están invertidos directamente en acciones de la bolsa. La aseguradora le acredita intereses basados en el movimiento positivo del índice (como el S&P 500). Si el mercado cae un 20%, la aseguradora aplica el piso contractual del 0%, por lo que su valor acumulado no pierde un solo centavo por caídas de bolsa."
      },
      {
        question: "How can I access retirement income tax-free from an IUL?",
        questionEs: "¿Cómo se obtienen ingresos de retiro libres de impuestos con un IUL?",
        answer: "Under Internal Revenue Code Section 7702, you can take policy loans against your accumulated cash value. Because IRS tax code classifies loans as debt rather than earned income, the distributed funds are 100% federal income tax-free and do not trigger capital gains taxes.",
        answerEs: "Bajo el Código del IRS Sección 7702, usted puede solicitar préstamos de póliza contra su valor en efectivo. Debido a que el código tributario clasifica los préstamos como deuda y no como ingreso devengado, los fondos recibidos son 100% libres de impuestos sobre la renta federal."
      }
    ]
  },
  {
    slug: "military-asset-shield",
    title: "Military & Veteran Wealth Shield",
    titleEs: "Escudo Patrimonial para Militares y Veteranos",
    category: "Insurance",
    categoryEs: "Seguros",
    tagline: "SGLI/VGLI Transition, SBP Pension Max & TSP Rollover Protection",
    taglineEs: "Transición SGLI/VGLI, Maximización de Pensión SBP y Protección de Fondos TSP",
    shortDescription: "Specialized financial defense for active duty, Guard, Reserve, and Veterans. Bypass the escalating VGLI rate cliff, maximize 100% of your military pension, and shield TSP rollovers from market crashes.",
    shortDescriptionEs: "Protección financiera especializada para militares activos, Guardia Nacional, Reservistas y Veteranos. Evite la trampa de costos de VGLI, cobre el 100% de su pensión militar (Pension Max) y proteja sus fondos del TSP.",
    featuredCarriers: [
      { name: "Nationwide Financial", highlight: "Heritage IUL & Living Benefits", highlightEs: "Heritage IUL y Beneficios en Vida" },
      { name: "Pacific Life", highlight: "Pacific Indexed Accumulator", highlightEs: "Pacific Indexed Accumulator" },
      { name: "Transamerica", highlight: "Financial Foundation IUL", highlightEs: "Financial Foundation IUL" }
    ],
    keyBenefits: [
      "Bypass the VGLI Rate Cliff: SGLI ends after service; VGLI escalates every 5 years to over $750/mo. Lock in a permanent, level-premium private shield.",
      "SBP Pension Max Strategy: Keep 100% of your gross military retirement pay without sacrificing 6.5% to SBP, leaving a larger tax-free lump sum to your family.",
      "TSP Rollover Defense: Roll over traditional TSP funds into guaranteed 0% floor annuities to prevent market losses during civilian retirement.",
      "Accelerated Living Benefits: Access your death benefit tax-free if diagnosed with a service-connected illness, stroke, or disability."
    ],
    keyBenefitsEs: [
      "Evite el Aumento Exponencial de VGLI: Al separarse del servicio, VGLI sube de precio drásticamente cada 5 años. Fije una prima nivelada y permanente de por vida.",
      "Estrategia Pension Max: Cobre el 100% de su pensión militar sin perder el 6.5% mensual de SBP, dejando un patrimonio libre de impuestos superior para su familia.",
      "Protección de Fondos TSP: Transfiera sus fondos del TSP a anualidades con piso del 0% para eliminar pérdidas de bolsa en su retiro civil.",
      "Beneficios en Vida Acelerados: Acceda a su beneficio libre de impuestos en caso de enfermedad grave o incapacidad."
    ],
    detailedSections: [
      {
        heading: "The SGLI-to-VGLI Transition Trap Explained",
        headingEs: "La Trampa de Costos de la Transición SGLI a VGLI",
        content: "While active duty service members enjoy low-cost SGLI ($31/mo for $500k), this coverage expires 120 days after separation. Veterans who convert to VGLI face exponential 5-year rate hikes—costing over $750/month by age 65 and accumulating over $180,000 in lost premiums with zero cash value. A private Indexed Universal Life shield locks in a fixed rate for life while building tax-free cash equity under IRS Sec 7702.",
        contentEs: "Mientras está en servicio activo, el SGLI cuesta solo $31/mes por $500k. Sin embargo, termina 120 días después del licenciamiento. Al pasar a VGLI, el costo sube cada 5 años superando los $750/mes a los 65 años. Un IUL privado fija su prima de por vida y acumula valor en efectivo libre de impuestos bajo el Código IRS 7702."
      }
    ],
    faqs: [
      {
        question: "Can I replace military SBP with an IUL policy?",
        questionEs: "¿Puedo reemplazar el plan SBP militar con una póliza IUL (Pension Max)?",
        answer: "Yes. By opting out of the 6.5% monthly SBP pension reduction and using those dollars to fund a permanent IUL, you keep 100% of your pension while guaranteeing a tax-free legacy to your family that never expires.",
        answerEs: "Sí. Al no ceder el 6.5% de su pensión a SBP y usar ese dinero para financiar un IUL, usted cobra su pensión completa y garantiza un beneficio libre de impuestos para sus herederos."
      }
    ]
  },
  {
    slug: "variable-annuities",
    title: "Variable & Fixed Indexed Annuities",
    titleEs: "Anualidades Indexadas y Variables",
    category: "Retirement",
    categoryEs: "Retiro",
    tagline: "Guaranteed Lifetime Retirement Paychecks & 401(k) / IRA Rollovers",
    taglineEs: "Cheque Mensual Vitalicio Garantizado y Transferencias de Cuentas 401(k) / IRA",
    shortDescription: "Eliminate sequence of returns risk and convert retirement savings into contractually guaranteed lifetime income that you cannot outlive.",
    shortDescriptionEs: "Elimine el riesgo de caídas de mercado y convierta sus ahorros de jubilación en un cheque mensual vitalicio garantizado por contrato.",
    featuredCarriers: [
      { name: "Nationwide", highlight: "Nationwide Peak® & High Point® Annuities", highlightEs: "Anualidades Nationwide Peak® y High Point®" },
      { name: "Transamerica", highlight: "Transamerica Secure Income Variable Annuity", highlightEs: "Anualidad Variable Transamerica Secure Income" },
      { name: "Pacific Life", highlight: "Pacific Index Choice & Income Engine", highlightEs: "Pacific Index Choice y Motor de Ingresos" },
      { name: "Corebridge Financial", highlight: "Power Series Fixed Indexed Annuities", highlightEs: "Anualidades Indexadas Fijas Power Series" }
    ],
    keyBenefits: [
      "Contractual Lifetime Income: Receive a monthly paycheck guaranteed for the rest of your life, regardless of how long you live.",
      "Principal Protection: Fixed Indexed Annuities offer 0% floor protection so your retirement nest egg never loses value in a crash.",
      "Direct 401(k) / Traditional IRA Rollovers: 100% tax-free transfer without penalties or withholding.",
      "Inflation & Step-Up Riders: Increase your guaranteed payout when market indices outperform baseline assumptions.",
      "Joint Lifetime Coverage: Ensure your spouse continues receiving 100% of the guaranteed income stream if you pass first."
    ],
    keyBenefitsEs: [
      "Ingreso Vitalicio por Contrato: Reciba un cheque mensual garantizado para toda la vida, sin importar cuántos años viva.",
      "Protección de Capital: Las Anualidades Indexadas Fijas ofrecen un piso del 0% para que su patrimonio de retiro nunca pierda valor en una crisis.",
      "Transferencias Directas 401(k) / IRA: Transferencia 100% libre de impuestos sin multas ni retenciones fiscales.",
      "Cláusulas de Ajuste por Inflación: Aumente su pago garantizado cuando los índices superen los rendimientos estimados.",
      "Cobertura Conyugal Vitalicia: Garantice que su cónyuge continúe recibiendo el 100% del ingreso si usted llega a faltar primero."
    ],
    detailedSections: [
      {
        heading: "Eliminating the 'Sequence of Returns' Risk in Retirement",
        headingEs: "Eliminando el Peligro del 'Riesgo de Secuencia de Rendimientos'",
        content: "If the stock market suffers a sharp decline in the first 3-5 years after you retire, withdrawing living expenses from a traditional equity portfolio permanently impairs your account's compounding recovery. Fixed Indexed and Variable Annuities with Guaranteed Lifetime Withdrawal Benefits (GLWB) insulate your monthly cash flow from market volatility.",
        contentEs: "Si el mercado de valores sufre una fuerte caída en los primeros años de su jubilación, retirar fondos de una cuenta de acciones tradicional reduce permanentemente su capital de recuperación. Las anualidades indexadas con beneficios de retiro vitalicio garantizado blindan su flujo de caja mensual contra la volatilidad."
      }
    ],
    faqs: [
      {
        question: "Can I transfer my old 401(k) or IRA into an annuity without paying taxes?",
        questionEs: "¿Puedo transferir mi antiguo 401(k) o cuenta IRA a una anualidad sin pagar impuestos?",
        answer: "Yes. By executing a direct trustee-to-trustee rollover, your retirement savings move directly into the annuity without any immediate taxes, penalties, or IRS withholding.",
        answerEs: "Sí. Mediante una transferencia directa entre custodios (Direct Rollover), sus ahorros de jubilación se trasladan a la anualidad sin impuestos inmediatos, penalidades ni retenciones del IRS."
      }
    ]
  },
  {
    slug: "final-expense",
    title: "Final Expense & Everest Funeral Concierge",
    titleEs: "Gastos Finales y Concierge Funerario Everest",
    category: "Concierge",
    categoryEs: "Concierge",
    tagline: "Dignified Pre-Planning, 24/7 Pricing Negotiation & 48-Hour Claim Funding",
    taglineEs: "Pre-Planificación Digna, Negociación de Precios 24/7 y Pago Rápido en 48 Horas",
    shortDescription: "Guaranteed whole life coverage paired with 24/7 personalized funeral concierge negotiation that saves families $3,500+ and pays out claims in 24-48 hours.",
    shortDescriptionEs: "Cobertura de vida entera con negociación profesional de precios funerarios 24/7 que ahorra más de $3,500 a las familias y desembolsa fondos en 24 a 48 horas.",
    featuredCarriers: [
      { name: "Everest Funeral Concierge", highlight: "24/7 Price-Negotiation & Will Prep Suite", highlightEs: "Negociación de Precios 24/7 y Preparación de Voluntades" },
      { name: "World Financial Group / WSG", highlight: "Exclusive Concierge Partnership", highlightEs: "Alianza Exclusiva con Red Concierge" },
      { name: "Mutual of Omaha", highlight: "Living Promise Whole Life", highlightEs: "Póliza de Vida Entera Living Promise" },
      { name: "Transamerica", highlight: "Immediate Solution Final Expense", highlightEs: "Póliza Immediate Solution de Gastos Finales" }
    ],
    keyBenefits: [
      "Everest 24/7 Independent Price Negotiation: Licensed funeral directors negotiate directly with funeral homes to eliminate predatory markup.",
      "Average Savings of $3,500+: Proprietary nationwide database compares mortuary pricing across Orlando, Central Florida, and Puerto Rico.",
      "Expedited 24-48 Hour Payout: Cash benefits are wired directly to cover immediate services without waiting for probate.",
      "Legal Will & Healthcare Directives Included: Comprehensive online digital planning suite included at zero extra cost.",
      "No Medical Exam Required: Simple health questions with immediate approval up to age 85."
    ],
    keyBenefitsEs: [
      "Negociación de Precios Independiente 24/7 de Everest: Directores funerarios licenciados negocian directamente con las funerarias para eliminar cobros excesivos.",
      "Ahorro Promedio de más de $3,500: Base de datos nacional que compara precios de funerarias en Florida y Puerto Rico.",
      "Pago Rápido en 24 a 48 Horas: Los fondos se transfieren de inmediato para cubrir los servicios sin esperar procesos judiciales.",
      "Testamento y Directrices de Salud Incluidas: Plataforma de planificación legal digital completa sin costo adicional.",
      "Sin Examen Médico Requerido: Preguntas sencillas de salud con aprobación rápida hasta los 85 años."
    ],
    detailedSections: [
      {
        heading: "Why Everest Funeral Concierge is Unlike Any Other Policy",
        headingEs: "Por Qué el Concierge Funerario Everest es Único en la Industria",
        content: "When a loved one passes away, grieving families are forced to make dozens of emotional financial decisions in less than 48 hours. Most insurance policies simply write a check weeks later. Everest provides a licensed, 24/7 independent advisor who handles the phone calls, compares prices at multiple local funeral homes, and negotiates the contract on your behalf.",
        contentEs: "Cuando un ser querido fallece, las familias en duelo deben tomar docenas de decisiones financieras en menos de 48 horas. La mayoría de los seguros simplemente envían un cheque semanas después. Everest le asigna un asesor licenciado 24/7 que realiza las llamadas, compara precios entre funerarias locales y negocia el contrato en su nombre para proteger su economía."
      }
    ],
    faqs: [
      {
        question: "How quickly does the Everest policy pay out when needed?",
        questionEs: "¿Qué tan rápido paga la póliza de Everest cuando ocurre el fallecimiento?",
        answer: "Everest processes expedited claims that fund in as little as 24 to 48 hours directly to the funeral service provider or beneficiary, ensuring immediate arrangements can proceed smoothly.",
        answerEs: "Everest tramita reclamaciones de emergencia que se desembolsan en un plazo de 24 a 48 horas directamente a la funeraria o al beneficiario para que los arreglos se realicen sin demoras."
      }
    ]
  },
  {
    slug: "health-insurance",
    title: "Health Insurance & Medicare Solutions",
    titleEs: "Seguros de Salud y Soluciones de Medicare",
    category: "Health",
    categoryEs: "Salud",
    tagline: "ACA Subsidies, Private Major Medical & Medigap Guidance",
    taglineEs: "Subsidios de Ley ACA, Cobertura Médica Privada y Suplementos de Medicare",
    shortDescription: "Expert navigation of Affordable Care Act subsidies, private health insurance, and Medicare Supplement (Medigap Plans G/N) solutions for individuals and seniors.",
    shortDescriptionEs: "Asesoría experta en subsidios del Mercado de Salud (ACA/Obamacare), seguros privados y planes de Suplemento de Medicare (Medigap Planes G/N).",
    featuredCarriers: [
      { name: "Florida Blue / Blue Cross", highlight: "Comprehensive Florida Health Plans", highlightEs: "Planes Integrales Florida Blue" },
      { name: "UnitedHealthcare", highlight: "Medicare Advantage & Supplemental Plans", highlightEs: "Medicare Advantage y Planes Suplementarios" },
      { name: "Humana", highlight: "Senior Care & Prescription Drug (Part D)", highlightEs: "Cuidado del Adulto Mayor y Medicamentos (Parte D)" },
      { name: "Aetna", highlight: "Medicare Supplement Plan G & N", highlightEs: "Planes Suplementarios de Medicare G y N" }
    ],
    keyBenefits: [
      "ACA Marketplace Optimization: Maximize federal premium tax credits (subsidies) to lower monthly premiums to as low as $0/mo.",
      "Medicare Supplement (Medigap) Expertise: Compare Plan G vs. Plan N to eliminate out-of-pocket hospital and doctor copays.",
      "Prescription Drug (Part D) Analysis: Verify your medications against carrier formularies to minimize out-of-pocket pharmacy costs.",
      "Dental, Vision & Hearing Options: Comprehensive supplemental packages to protect overall well-being."
    ],
    keyBenefitsEs: [
      "Optimización en el Mercado ACA: Maximice los créditos fiscales federales para reducir su prima mensual a costos desde $0/mes.",
      "Especialistas en Suplementos de Medicare (Medigap): Compare el Plan G vs. Plan N para eliminar copagos de médicos y hospitales.",
      "Análisis de Medicamentos (Parte D): Verificamos sus recetas en los formularios de las aseguradoras para minimizar gastos en farmacia.",
      "Opciones de Dental, Visión y Audición: Paquetes suplementarios para proteger su salud integral."
    ],
    detailedSections: [
      {
        heading: "Navigating Medicare at Age 65: Supplement vs Advantage",
        headingEs: "Orientación de Medicare a los 65 Años: Suplemento (Medigap) vs Advantage",
        content: "Understanding the difference between Original Medicare + Medigap (which allows you to see any doctor in the country without referrals) and Medicare Advantage (network-based HMO/PPO plans) is crucial for your long-term health and financial predictability.",
        contentEs: "Comprender la diferencia entre Medicare Original + Medigap (que le permite atenderse con cualquier médico del país sin referidos) y Medicare Advantage (planes de red HMO/PPO) es fundamental para su salud y estabilidad financiera."
      }
    ],
    faqs: [
      {
        question: "When should I start enrolling in Medicare?",
        questionEs: "¿Cuándo debo comenzar mi inscripción en Medicare?",
        answer: "Your Initial Enrollment Period (IEP) opens 3 months before your 65th birthday month and lasts for 7 months total. Enrolling during this window avoids lifelong late-enrollment penalties.",
        answerEs: "Su Período Inicial de Inscripción (IEP) abre 3 meses antes del mes en que cumple 65 años y dura 7 meses en total. Inscribirse en esta ventana evita penalidades de por vida por inscripción tardía."
      }
    ]
  },
  {
    slug: "long-term-care",
    title: "Long-Term Care Planning (Cash-Indemnity)",
    titleEs: "Planificación de Cuidado Prolongado (LTC)",
    category: "Insurance",
    categoryEs: "Seguros",
    tagline: "Asset-Based Protection & Cash-Indemnity Monthly Benefits",
    taglineEs: "Protección Respaldada por Activos y Beneficios Mensuales en Efectivo",
    shortDescription: "Asset-based long-term care solutions like Nationwide CareMatters Together providing tax-free monthly cash benefits without the hassle of receipts.",
    shortDescriptionEs: "Soluciones de cuidado a largo plazo respaldadas por activos (como Nationwide CareMatters) que pagan beneficios mensuales en efectivo sin trámites de recibos.",
    featuredCarriers: [
      { name: "Nationwide Financial", highlight: "CareMatters Together® (Shared Family Pool)", highlightEs: "CareMatters Together® (Fondo Familiar Compartido)" },
      { name: "Mutual of Omaha", highlight: "MutualCare Custom Solutions", highlightEs: "Soluciones Personalizadas MutualCare" },
      { name: "Pacific Life", highlight: "PremierCare Advantage LTC", highlightEs: "PremierCare Advantage LTC" }
    ],
    keyBenefits: [
      "100% Cash-Indemnity Payout: Receive full monthly cash benefits directly to spend on family caregivers or home health without submitting monthly receipts.",
      "Asset-Based Guarantee: If you never require long-term care, your full death benefit passes 100% tax-free to your beneficiaries.",
      "Shared Coverage for Couples: Nationwide CareMatters Together allows spouses to draw from a single joint benefit pool.",
      "Inflation Protection Riders: 3% or 5% compound growth options to ensure benefits keep pace with healthcare cost inflation."
    ],
    keyBenefitsEs: [
      "Desembolso 100% en Efectivo: Reciba beneficios mensuales directamente para pagar a cuidadores familiares o atención domiciliaria sin enviar facturas.",
      "Garantía Respaldada por Activos: Si nunca necesita cuidado prolongado, el beneficio por fallecimiento pasa íntegro y libre de impuestos a sus herederos.",
      "Cobertura Conjunta para Parejas: Nationwide CareMatters Together permite a los cónyuges utilizar un fondo de beneficios compartido.",
      "Protección contra la Inflación: Opciones de crecimiento del 3% o 5% compuesto para que los beneficios aumenten al ritmo del costo médico."
    ],
    detailedSections: [
      {
        heading: "Cash-Indemnity vs. Traditional Reimbursement Models",
        headingEs: "Modelo de Efectivo Directo vs. Reembolso Tradicional",
        content: "Traditional LTC policies require you to hire pre-approved agency caregivers and submit monthly itemized receipts. In contrast, Nationwide's cash-indemnity model pays your full monthly benefit in liquid cash directly into your bank account, allowing you to pay family members or informal caregivers to assist you in the comfort of your home.",
        contentEs: "Las pólizas tradicionales de LTC exigen contratar agencias preaprobadas y presentar recibos detallados cada mes. En contraste, el modelo de efectivo directo de Nationwide deposita su beneficio completo en su cuenta bancaria, permitiéndole pagar a familiares o cuidadores de su confianza en la comodidad de su hogar."
      }
    ],
    faqs: [
      {
        question: "What happens to the money if I never need long-term care?",
        questionEs: "¿Qué pasa con el dinero si nunca llego a necesitar cuidado prolongado?",
        answer: "With asset-based LTC (like Nationwide CareMatters), your premium is never lost. If you remain healthy and never trigger care benefits, the full tax-free death benefit is paid to your heirs.",
        answerEs: "Con los planes respaldados por activos (como Nationwide CareMatters), su dinero nunca se pierde. Si usted se mantiene saludable, el beneficio por fallecimiento completo se transfiere libre de impuestos a sus beneficiarios."
      }
    ]
  }
];

export function getServiceBySlug(slug: string): ServiceInfo | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServices(): ServiceInfo[] {
  return services;
}

