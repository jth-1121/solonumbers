import Link from 'next/link';

const categories = [
  {
    name: 'Pricing & Rates',
    icon: '💰',
    tools: [
      {
        slug: 'freelance-hourly-rate',
        name: 'Freelance Hourly Rate Calculator',
        desc: 'Find the minimum rate you need to charge to cover taxes, benefits, and realistic billable hours.',
        live: true,
      },
      {
        slug: 'project-profit-margin',
        name: 'Project Profit Margin Calculator',
        desc: 'See what you actually earn on a project after expenses and time.',
        live: false,
      },
      {
        slug: 'billable-hours-income',
        name: 'Billable Hours to Income Calculator',
        desc: 'If you bill X hours at Y rate, what is your actual annual take-home?',
        live: false,
      },
      {
        slug: 'salary-to-hourly',
        name: 'Salary to Freelance Rate Converter',
        desc: 'Convert a salaried job offer to its freelance equivalent — including taxes and benefits.',
        live: false,
      },
      {
        slug: 'consulting-day-rate',
        name: 'Consulting Day Rate Calculator',
        desc: 'Calculate your day rate from your hourly rate or annual income target.',
        live: false,
      },
    ],
  },
  {
    name: 'Tax Estimators',
    icon: '🧾',
    tools: [
      {
        slug: 'self-employment-tax',
        name: 'Self-Employment Tax Estimator',
        desc: 'Estimate your quarterly SE tax payments so you are never caught short.',
        live: false,
      },
      {
        slug: 'quarterly-tax-estimator',
        name: 'Quarterly Tax Payment Calculator',
        desc: 'Calculate your estimated quarterly tax payments for federal and state.',
        live: false,
      },
      {
        slug: '1099-tax-calculator',
        name: '1099 Tax Calculator',
        desc: 'Estimate your total tax bill from 1099 income including SE tax and income tax.',
        live: false,
      },
      {
        slug: 'mileage-deduction-calculator',
        name: 'Mileage Deduction Calculator',
        desc: 'Calculate your IRS standard mileage deduction for business driving.',
        live: false,
      },
      {
        slug: 'home-office-deduction',
        name: 'Home Office Deduction Calculator',
        desc: 'Estimate your home office deduction using the simplified or regular method.',
        live: false,
      },
    ],
  },
  {
    name: 'Payment & Platform Fees',
    icon: '💳',
    tools: [
      {
        slug: 'stripe-fee-calculator',
        name: 'Stripe Fee Calculator',
        desc: 'See exactly what Stripe takes — and how much to charge to net your target amount.',
        live: false,
      },
      {
        slug: 'paypal-fee-calculator',
        name: 'PayPal Fee Calculator',
        desc: 'Calculate PayPal fees for goods, services, and invoice payments.',
        live: false,
      },
      {
        slug: 'square-fee-calculator',
        name: 'Square Fee Calculator',
        desc: 'Estimate Square processing fees across card-present and online transactions.',
        live: false,
      },
      {
        slug: 'etsy-fee-calculator',
        name: 'Etsy Fee Calculator',
        desc: 'Calculate Etsy listing, transaction, and payment processing fees per sale.',
        live: false,
      },
      {
        slug: 'shopify-fee-calculator',
        name: 'Shopify Fee Calculator',
        desc: 'Estimate Shopify transaction and payment processing fees by plan.',
        live: false,
      },
    ],
  },
  {
    name: 'Invoicing & Cash Flow',
    icon: '📄',
    tools: [
      {
        slug: 'invoice-late-fee',
        name: 'Invoice Late Fee Calculator',
        desc: 'Calculate interest owed on overdue invoices using your late fee percentage.',
        live: false,
      },
      {
        slug: 'net-payment-date',
        name: 'Net 30 / 60 / 90 Due Date Calculator',
        desc: 'Calculate invoice due dates for Net 30, 60, and 90 payment terms.',
        live: false,
      },
      {
        slug: 'cash-flow-runway',
        name: 'Freelance Cash Flow Runway',
        desc: 'How many months can you cover expenses if new work stops coming in?',
        live: false,
      },
      {
        slug: 'effective-hourly-rate',
        name: 'Effective Hourly Rate Calculator',
        desc: 'What are you actually earning per hour once all unpaid time is counted?',
        live: false,
      },
    ],
  },
];

