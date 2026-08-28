export interface ReportData {
  reportType: "iul" | "military" | "annuity" | "funeral" | "dime" | "term_vs_iul" | "ltc";
  clientName?: string;
  age?: number;
  monthlyContribution?: number;
  rank?: string;
  yearsOfService?: number;
  tspBalance?: number;
  rolloverAmount?: number;
  debt?: number;
  mortgage?: number;
  income?: number;
  lang?: "en" | "es";
}

/**
 * Generates an executive, print-ready HTML/PDF report with branded styling.
 */
export function generateExecutiveReportHtml(data: ReportData): string {
  const isSpanish = data.lang === "es";
  const name = data.clientName || (isSpanish ? "Cliente Estimado" : "Valued Client");
  const date = new Date().toLocaleDateString(isSpanish ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const baseHeader = (title: string, badge: string) => `
    <div class="header">
      <div>
        <span class="badge">${badge}</span>
        <h1>${title}</h1>
        <p style="margin: 4px 0 0 0; font-size: 13px; color: #64748b;">${isSpanish ? "Preparado para:" : "Prepared for:"} <strong>${name}</strong> &bull; ${date}</p>
      </div>
      <div style="text-align: right; font-size: 12px; color: #475569;">
        <strong>Angel Burgos</strong> • Lic. 0215<br/>FL Lic. #G328926 / WFG Code: F6D9U<br/>📞 (386) 333-1482 • Office: (407) 930-6226
      </div>
    </div>
  `;

  const baseStyles = `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a; line-height: 1.5; padding: 40px; background: #fff; }
    .header { border-bottom: 3px solid #d97706; padding-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
    .badge { display: inline-block; padding: 4px 10px; background: #fef3c7; color: #92400e; font-size: 11px; font-weight: bold; text-transform: uppercase; border-radius: 4px; }
    h1 { font-size: 22px; font-weight: 800; margin: 10px 0 0 0; color: #001c38; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 13px; }
    th { background: #001c38; color: #fff; padding: 10px 12px; text-align: left; font-weight: 600; font-size: 11px; text-transform: uppercase; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .highlight { background: #fef3c7; font-weight: bold; color: #92400e; }
    .footer { margin-top: 40px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #64748b; text-align: center; }
    @media print { body { padding: 0; } }
  `;

  // 1. Military & Veteran Asset Shield
  if (data.reportType === "military") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Military Asset Shield Report</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Diagnóstico de Transición Militar y Protección Patrimonial" : "Military & Veteran Transition & Wealth Shield Report", "AB Global Military Asset Shield")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">⚠️ ${isSpanish ? "La Trampa de Costos de VGLI" : "The SGLI-to-VGLI Rate Cliff"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "VGLI incrementa de precio drásticamente cada 5 años acumulando más de $180k en primas perdidas con $0 en valor de rescate." : "VGLI increases exponentially every 5 years accumulating over $180k in premiums with $0 cash equity."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Estrategia Pension Max e IUL" : "Pension Max & IRS 7702 IUL"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Permite cobrar el 100% de su pensión militar sin ceder el 6.5% a SBP, garantizando un capital libre de impuestos para su familia." : "Enables taking 100% of your gross military pension without forfeiting 6.5% to SBP, locking in a tax-free legacy."}</p>
        </div>
      </div>
      <table>
        <thead><tr><th>Age</th><th>VGLI Monthly Premium</th><th>Cumulative VGLI Cost</th><th>Private IUL Strategy</th><th>Cash Value</th></tr></thead>
        <tbody>
          <tr><td>35</td><td>$40 / mo</td><td>$2,400</td><td>$150 / mo (Fixed)</td><td>$12,500</td></tr>
          <tr><td>45</td><td>$88 / mo</td><td>$9,480</td><td>$150 / mo (Fixed)</td><td>$48,900</td></tr>
          <tr><td>55</td><td>$240 / mo</td><td>$27,240</td><td>$150 / mo (Fixed)</td><td>$124,300</td></tr>
          <tr class="highlight"><td>65</td><td>$750 / mo</td><td>$72,240</td><td>$150 / mo (Fixed)</td><td>$268,500</td></tr>
        </tbody>
      </table>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 2. Florida IUL Report
  if (data.reportType === "iul") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Florida IUL Blueprint</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Ilustración Ejecutiva: Seguro Indexado Universal (IUL)" : "Executive Blueprint: Florida Indexed Universal Life (IUL)", "AB Global Wealth & Retirement")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🔒 ${isSpanish ? "Piso Garantizado del 0%" : "Contractual 0% Downside Floor"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Cuando el mercado sufre pérdidas (-20% o -35%), su cuenta no pierde un solo centavo debido a la garantía del 0%." : "When markets drop (-20% or -35%), your principal and locked gains remain 100% intact."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">💸 ${isSpanish ? "Retiros Libres de Impuestos (IRS 7702)" : "IRS Sec 7702 Tax-Free Income"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Acceda a préstamos de póliza libres de impuestos sobre la renta para complementar su jubilación sin pagar impuestos al IRS." : "Access tax-free policy loan distributions for supplemental retirement without triggering federal taxes."}</p>
        </div>
      </div>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 3. Annuity Estimator Report
  if (data.reportType === "annuity") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Annuity Lifetime Income Report</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Plan de Cheque Vitalicio Garantizado con Anualidades" : "Guaranteed Lifetime Annuity Paycheck Blueprint", "AB Global Retirement Income")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Cero Riesgo de Secuencia de Rendimientos" : "Zero Sequence of Returns Risk"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Su flujo mensual de jubilación queda garantizado por contrato sin importar cuánto tiempo viva o cómo se comporte la bolsa." : "Insulates retirement income from market volatility with contractually guaranteed payouts."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🎁 ${isSpanish ? "Bonificación de Transferencia 401(k) / IRA" : "Upfront Rollover Bonus"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Transfiera sus ahorros de jubilación sin penalidades del IRS recibiendo una bonificación de entrada de hasta el 10%–12%." : "Direct trustee-to-trustee rollovers transfer 100% tax-free with potential upfront bonuses."}</p>
        </div>
      </div>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 4. Funeral Cost Savings Report
  if (data.reportType === "funeral") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Everest Funeral Concierge Savings Report</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Reporte de Ahorro y Concierge Funerario Everest" : "Everest Funeral Concierge Savings Analysis", "AB Global Family Protection")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🤝 ${isSpanish ? "Negociación de Precios 24/7" : "24/7 Professional Price Negotiation"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Directores funerarios licenciados negocian con funerarias locales ahorrando un promedio de más de $3,500 a las familias." : "Licensed funeral directors negotiate directly with mortuaries to eliminate markup and save $3,500+ on average."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">⚡ ${isSpanish ? "Desembolso en 24 a 48 Horas" : "Expedited 24-48 Hour Funding"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Los fondos se envían de inmediato para cubrir los servicios funerarios sin esperar semanas por procesos sucesorios." : "Immediate wire funding directly to providers or beneficiaries without probate delays."}</p>
        </div>
      </div>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 5. D.I.M.E. Life Needs Report
  if (data.reportType === "dime") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>D.I.M.E. Life Insurance Needs Report</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Análisis de Necesidades de Protección D.I.M.E." : "D.I.M.E. Family Protection Needs Report", "AB Global Risk Assessment")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🎯 ${isSpanish ? "Los 4 Pilares D.I.M.E." : "The 4 D.I.M.E. Pillars"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Deudas (D), Reemplazo de Ingresos (I), Hipoteca (M) y Educación Universitaria (E)." : "Debt payoff (D), Income replacement (I), Mortgage balance (M), and Education funds (E)."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Blindaje Integral sin Brechas" : "Zero-Shortfall Family Shield"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Garantiza que su familia mantenga su nivel de vida y su hogar si usted llega a faltar prematuramente." : "Ensures your loved ones maintain their lifestyle and home without inheriting debt burdens."}</p>
        </div>
      </div>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 6. Term vs IUL Report
  if (data.reportType === "term_vs_iul") {
    return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Term vs. IUL Comparative Analysis</title><style>${baseStyles}</style></head><body>
      ${baseHeader(isSpanish ? "Análisis Comparativo: Seguro a Término vs. IUL" : "Comparative Analysis: Buy Term vs. IUL Strategy", "AB Global Mathematical Modeling")}
      <div class="grid">
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">📈 ${isSpanish ? "Ventaja del IUL: Piso del 0%" : "IUL Advantage: 0% Floor & IRS 7702"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Cero riesgo de pérdidas por caídas de bolsa y retiros de retiro 100% libres de impuestos federales." : "Zero market crash downside and 100% tax-free policy loan retirement cash flow."}</p>
        </div>
        <div class="card">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">⚠️ ${isSpanish ? "El Riesgo del Seguro a Término" : "The Term Expiration Risk"}</h3>
          <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "El seguro a término expira a los 20 o 30 años sin dejar valor de rescate, mientras que el IUL mantiene su patrimonio de por vida." : "Term insurance expires with $0 residual equity, while IUL builds lifelong cash value."}</p>
        </div>
      </div>
      <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
    </body></html>`;
  }

  // 7. Long-Term Care (LTC) Report
  return `<!DOCTYPE html><html lang="${isSpanish ? "es" : "en"}"><head><meta charset="utf-8"><title>Nationwide CareMatters LTC Report</title><style>${baseStyles}</style></head><body>
    ${baseHeader(isSpanish ? "Estimación de Cuidado Prolongado Nationwide CareMatters®" : "Nationwide CareMatters® LTC Cash-Indemnity Analysis", "AB Global Asset Protection")}
    <div class="grid">
      <div class="card">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">💵 ${isSpanish ? "Desembolso 100% en Efectivo Directo" : "100% Cash-Indemnity Benefit"}</h3>
        <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Pague a sus propios hijos o familiares para cuidarlo en su hogar sin tener que enviar recibos de agencias a la aseguradora." : "Pay family members or trusted in-home caregivers in cash without submitting agency receipts."}</p>
      </div>
      <div class="card">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #001c38;">🛡️ ${isSpanish ? "Garantía Respaldada por Activos" : "Asset-Based Guarantee"}</h3>
        <p style="font-size: 12px; color: #475569; margin: 0;">${isSpanish ? "Si nunca llega a necesitar cuidados de enfermería, el 100% de su capital pasa libre de impuestos a sus herederos." : "If care is never triggered, your death benefit passes 100% tax-free to your beneficiaries."}</p>
      </div>
    </div>
    <div class="footer"><p>AB Global Consulting &bull; Angel Burgos (FL Lic. #G328926) &bull; https://abglco.com &bull; (386) 333-1482</p></div>
  </body></html>`;
}
