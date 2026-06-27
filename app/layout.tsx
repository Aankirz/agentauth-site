import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { RevealInit } from '../components/RevealInit';
import './globals.css';

const SITE = 'https://agentauth-site.vercel.app';
const DESC =
  'AgentAuth issues scoped, short-lived, revocable tokens so AI agents and MCP servers can act on a user’s behalf without a full-access API key. Open-source OAuth-style delegation, MIT licensed.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: 'AgentAuth — OAuth-style auth for AI agents & MCP servers',
    template: '%s · AgentAuth',
  },
  description: DESC,
  keywords: [
    'AI agent authentication',
    'AI agent authorization',
    'OAuth for AI agents',
    'MCP authentication',
    'MCP OAuth',
    'MCP server auth',
    'scoped tokens',
    'short-lived tokens',
    'revocable tokens',
    'delegated access AI',
    'agent permissions',
    'AI agent auth 2026',
  ],
  authors: [{ name: 'Ankit Kiran' }],
  creator: 'Ankit Kiran',
  alternates: { canonical: SITE },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE,
    siteName: 'AgentAuth',
    title: 'AgentAuth — OAuth-style auth for AI agents & MCP servers',
    description: DESC,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentAuth — OAuth-style auth for AI agents & MCP servers',
    description: DESC,
  },
};

const SOFTWARE_LD = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'AgentAuth',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Node.js, any',
  description: DESC,
  url: SITE,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  license: 'https://opensource.org/licenses/MIT',
  sameAs: ['https://github.com/Aankirz/agentauth', 'https://www.npmjs.com/package/agentauth'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('aa-theme');if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();",
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SOFTWARE_LD) }} />
      </head>
      <body>
        {children}
        <RevealInit />
        <Analytics />
      </body>
    </html>
  );
}
