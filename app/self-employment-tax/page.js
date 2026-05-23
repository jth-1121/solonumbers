import SETaxEstimator from './SETaxEstimator';

export const metadata = {
  title: 'Self-Employment Tax Estimator — Calculate What You Owe | SoloNumbers',
  description: 'Estimate your self-employment tax using the standard Schedule SE calculation. See your quarterly and monthly set-aside amounts. Free, instant, no signup.',
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
            name: 'Self-Employment Tax Estimator',
            operatingSystem: 'All',
            applicationCategory: 'FinanceApplication',
            description:
              'Estimate your self-employment tax using the standard IRS Schedule SE calculation. Calculates quarterly and monthly estimated tax set-asides for freelancers and independent contractors.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            url: 'https://solonumbers.com/self-employment-tax',
          }),
        }}
      />
      <SETaxEstimator />
    </>
  );
}
