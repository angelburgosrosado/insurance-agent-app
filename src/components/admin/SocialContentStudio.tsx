"use client";

import React, { useState, useMemo } from "react";

type Platform = "linkedin" | "tiktok" | "instagram" | "facebook";
type ProductId = "military" | "iul" | "annuity" | "funeral" | "resources";
type Language = "en" | "es";

interface ContentTemplate {
  title: string;
  urlPath: string;
  linkedin: {
    en: string;
    es: string;
  };
  tiktok: {
    en: string;
    es: string;
  };
  instagram: {
    en: string;
    es: string;
  };
  facebook: {
    en: string;
    es: string;
  };
}

const templates: Record<ProductId, ContentTemplate> = {
  military: {
    title: "Military & Veteran Asset Protection & Wealth Shield",
    urlPath: "/tools/military-asset-shield",
    linkedin: {
      en: `🎖️ The $180,000 Military Benefit Dilemma Most Veterans Miss

When transitioning from active duty, service members are told to convert their $500,000 SGLI to VGLI.

Here is the financial reality:
• At age 30: VGLI costs ~$50/mo.
• At age 50: It surges to ~$180/mo.
• At age 65: It reaches $750/mo ($9,000/yr).
• Total cumulative cost by age 75: Over $180,000.
• Cash value / equity returned: EXACTLY $0.

Meanwhile, military retirees electing Survivor Benefit Plan (SBP) forfeit 6.5% of their gross retired pay forever. If their spouse predeceases them, 100% of those deductions are lost with zero refund.

💡 The Institutional Strategy (Pension Maximization + IRS 7702 IUL):
1. Lock in private institutional IUL coverage while active or at separation.
2. Maintain level lifetime protection with Living Benefits for service-related conditions.
3. Build hundreds of thousands in accessible, tax-free cash reserves under IRS Section 7702.
4. Keep 100% of your military pension while guaranteeing a tax-free lump sum for your family.

👉 Run your exact rank, years of service, and retirement age on our interactive simulator:
{TRACKED_URL}

#MilitaryFinance #Veterans #RetirementPlanning #AssetProtection #PensionMaximization #FinancialStrategy`,
      es: `🎖️ El Dilema de $180,000 que la Mayoría de los Militares y Veteranos Desconocen

Al separarse o retirarse de las Fuerzas Armadas, muchos optan por convertir su SGLI de $500k a VGLI.

Veamos la realidad matemática:
• A los 30 años: VGLI cuesta ~$50/mes.
• A los 50 años: Salta a ~$180/mes.
• A los 65 años: Supera los $750/mes ($9,000/año).
• Costo acumulado a los 75 años: Más de $180,000.
• Valor en efectivo recuperable: EXACTAMENTE $0.

Al mismo tiempo, el plan SBP descuenta el 6.5% de su pensión de retiro militar de por vida. Si su cónyuge fallece primero, el gobierno retiene todo sin reembolso.

💡 La Estrategia Institucional (Pension Max + IUL bajo Código IRS 7702):
1. Asegurar un IUL institucional con tarifa fija de por vida.
2. Beneficios en Vida para lesiones o enfermedades de servicio.
3. Acumulación de cientos de miles en efectivo accesible libre de impuestos federales.
4. Cobrar el 100% de su pensión completa protegiendo a su familia con una suma libre de impuestos.

👉 Simule su rango, años de servicio y edad de retiro en nuestro simulador interactivo:
{TRACKED_URL}

#Militares #Veteranos #RetiroMilitar #PlanificacionFinanciera #PensionMax #FloridaVeterans #PuertoRico`
    },
    tiktok: {
      en: `🎬 TIKTOK / REELS 45-SECOND SCRIPT:

[VISUAL HOOK (0-3s)]:
Point camera at computer screen showing the Military Asset Shield interactive slider at /tools/military-asset-shield.
"If you're active duty or separating from the military, DO NOT sign up for VGLI until you watch this."

[DEMONSTRATION (4-20s)]:
(Drag the age slider from 30 to 65 on screen while speaking)
"Look at this: SGLI is cheap while in uniform. But when you switch to VGLI, the price jumps every 5 years. By age 65, you're paying $750 every single month for the exact same coverage. That's $180,000 gone with zero cash back."

[THE SOLUTION (21-35s)]:
"Instead, smart soldiers and veterans lock in a private IUL before leaving service. Your price never goes up, you get living benefits for service injuries, and under IRS 7702, your money compounds tax-free."

[CALL TO ACTION (36-45s)]:
"I built a free interactive simulator where you can test your exact rank and retirement numbers. Link is right in my bio to run your scenario."`,
      es: `🎬 GUION DE TIKTOK / REELS (45 SEGUNDOS):

[GANCHO VISUAL (0-3s)]:
Cámara enfocando la pantalla con el Simulador Militar en /tools/military-asset-shield.
"Si estás en servicio activo o a punto de retirarte de las Fuerzas Armadas, no aceptes VGLI sin ver esto."

[DEMOSTRACIÓN (4-20s)]:
(Mueva el deslizador de edad de 30 a 65 en pantalla)
"Mira cómo sube la tarifa: A los 30 años pagas poco. A los 65 años pagas más de $750 al mes por la misma póliza. Terminas pagando más de $180,000 sin acumular ni un solo dólar en efectivo."

[LA SOLUCIÓN (21-35s)]:
"La alternativa que usan los veteranos inteligentes es un IUL institucional con piso del 0%. La prima queda fija, tienes beneficios en vida por condiciones de servicio y creas capital libre de impuestos bajo el código IRS 7702."

[LLAMADO A LA ACCIÓN (36-45s)]:
"Cree un simulador interactivo gratuito donde puedes probar tu rango y pensión exacta. Enlace directo en mi biografía."`
    },
    instagram: {
      en: `📸 INSTAGRAM 5-SLIDE CAROUSEL & CAPTION:

SLIDE 1: The $180,000 Military Insurance Trap Nobody Warns You About 🎖️
SLIDE 2: SGLI ($31/mo) ➡️ VGLI ($750+/mo at 65). Why 5-year rate jumps drain your retirement with $0 equity.
SLIDE 3: The SBP Dilemma: Forfeiting 6.5% of your military pension forever vs. Pension Maximization.
SLIDE 4: The 401(k) / TSP Shield: Why rolling into a 0% floor asset protects you from bear markets.
SLIDE 5: Test your exact numbers on our free interactive military simulator. (Link in bio or comment "SHIELD").

CAPTION:
Active duty service members earn incredible benefits—but transitioning to civilian life requires strategic defense against hidden rate spikes.

Bypassing the VGLI cliff and maximizing your pension with an IRS 7702 asset shield gives your family guaranteed tax-free security.

💬 Comment "SHIELD" below and I’ll send you the direct link to our interactive simulator, or visit the link in bio!

#MilitaryRetirement #VeteransUSA #MilitarySpouse #SGLI #VGLI #PensionMaximization #IUL #OrlandoVeterans`,
      es: `📸 CARRUSEL DE INSTAGRAM (5 DIAPOSITIVAS) Y TEXTO:

DIAPOSITIVA 1: La Trampa de $180,000 en Seguros Militares que Pocos Explican 🎖️
DIAPOSITIVA 2: SGLI ($31/mes) ➡️ VGLI ($750+/mes a los 65). Los aumentos cada 5 años drenan su dinero con $0 valor.
DIAPOSITIVA 3: El Dilema de SBP: Ceder 6.5% de su pensión para siempre vs. Estrategia Pension Max.
DIAPOSITIVA 4: Blindaje de TSP: Por qué un piso garantizado del 0% protege su jubilación de caídas de bolsa.
DIAPOSITIVA 5: Simule su caso exacto en nuestra herramienta interactiva gratuita. (Enlace en bio o comente "ESCUDO").

TEXTO:
Proteger los beneficios que ganó con su servicio militar requiere estrategia y números claros.

💬 Comente "ESCUDO" y le enviaré el enlace directo al simulador interactivo, o visite el enlace en nuestra biografía.

#Veteranos #MilitaresUSA #RetiroMilitar #SegurosDeVida #FloridaHispanos #PuertoRicoVeterans #OrlandoFL`
    },
    facebook: {
      en: `🇺🇸 Attention Active Duty Service Members & Veterans in Florida & Puerto Rico:

Are you preparing for military retirement or separating from service? 

Before you make permanent decisions on your SGLI-to-VGLI transition or Survivor Benefit Plan (SBP) elections, make sure you understand the math:

1️⃣ VGLI costs escalate every 5 years—reaching $750+/month at age 65 with ZERO equity returned.
2️⃣ Electing SBP permanently cuts 6.5% from your monthly pension forever.
3️⃣ TSP balances in C/S/I funds remain exposed to 30%-50% stock market drawdowns.

With an institutional Indexed Universal Life (IUL) asset shield and Pension Maximization strategy, you can keep 100% of your pension, lock in level lifetime rates, and build accessible tax-free cash under IRS Section 7702.

👇 Try our free interactive Military & Veteran Wealth Simulator:
{TRACKED_URL}

For confidential consultations with 0215 licensed advisor Angel Burgos, call (386) 333-1482 or send us a message.`,
      es: `🇺🇸 Atención Militares en Servicio Activo y Veteranos en Florida y Puerto Rico:

¿Se está preparando para su retiro o separación de las Fuerzas Armadas?

Antes de tomar decisiones permanentes sobre la conversión de SGLI a VGLI o la deducción del Plan de Beneficios para Sobrevivientes (SBP), conozca los números reales:

1️⃣ VGLI aumenta de precio cada 5 años—superando los $750/mes a los 65 años con CERO valor en efectivo acumulado.
2️⃣ Elegir SBP reduce permanentemente un 6.5% de su pensión bruta mensual.
3️⃣ Los fondos de su TSP (C/S/I) siguen expuestos a caídas bursátiles de hasta un -40%.

Con una estrategia de Pension Maximization e IUL bajo el Código IRS 7702, usted puede cobrar el 100% de su pensión, mantener tarifas fijas y crear capital libre de impuestos.

👇 Pruebe gratis nuestro Simulador Interactivo de Protección Militar:
{TRACKED_URL}

Para consultas confidenciales con el asesor licenciado 0215 Angel Burgos, llame al (386) 333-1482 o envíenos un mensaje directo.`
    }
  },
  iul: {
    title: "Florida IUL & Tax-Free Retirement Simulator",
    urlPath: "/tools/iul-calculator",
    linkedin: {
      en: `📊 Why a 0% Downside Floor Beats an 8% Volatile Average in Retirement

Consider two portfolios during retirement:
• Portfolio A (Taxable Brokerage): Gains 15%, drops 30%, gains 18%.
• Portfolio B (Institutional IUL): Captures market upside up to a cap, with a contractually GUARANTEED 0% FLOOR during crashes.

When you withdraw living expenses during market drawdowns (Sequence of Returns Risk), Portfolio A runs out of money years early.

Portfolio B locks in previous gains, eliminates market downside, and under IRS Section 7702, distributions are structured as non-taxable policy loans.

Explore the math with our interactive model:
{TRACKED_URL}

#IUL #WealthManagement #TaxStrategy #RetirementPlanning #IRS7702 #FloridaBusiness`,
      es: `📊 Por Qué un Piso Garantizado del 0% Supera a un Rendimiento Promedio Volátil en el Retiro

Analicemos dos carteras de jubilación:
• Cartera A (Cuenta Imponible Tradicional): Sube 15%, cae -30%, sube 18%.
• Cartera B (IUL Institucional): Participa en el crecimiento del índice con un PISO CONTRACTUAL DEL 0% ante caídas.

Al retirar fondos para vivir durante años negativos, la Cartera A agota su dinero décadas antes.

La Cartera B blinda las ganancias, elimina el riesgo bursátil y, bajo el Código IRS 7702, los retiros se realizan libres de impuestos federales.

Pruebe la simulación en vivo:
{TRACKED_URL}

#IUL #PlanificacionFinanciera #LibreDeImpuestos #RetiroSeguro #OrlandoFL #PuertoRico`
    },
    tiktok: {
      en: `🎬 TIKTOK / REELS SCRIPT:
"Here is how high-earners legally create zero-tax retirement checks using IRS Section 7702. Drag this slider to see a -30% market crash simulation: The taxable account drops, but the IUL locks in at 0%. Try it yourself at the link in my bio!"`,
      es: `🎬 GUION TIKTOK / REELS:
"Así es como se generan ingresos de retiro 100% libres de impuestos federales bajo la Sección 7702 del IRS. Mira cómo al simular una caída de bolsa de -30%, la cuenta imponible se desploma pero el IUL se mantiene en 0%. Pruébalo en el enlace de mi biografía."`
    },
    instagram: {
      en: `📸 4 Reasons Wealthy Florida Families Use IUL as a Private Wealth Vault:
1. Guaranteed 0% Floor against market crashes 🛡️
2. Tax-Free policy loan distributions (IRS 7702) 💵
3. Accelerated Living Benefits for heart attack/stroke/chronic illness 🏥
4. 100% Asset Protection under Florida statutory law 🌴

Link in bio to simulate your exact numbers!`,
      es: `📸 4 Razones por las que Familias en Florida usan IUL como Bóveda Patrimonial:
1. Piso garantizado del 0% contra caídas de bolsa 🛡️
2. Retiros libres de impuestos bajo IRS 7702 💵
3. Beneficios en Vida por enfermedades críticas o crónicas 🏥
4. Protección patrimonial bajo leyes de Florida 🌴

Enlace en bio para calcular sus números.`
    },
    facebook: {
      en: `💡 Are you tired of market volatility threatening your retirement plans? 

Simulate how Indexed Universal Life (IUL) locks in market growth with a guaranteed 0% loss floor and provides tax-free retirement income:
{TRACKED_URL}`,
      es: `💡 ¿Cansado de que la volatilidad de la bolsa amenace sus planes de retiro?

Simule cómo el Seguro Indexado Universal (IUL) asegura ganancias con un piso garantizado del 0% e ingresos libres de impuestos:
{TRACKED_URL}`
    }
  },
  annuity: {
    title: "401(k) / IRA Annuity Paycheck Estimator",
    urlPath: "/tools/annuity-estimator",
    linkedin: {
      en: `📈 Eliminating Sequence-of-Returns Risk on 401(k) and IRA Rollovers:
Rolling pre-tax balances into a Fixed Indexed Annuity with guaranteed lifetime income riders creates an unshakeable personal pension floor.

Calculate your guaranteed lifetime monthly paycheck:
{TRACKED_URL}`,
      es: `📈 Eliminando el Riesgo de Secuencia de Rendimientos en Transferencias de 401(k) e IRA:
Transferir saldos a una Anualidad Indexada Fija con cláusulas de ingreso vitalicio crea un piso de pensión personal inamovible.

Calcule su cheque mensual garantizado de por vida:
{TRACKED_URL}`
    },
    tiktok: {
      en: `🎬 TIKTOK / REELS SCRIPT:
"If you have an old 401(k) sitting in the stock market right now, you are taking unnecessary risk. Here is how you can roll it over tax-free into a guaranteed monthly paycheck you can never outlive. Test it at the link in bio!"`,
      es: `🎬 GUION TIKTOK / REELS:
"Si tienes un 401(k) invertido en la bolsa de valores, estás asumiendo un riesgo innecesario. Así puedes transferirlo 100% libre de impuestos a un cheque mensual vitalicio. ¡Pruébalo en el enlace de mi bio!"`
    },
    instagram: {
      en: `Protect your 401(k) / IRA rollover from market crashes and lock in a guaranteed lifetime paycheck. Link in bio!`,
      es: `Proteja su transferencia de 401(k) / IRA de caídas de bolsa y asegure un cheque mensual vitalicio. ¡Enlace en bio!`
    },
    facebook: {
      en: `Protect your hard-earned retirement nest egg. Calculate your guaranteed monthly lifetime annuity paycheck today:
{TRACKED_URL}`,
      es: `Proteja los ahorros de toda su vida laboral. Calcule hoy su cheque mensual garantizado de por vida:
{TRACKED_URL}`
    }
  },
  funeral: {
    title: "Everest Funeral Concierge Savings & Pre-Planning",
    urlPath: "/tools/funeral-cost-savings",
    linkedin: {
      en: `🕊️ How Everest Funeral Concierge Saves Families $3,500+ and Expedites 24-48 Hr Claim Disbursements:
{TRACKED_URL}`,
      es: `🕊️ Cómo Everest Funeral Concierge Ahorra $3,500+ a las Familias y Desembolsa Fondos en 24-48 Horas:
{TRACKED_URL}`
    },
    tiktok: {
      en: `🎬 TIKTOK SCRIPT:
"Did you know funeral homes often overcharge grieving families by thousands? Here is how independent price negotiation saves an average of $3,500 with expedited 24-48 hr payouts. Link in bio!"`,
      es: `🎬 GUION TIKTOK:
"¿Sabías que las funerarias suelen cobrar de más a familias en momentos de duelo? Conoce cómo la negociación independiente ahorra un promedio de $3,500 con desembolsos en 24-48 horas. ¡Enlace en bio!"`
    },
    instagram: {
      en: `Independent funeral price negotiation saves families an average of $3,500+. Check the numbers in our free planner!`,
      es: `La negociación independiente de precios funerarios ahorra un promedio de $3,500+. ¡Vea los números en nuestro planificador gratuito!`
    },
    facebook: {
      en: `Protect your family from unexpected funeral markups. See how Everest Concierge saves $3,500+ and expedites 48-hour payouts:
{TRACKED_URL}`,
      es: `Proteja a su familia de sobrecostos funerarios. Vea cómo Everest Concierge ahorra $3,500+ y agiliza desembolsos en 48 horas:
{TRACKED_URL}`
    }
  },
  resources: {
    title: "Resource Center & Planning Guides",
    urlPath: "/resources",
    linkedin: {
      en: `📚 Explore our complete library of institutional wealth, tax preservation, and military transition guides authored by licensed practitioner Angel Burgos:
{TRACKED_URL}`,
      es: `📚 Explore nuestra biblioteca de guías de preservación de patrimonio, ventajas fiscales y transición militar por el asesor licenciado Angel Burgos:
{TRACKED_URL}`
    },
    tiktok: {
      en: `🎬 TIKTOK SCRIPT:
"Need free institutional blueprints on IUL, annuities, and military wealth protection? Head to the Resource Center in my bio to download the full guides!"`,
      es: `🎬 GUION TIKTOK:
"¿Deseas guías gratuitas sobre IUL, anualidades y protección patrimonial militar? ¡Visita el Centro de Recursos en mi biografía para descargar las guías completas!"`
    },
    instagram: {
      en: `Free institutional planning blueprints and tax strategies available now in our Resource Center. Link in bio!`,
      es: `Guías gratuitas de planificación y estrategias fiscales disponibles en nuestro Centro de Recursos. ¡Enlace en bio!`
    },
    facebook: {
      en: `Download our complimentary consumer planning guides on Florida IUL, Annuity Rollovers, and Military Wealth Protection:
{TRACKED_URL}`,
      es: `Descargue nuestras guías gratuitas sobre IUL en Florida, Transferencias de Anualidades y Protección Militar:
{TRACKED_URL}`
    }
  }
};

