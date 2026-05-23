import Link from 'next/link';

export const metadata = {
  title: 'How to Calculate Self-Employment Tax Into Your Hourly Rate | SoloNumbers',
  description: 'Learn how to include self-employment tax in your freelance hourly rate so you do not undercharge, under-save, or get surprised at tax time.',
};

export default function Article() {
  return (
    <article className="guide-article">

      <div className="guide-eyebrow">Tax & Pricing</div>
      <h1 className="guide-h1">How to Calculate Self-Employment Tax Into Your Hourly Rate</h1>

      <div className="guide-cta-box">
        <div className="guide-cta-text">Calculate a freelance rate that already accounts for SE tax, benefits, expenses, and realistic billable hours.</div>
        <Link href="/freelance-hourly-rate" className="guide-cta-btn">Use the Free Calculator →</Link>
      </div>

      <p>Self-employment tax can sneak up on freelancers, consultants, contractors, and solo business owners because nobody is withholding it from your paycheck anymore. Before you set your rate, your pricing needs to account for it — not after the client pays, not when quarterly taxes are due. From the beginning.</p>
      <p>When you are an employee, taxes usually come out before the money lands in your account. When you are self-employed, the money often arrives first. That feels nice for about five minutes. Then reality walks in wearing an IRS name badge.</p>

      <h2>What Is Self-Employment Tax?</h2>
      <p>Self-employment tax is the Social Security and Medicare tax paid by people who work for themselves. According to the IRS, the self-employment tax rate is 15.3%, made up of 12.4% for Social Security and 2.9% for Medicare. Employees see only their employee portion withheld from their paycheck. Self-employed workers generally carry both the employer and employee sides.</p>
      <p>That does not mean every dollar of your gross revenue gets taxed the same way. Your actual tax situation depends on your net earnings, deductions, business structure, filing status, and other factors. This is a pricing article, not tax advice. The goal is simple: do not set your freelance rate as if taxes are someone else's problem.</p>

      <h2>Self-Employment Tax Is Not the Same as Income Tax</h2>
      <p>This is where a lot of new freelancers get caught. Self-employment tax is separate from federal income tax. You may owe self-employment tax, federal income tax, state income tax, and sometimes local taxes depending on where you live and work. The IRS says self-employed individuals generally must file an income tax return if net earnings from self-employment are $400 or more — a low threshold that applies long before someone feels like they are running a "real business."</p>

      <h2>The Big Mistake: Adding Tax After You Pick the Rate</h2>
      <p>Many freelancers pick an hourly rate first, then later try to figure out taxes. That is backwards. Someone may say "I want to make $75 per hour" — but $75 per hour is not your take-home rate if you still need to pay taxes, expenses, insurance, and unpaid admin time from that money. The better question is: "What hourly rate do I need to charge so that, after taxes and business costs, I still reach my income goal?"</p>

      <h2>Example: Adding Self-Employment Tax to Your Rate</h2>
      <p>Assume you want to personally keep about $80,000 before regular income tax planning, benefits, and other expenses. Using the full 15.3% self-employment tax rate as a planning estimate:</p>
      <div className="guide-callout">$80,000 × 15.3% = $12,240</div>
      <p>So before considering business expenses, benefits, and unpaid time, you may need to generate:</p>
      <div className="guide-callout">$80,000 + $12,240 = $92,240</div>
      <p>That does not mean your final tax bill will be exactly $12,240. It means your rate should not pretend self-employment tax is zero. Because zero is wrong. And wrong gets expensive.</p>

      <h2>A More Complete Example</h2>
      <p>Let's say you want your freelance business to support: $90,000 desired personal income, $13,770 estimated self-employment tax reserve using 15.3%, $12,000 health insurance and benefits replacement, $8,000 business expenses, and $10,000 buffer for slow periods and unpaid time. Your required annual revenue:</p>
      <div className="guide-callout">$90,000 + $13,770 + $12,000 + $8,000 + $10,000 = $133,770</div>
      <p>At 1,200 realistic billable hours per year:</p>
      <div className="guide-callout">$133,770 ÷ 1,200 = $111.48 per hour</div>
      <p>Compare that to someone who simply says "I want to make $90,000 so I'll divide by 2,080" — that produces $43.27 per hour. That number may look friendly. It is also wildly incomplete. That is not a rate. That is a financial trap with nice handwriting.</p>

      <h2>Should You Just Add 15.3% to Your Rate?</h2>
      <p>You can use that as a rough starting point, but it is usually too simple. Self-employment tax is only one piece of the tax picture. You may also need to account for federal income tax, state income tax, local tax, additional Medicare tax at higher income levels, business deductions, retirement contributions, and filing status. So yes, adding 15.3% is better than adding nothing. A stronger approach is to build a broader tax reserve into your pricing model — for many freelancers, that means setting aside a larger percentage of revenue for taxes overall, not just SE tax.</p>

      <h2>A Practical Step-by-Step Process</h2>
      <p><strong>Step 1:</strong> Pick your target personal income — what you want the business to provide for you personally.</p>
      <p><strong>Step 2:</strong> Estimate your tax reserve, including self-employment tax and a broader income tax buffer.</p>
      <p><strong>Step 3:</strong> Add business expenses — software, hardware, insurance, accounting, marketing, subscriptions.</p>
      <p><strong>Step 4:</strong> Add benefits replacement — health insurance, retirement contributions, disability insurance, paid time off.</p>
      <p><strong>Step 5:</strong> Add a buffer for slow periods, late payments, scope creep, and surprises.</p>
      <p><strong>Step 6:</strong> Divide by realistic billable hours, not 2,080 — the number of hours you can actually bill clients during the year.</p>

      <h2>Bottom Line</h2>
      <p>Self-employment tax should be built into your freelance hourly rate from the beginning. The IRS lists the self-employment tax rate as 15.3%, made up of Social Security and Medicare taxes, and self-employed individuals may need to file when net earnings are $400 or more. That means your freelance rate needs to do more than sound fair to the client. It needs to support the business, cover taxes, account for unpaid time, and protect your income.</p>

      <div className="guide-cta-box guide-cta-box--bottom">
        <div className="guide-cta-text">Use the SoloNumbers Freelance Hourly Rate Calculator to estimate a rate that includes SE tax, benefits, expenses, and a realistic buffer.</div>
        <Link href="/freelance-hourly-rate" className="guide-cta-btn">Calculate My Rate →</Link>
      </div>

      <div className="guide-related">
        <div className="guide-related-label">Related guides</div>
        <div className="guide-related-links">
          <Link href="/guides/why-dividing-salary-by-2080-is-wrong-for-freelancers" className="guide-related-link">Why Dividing Your Salary by 2080 Is Wrong</Link>
          <Link href="/guides/realistic-billable-utilization-rate-freelance-consultant" className="guide-related-link">What Is a Realistic Billable Utilization Rate?</Link>
          <Link href="/guides/20-percent-freelance-buffer" className="guide-related-link">The 20% Freelance Buffer Explained</Link>
        </div>
      </div>

    </article>
  );
}
