/**
 * MyIAD Brand Tokens, Core Specifications and Bilingual Dictionaries
 * Issue: ABGA-1 / ABGA-7
 * Domain: myiad.com
 */

export const MYIAD_TOKENS = {
  colors: {
    primaryNavy: "#0B1F3A", // Primary trust navy
    techBlue: "#2563EB",    // Technology blue
    growthTeal: "#14B8A6",  // Growth accent teal
    cleanBg: "#F8FAFC",     // Clean background
    contrastCharcoal: "#111827", // Text/contrast charcoal
    cardBorder: "#E2E8F0",
    mutedText: "#4B5563",
  },
  typography: {
    headline: "MyIAD - Intelligent Insurance Advisory & Protection",
    tagline: "Institutional Precision. Fiduciary Clarity. Modern Protection Architecture.",
  },
  licensing: {
    provider: "MyIAD National Insurance Solutions",
    service: "Dependable Nationwide Insurance Services",
    tollFree: "1-888-887-3585",
    phoneNumeric: "18888873585",
    territories: ["Licensed Across All 50 US States", "Nationwide Advisory Network"],
  },
} as const;

export interface CoreOffering {
  id: "life" | "health" | "annuity";
  title: string;
  badge: string;
  subtitle: string;
  description: string;
  benefits: string[];
  ctaText: string;
  routeAnchor: string;
}

export const CORE_OFFERINGS: CoreOffering[] = [
  {
    id: "life",
    title: "Life Insurance & Wealth Accumulation",
    badge: "Asset Preservation",
    subtitle: "Term, Indexed Universal Life (IUL), Living Benefits & Estate Liquidity",
    description: "Architect permanent death benefit protection engineered with downside market immunity (0% floor) and tax-exempt accumulation under IRC Section 7702.",
    benefits: [
      "Institutional 0% floor downside protection with uncapped/participating S&P 500 index allocations",
      "Living Benefits riders for critical, chronic, and terminal illness protection with accelerated payout",
      "Executive bonus, key person insurance, and premium-financed estate liquidity planning",
      "Tax-free policy loans and distributions for private retirement income stream engineering",
    ],
    ctaText: "Explore Life Architecture",
    routeAnchor: "#lead-intake",
  },
  {
    id: "health",
    title: "Health Insurance & Medical Coverage",
    badge: "Comprehensive Care",
    subtitle: "Individual, Family, Group Health & Medicare Advisory",
    description: "Navigate private carrier networks, ACA subsidies, group health programs, and Medicare supplements with certified bilingual insurance specialists.",
    benefits: [
      "Individual & Family marketplace optimization with maximum advance premium tax credit (APTC) capture",
      "Group health architectures for SMBs, commercial teams, and independent contractor pools",
      "Medicare Advantage & Supplement (Medigap) plans matching preferred hospital and provider networks",
      "Supplemental health, hospital indemnity, and high-deductible cushion policies",
    ],
    ctaText: "Compare Health Options",
    routeAnchor: "#lead-intake",
  },
  {
    id: "annuity",
    title: "Variable Annuity & Guaranteed Retirement Income",
    badge: "FINRA Rule 2330 Supervised",
    subtitle: "Deferred Variable Annuities, Downside Buffers & Lifetime Withdrawal Benefits",
    description: "Deploy institutionally managed subaccounts with guaranteed lifetime withdrawal benefit (GLWB) riders designed to combat longevity and inflation risk.",
    benefits: [
      "Guaranteed lifetime income streams that you cannot outlive, regardless of market volatility",
      "Subaccount asset allocation across top-quartile institutional asset managers",
      "Tax-deferred compounding growth maximizing capital accumulation prior to annuitization",
      "Full supervisory suitability reviews conducted strictly in accordance with FINRA Rule 2330 protocols",
    ],
    ctaText: "Evaluate Annuity Suitability",
    routeAnchor: "#lead-intake",
  },
];

