'use client';

import { useState } from 'react';
import Link from 'next/link';

const PRESETS = {
  sideHustle:    { income: 25000,  billable: 15, weeks: 44, expenses: '1000',  health: '',    retirement: 0,  buffer: 15 },
  newFreelancer: { income: 60000,  billable: 25, weeks: 48, expenses: '4000',  health: '350', retirement: 3,  buffer: 20 },
  established:   { income: 90000,  billable: 25, weeks: 46, expenses: '8000',  health: '500', retirement: 8,  buffer: 25 },
  consultant:    { income: 150000, billable: 20, weeks: 44, expenses: '15000', health: '650', retirement: 12, buffer: 30 },
};

const PRESET_LABELS = {
  sideHustle:    'Side hustle',
  newFreelancer: 'New freelancer',
  established:   'Established',
  consultant:    'Senior consultant',
};

export default function FreelanceCalculator() {
  const [income,       setIncome]       = useState('75000');
  const [billable,     setBillable]     = useState(25);
  const [weeks,        setWeeks]        = useState(48);
  const [expenses,     setExpenses]     = useState('');
  const [health,       setHealth]       = useState('');
  const [retirement,   setRetirement]   = useState(0);
  const [taxRate,      setTaxRate]      = useState(14.1);
  const [buffer,       setBuffer]       = useState(20);
  const [accordionOpen,  setAccordionOpen]  = useState(false);
  const [breakdownOpen,  setBreakdownOpen]  = useState(false);
  const [derivedOpen,    setDerivedOpen]    = useState(false);
  const [copied,         setCopied]         = useState(false);
  const [activePreset,   setActivePreset]   = useState(null);

  // ── Derived calculations ──────────────────────────────────────────────────
  const expNum       = parseFloat(expenses) || 0;
  const healthNum    = parseFloat(health)   || 0;
  const healthAnnual = healthNum * 12;
  const retireAnnual = income * (retirement / 100);
  const seTax        = income * (taxRate / 100);
  const totalNeeded  = income + seTax + expNum + healthAnnual + retireAnnual;
  const hoursPerYear = billable * weeks;
  const baseRate     = hoursPerYear > 0 ? totalNeeded / hoursPerYear : 0;
  const recRate      = baseRate * (1 + buffer / 100);
  const stretchRate  = recRate * 1.20;
  const weeklyRev    = Math.round(recRate * billable);
  const naiveRate    = income > 0 ? Math.round(income / 2080) : 0;
  const gap          = Math.round(recRate) - naiveRate;

  // ── Formatters ────────────────────────────────────────────────────────────
  const fmt   = (n) => '$' + Math.round(n).toLocaleString('en-US');
  const fmtHr = (n) => '$' + Math.round(n) + '/hr';

  // ── Badge ─────────────────────────────────────────────────────────────────
  const advCustomized = expNum > 0 || healthNum > 0 || retirement > 0 || buffer !== 20 || taxRate !== 14.1;

  // ── Insight ───────────────────────────────────────────────────────────────
  let insightClass = 'insight info';
  let insightText  = '';
  if (billable >= 35) {
    insightClass = 'insight warn';
    insightText  = `${billable} billable hours/week is ambitious. Most full-time freelancers achieve 20–25 once admin, marketing, and project gaps are accounted for. Try 25 hours for a more realistic estimate.`;
  } else if (gap > 15) {
    insightClass = 'insight info';
    insightText  = `A basic earnings ÷ hours calculation would suggest ~${fmt(naiveRate)}/hr. Accounting for SE tax, costs, and your ${Math.round(buffer)}% buffer, you need ~${fmtHr(recRate)} — ${fmt(gap)} more per hour. That gap is why most freelancers undercharge.`;
  } else {
    insightClass = 'insight good';
    insightText  = `Your recommended rate of ${fmtHr(recRate)} covers your income goal, SE tax, costs, and a ${Math.round(buffer)}% buffer for sustainable freelance work.`;
  }

  // ── Stepper helper ────────────────────────────────────────────────────────
  function stepVal(val, delta, min, max, setter, clearPreset = true) {
    const next = Math.min(max, Math.max(min, parseFloat((val + delta).toFixed(2))));
    setter(next);
    if (clearPreset) setActivePreset(null);
  }

  // ── Apply preset ──────────────────────────────────────────────────────────
  function applyPreset(key) {
    const p = PRESETS[key];
    setIncome(p.income);
    setBillable(p.billable);
    setWeeks(p.weeks);
    setExpenses(p.expenses);
    setHealth(p.health);
    setRetirement(p.retirement);
    setBuffer(p.buffer);
    setActivePreset(key);
    if (p.expenses || p.health || p.retirement > 0) setAccordionOpen(true);
  }

  // ── Copy rate ─────────────────────────────────────────────────────────────
  function copyRate() {
    navigator.clipboard.writeText(`$${Math.round(recRate)}/hr`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // ── Scroll to inputs ──────────────────────────────────────────────────────
  function scrollToInputs() {
    document.getElementById('inputs-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <>
      <div className="page">

        <header className="header">
          <Link href="/" style={{ textDecoration: 'none' }}><div className="logo">Solo<em>Numbers</em></div></Link>
        </header>

        <div className="eyebrow">Free Calculator</div>
        <h1>Freelance Hourly Rate Calculator</h1>
        <p className="page-intro">
          Enter your income goal to see your rate instantly. Add expenses and benefits to sharpen the number.
        </p>

        {/* ── Presets ── */}
        <div className="presets-label">Start with a profile</div>
        <div className="presets">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              className={`preset-btn${activePreset === key ? ' active' : ''}`}
              onClick={() => applyPreset(key)}
            >
              {PRESET_LABELS[key]}
            </button>
          ))}
        </div>

        {/* ── Essential inputs ── */}
        <div className="card" id="inputs-card">
          <div className="card-title">Essential inputs</div>

          <div className="field">
            <div className="field-label">
              <span className="field-name">Desired personal income</span>
              <span className="field-hint">before federal &amp; state income tax</span>
            </div>
            <div className="dollar-input">
              <span className="dollar-sign">$</span>
              <input
                type="text"
                inputMode="decimal"
                pattern="[0-9,]*"
                value={income}
                min={0}
                step={5000}
                onChange={(e) => { setIncome(e.target.value); setActivePreset(null); }}
              />
            </div>
            <div className="field-helper">
              Example: to replace a $75,000 salary, enter 75,000. We add self-employment tax and your business costs on top to calculate your required rate.
            </div>
          </div>

          <div className="field-grid">
            <div className="field">
              <div className="field-label">
                <span className="field-name">Billable hours</span>
                <span className="field-hint">per week</span>
              </div>
              <div className="stepper">
                <button className="step-btn left" onClick={() => stepVal(billable, -1, 1, 60, setBillable)} aria-label="Decrease">−</button>
                <input className="step-input" type="number" inputMode="numeric" value={billable} min={1} max={60}
                  onChange={(e) => { setBillable(parseFloat(e.target.value) || 1); setActivePreset(null); }} />
                <span className="step-unit">hrs/wk</span>
                <button className="step-btn right" onClick={() => stepVal(billable, 1, 1, 60, setBillable)} aria-label="Increase">+</button>
              </div>
              <div className="field-helper">Exclude admin, marketing, and email time.</div>
            </div>

            <div className="field">
              <div className="field-label">
                <span className="field-name">Weeks worked</span>
                <span className="field-hint">per year</span>
              </div>
              <div className="stepper">
                <button className="step-btn left" onClick={() => stepVal(weeks, -1, 1, 52, setWeeks)} aria-label="Decrease">−</button>
                <input className="step-input" type="number" inputMode="numeric" value={weeks} min={1} max={52}
                  onChange={(e) => { setWeeks(parseFloat(e.target.value) || 1); setActivePreset(null); }} />
                <span className="step-unit">wks/yr</span>
                <button className="step-btn right" onClick={() => stepVal(weeks, 1, 1, 52, setWeeks)} aria-label="Increase">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Advanced accordion ── */}
        <div className={`accordion${accordionOpen ? ' open' : ''}`}>
          <button className="accordion-trigger" onClick={() => setAccordionOpen(!accordionOpen)} aria-expanded={accordionOpen}>
            <div className="accordion-trigger-left">
              <span className="accordion-title">Add taxes, benefits &amp; expenses to improve accuracy</span>
              <span className={`accordion-badge${advCustomized ? ' filled' : ''}`}>
                {advCustomized ? 'customized ✓' : 'optional'}
              </span>
            </div>
            <span className="accordion-icon">▾</span>
          </button>
          <div className="accordion-body">

            <div className="adv-group-label">Costs</div>

            <div className="field-grid">
              <div className="field">
                <div className="field-label">
                  <span className="field-name">Business expenses</span>
                  <span className="field-hint">per year</span>
                </div>
                <div className="dollar-input">
                  <span className="dollar-sign">$</span>
                  <input type="number" inputMode="numeric" value={expenses} placeholder="5,000" min={0} step={500}
                    onChange={(e) => setExpenses(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="field-label">
                  <span className="field-name">Health insurance</span>
                  <span className="field-hint">per month</span>
                </div>
                <div className="dollar-input">
                  <span className="dollar-sign">$</span>
                  <input type="number" inputMode="numeric" value={health} placeholder="400" min={0} step={50}
                    onChange={(e) => setHealth(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <div className="field-label">
                  <span className="field-name">Retirement</span>
                  <span className="field-hint">% of income</span>
                </div>
                <div className="stepper">
                  <button className="step-btn left" onClick={() => stepVal(retirement, -1, 0, 50, setRetirement, false)}>−</button>
                  <input className="step-input" type="number" value={retirement} min={0} max={50}
                    onChange={(e) => setRetirement(parseFloat(e.target.value) || 0)} />
                  <span className="step-unit">%</span>
                  <button className="step-btn right" onClick={() => stepVal(retirement, 1, 0, 50, setRetirement, false)}>+</button>
                </div>
              </div>
            </div>

            <div className="adv-group-label">Tax estimate</div>

            <div className="field" style={{ maxWidth: '200px' }}>
              <div className="field-label">
                <span className="field-name">SE tax rate</span>
                <span className="field-hint">standard ≈ 14.1%</span>
              </div>
              <div className="stepper">
                <button className="step-btn left" onClick={() => stepVal(taxRate, -0.5, 0, 40, setTaxRate, false)}>−</button>
                <input className="step-input" type="number" value={taxRate} min={0} max={40} step={0.5}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)} />
                <span className="step-unit">%</span>
                <button className="step-btn right" onClick={() => stepVal(taxRate, 0.5, 0, 40, setTaxRate, false)}>+</button>
              </div>
            </div>

            <div className="adv-note">
              SE tax covers Social Security &amp; Medicare (15.3% × 92.35% of net earnings). Standard effective rate is ~14.1%. Federal and state income tax apply separately and are not modeled here.
            </div>

            <div className="adv-group-label">Safety buffer</div>

            <div className="field" style={{ maxWidth: '220px' }}>
              <div className="field-label">
                <span className="field-name">Buffer percentage</span>
                <span className="field-hint">added to base rate</span>
              </div>
              <div className="stepper">
                <button className="step-btn left" onClick={() => stepVal(buffer, -5, 0, 100, setBuffer, false)}>−</button>
                <input className="step-input" type="number" value={buffer} min={0} max={100} step={5}
                  onChange={(e) => setBuffer(parseFloat(e.target.value) || 0)} />
                <span className="step-unit">%</span>
                <button className="step-btn right" onClick={() => stepVal(buffer, 5, 0, 100, setBuffer, false)}>+</button>
              </div>
              <div className="field-helper">Covers slow months, scope creep, and late invoices. Raise it for project-based or seasonal work.</div>
            </div>

          </div>
        </div>

        {/* ── Result card ── */}
        <div className="result-card">

          <div className="result-header">
            <div className="result-eyebrow">Recommended rate</div>
            <div className="result-main">
              <span className="currency">$</span>
              <span>{Math.round(recRate).toLocaleString()}</span>
              <span className="per-hr">/hr</span>
            </div>
            <div className="result-caption">
              Includes {Math.round(buffer)}% buffer · {billable} billable hrs/wk × {weeks} weeks
            </div>
            {income > 0 && (
              <div className="sanity-anchor">
                At {billable} hrs/wk, this means roughly {fmt(weeklyRev)}/week in client work
              </div>
            )}
          </div>

          {/* Three tiers */}
          <div className="tier-grid">
            <div className="tier-cell">
              <div className="tier-label">Floor</div>
              <div className="tier-rate">{fmtHr(baseRate)}</div>
              <div className="tier-desc">No buffer — absolute minimum</div>
            </div>
            <div className="tier-cell recommended">
              <div className="tier-label">★ Recommended</div>
              <div className="tier-rate">{fmtHr(recRate)}</div>
              <div className="tier-desc">+{Math.round(buffer)}% buffer applied</div>
            </div>
            <div className="tier-cell">
              <div className="tier-label">Stretch</div>
              <div className="tier-rate">{fmtHr(stretchRate)}</div>
              <div className="tier-desc">For high-demand or complex work</div>
            </div>
          </div>

          {/* Actions */}
          <div className="result-actions">
            <button className={`action-btn${copied ? ' copied' : ''}`} onClick={copyRate}>
              {copied ? '✓ Copied!' : '📋 Copy rate'}
            </button>
            <button className="action-btn" onClick={() => setDerivedOpen(!derivedOpen)}>
              {derivedOpen ? '📅 Hide' : '📅 Day & month'}
            </button>
          </div>

          {/* Inline derived strip */}
          {derivedOpen && (
            <div className="derived-strip show">
              <div className="derived-cell">
                <div className="derived-label">Day rate (8 hrs)</div>
                <div className="derived-value">{fmt(recRate * 8)}</div>
              </div>
              <div className="derived-cell">
                <div className="derived-label">Monthly revenue target</div>
                <div className="derived-value">{fmt(recRate * billable * (weeks / 12))}</div>
              </div>
            </div>
          )}

          {/* Collapsible breakdown */}
          <button
            className={`breakdown-toggle${breakdownOpen ? ' open' : ''}`}
            onClick={() => setBreakdownOpen(!breakdownOpen)}
          >
            {breakdownOpen ? 'Hide breakdown' : 'Show how we got there'}
            <span className="breakdown-toggle-icon">▾</span>
          </button>

          {breakdownOpen && (
            <div className="breakdown-body open">
              <div className="breakdown-title">Full breakdown</div>
              <div className="bd-row">
                <span className="bd-name">Desired personal income</span>
                <span className="bd-val">{fmt(income)}</span>
              </div>
              <div className="bd-row">
                <span className="bd-name">Self-employment tax (est.)</span>
                <span className="bd-val">{fmt(seTax)}</span>
              </div>
              {expNum > 0 && (
                <div className="bd-row">
                  <span className="bd-name">Business expenses</span>
                  <span className="bd-val">{fmt(expNum)}</span>
                </div>
              )}
              {healthAnnual > 0 && (
                <div className="bd-row">
                  <span className="bd-name">Health insurance (annual)</span>
                  <span className="bd-val">{fmt(healthAnnual)}</span>
                </div>
              )}
              {retireAnnual > 0 && (
                <div className="bd-row">
                  <span className="bd-name">Retirement contributions</span>
                  <span className="bd-val">{fmt(retireAnnual)}</span>
                </div>
              )}
              <div className="bd-total-row">
                <span className="bd-total-name">Total revenue needed / year</span>
                <span className="bd-total-val">{fmt(totalNeeded)}</span>
              </div>
            </div>
          )}

          <div className={insightClass}>{insightText}</div>
        </div>

        {/* ── Ad unit ── */}
        <div className="ad-unit ad-728">Advertisement · 728×90</div>

        {/* ── SEO + FAQ ── */}
        <div className="seo">
          <p className="seo-intro">
            Most freelancers undercharge because they calculate their rate wrong — dividing a salary target by 2,080 hours without accounting for taxes, benefits, or realistic billable time. This calculator fixes that.
          </p>

          <h2>Frequently asked questions</h2>

          <details className="faq-item">
            <summary>Why is my recommended rate higher than expected?</summary>
            <div className="faq-body">As a freelancer you pay both sides of Social Security and Medicare — roughly 14% on top of your earnings. You also cover health insurance, retirement, and business costs an employer would normally fund. And you won't bill 40 hours every week. Once all of this is factored in, a $75,000 income goal typically requires $85–110/hr depending on your situation.</div>
          </details>

          <details className="faq-item">
            <summary>What is a realistic number of billable hours per week?</summary>
            <div className="faq-body">20–25 hours is realistic for most full-time freelancers once you account for admin, proposals, invoicing, professional development, and gaps between projects. 40 billable hours every week is possible in short bursts but unsustainable as a baseline for rate-setting.</div>
          </details>

          <details className="faq-item">
            <summary>What does the safety buffer cover?</summary>
            <div className="faq-body">Slow months, scope creep you don't bill for, late-paying clients, and unpaid revision cycles. The default 20% is a reasonable starting point. Raise it if your work is highly project-based, seasonal, or if clients frequently push back on invoices.</div>
          </details>

          <details className="faq-item">
            <summary>Does this calculator include income tax?</summary>
            <div className="faq-body">This calculator adds self-employment tax on top of your income goal — the Social Security and Medicare taxes most employed people don't pay directly. It does not model federal or state income tax, which will take an additional 15–35% depending on your income and location. Set your income goal with that in mind. A full income tax estimator is a planned future tool.</div>
          </details>

          <details className="faq-item">
            <summary>Which rate should I quote clients?</summary>
            <div className="faq-body">Use the recommended rate as your standard quote and the floor as your absolute minimum. Your rate should also reflect your experience, the value you deliver, and market expectations. Many experienced freelancers charge well above the recommended calculation, particularly in specialized fields.</div>
          </details>

          <h2>Related tools</h2>
          <p className="related-bridge">Next: estimate your quarterly self-employment tax, or find out what you actually keep per project.</p>
          <div className="tools-grid">
            <Link className="tool-link" href="/self-employment-tax">
              <div className="tool-link-tag">Calculator</div>
              <div className="tool-link-name">Self-Employment Tax Estimator</div>
              <div className="tool-link-desc">Estimate quarterly SE tax payments</div>
            </Link>
            <div className="tool-link tool-link--disabled" aria-disabled="true">
              <div className="tool-link-tag">Coming soon</div>
              <div className="tool-link-name">Project Profit Margin</div>
              <div className="tool-link-desc">What you actually earn per project</div>
            </div>
            <div className="tool-link tool-link--disabled" aria-disabled="true">
              <div className="tool-link-tag">Coming soon</div>
              <div className="tool-link-name">Invoice Late Fee Calculator</div>
              <div className="tool-link-desc">Interest on overdue invoices</div>
            </div>
            <div className="tool-link tool-link--disabled" aria-disabled="true">
              <div className="tool-link-tag">Coming soon</div>
              <div className="tool-link-name">Stripe Fee Calculator</div>
              <div className="tool-link-desc">What Stripe takes per transaction</div>
            </div>
          </div>
        </div>

        <div className="ad-unit ad-300" style={{ marginTop: '24px' }}>Advertisement · 300×250</div>

        <p className="disclaimer">
          Estimates only. SE tax uses the standard IRS formula (15.3% × 92.35% of net earnings). Does not model federal income tax, state income tax, the SE tax deduction, QBI deduction, or income phase-outs. Consult a qualified tax professional for your specific situation.
        </p>

      </div>

      {/* ── Sticky mobile bar ── */}
      {income > 0 && (
        <div className="sticky-bar show">
          <div>
            <div className="sticky-label">Recommende