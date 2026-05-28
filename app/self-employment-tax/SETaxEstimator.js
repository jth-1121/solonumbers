'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ── Tax year configuration — update annually ──────────────────────────────
const TAX_CONFIG = {
  2025: {
    ssWageBase: 176100,
    dueDates: [
      { period: 'Jan – Mar',  label: 'Q1', due: 'Apr 15, 2025',  nextYear: false },
      { period: 'Apr – May',  label: 'Q2', due: 'Jun 16, 2025',  nextYear: false },
      { period: 'Jun – Aug',  label: 'Q3', due: 'Sep 15, 2025',  nextYear: false },
      { period: 'Sep – Dec',  label: 'Q4', due: 'Jan 15, 2026',  nextYear: true  },
    ],
  },
  2026: {
    ssWageBase: 184500,
    dueDates: [
      { period: 'Jan – Mar',  label: 'Q1', due: 'Apr 15, 2026',  nextYear: false },
      { period: 'Apr – May',  label: 'Q2', due: 'Jun 15, 2026',  nextYear: false },
      { period: 'Jun – Aug',  label: 'Q3', due: 'Sep 15, 2026',  nextYear: false },
      { period: 'Sep – Dec',  label: 'Q4', due: 'Jan 15, 2027',  nextYear: true  },
    ],
  },
};

// ── SE tax formula constants ───────────────────────────────────────────────
const SE_ADJUSTMENT  = 0.9235;
const SS_RATE        = 0.124;
const MEDICARE_RATE  = 0.029;
const SE_TAX_THRESHOLD = 400; // IRS: SE tax applies when net earnings >= $400

// ── Presets ───────────────────────────────────────────────────────────────
const PRESETS = {
  sideIncome: { income: '15000',  expenses: '1000',  label: 'Side income'         },
  partTime:   { income: '35000',  expenses: '3000',  label: 'Part-time freelance'  },
  fullTime:   { income: '75000',  expenses: '8000',  label: 'Full-time freelance'  },
  highEarner: { income: '150000', expenses: '15000', label: 'High earner'          },
};

