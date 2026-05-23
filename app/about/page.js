import Link from 'next/link';

export const metadata = {
  title: 'Why I Built SoloNumbers | SoloNumbers',
  description: 'SoloNumbers was built for people who are good at their work but were never taught how to price it as a business. The story behind the site.',
};

export default function AboutPage() {
  return (
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

      <article className="about-article">

        <div className="guide-eyebrow">Our story</div>
        <h1 className="guide-h1">Why I Built SoloNumbers: Because Great Work Still Needs Good Math</h1>

        <p>Getting another job is hard. Starting your own business is hard too. The uncomfortable part is that many talented people find themselves standing between those two realities — looking at their experience, their bills, their responsibilities, and their future — wondering what comes next.</p>

        <p>That is where SoloNumbers started. Not as some grand corporate software idea. Not as a shiny startup pitch deck. It started with a simple problem that hits a lot of professionals harder than they expect:</p>

        <div className="about-pullquote">You may be very good at what you do. That does not automatically mean you know how to price it.</div>

        <p>That gap can get expensive fast.</p>

        <h2>Knowing the Work and Pricing the Work Are Two Different Skills</h2>

        <p>A lot of people are excellent at their profession. They know how to solve problems, help clients, and deliver real value. They have years — sometimes decades — of knowledge that companies and clients genuinely need.</p>

        <p>Then they step into freelance or consulting work and discover something nobody put in the employee handbook: knowing the work and pricing the work are two very different skills. Employment teaches people how to do the job. It often does not teach them how to run the business behind the job. And that business side matters. A lot.</p>

        <h2>The Trap Is Usually Not Charging Too Much</h2>

        <p>Many new freelancers worry about charging too much. That is understandable. Nobody wants to scare away a potential client or toss out a number and watch the room go quiet like someone just unplugged the oxygen.</p>

        <p>The bigger danger is usually the opposite. Many people charge too little. They take their old salary, divide it by the number of hours in a work year, round it down a little so it "feels fair," and call it a freelance rate. That may feel safe. It is not.</p>

        <p>That kind of pricing ignores taxes, unpaid time, benefits, business expenses, software, insurance, slow periods, and all the invisible little costs that sit quietly in the corner until they become a problem. And they do become a problem. Usually right after you have already committed to the rate.</p>

        <h2>I Learned This the Hard Way</h2>

        <p>I built SoloNumbers because I know what it feels like to have valuable experience but still have to figure out how to turn that experience into a fair, sustainable price.</p>

        <p>I learned that pricing yourself is not just about what sounds reasonable. It is about what actually works. It is about knowing what you need to earn, what it costs to stay in business, and how many hours you can realistically bill.</p>

        <p>Freelancers do not get paid for every hour they work. Sales calls are not always paid. Proposals are not always paid. Invoices are not always paid on time. Administrative work is almost never billable. Vacations do not magically fund themselves. Sick days do not come with employer-sponsored sympathy checks. And tax season does not care that you were trying to be nice when you set your rate.</p>

        <p>That is the part many people learn too late. I wanted SoloNumbers to help people see the numbers earlier — before they undercharge, before they overcommit, before they confuse being busy with being profitable. Because those are not the same thing.</p>

        <h2>What SoloNumbers Is Built to Do</h2>

        <p>SoloNumbers was built to help freelancers, consultants, contractors, and independent professionals make better pricing decisions. Not perfect decisions. Not magic decisions. Better decisions.</p>

        <p>The calculators are designed to help you think through the real pieces of a freelance rate — desired income, estimated taxes, benefits replacement, business expenses, unpaid time, realistic billable hours, and a buffer for slow periods. A freelance hourly rate should not be a guess dressed up as confidence. It should be based on the actual math of running your work like a business.</p>

        <p>The point is not to copy someone else's number. The point is to understand your own.</p>

        <h2>Who This Is For</h2>

        <p>SoloNumbers is for the person who has real skills but is new to pricing those skills independently. It is for the employee considering freelance work. It is for the consultant trying to stop undercharging. It is for the contractor who keeps wondering why the money looks good on paper but feels thin in real life.</p>

        <p>It is for the professional who knows they can help clients, but does not want to build a business on crossed fingers, vague hope, and a rate copied from someone on the internet. That last one is a business plan with a hat on. Not a good hat.</p>

        <h2>The Promise Is Simple</h2>

        <p>No calculator can tell you exactly what every client will pay. No calculator can guarantee success or remove the risk of working for yourself. That is not the promise.</p>

        <p>The promise is simpler: SoloNumbers helps you stop guessing. It gives you a better starting point for thinking through your rate and helps you understand the difference between what sounds reasonable and what may actually be sustainable.</p>

        <p>Because your rate should not just help you win work. It should help you keep doing the work without slowly losing money, energy, and confidence in the process.</p>

        <div className="about-closing">
          <p>SoloNumbers was built for people who are good at what they do, but who may not have been taught how to price that work as a business. I built it because I learned that lesson the hard way, and I would rather help others avoid the same expensive little education program.</p>
          <p>Your knowledge has value. Your time has value. Your business needs oxygen. And your pricing should reflect reality — not just a neat formula that looks harmless while quietly picking your pocket.</p>
          <p><strong>Because great work deserves good math.</strong></p>
        </div>

        <div className="guide-cta-box guide-cta-box--bottom">
          <div className="guide-cta-text">Use the Freelance Hourly Rate Calculator to get a clearer starting point before you set your rate.</div>
          <Link href="/freelance-hourly-rate" className="guide-cta-btn">Calculate My Rate →</Link>
        </div>

        <p className="disclaimer">All calculators provide estimates for planning purposes only. Consult a qualified tax or financial professional for advice specific to your situation.</p>

      </article>
    </div>
  );
}
