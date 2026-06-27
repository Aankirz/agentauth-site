import type { MetadataRoute } from 'next';

const URL = 'https://agentauth-site.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${URL}/demo`, changeFrequency: 'monthly', priority: 0.8 },
  ];
}
