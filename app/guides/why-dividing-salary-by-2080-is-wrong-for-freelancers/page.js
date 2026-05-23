import Link from 'next/link';

export const metadata = {
  title: 'Why Dividing Your Salary by 2080 Is Wrong for Freelancers | SoloNumbers',
  description: 'Dividing your salary by 2080 sounds simple, but it causes freelancers to undercharge. Learn why salary-based hourly pricing misses taxes, benefits, unpaid time, and billable utilization.',
};

export default function Article() {
  return (
    <article className="guide-article">

      <div className="guide-eyebrow">Freelance Pricing</div>
      <h1 className="guide-h1">Why Dividing Your Salary by 2080 Is a Terrible Freelance Pricing Strategy</h1>

      <div className="guide-cta-box">
        <div className="guide-cta-text">Calculate your real freelance rate — including taxes, benefits, and realistic billable hours.</div>
        <Link href="/freelance-hourly-rate" className="guide-cta-btn">Use the Free Calculator →</Link>
      </div>

      <p>The "salary divided by 2080" formula looks smart on the surface. It is not. It is tidy math sitting on top of a shaky assumption. The kind of assumption that smiles politely, shakes your hand, and then quietly steals money from your future invoices.</p>
      <p>The formula usually looks like this:</p>
      <div className="guide-callout">$100,000 salary ÷ 2,080 hours = $48.08 per hour</div>
      <p>That sounds logical because 2,080 is the number of work hours in a standard full-time year: 40 hours per week × 52 weeks. That works fine if you are comparing one employee salary to another employee salary. It falls apart when you use it to price freelance, consulting, contract, or solo business work.</p>
      <p>Why? Because freelancers do not get paid for 2,080 billable hours. They also do not get employer-paid benefits, paid vacation, payroll tax support, paid holidays, paid sick time, equipment, software, training, admin support, or a guaranteed paycheck every two weeks.</p>
      <p>When you divide salary by 2,080, you are not calculating a freelance rate. You are calculating a discounted employee rate with none of the employee protections.</p>

      <h2>The 2080 Formula Assumes Every Hour Is Paid</h2>
      <p>The biggest problem with the 2,080 formula is that it assumes every work hour is billable. That is rarely true. Freelancers spend time on work that matters, but does not directly produce billable income — finding clients, writing proposals, sending invoices, following up on unpaid invoices, managing email, handling bookkeeping, updating the website, and dealing with administrative work.</p>
      <p>An employee may work 2,080 hours in a year and receive a paycheck for all of them. A freelancer may work 2,080 hours in a year and only bill for 900 to 1,400 of them. That difference is not a rounding error. That is where your profit either lives or quietly dies.</p>

      <h2>Example: The 2080 Formula vs. Reality</h2>
      <p>Using the simple 2,080 formula on a $100,000 target:</p>
      <div className="guide-callout">$100,000 ÷ 2,080 = $48.08 per hour</div>
      <p>Now assume you bill 1,200 hours per year. To earn the same $100,000 in gross revenue:</p>
      <div className="guide-callout">$100,000 ÷ 1,200 = $83.33 per billable hour</div>
      <p>That is before taxes, insurance, retirement contributions, software, equipment, and business expenses. So the rate that looked like $48.08 per hour may need to be closer to $90, $110, $125, or more depending on your situation.</p>

      <h2>Freelancers Pay Costs Employees Never See</h2>
      <p>When you become self-employed, costs that were invisible as an employee become your direct responsibility: self-employment taxes, health insurance, dental and vision, retirement contributions, business software, computer equipment, accounting, business insurance, website hosting, payment processing fees, and professional development — to name the most common ones.</p>
      <p>Your freelance hourly rate has to do more than replace your salary. It has to replace your salary, benefits, employer support, business costs, unpaid time, and enough cushion to keep your business from running on fumes and good intentions.</p>

      <h2>The 2080 Formula Ignores Self-Employment Tax</h2>
      <p>When you are an employee, your employer pays part of your payroll taxes. When you are self-employed, you generally carry both the employee and employer side of Social Security and Medicare — roughly 14% on top of your income before federal and state taxes. Your freelance rate needs room for that from day one, not "I'll figure it out later" room. Real room.</p>

      <h2>A Better Way to Calculate Your Rate</h2>
      <p>A realistic freelance hourly rate should include at least five things: your target personal income, taxes, benefits replacement, business expenses, and realistic billable hours. The better question is not "what was my salary divided by 2,080?" It is: "How much revenue do I need to generate, and how many hours can I realistically bill?"</p>
      <p>Here is a simplified example. Target salary replacement of $100,000, plus $20,000 for taxes, $12,000 for health insurance and benefits, $8,000 for business expenses, and $10,000 profit cushion — totaling $150,000 required. At 1,200 realistic billable hours:</p>
      <div className="guide-callout">$150,000 ÷ 1,200 = $125 per hour</div>
      <p>That is a very different answer than $48.08 per hour. The $48.08 rate came from pretending you were still an employee. The $125 rate came from treating freelance work like a business.</p>

      <h2>Why This Matters More Than Most New Freelancers Realize</h2>
      <p>Underpricing does not just reduce income. It creates pressure. When your rate is too low, you need more clients, more hours, and more work just to stay even. That can lead to taking bad-fit clients, saying yes to weak projects, working nights and weekends, avoiding needed software or help, delaying taxes, burning out, and resenting clients who are not actually the problem. Sometimes the problem is that the pricing model was broken before the first invoice was ever sent.</p>

      <h2>Bottom Line</h2>
      <p>Dividing your salary by 2,080 is a terrible freelance pricing strategy because it treats you like an employee while making you carry the costs of a business owner. It ignores taxes, benefits, unpaid time, business expenses, and billable utilization. The result is usually a rate that feels reasonable, sounds professional, and quietly underpays you from day one.</p>

      <div className="guide-cta-box guide-cta-box--bottom">
        <div className="guide-cta-text">Use the SoloNumbers Freelance Hourly Rate Calculator to estimate a rate based on your real income goal, taxes, benefits, and realistic billable hours.</div>
        <Link href="/freelance-hourly-rate" className="guide-cta-btn">Calculate My Rate →</Link>
      </div>

      <div className="guide-related">
        <div className="guide-related-label">Related guides</div>
        <div className="guide-related-links">
          <Link href="/guides/calculate-self-employment-tax-into-hourly-rate" className="guide-related-link">How to Calculate Self-Employment Tax Into Your Hourly Rate</Link>
          <Link href="/guides/realistic-billable-utilization-rate-freelance-consultant" className="guide-related-link">What Is a Realistic Billable Utilization Rate?</Link>
          <Link href="/guides/20-percent-freelance-buffer" className="guide-related-link">The 20% Freelance Buffer Explained</Link>
        </div>
      </div>

    </article>
  );
}