export function SocialContentStudio() {
  const [selectedProduct, setSelectedProduct] = useState<ProductId>("military");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>("linkedin");
  const [selectedLang, setSelectedLang] = useState<Language>("en");
  const [campaignTag, setCampaignTag] = useState<string>("social_launch");
  const [copiedPost, setCopiedPost] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const product = templates[selectedProduct];

  const trackedUrl = useMemo(() => {
    const base = "https://abglco.com";
    const medium = selectedPlatform === "tiktok" ? "video" : selectedPlatform === "instagram" ? "carousel" : "post";
    return `${base}${product.urlPath}?utm_source=${selectedPlatform}&utm_medium=${medium}&utm_campaign=${campaignTag}`;
  }, [product.urlPath, selectedPlatform, campaignTag]);

  const rawPostContent = product[selectedPlatform][selectedLang];
  const formattedPost = rawPostContent.replace("{TRACKED_URL}", trackedUrl);

  const handleCopyPost = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(formattedPost);
      setCopiedPost(true);
      setTimeout(() => setCopiedPost(false), 2500);
    }
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(trackedUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
            <span>✨</span> AI Social Lead & Campaign Studio
          </div>
          <h2 className="text-xl font-bold text-slate-900">
            Social Media Content & Tracked Link Generator
          </h2>
          <p className="text-xs text-slate-500">
            Generate 1-click tailored posts, video scripts, and UTM-tracked links for LinkedIn, TikTok, Instagram, and Facebook.
          </p>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setSelectedLang("en")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLang === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => setSelectedLang("es")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              selectedLang === "es" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            🇪🇸 Español
          </button>
        </div>
      </div>

      {/* Step 1: Select Topic / Product */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          1. Select Solution / Mini-App Target:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <button
            onClick={() => setSelectedProduct("military")}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProduct === "military"
                ? "border-amber-500 bg-amber-50/70 text-amber-950 font-bold shadow-sm"
                : "border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            }`}
          >
            <span className="text-lg block mb-1">🎖️</span>
            <p className="text-xs font-bold">Military Shield</p>
            <p className="text-[10px] text-slate-500">SGLI/VGLI & SBP</p>
          </button>

          <button
            onClick={() => setSelectedProduct("iul")}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProduct === "iul"
                ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm"
                : "border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            }`}
          >
            <span className="text-lg block mb-1">📊</span>
            <p className="text-xs font-bold">Florida IUL</p>
            <p className="text-[10px] text-slate-500">0% Floor & IRS 7702</p>
          </button>

          <button
            onClick={() => setSelectedProduct("annuity")}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProduct === "annuity"
                ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm"
                : "border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            }`}
          >
            <span className="text-lg block mb-1">📈</span>
            <p className="text-xs font-bold">401(k) Annuity</p>
            <p className="text-[10px] text-slate-500">Lifetime Paycheck</p>
          </button>

          <button
            onClick={() => setSelectedProduct("funeral")}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProduct === "funeral"
                ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm"
                : "border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            }`}
          >
            <span className="text-lg block mb-1">🕊️</span>
            <p className="text-xs font-bold">Everest Concierge</p>
            <p className="text-[10px] text-slate-500">Save $3,500+ & 48hr</p>
          </button>

          <button
            onClick={() => setSelectedProduct("resources")}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedProduct === "resources"
                ? "border-secondary bg-secondary/10 text-secondary font-bold shadow-sm"
                : "border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            }`}
          >
            <span className="text-lg block mb-1">📚</span>
            <p className="text-xs font-bold">Resource Guides</p>
            <p className="text-[10px] text-slate-500">PDF Blueprints</p>
          </button>
        </div>
      </div>

      {/* Step 2: Select Social Platform */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
          2. Select Social Media Platform:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedPlatform("linkedin")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedPlatform === "linkedin"
                ? "bg-[#0077b5] text-white border-[#0077b5] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>💼</span> LinkedIn (Post & PDF)
          </button>

          <button
            onClick={() => setSelectedPlatform("tiktok")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedPlatform === "tiktok"
                ? "bg-black text-white border-black shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>🎬</span> TikTok & Shorts Script
          </button>

          <button
            onClick={() => setSelectedPlatform("instagram")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedPlatform === "instagram"
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>📸</span> Instagram (Carousel)
          </button>

          <button
            onClick={() => setSelectedPlatform("facebook")}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition-all ${
              selectedPlatform === "facebook"
                ? "bg-[#1877f2] text-white border-[#1877f2] shadow-sm"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            <span>👥</span> Facebook Community
          </button>
        </div>
      </div>

      {/* Step 3: UTM Campaign Tag Customizer */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="w-full sm:w-auto">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Campaign Tag (`utm_campaign`):
          </label>
          <input
            type="text"
            value={campaignTag}
            onChange={(e) => setCampaignTag(e.target.value.toLowerCase().replace(/\s+/g, "_"))}
            placeholder="e.g. military_q1_push"
            className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 font-mono w-full sm:w-64"
          />
        </div>

        <div className="flex-1 w-full text-right sm:text-left overflow-hidden">
          <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block mb-1">
            Generated Tracked URL:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={trackedUrl}
              className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-700 w-full select-all"
            />
            <button
              onClick={handleCopyLink}
              className="px-3 py-1.5 bg-slate-900 hover:bg-secondary text-white rounded-lg text-xs font-bold shrink-0 transition-colors"
            >
              {copiedLink ? "✓ Copied" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>

      {/* Output Content Area */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Ready-to-Post Copy ({selectedPlatform.toUpperCase()} • {selectedLang.toUpperCase()}):
          </label>
          <button
            onClick={handleCopyPost}
            className="px-4 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
          >
            {copiedPost ? "✓ Post Copied to Clipboard!" : "📋 Copy Full Post Copy"}
          </button>
        </div>

        <textarea
          readOnly
          value={formattedPost}
          rows={14}
          className="w-full p-4 bg-slate-900 text-slate-100 font-mono text-xs rounded-2xl border border-slate-800 leading-relaxed focus:outline-none select-all"
        />
      </div>
    </div>
  );
}
