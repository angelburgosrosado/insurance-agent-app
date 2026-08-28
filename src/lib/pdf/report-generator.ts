export interface ReportData {
  reportType: "iul" | "military" | "annuity" | "funeral";
  clientName?: string;
  age?: number;
  monthlyContribution?: number;
  rank?: string;
  yearsOfService?: number;
  tspBalance?: number;
  rolloverAmount?: number;
  lang?: "en" | "es";
}

/**
 * Generates an executive, print-ready HTML/PDF report with branded SVG charts & tables.
 */
export function generateExecutiveReportHtml(data: ReportData): string {
  const isSpanish = data.lang === "es";
  const name = data.clientName || (isSpanish ? "Cliente Estimado" : "Valued Client");
  const date = new Date().toLocaleDateString(isSpanish ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // 1. Military & Veteran Asset Shield Report
  if (data.reportType === "military") {
    return `
<!DOCTYPE html>
<html lang="${isSpanish ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>Military Asset Shield & Transition Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #d97706; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; padding: 4px 10px; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
    h1 { font-size: 24px; font-weight: 800; margin: 10px 0 0 0; color: #001c38; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th { background: #001c38; color: #fff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .highlight { background: #fef3c7; font-weight: bold; color: #92400e; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span class="badge">AB Global Military Asset Shield</span>
      <h1>${isSpanish ? "Diagnóstico de Transición Militar y Protección Patrimonial" : "Military & Veteran Transition & Wealth Shield Report"}</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${isSpanish ? "Preparado para:" : "Prepared for:"} <strong>${name}</strong> &bull; ${date}</p>
    </div>
    <div style="text-align: right; font-size: 12px; color: #475569;">
      <strong>Angel Burgos</strong> • Lic. 0215<br/>FL Lic. #G328926 / WFG Code: F6D9U<br/>📞 (386) 333-1482
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">⚠️ ${isSpanish ? "La Trampa de Costos de VGLI" : "The SGLI-to-VGLI Rate Cliff"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish 
          ? "Al salir del servicio activo, VGLI incrementa de precio drásticamente cada 5 años. A los 65 años supera los $750/mes ($9,000/año) acumulando más de $180k en primas perdidas con $0 en valor de rescate."
          : "Upon leaving active service, VGLI increases exponentially every 5 years. By age 65, it exceeds $750/month ($9,000/year) accumulating over $180k in premiums with $0 cash equity."}
      </p>
    </div>
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Estrategia Pension Max e IUL" : "Pension Max & IRS 7702 IUL"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Permite cobrar el 100% de su pensión completa sin ceder el 6.5% a SBP, garantizando un capital libre de impuestos para su familia y acumulando efectivo con piso del 0%."
          : "Enables retirees to take 100% of their gross military pension without forfeiting 6.5% to SBP, guaranteeing a tax-free lump sum and building cash value with a 0% downside floor."}
      </p>
    </div>
  </div>

  <h3 style="font-size: 15px; margin-top: 30px;">📊 ${isSpanish ? "Comparativa de Costo VGLI vs. Estrategia IUL Privada" : "VGLI vs. Private Institutional IUL Cost Comparison"}</h3>
  <table>
    <thead>
      <tr>
        <th>${isSpanish ? "Edad" : "Age"}</th>
        <th>${isSpanish ? "Costo Mensual VGLI ($500k)" : "VGLI Monthly Premium ($500k)"}</th>
        <th>${isSpanish ? "Costo IUL Fijo" : "Level Private IUL"}</th>
        <th>${isSpanish ? "Equidad Acumulada VGLI" : "VGLI Cash Value"}</th>
        <th>${isSpanish ? "Equidad Estimada IUL" : "IUL Projected Cash (IRS 7702)"}</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>30-34</td><td>~$50 / mo</td><td>~$130 / mo (Fijo)</td><td>$0</td><td>$8,500+</td></tr>
      <tr><td>45-49</td><td>~$110 / mo</td><td>~$130 / mo (Fijo)</td><td>$0</td><td>$48,000+</td></tr>
      <tr><td>55-59</td><td>~$335 / mo</td><td>~$130 / mo (Fijo)</td><td>$0</td><td>$115,000+</td></tr>
      <tr class="highlight"><td>65-69</td><td>$750+ / mo</td><td>~$130 / mo (Fijo)</td><td>$0 (100% Pérdida)</td><td>$240,000+ (Libre de Impuestos)</td></tr>
    </tbody>
  </table>

  <div class="card" style="margin-top: 25px; border-left: 4px solid #d97706;">
    <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #001c38;">📋 ${isSpanish ? "Siguientes Pasos Recomendados:" : "Recommended Next Action Steps:"}</h4>
    <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155; line-height: 1.7;">
      <li>${isSpanish ? "Agendar sesión diagnóstica confidencial de 15 minutos con Angel Burgos." : "Schedule a confidential 15-minute diagnostic session with Angel Burgos."}</li>
      <li>${isSpanish ? "Solicitar cotización institucional antes de la fecha límite de separación de 240 días." : "Request custom institutional illustration before the 240-day separation window."}</li>
      <li>${isSpanish ? "Revisar opciones de transferencia de TSP a un índice con piso de 0%." : "Review TSP rollover options into a guaranteed 0% downside floor index."}</li>
    </ol>
  </div>

  <div class="footer">
    AB Global Consulting LLC &bull; 9501 Satellite Blvd, Suite 105, Orlando, FL 32837 &bull; (386) 333-1482 &bull; abglco.com
  </div>
</body>
</html>
    `;
  }

  // 2. 401(k) / Annuity Lifetime Paycheck Blueprint
  if (data.reportType === "annuity") {
    return `
<!DOCTYPE html>
<html lang="${isSpanish ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>Annuity Lifetime Income Blueprint</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #10b981; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; padding: 4px 10px; background: #d1fae5; color: #065f46; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
    h1 { font-size: 24px; font-weight: 800; margin: 10px 0 0 0; color: #001c38; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th { background: #001c38; color: #fff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .highlight { background: #d1fae5; font-weight: bold; color: #065f46; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span class="badge">AB Global Annuity Wealth Blueprint</span>
      <h1>${isSpanish ? "Reporte Ejecutivo: Pensión Personal y Transferencia de 401(k)/IRA" : "Executive Report: 401(k)/IRA Rollover & Guaranteed Lifetime Paycheck"}</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${isSpanish ? "Preparado para:" : "Prepared for:"} <strong>${name}</strong> &bull; ${date}</p>
    </div>
    <div style="text-align: right; font-size: 12px; color: #475569;">
      <strong>Angel Burgos</strong> • Lic. 0215<br/>FL Lic. #G328926 / WFG Code: F6D9U<br/>📞 (386) 333-1482
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Eliminación del Riesgo de Caída" : "Zero Market Loss Guarantee"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Al transferir su 401(k) o IRA a una Anualidad Indexada Fija (FIA), su saldo principal queda 100% blindado contra colapsos bursátiles con piso garantizado del 0%."
          : "Rolling pre-tax 401(k) or IRA balances into a Fixed Indexed Annuity guarantees principal protection against stock market drawdowns with a 0% contractual floor."}
      </p>
    </div>
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">📈 ${isSpanish ? "Cheque Mensual Vitalicio" : "Guaranteed Lifetime Paycheck"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Garantiza un ingreso mensual predecible que nunca se agota, sin importar cuántos años viva ni cómo se comporte la economía."
          : "Contractually guarantees predictable monthly income you can never outlive, regardless of lifespan or economic conditions."}
      </p>
    </div>
  </div>

  <h3 style="font-size: 15px; margin-top: 30px;">📊 ${isSpanish ? "Ventajas de la Anualidad vs. Cuenta Bursátil Tradicional" : "Annuity vs. Traditional Market Volatility"}</h3>
  <table>
    <thead>
      <tr>
        <th>${isSpanish ? "Concepto" : "Category"}</th>
        <th>${isSpanish ? "Cartera 401(k) Tradicional" : "Traditional 401(k) / Brokerage"}</th>
        <th>${isSpanish ? "Anualidad Indexada AB Global" : "AB Global Indexed Annuity"}</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>${isSpanish ? "Riesgo de Agotar el Dinero" : "Longevity Risk"}</td><td>Alto (Riesgo de Secuencia)</td><td class="highlight">Garantizado de por Vida (0% Riesgo)</td></tr>
      <tr><td>${isSpanish ? "Impacto de Crash de Bolsa" : "Stock Market Crash Impact"}</td><td>Pérdida Directa (-20% a -50%)</td><td class="highlight">0% Piso Contractual Garantizado</td></tr>
      <tr><td>${isSpanish ? "Bonificación de Entrada" : "Upfront Rollover Bonus"}</td><td>0%</td><td class="highlight">Hasta 10% - 20% Inmediato</td></tr>
    </tbody>
  </table>

  <div class="footer">
    AB Global Consulting LLC &bull; 9501 Satellite Blvd, Suite 105, Orlando, FL 32837 &bull; (386) 333-1482 &bull; abglco.com
  </div>
</body>
</html>
    `;
  }

  // 3. Everest Funeral Concierge Report
  if (data.reportType === "funeral") {
    return `
<!DOCTYPE html>
<html lang="${isSpanish ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>Everest Funeral Concierge Savings Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; padding: 4px 10px; background: #e0e7ff; color: #3730a3; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
    h1 { font-size: 24px; font-weight: 800; margin: 10px 0 0 0; color: #001c38; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
    .highlight { background: #e0e7ff; font-weight: bold; color: #3730a3; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span class="badge">Everest Funeral Concierge &bull; AB Global</span>
      <h1>${isSpanish ? "Reporte de Ahorro y Concierge Funerario Everest" : "Everest Funeral Concierge & Family Protection Report"}</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${isSpanish ? "Preparado para:" : "Prepared for:"} <strong>${name}</strong> &bull; ${date}</p>
    </div>
    <div style="text-align: right; font-size: 12px; color: #475569;">
      <strong>Angel Burgos</strong> • Lic. 0215<br/>FL Lic. #G328926 / WFG Code: F6D9U<br/>📞 (386) 333-1482
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">💰 ${isSpanish ? "Ahorro Promedio de $3,500+" : "Average $3,500+ Price Negotiation Savings"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Everest negocia directamente con cualquier funeraria para eliminar sobrecostos y paquetes innecesarios en momentos difíciles."
          : "Everest negotiates directly with any funeral home nationwide to eliminate inflated markups and unfair bundling during grieving periods."}
      </p>
    </div>
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">⚡ ${isSpanish ? "Desembolso Exprés en 24-48 Horas" : "Expedited 24-48 Hr Payouts"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Entrega de fondos garantizada en 48 horas para evitar que la familia tenga que pagar de su bolsillo o endeudarse."
          : "Policy proceeds disbursed within 48 hours directly to the funeral home or family, eliminating out-of-pocket financial emergencies."}
      </p>
    </div>
  </div>

  <div class="footer">
    AB Global Consulting LLC &bull; 9501 Satellite Blvd, Suite 105, Orlando, FL 32837 &bull; (386) 333-1482 &bull; abglco.com
  </div>
</body>
</html>
    `;
  }

  // Default: Florida IUL Tax-Free Retirement Report
  return `
<!DOCTYPE html>
<html lang="${isSpanish ? "es" : "en"}">
<head>
  <meta charset="utf-8">
  <title>Florida IUL Executive Illustration Report</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #0284c7; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
    h1 { font-size: 24px; font-weight: 800; margin: 10px 0 0 0; color: #001c38; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th { background: #001c38; color: #fff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .highlight { background: #e0f2fe; font-weight: bold; color: #0369a1; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <span class="badge">AB Global Consulting • Wealth Architecture</span>
      <h1>${isSpanish ? "Reporte Ejecutivo: Seguro Indexado Universal (IUL)" : "Executive Report: Indexed Universal Life (IUL)"}</h1>
      <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${isSpanish ? "Preparado para:" : "Prepared for:"} <strong>${name}</strong> &bull; ${date}</p>
    </div>
    <div style="text-align: right; font-size: 12px; color: #475569;">
      <strong>Angel Burgos</strong> • Lic. 0215<br/>FL Lic. #G328926 / WFG Code: F6D9U<br/>📞 (386) 333-1482
    </div>
  </div>

  <div class="grid">
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Piso Contractual del 0%" : "Guaranteed 0% Downside Floor"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Su capital nunca sufre pérdidas ante caídas de la bolsa. Si el S&P 500 cae -30%, su rendimiento anual es 0.0%, blindando sus ganancias acumuladas."
          : "Your accumulated cash never suffers market losses. When the S&P 500 drops -30%, your policy credit is 0.0%, permanently locking in previous gains."}
      </p>
    </div>
    <div class="card">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">💵 ${isSpanish ? "Retiros Libres de Impuestos (IRS 7702)" : "Tax-Free Income (IRS Code 7702)"}</h3>
      <p style="font-size: 12px; color: #475569; margin: 0;">
        ${isSpanish
          ? "Los fondos se distribuyen como préstamos de póliza no tributables sin reportar al IRS ni generar impuestos sobre ganancias de capital."
          : "Distributions are structured as non-taxable policy loans under IRS Section 7702, exempt from capital gains and ordinary income taxes."}
      </p>
    </div>
  </div>

  <h3 style="font-size: 15px; margin-top: 30px;">📊 ${isSpanish ? "Pilares del Plan IUL Institucional" : "Core Institutional Pillars of the IUL Model"}</h3>
  <table>
    <thead>
      <tr>
        <th>${isSpanish ? "Característica" : "Feature"}</th>
        <th>${isSpanish ? "Cuenta 401(k) / Imponible" : "Traditional 401(k) / Taxable"}</th>
        <th>${isSpanish ? "Estrategia IUL Institucional" : "Institutional IUL Strategy"}</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>${isSpanish ? "Riesgo de Caída de Bolsa" : "Stock Market Downside"}</td><td>100% de Riesgo (-20% a -40%)</td><td class="highlight">0% Piso Contractual Garantizado</td></tr>
      <tr><td>${isSpanish ? "Tratamiento Fiscal en el Retiro" : "Retirement Tax Bracket"}</td><td>Tributación Ordinaria (22% - 37%)</td><td class="highlight">100% Libre de Impuestos Federales (IRS 7702)</td></tr>
      <tr><td>${isSpanish ? "Beneficios en Vida (Cáncer, Infarto)" : "Living Benefits (Critical/Chronic)"}</td><td>Ninguno ($0)</td><td class="highlight">Acceso Anticipado hasta $1,000,000+</td></tr>
      <tr><td>${isSpanish ? "Protección Patrimonial en Florida" : "Florida Statutory Asset Protection"}</td><td>Limitada</td><td class="highlight">100% Exento de Juicios y Acreedores</td></tr>
    </tbody>
  </table>

  <div class="card" style="margin-top: 25px; border-left: 4px solid #0284c7;">
    <h4 style="margin: 0 0 6px 0; font-size: 13px; color: #001c38;">📋 ${isSpanish ? "Siguiente Paso para Activar su Ilustración Oficial:" : "Next Step to Activate Your Official Policy Illustration:"}</h4>
    <p style="margin: 0; font-size: 12px; color: #334155; line-height: 1.7;">
      ${isSpanish
        ? "Agende una sesión de 15 minutos con Angel Burgos para generar su ilustración oficial personalizada con aseguradoras de calificación A+ (Transamerica, Nationwide, National Life Group)."
        : "Book a 15-minute consultation with Angel Burgos to generate your official, carrier-backed illustration across A+ rated carriers (Transamerica, Nationwide, National Life Group)."}
    </p>
  </div>

  <div class="footer">
    AB Global Consulting LLC &bull; 9501 Satellite Blvd, Suite 105, Orlando, FL 32837 &bull; (386) 333-1482 &bull; abglco.com
  </div>
</body>
</html>
  `;
}
