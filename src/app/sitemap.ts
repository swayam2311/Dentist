import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const routes = [
    '',
    '/treatments',
    '/treatments/free-consultation',
    '/treatments/dental-implants',
    '/treatments/invisalign',
    '/treatments/root-canal-treatment',
    '/treatments/teeth-whitening',
    '/treatments/porcelain-veneers',
    '/treatments/digital-smile-design',
    '/treatments/white-fillings',
    '/treatments/smile-makeovers',
    '/treatments/oral-surgery-extractions',
    '/treatments/crowns',
    '/treatments/bridges',
    '/treatments/dentures',
    '/treatments/broken-teeth',
    '/treatments/pediatric-dentistry',
    '/treatments/preventative-dentistry',
    '/treatments/emergency-care',
    '/book',
    '/our-team',
    '/new-patients',
    '/stories',
    '/contact',
    '/privacy',
    '/terms',
    '/sensory-care',
    '/clinical-standards',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/treatments') ? 0.8 : 0.6,
  }));
}
