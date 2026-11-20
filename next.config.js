/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'gangaldentalclinic.com',
      },
    ],
  },
  async redirects() {
    return [
      // 301 redirects from legacy WordPress routes to modern routes
      {
        source: '/team-members',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/team-members/:path*',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/team-member/:path*',
        destination: '/our-team',
        permanent: true,
      },
      {
        source: '/new-patients',
        destination: '/new-patients',
        permanent: true,
      },
      {
        source: '/treatments',
        destination: '/treatments',
        permanent: true,
      },
      {
        source: '/testimonials',
        destination: '/stories',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/privacy-policy-2',
        destination: '/privacy',
        permanent: true,
      },
      // Individual service routes
      {
        source: '/orthodontics',
        destination: '/treatments/invisalign',
        permanent: true,
      },
      {
        source: '/invisalign',
        destination: '/treatments/invisalign',
        permanent: true,
      },
      {
        source: '/services/cosmetic-dentistry/invisible-braces',
        destination: '/treatments/invisalign',
        permanent: true,
      },
      {
        source: '/cosmetic-dentistry',
        destination: '/treatments?category=cosmetic',
        permanent: true,
      },
      {
        source: '/teeth-whitening',
        destination: '/treatments/teeth-whitening',
        permanent: true,
      },
      {
        source: '/digital-smile-design',
        destination: '/treatments/digital-smile-design',
        permanent: true,
      },
      {
        source: '/dental-porcelain-veneers',
        destination: '/treatments/porcelain-veneers',
        permanent: true,
      },
      {
        source: '/white-fillings',
        destination: '/treatments/white-fillings',
        permanent: true,
      },
      {
        source: '/smile-makeovers',
        destination: '/treatments/smile-makeovers',
        permanent: true,
      },
      {
        source: '/dental-implants',
        destination: '/treatments/dental-implants',
        permanent: true,
      },
      {
        source: '/dental-implant-treatments',
        destination: '/treatments/dental-implants',
        permanent: true,
      },
      {
        source: '/general-dentistry',
        destination: '/treatments?category=general',
        permanent: true,
      },
      {
        source: '/root-canal-treatment',
        destination: '/treatments/root-canal-treatment',
        permanent: true,
      },
      {
        source: '/oral-surgery-extractions',
        destination: '/treatments/oral-surgery-extractions',
        permanent: true,
      },
      {
        source: '/restorative-dentistry',
        destination: '/treatments?category=restorative',
        permanent: true,
      },
      {
        source: '/broken-teeth',
        destination: '/treatments/broken-teeth',
        permanent: true,
      },
      {
        source: '/crowns',
        destination: '/treatments/crowns',
        permanent: true,
      },
      {
        source: '/bridges',
        destination: '/treatments/bridges',
        permanent: true,
      },
      {
        source: '/dentures',
        destination: '/treatments/dentures',
        permanent: true,
      },
      {
        source: '/pediatric-dentistry',
        destination: '/treatments/pediatric-dentistry',
        permanent: true,
      },
      {
        source: '/services/general-dentistry/emergency-care',
        destination: '/treatments/emergency-care',
        permanent: true,
      },
      {
        source: '/services/general-dentistry/oral-health-consultation',
        destination: '/treatments/free-consultation',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