export const metadata = {
  title: 'SoloNumbers — Free Financial Calculators for Freelancers',
  description: 'Free calculators for freelancers and solo business owners. Figure out what to charge, what you owe in taxes, and what you actually keep.',
};

export default function Home() {
  const totalTools   = categories.reduce((sum, c) => sum + c.tools.length, 0);
  const liveTools    = categories.reduce((sum, c) => sum + c.tools.filter(t => t.live).length, 0);
  const comingTools  = totalTools - liveTools;

  return (
    <div className="page">

      <header className="header">
        <div className="logo">Solo<em>Numbers</em></div>
      </header>

      {/* Hero */}
      <div className="home-hero">
        <div className="home-eyebrow">Free tools for freelancers</div>
        <h1 className="home-h1">The numbers behind your freelance business</h1>
        <p className="home-intro">
          Simple, free calculators that help you price your work, manage taxes, and understand what you actually earn. No signup required.
        </p>
        <div className="home-stats">
          <div className="home-stat">
            <span className="home-stat-num">{liveTools}</span>
            <span className="home-stat-label">tool{liveTools !== 1 ? 's' : ''} live</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-num">{comingTools}</span>
            <span className="home-stat-label">coming soon</span>
          </div>
          <div className="home-stat-divider" />
          <div className="home-stat">
            <span className="home-stat-num">$0</span>
            <span className="home-stat-label">always free</span>
          </div>
        </div>
      </div>

      {/* Category sections */}
      {categories.map((category) => (
        <div key={category.name} className="category-section">
          <div className="category-header">
            <span className="category-icon">{category.icon}</span>
            <h2 className="category-name">{category.name}</h2>
          </div>

          <div className="category-tools">
            {category.tools.map((tool) =>
              tool.live ? (
                <Link key={tool.slug} href={`/${tool.slug}`} className="tool-row-link">
                  <div className="tool-row tool-row--live">
                    <div className="tool-row-left">
                      <div className="tool-row-name">{tool.name}</div>
                      <div className="tool-row-desc">{tool.desc}</div>
                    </div>
                    <div className="tool-row-right">
                      <span className="tool-row-cta">Open →</span>
                    </div>
                  </div>
                </Link>
              ) : (
                <div key={tool.slug} className="tool-row tool-row--coming">
                  <div className="tool-row-left">
                    <div className="tool-row-name">{tool.name}</div>
                    <div className="tool-row-desc">{tool.desc}</div>
                  </div>
                  <div className="tool-row-right">
                    <span className="tool-row-soon">Soon</span>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ))}

      {/* Value strip */}
      <div className="value-strip">
        <div className="value-item">
          <div className="value-icon">⚡</div>
          <div className="value-text">Instant results</div>
        </div>
        <div className="value-item">
          <div className="value-icon">🔒</div>
          <div className="value-text">No signup required</div>
        </div>
        <div className="value-item">
          <div className="value-icon">📱</div>
          <div className="value-text">Works on mobile</div>
        </div>
        <div className="value-item">
          <div className="value-icon">💸</div>
          <div className="value-text">Always free</div>
        </div>
      </div>

      {/* About */}
        <div className="home-about">
          <div className="home-about-eyebrow">Why SoloNumbers exists</div>
          <p className="home-about-text">
            A lot of talented people know their work inside and out, but nobody ever
            taught them how to price that work as a business. That is where
            freelancers, consultants, and independent professionals can get hurt.
          </p>
          <p className="home-about-text">
            They take an old salary, divide it by a standard work year, pick a number
            that feels fair, and hope it works. Hope is nice. It is not a pricing
            strategy.
          </p>
          <p className="home-about-text">
            SoloNumbers was built to help people think through the real math behind
            freelance and consulting rates — including taxes, unpaid time, benefits,
            business expenses, and realistic billable hours. Because great work still
            needs good math.
          </p>
          <Link href="/about" className="home-about-link">Read the full story →</Link>
        </div>

      <p className="disclaimer">
        All calculators provide estimates for planning purposes only. Consult a qualified tax or financial professional for advice specific to your situation.
      </p>

    </div>
  );
}
