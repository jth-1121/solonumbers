import FreelanceCalculator from './FreelanceCalculator';

export const metadata = {
  title: 'Freelance Hourly Rate Calculator — Find Your Minimum Rate | SoloNumbers',
  description: 'Calculate exactly what you need to charge as a freelancer. Accounts for self-employment tax, business expenses, health insurance, and realistic billable hours. Free, instant, no signup.',
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'Freelance Hourly Rate Calculator',
            operatingSystem: 'All',
            applicationCategory: 'FinanceApplication',
            description:
              'Calculate the minimum hourly rate you need to charge as a freelancer, accounting for self-employment tax, business expenses, health insurance, benefits, and realistic billable hours.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            url: 'https://solonumbers.com/freelance-hourly-rate',
          }),
        }}
      />
      <FreelanceCalculator />
    </>
  );
}