export const CORE_OFFERINGS_ES: CoreOffering[] = [
  {
    id: "life",
    title: "Seguro de Vida y Acumulación Patrimonial",
    badge: "Preservación Patrimonial",
    subtitle: "Término, Vida Universal Indexada (IUL), Beneficios en Vida y Liquidez",
    description: "Diseñe protección permanente con inmunidad ante caídas de mercado (piso del 0%) y acumulación libre de impuestos bajo la Sección IRC 7702.",
    benefits: [
      "Protección con piso institucional del 0% con opciones de rendimiento indexado al S&P 500",
      "Cláusulas de Beneficios en Vida por enfermedades críticas, crónicas y terminales con anticipo de capital",
      "Bonos ejecutivos, seguro de persona clave y planificación de liquidez patrimonial estructurada",
      "Préstamos y distribuciones de póliza 100% libres de impuestos para ingresos de retiro",
    ],
    ctaText: "Explorar Arquitectura de Vida",
    routeAnchor: "#lead-intake",
  },
  {
    id: "health",
    title: "Seguros de Salud y Cobertura Médica",
    badge: "Atención Integral",
    subtitle: "Asesoría Individual, Familiar, Grupal y Soluciones de Medicare",
    description: "Navegue redes de aseguradoras privadas, subsidios de la Ley ACA (Obamacare), programas empresariales y Medicare con especialistas bilingües con licencia.",
    benefits: [
      "Optimización en el mercado individual y familiar con máxima captura de créditos fiscales (APTC)",
      "Estructuras de salud grupal para PyMEs, equipos comerciales y contratistas independientes",
      "Planes de Medicare Advantage y Suplementos (Medigap) alineados con sus hospitales y médicos preferidos",
      "Pólizas complementarias de indemnización hospitalaria y colchón para deducibles altos",
    ],
    ctaText: "Comparar Opciones de Salud",
    routeAnchor: "#lead-intake",
  },
  {
    id: "annuity",
    title: "Anualidades Variables e Ingreso de Retiro Garantizado",
    badge: "Supervisado bajo Regla FINRA 2330",
    subtitle: "Anualidades Variables Diferidas, Amortiguadores de Caída y Beneficios Vitalicios",
    description: "Implemente subcuentas administradas institucionalmente con beneficios garantizados de retiro de por vida (GLWB) diseñados para blindar su longevidad contra la inflación.",
    benefits: [
      "Flujos de ingresos garantizados de por vida que no puede sobrevivir, sin importar la volatilidad bursátil",
      "Asignación de activos en subcuentas con administradores institucionales de primer nivel",
      "Crecimiento compuesto con impuestos diferidos maximizando el capital antes de la anualización",
      "Evaluaciones de idoneidad y supervisión conducidas estrictamente bajo los protocolos de la Regla FINRA 2330",
    ],
    ctaText: "Evaluar Idoneidad de Anualidad",
    routeAnchor: "#lead-intake",
  },
];

export function getCoreOfferings(lang: "en" | "es" = "en"): CoreOffering[] {
  return lang === "es" ? CORE_OFFERINGS_ES : CORE_OFFERINGS;
}

export interface AudienceSegmentModule {
  id: string;
  audience: string;
  badge: string;
  headline: string;
  description: string;
  bulletPoints: string[];
  actionLabel: string;
}