export default function SETaxEstimator() {
  const [taxYear,       setTaxYear]       = useState(2026);
  const [grossIncome,   setGrossIncome]   = useState('75000');
  const [expenses,      setExpenses]      = useState('8000');
  const [w2Wages,       setW2Wages]       = useState('');
  const [advOpen,       setAdvOpen]       = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [copied,        setCopied]        = useState(false);
  const [activePreset,  setActivePreset]  = useState(null);

  const config = TAX_CONFIG[taxYear];

  // ── Core calculation (memoized — only recalculates when inputs change) ────
  const calc = useMemo(() => {
    const grossNum = parseFloat(grossIncome) || 0;
    const expNum   = parseFloat(expenses)    || 0;
    const w2Num    = parseFloat(w2Wages)     || 0;

    const netIncome          = Math.max(0, grossNum - expNum);
    const netEarnings        = netIncome * SE_ADJUSTMENT;
    const remainingSS        = Math.max(0, config.ssWageBase - w2Num);
    const earningsForSS      = Math.min(netEarnings, remainingSS);
    const expensesOverIncome = expNum > grossNum;
    const belowThreshold     = netEarnings > 0 && netEarnings < SE_TAX_THRESHOLD;
    const mayTriggerAddMedicare = netEarnings > 200000;

    const socialSecurity = belowThreshold ? 0 : earningsForSS * SS_RATE;
    const medicare       = belowThreshold ? 0 : netEarnings * MEDICARE_RATE;
    const totalSETax     = socialSecurity + medicare;

    return {
      grossNum, expNum, w2Num,
      netIncome, netEarnings, remainingSS, earningsForSS,
      expensesOverIncome, belowThreshold, mayTriggerAddMedicare,
      socialSecurity, medicare, totalSETax,
      deductibleHalf: totalSETax / 2,
      quarterlyAmt:   totalSETax / 4,
      monthlyAmt:     totalSETax / 12,
      netAfterSETax:  netIncome - totalSETax,
      effectiveRate:  grossNum > 0 ? (totalSETax / grossNum) * 100 : 0,
    };
  }, [grossIncome, expenses, w2Wages, taxYear, config.ssWageBase]);

  // ── Formatters ─────────────────────────────────────────────────────────
  const $n  = n => '$' + Math.round(n).toLocaleString('en-US');
  const pct = n => n.toFixed(1) + '%';

  // ── Insight ────────────────────────────────────────────────────────────
  let insightClass = 'insight info';
  let insightText  = '';

  if (calc.expensesOverIncome) {
    insightClass = 'insight warn';
    insightText  = 'Your expenses are higher than your income, so net self-employment income is $0. No SE tax is owed on a net loss. Double-check your numbers.';
  } else if (calc.belowThreshold) {
    insightClass = 'insight info';
    insightText  = `Self-employment tax generally applies when net earnings from self-employment are $400 or more. Your net earnings are below that threshold, so no SE tax is estimated here.`;
  } else if (calc.mayTriggerAddMedicare) {
    insightClass = 'insight warn';
    insightText  = `Your net earnings may trigger the Additional Medicare Tax (0.9%) depending on your filing status, W-2 wages, and total income. This calculator does not include that amount — a tax professional can help you estimate it.`;
  } else if (calc.w2Num > 0 && calc.earningsForSS < calc.netEarnings) {
    insightClass = 'insight info';
    insightText  = `Because you entered ${$n(calc.w2Num)} in W-2 wages from your regular job, the available Social Security wage base for SE tax is reduced to ${$n(calc.remainingSS)}. Your Social Security portion is calculated on ${$n(calc.earningsForSS)}, not the full net earnings amount.`;
  } else {
    insightClass = 'insight info';
    insightText  = `This is SE tax only — Social Security and Medicare. You may also owe federal income tax and possibly state income tax. Depending on your income, deductions, filing status, and state, your total set-aside will likely need to be higher than this estimate.`;
  }

  // ── Handlers ──────────────────────────────────────────────────────────
  function applyPreset(key) {
    const p = PRESETS[key];
    setGrossIncome(p.income);
    setExpenses(p.expenses);
    setActivePreset(key);
  }

  function handleInputChange(setter) {
    return (e) => {
      setter(e.target.value);
      setActivePreset(null);
    };
  }

  function clearPreset() { setActivePreset(null); }

  function copyResult() {
    const text = `SE Tax (${taxYear}): ${$n(calc.totalSETax)}/yr · Quarterly: ${$n(calc.quarterlyAmt)} · Monthly: ${$n(calc.monthlyAmt)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <>
      <div className="page">

        <header className="header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div className="logo">Solo<em>Numbers</em></div>
            </Link>
            <Link href="/" style={{ fontSize: '13px', color: 'var(--text-3)', textDecoration: 'none', fontWeight: 500 }}>
              ← All tools
            </Link>
          </div>
        </header>

        <div className="eyebrow">Free Calculator</div>
        <h1>Self-Employment Tax Estimator</h1>
        <p className="page-intro">
          Estimate the Social Security and Medicare tax you owe on self-employment income — and see how much to set aside each quarter and month.
        </p>

        {/* Tax year selector */}
        <div className="tax-year-row">
          <span className="tax-year-label">Tax year</span>
          <div className="tax-year-toggle">
            {Object.keys(TAX_CONFIG).map((yr) => (
              <button
                key={yr}
                type="button"
                className={`tax-year-btn${taxYear === parseInt(yr) ? ' active' : ''}`}
                onClick={() => setTaxYear(parseInt(yr))}
                aria-pressed={taxYear === parseInt(yr)}
                aria-label={`Switch to ${yr} tax year`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>
        <div className="tax-year-note">
          Currently using {taxYear} tax rules. Tax limits and due dates change each year.
        </div>

        {/* Presets */}
        <div className="presets-label">Start with a profile</div>
        <div className="presets">
          {Object.entries(PRESETS).map(([key, p]) => (
            <button
              key={key}
              className={`preset-btn${activePreset === key ? ' active' : ''}`}
              onClick={() => applyPreset(key)}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Inputs */}
        <div className="card" id="inputs-card">
          <div className="card-title">Your self-employment income</div>

          <div className="field">
            <label htmlFor="gross-income" className="field-label">
              <span className="field-name">Gross self-employment income</span>
              <span className="field-hint">before expenses</span>
            </label>
            <div className="dollar-input">
              <span className="dollar-sign">$</span>
              <input
                id="gross-income"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={grossIncome}
                aria-label="Gross self-employment income before expenses"
                onChange={handleInputChange(setGrossIncome)}
              />
            </div>
            <div className="field-helper">
              Total revenue or 1099 income before deducting any business expenses.
            </div>
          </div>

          <div className="field">
            <label htmlFor="expenses" className="field-label">
              <span className="field-name">Business expenses</span>
              <span className="field-hint">deductible costs</span>
            </label>
            <div className="dollar-input">
              <span className="dollar-sign">$</span>
              <input
                id="expenses"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={expenses}
                aria-label="Deductible business expenses"
                onChange={handleInputChange(setExpenses)}
              />
            </div>
            <div className="field-helper">
              Software, equipment, home office, professional services, and other deductible costs. SE tax is calculated on net income after expenses.
            </div>
          </div>

          {/* Net income strip */}
          {!calc.expensesOverIncome && calc.netIncome > 0 && (
            <div className="net-income-strip">
              <span className="net-income-label">Net self-employment income</span>
              <span className="net-income-value">{$n(calc.netIncome)}</span>
            </div>
          )}

          {calc.expensesOverIncome && (
            <div className="net-income-strip net-income-strip--warn">
              <span className="net-income-label">Expenses exceed income — net income is $0</span>
              <span className="net-income-value" style={{ color: 'var(--amber)' }}>$0</span>
            </div>
          )}
        </div>

        {/* Advanced — W2 wages */}
        <div className={`accordion${advOpen ? ' open' : ''}`}>
          <button
            className="accordion-trigger"
            onClick={() => setAdvOpen(!advOpen)}
            aria-expanded={advOpen}
          >
            <div className="accordion-trigger-left">
              <span className="accordion-title">Also have a regular job? Add W-2 wages to improve accuracy</span>
              <span className={`accordion-badge${calc.w2Num > 0 ? ' filled' : ''}`}>
                {calc.w2Num > 0 ? 'added ✓' : 'optional'}
              </span>
            </div>
            <span className="accordion-icon">▾</span>
          </button>
          <div className="accordion-body">
            <div className="field" style={{ marginTop: '16px' }}>
              <div className="field-label">
                <span className="field-name">W-2 wages from your regular job</span>
                <span className="field-hint">already taxed by employer</span>
              </div>
              <div className="dollar-input">
                <span className="dollar-sign">$</span>
                <input
                  id="w2-wages"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={w2Wages}
                  placeholder="0"
                  aria-label="W-2 wages from regular employment already subject to Social Security tax"
                  onChange={(e) => setW2Wages(e.target.value)}
                />
              </div>
              <div className="field-helper">
                Wages already subject to Social Security tax — usually shown on your W-2. Your employer withheld this, so it counts toward the annual Social Security wage base limit.
              </div>
            </div>
            <div className="adv-note">
              For {taxYear}, the Social Security wage base is {$n(config.ssWageBase)}. W-2 wages reduce how much of your self-employment income is subject to the 12.4% Social Security tax. Medicare tax (2.9%) still applies to all net SE earnings regardless.
            </div>
          </div>
        </div>

        {/* Result card */}
        <div className="result-card">

          <div className="result-header">
            <div className="result-eyebrow">Estimated self-employment tax — {taxYear}</div>
            <div className="result-main">
              <span className="currency">$</span>
              <span>{Math.round(calc.totalSETax).toLocaleString()}</span>
            </div>
            <div className="result-caption">
              {calc.netIncome > 0
                ? `${pct(calc.effectiveRate)} of gross income · based on ${$n(calc.netIncome)} net income`
                : 'Enter your income above to see your estimate'}
            </div>
            {calc.netIncome > 0 && (
              <div className="sanity-anchor">
                SE tax only — does not include federal or state income tax
              </div>
            )}
          </div>

          {/* Three-cell strip */}
          <div className="tier-grid">
            <div className="tier-cell recommended">
              <div className="tier-label">★ Quarterly set-aside</div>
              <div className="tier-rate">{$n(calc.quarterlyAmt)}</div>
              <div className="tier-desc">Set aside every 3 months</div>
            </div>
            <div className="tier-cell">
              <div className="tier-label">Monthly set-aside</div>
              <div className="tier-rate">{$n(calc.monthlyAmt)}</div>
              <div className="tier-desc">If you budget monthly</div>
            </div>
            <div className="tier-cell">
              <div className="tier-label">Deductible amount</div>
              <div className="tier-rate">{$n(calc.deductibleHalf)}</div>
              <div className="tier-desc">Reduces taxable income</div>
            </div>
          </div>

          {/* Net income remaining */}
          {calc.netIncome > 0 && !calc.belowThreshold && (
            <div className="remaining-strip">
              <div className="remaining-left">
                <div className="remaining-label">Net income after estimated SE tax</div>
                <div className="remaining-sub">Before federal income tax, state tax, living expenses, and savings</div>
              </div>
              <div className="remaining-value">{$n(calc.netAfterSETax)}</div>
            </div>
          )}

          {/* Quarterly due dates */}
          <div className="quarterly-dates">
            <div className="quarterly-dates-label">{taxYear} estimated tax due dates</div>
            <div className="quarterly-dates-grid">
              {config.dueDates.map((d, i) => (
                <div className="qdate-cell" key={i}>
                  <div className="qdate-period">{d.label}: {d.period}</div>
                  <div className="qdate-due">
                    {d.due}
                    {d.nextYear && <div className="qdate-next-year">paid in following year</div>}
                  </div>
                  <div className="qdate-amount">{$n(calc.quarterlyAmt)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button
              className={`action-btn${copied ? ' copied' : ''}`}
              onClick={copyResult}
              aria-label="Copy SE tax estimate to clipboard"
            >
              {copied ? '✓ Copied!' : '📋 Copy estimate'}
            </button>
          </div>

          {/* Collapsible breakdown */}
          <button
            className={`breakdown-toggle${breakdownOpen ? ' open' : ''}`}
            onClick={() => setBreakdownOpen(!breakdownOpen)}
          >
            {breakdownOpen ? 'Hide breakdown' : 'Show how we calculated this'}
            <span className="breakdown-toggle-icon">▾</span>
          </button>

          {breakdownOpen && (
            <div className="breakdown-body open">
              <div className="breakdown-title">Standard Schedule SE calculation</div>
              <div className="bd-row">
                <span className="bd-name">Gross self-employment income</span>
                <span className="bd-val">{$n(calc.grossNum)}</span>
              </div>
              <div className="bd-row">
                <span className="bd-name">Business expenses</span>
                <span className="bd-val">− {$n(calc.expNum)}</span>
              </div>
              <div className="bd-row">
                <span className="bd-name">Net self-employment income</span>
                <span className="bd-val">{$n(calc.netIncome)}</span>
              </div>
              <div className="bd-row">
                <span className="bd-name">× {(SE_ADJUSTMENT * 100).toFixed(2)}% Schedule SE adjustment</span>
                <span className="bd-val">{$n(calc.netEarnings)}</span>
              </div>
              {calc.w2Num > 0 && (
                <div className="bd-row">
                  <span className="bd-name">Social Security base remaining after W-2 wages</span>
                  <span className="bd-val">{$n(calc.remainingSS)}</span>
                </div>
              )}
              <div className="bd-row">
                <span className="bd-name">Social Security tax (12.4% on {$n(calc.earningsForSS)})</span>
                <span className="bd-val">{$n(calc.socialSecurity)}</span>
              </div>
              <div className="bd-row">
                <span className="bd-name">Medicare tax (2.9% on {$n(calc.netEarnings)})</span>
                <span className="bd-val">{$n(calc.medicare)}</span>
              </div>
              <div className="bd-total-row">
                <span className="bd-total-name">Total self-employment tax</span>
                <span className="bd-total-val">{$n(calc.totalSETax)}</span>
              </div>
              <div className="bd-row" style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
                <span className="bd-name">Deductible amount (50% of SE tax)</span>
                <span className="bd-val" style={{ color: 'var(--green)' }}>− {$n(calc.deductibleHalf)}</span>
              </div>
              <div className="adv-note" style={{ marginTop: '12px' }}>
                The deductible amount reduces your adjusted gross income on your federal return. It does not reduce your SE tax bill dollar-for-dollar.
              </div>
            </div>
          )}

          <div className={insightClass}>{insightText}</div>
        </div>

        {/* Ad unit */}
        <div className="ad-unit ad-728">Advertisement · 728×90</div>

        {/* SEO + FAQ */}
        <div className="seo">
          <p className="seo-intro">
            Self-employment tax surprises a lot of new freelancers because nobody withholds it for you. There is no payroll department quietly handling it in the background. This calculator estimates the Social Security and Medicare tax you may owe on net self-employment income, then breaks it into quarterly and monthly amounts so you can plan before tax season shows up with a clipboard and an attitude.
          </p>

          <h2>Frequently asked questions</h2>

          <details className="faq-item">
            <summary>What is self-employment tax?</summary>
            <div className="faq-body">Self-employment tax covers Social Security (12.4%) and Medicare (2.9%) — a combined 15.3%. When you are employed, your employer pays half. When you are self-employed, you pay both sides. The IRS applies this to 92.35% of your net self-employment income, giving an effective rate of roughly 14.1% on net income.</div>
          </details>

          <details className="faq-item">
            <summary>Why does the calculator use 92.35%?</summary>
            <div className="faq-body">The IRS multiplies your net self-employment income by 92.35% before calculating SE tax. This factor accounts for the fact that employees only pay half of FICA taxes — reducing your taxable self-employment income slightly to put self-employed workers on comparable footing with employees. This is the standard Schedule SE calculation method.</div>
          </details>

          <details className="faq-item">
            <summary>What is the Social Security wage base for 2026?</summary>
            <div className="faq-body">For 2026, the Social Security wage base is $184,500. The 12.4% Social Security portion of SE tax only applies to net earnings up to that amount. Earnings above it are still subject to the 2.9% Medicare tax but not the Social Security portion. This is why high earners have a lower effective SE tax rate than 15.3%.</div>
          </details>

          <details className="faq-item">
            <summary>Can I deduct self-employment tax?</summary>
            <div className="faq-body">Yes. You can deduct half of your SE tax when calculating your adjusted gross income on your federal return. This is an above-the-line deduction — you do not need to itemize to claim it. The deduction reduces your taxable income, not your SE tax bill dollar-for-dollar.</div>
          </details>

          <details className="faq-item">
            <summary>When are 2026 quarterly estimated tax payments due?</summary>
            <div className="faq-body">For 2026, the estimated tax due dates are April 15 (Q1), June 15 (Q2), September 15 (Q3), and January 15, 2027 (Q4). Note that Q4 is always paid in January of the following year. These dates cover both SE tax and income tax estimates. If you expect to owe $1,000 or more in taxes for the year, the IRS generally requires quarterly payments to avoid underpayment penalties.</div>
          </details>

          <details className="faq-item">
            <summary>Does this calculator include income tax?</summary>
            <div className="faq-body">No. This calculator estimates SE tax only — Social Security and Medicare. You will also owe federal income tax and possibly state income tax on your self-employment income. Depending on your income, deductions, filing status, and state, your total tax set-aside will likely need to be higher than the SE tax estimate shown here.</div>
          </details>

          <details className="faq-item">
            <summary>What if I have both W-2 income and self-employment income?</summary>
            <div className="faq-body">If you have W-2 wages, your employer already withheld Social Security tax on those earnings. This reduces the Social Security wage base available for your self-employment income. Use the optional W-2 wages field in this calculator to account for that. Medicare tax (2.9%) applies to all self-employment net earnings regardless of W-2 wages.</div>
          </details>

          <h2>Related tools</h2>
          <p className="related-bridge">Build your complete freelance financial picture with these calculators and guides.</p>
          <div className="tools-grid">
            <Link className="tool-link" href="/freelance-hourly-rate">
              <div className="tool-link-tag">Calculator</div>
              <div className="tool-link-name">Freelance Hourly Rate Calculator</div>
              <div className="tool-link-desc">Build SE tax into your rate from the start</div>
            </Link>
            <Link className="tool-link" href="/guides/calculate-self-employment-tax-into-hourly-rate">
              <div className="tool-link-tag">Guide</div>
              <div className="tool-link-name">How to Calculate SE Tax Into Your Rate</div>
              <div className="tool-link-desc">Why your rate needs to account for SE tax</div>
            </Link>
            <a className="tool-link" href="#">
              <div className="tool-link-tag">Calculator</div>
              <div className="tool-link-name">Project Profit Margin</div>
              <div className="tool-link-desc">What you actually earn per project</div>
            </a>
            <a className="tool-link" href="#">
              <div className="tool-link-tag">Calculator</div>
              <div className="tool-link-name">Invoice Late Fee Calculator</div>
              <div className="tool-link-desc">Interest on overdue invoices</div>
            </a>
          </div>
        </div>

        <div className="ad-unit ad-300" style={{ marginTop: '24px' }}>Advertisement · 300×250</div>

        <p className="disclaimer">
          This calculator estimates self-employment tax using the standard Schedule SE calculation method (net income × 92.35% × 15.3%) and the {taxYear} Social Security wage base of {$n(config.ssWageBase)}. It does not calculate federal income tax, state income tax, the Additional Medicare Tax (0.9% on earnings above certain thresholds based on filing status), the SE tax deduction impact on income tax, or other taxes. Quarterly payment amounts are estimates only and assume equal income across all four quarters. Consult a qualified tax professional for advice specific to your situation.
        </p>

        <p className="last-updated">Last updated for {taxYear} tax rules.</p>

      </div>

      {/* Sticky bar */}
      {calc.grossNum > 0 && (
        <div className="sticky-bar show">
          <div>
            <div className="sticky-label">Self-employment tax — {taxYear}</div>
            <div className="sticky-rate">{$n(calc.totalSETax)}/yr</div>
          </div>
          <button
            className="sticky-scroll-btn"
            onClick={() => document.getElementById('inputs-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            aria-label="Scroll back to edit inputs"
          >
 