import Link from 'next/link';

export const metadata = {
  title: 'Day Rate vs. Hourly Rate: How Much Should Freelancers Charge? | SoloNumbers',
  description: 'Learn how to calculate a freelance day rate vs. an hourly rate, when to use each pricing method, and why your day rate should not simply be eight times your hourly rate.',
};

export default function Article() {
  return (
    <article className="guide-article">

      <div className="guide-eyebrow">Freelance Pricing</div>
      <h1 className="guide-h1">How Much Should I Charge for a Day Rate vs. an Hourly Rate?</h1>

      <div className="guide-cta-box">
        <div className="guide-cta-text">Calculate your freelance hourly rate first — then use it to build a smarter day rate.</div>
        <Link href="/freelance-hourly-rate" className="guide-cta-btn">Use the Free Calculator →</Link>
      </div>

      <p>A freelance day rate is not always just your hourly rate multiplied by eight. The way you price your work affects your income, your schedule, your client expectations, and how much control you keep over your time. An hourly rate works well when the work is flexible or uncertain. A day rate works well when the client needs a meaningful block of your time, focus, and availability.</p>

      <h2>What Is an Hourly Rate?</h2>
      <p>An hourly rate means the client pays you for each hour of work. It is easy to understand, easy to track, and easy to explain. Hourly pricing works especially well when the scope is uncertain, the client may change priorities, the work is ongoing, or you need to protect yourself from scope creep. The benefit is flexibility. The risk is that clients may focus too much on hours instead of outcomes.</p>

      <h2>What Is a Day Rate?</h2>
      <p>A day rate means the client pays you for a full day or substantial block of your availability. A day rate is not just payment for tasks — it is payment for access to your time, attention, expertise, preparation, and availability. When a client books your day, you usually cannot sell that same day to someone else. Even if the work only takes six hours, that day may be functionally unavailable for other paid work.</p>

      <h2>The Common Mistake: Multiplying Your Hourly Rate by Eight</h2>
      <p>Many people calculate their day rate like this: hourly rate × 8 = day rate. That can work as a rough starting point. It should not be the final answer. A day engagement may also include preparation, travel time, follow-up, scheduling, recap emails, lost availability for other clients, and recovery time after intense work. If you charge only eight times your hourly rate, you may accidentally give away the surrounding work for free.</p>

      <h2>A Better Way to Think About Day Rates</h2>
      <p>A better day rate should reflect the value of reserving your day — the working time itself plus preparation, follow-up, lost availability, intensity, and travel burden. The simplest formula:</p>
      <div className="guide-callout">Hourly rate × billable day hours + preparation/follow-up buffer = day rate</div>
      <p>For example: $125 per hour × 8 hours = $1,000, plus $250 for prep, follow-up, and calendar protection = $1,250 day rate. That is more realistic than pretending the day begins when the meeting starts and ends when the last person says "great discussion."</p>

      <h2>When to Use Hourly vs. Day Rate</h2>
      <ul className="guide-list">
        <li><strong>Use hourly</strong> when scope is unclear, the client needs flexible support, or work may expand and change</li>
        <li><strong>Use day rate</strong> when leading a workshop, facilitating a strategy session, providing on-site consulting, or when the client needs your full-day focus</li>
        <li><strong>Use project rate</strong> when the deliverable is fixed and clear</li>
      </ul>

      <h2>Half-Day Rates: Be Careful</h2>
      <p>A half-day engagement can block more than half your day. A client booking you from 9:00 a.m. to 1:00 p.m. may require preparation before, follow-up after, and prevent you from selling the remaining hours. A half-day rate should usually be 60% to 70% of your full day rate — not 50%. For example, a $1,250 day rate should yield a $800 to $850 half-day rate, not $625.</p>

      <h2>Should a Day Rate Be Higher Than Eight Hours?</h2>
      <p>Often yes. The higher your expertise, the more this matters. Clients are not just buying your time. They are buying your judgment. And judgment is not measured well by the minute. A common structure:</p>
      <ul className="guide-list">
        <li>Hourly rate: $125/hr</li>
        <li>Half-day rate: $800–$850</li>
        <li>Full-day rate: $1,250</li>
        <li>Two-day engagement: $2,500</li>
      </ul>

      <h2>On-Site vs. Remote Day Rates</h2>
      <p>On-site work often warrants a higher rate because it includes travel time, mileage, parking, meals, hotel costs, schedule disruption, and more physical and mental energy. You can handle this two ways: a higher on-site day rate (e.g., $1,500 vs. $1,250 remote), or same day rate plus travel expenses billed separately. Either works. The important thing is to define it upfront.</p>

      <h2>Bottom Line</h2>
      <p>Your freelance day rate should not automatically be eight times your hourly rate. That misses preparation, follow-up, admin time, calendar protection, and opportunity cost. Price based on the full business reality of the work — not just the visible hours. Calculate your hourly rate properly first, then build your day rate from there.</p>

      <div className="guide-cta-box guide-cta-box--bottom">
        <div className="guide-cta-text">Start with your hourly rate, then use it to build a smarter day rate and monthly target.</div>
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