export const AUDIENCE_MODULES: AudienceSegmentModule[] = [
  {
    id: "producers",
    audience: "High-Performing Independent Producers",
    badge: "Producer Execution",
    headline: "Show prospects their 0% floor tax-free retirement with institutional math in 30 seconds.",
    description: "Eliminate spreadsheet friction. Leverage algorithmic illustration stress-testing, side-by-side IRC 7702 tax comparisons, and direct underwriting access across premier carriers.",
    bulletPoints: [
      "Algorithmic Monte Carlo stress-testing against market volatility",
      "Direct top-tier carrier contracts and accelerated underwriting lines",
      "Client-ready clinical comparative visual reports generated in real time",
    ],
    actionLabel: "Access Producer Toolkit",
  },
  {
    id: "principals",
    audience: "Agency Principals & IMO Leaders",
    badge: "Enterprise Infrastructure",
    headline: "Equip your entire brokerage with bilingual AI quoting, compliant disclosures, and instant CRM routing.",
    description: "Standardize supervisory compliance across multi-state agent pools. Deliver turnkey bilingual lead capture, automated FINRA 2330 documentation, and zero-leakage routing straight to your CRM pipeline.",
    bulletPoints: [
      "Direct lead ingestion hook into crm.myiad.com pipeline",
      "Automated territory matching (Central FL, South FL, Puerto Rico, National)",
      "Strict supervision audit trails satisfying FINRA Rule 2330 recordkeeping requirements",
    ],
    actionLabel: "Deploy Brokerage Gateway",
  },
  {
    id: "veterans",
    audience: "Veteran & Military-Focused Advisors",
    badge: "Military Asset Shield",
    headline: "The Veteran Asset Shield: How to lock in permanent pension protection before the rate cliff.",
    description: "Help military families and transitioning service members replace expiring SGLI/VGLI coverage, hedge against Survivor Benefit Plan (SBP) reduction cliffs, and preserve civilian wealth.",
    bulletPoints: [
      "Permanent cash-value alternatives before VGLI age-banded premium escalations strike",
      "SBP vs. Private Pension Maximization comparative mathematical audits",
      "Guaranteed insurability riders safeguarding military members post-separation",
    ],
    actionLabel: "Run Veteran Pension Audit",
  },
];

export const AUDIENCE_MODULES_ES: AudienceSegmentModule[] = [
  {
    id: "producers",
    audience: "Productores Independientes de Alto Rendimiento",
    badge: "Ejecución para Productores",
    headline: "Demuestre a sus clientes su retiro libre de impuestos con piso del 0% en 30 segundos con matemática institucional.",
    description: "Elimine la fricción de hojas de cálculo. Aproveche pruebas de estrés algorítmicas, comparaciones tributarias bajo IRC 7702 y acceso directo de suscripción con aseguradoras líderes.",
    bulletPoints: [
      "Pruebas de estrés algorítmicas Monte Carlo contra la volatilidad del mercado",
      "Contratos directos con aseguradoras de primer nivel y líneas de emisión acelerada",
      "Reportes visuales comparativos listos para el cliente generados en tiempo real",
    ],
    actionLabel: "Acceder a Herramientas para Productores",
  },
  {
    id: "principals",
    audience: "Directores de Agencia y Líderes de IMO",
    badge: "Infraestructura Empresarial",
    headline: "Equipe a su correduría con cotizaciones con IA bilingüe, divulgaciones regulatorias y enrutamiento directo al CRM.",
    description: "Estandarice el cumplimiento supervisado en equipos de agentes multiescritorio. Entregue captación bilingüe lista para usar, documentación automatizada FINRA 2330 y enrutamiento directo a su pipeline de CRM.",
    bulletPoints: [
      "Conexión directa de prospectos al pipeline de crm.myiad.com",
      "Asignación territorial automática (Florida Central, Sur de Florida, Puerto Rico, Nacional)",
      "Pistas de auditoría de supervisión estricta que cumplen con los requisitos de registro de FINRA 2330",
    ],
    actionLabel: "Implementar Portal de Agencia",
  },
  {
    id: "veterans",
    audience: "Asesores Especializados en Militares y Veteranos",
    badge: "Escudo Patrimonial para Veteranos",
    headline: "Escudo Patrimonial Militar: Cómo asegurar protección de pensión permanente antes del aumento tarifario de VGLI.",
    description: "Ayude a familias militares y miembros en transición a reemplazar coberturas SGLI/VGLI que vencen, protegerse contra la reducción del Plan de Beneficios de Sobrevivientes (SBP) y blindar su patrimonio civil.",
    bulletPoints: [
      "Alternativas permanentes con acumulación antes de los incrementos por edad de tarifas VGLI",
      "Auditorías matemáticas comparativas de SBP frente a Maximización de Pensión Privada",
      "Cláusulas de asegurabilidad garantizada que protegen a miembros militares tras la separación del servicio",
    ],
    actionLabel: "Ejecutar Auditoría de Pensión Militar",
  },
];

export function getAudienceModules(lang: "en" | "es" = "en"): AudienceSegmentModule[] {
  return lang === "es" ? AUDIENCE_MODULES_ES : AUDIENCE_MODULES;
}

