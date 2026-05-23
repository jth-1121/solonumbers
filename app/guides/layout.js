import Link from 'next/link';

export default function GuidesLayout({ children }) {
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
      {children}
    </div>
  );
}