export const FINRA_2330_COMPLIANCE_DISCLOSURE = {
  ruleTitle: "FINRA Rule 2330 & SEC Regulation Best Interest Compliance Notice",
  supervisoryStandard: "Members and associated persons recommending the purchase or exchange of a deferred variable annuity must have a reasonable basis to believe that the transaction is suitable for the customer in light of the customer's financial situation, insurance needs, and investment objectives.",
  suitabilityDisclosures: [
    "Deferred variable annuities are long-term financial products intended primarily for retirement planning and wealth accumulation.",
    "Variable annuities are subject to investment risk, including the possible loss of principal. Investment returns and account values will fluctuate with market conditions.",
    "Early withdrawals prior to age 59½ may be subject to a 10% federal IRS tax penalty in addition to ordinary income tax.",
    "Surrender charges typically apply during early policy years (commonly 5 to 10 years) for withdrawals exceeding the contractual free-withdrawal allowance.",
    "Variable contracts carry underlying fund fees, mortality and expense (M&E) charges, administrative expenses, and optional rider fees (such as GLWB or enhanced death benefits).",
    "Guarantees are based solely on the financial strength and claims-paying ability of the issuing life insurance carrier and do not apply to the performance of underlying investment subaccounts.",
    "Variable annuities are NOT bank deposits, NOT insured by the FDIC or any government agency, and NOT guaranteed by any financial institution.",
  ],
  supervisoryChecklist: [
    "Documented customer investment objective, risk profile, and liquidity needs",
    "Comprehensive disclosure of surrender charge schedule and duration",
    "Written analysis of existing policy replacement costs, tax basis, and benefits foregone",
    "Independent principal supervisory review and written approval prior to application submission",
  ],
};

export const FINRA_2330_COMPLIANCE_DISCLOSURE_ES = {
  ruleTitle: "Aviso de Cumplimiento de la Regla FINRA 2330 y Regulación Best Interest de la SEC",
  supervisoryStandard: "Los miembros y personas asociadas que recomienden la compra o intercambio de una anualidad variable diferida deben tener una base razonable para creer que la transacción es idónea para el cliente en función de su situación financiera, necesidades de seguro y objetivos de inversión.",
  suitabilityDisclosures: [
    "Las anualidades variables diferidas son productos financieros a largo plazo destinados principalmente a la planificación de jubilación y acumulación patrimonial.",
    "Las anualidades variables están sujetas a riesgo de inversión, incluida la posible pérdida del capital invertido. Los rendimientos y valores de cuenta fluctuarán según las condiciones del mercado.",
    "Los retiros anticipados antes de los 59½ años pueden estar sujetos a una penalización fiscal federal del 10% del IRS además de los impuestos sobre la renta ordinarios.",
    "Los cargos por rescate generalmente aplican durante los primeros años de la póliza (comúnmente de 5 a 10 años) para retiros que excedan el límite contractual permitido.",
    "Los contratos variables conllevan tarifas de fondos subyacentes, cargos de mortalidad y gastos (M&E), gastos administrativos y tarifas de cláusulas opcionales (como GLWB o beneficios por fallecimiento mejorados).",
    "Las garantías se basan exclusivamente en la solvencia financiera y capacidad de pago de reclamaciones de la compañía de seguros emisora y no aplican al rendimiento de las subcuentas de inversión.",
    "Las anualidades variables NO son depósitos bancarios, NO están aseguradas por la FDIC ni por ninguna agencia gubernamental, y NO están garantizadas por ninguna institución bancaria.",
  ],
  supervisoryChecklist: [
    "Objetivo de inversión, perfil de riesgo y necesidades de liquidez del cliente debidamente documentados",
    "Divulgación exhaustiva del cronograma y duración de cargos por rescate",
    "Análisis escrito de costos de reemplazo de póliza existente, base imponible y beneficios a los que se renuncia",
    "Revisión supervisada independiente por un principal y aprobación por escrito antes del envío de la solicitud",
  ],
};

export function getFinraDisclosure(lang: "en" | "es" = "en") {
  return lang === "es" ? FINRA_2330_COMPLIANCE_DISCLOSURE_ES : FINRA_2330_COMPLIANCE_DISCLOSURE;
}
