// ============================================================================
// GANGAL DENTAL CLINIC — CENTRAL SITE CONFIGURATION
// Single source of truth driving: header, footer, JSON-LD, open-now chip,
// tel:/wa.me links, meta tags, and verified clinic claims.
// ============================================================================

export interface WorkingSession {
  start: string; // HH:mm format (24-hour)
  end: string;   // HH:mm format (24-hour)
}

export interface DaySchedule {
  name: string;
  isOpen: boolean;
  sessions: WorkingSession[];
  note?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  isDentist: boolean;
  initials: string;
  bio?: string;
  photoUrl?: string | null;
}

export interface Testimonial {
  author: string;
  location: string;
  quote: string;
  initials: string;
  verified: boolean;
}

export const siteConfig = {
  name: 'Gangal Dental Clinic',
  shortName: 'Gangal Dental',
  tagline: 'Gentle, Unhurried Family & Restorative Dentistry in Manpada, Thane',
  description:
    'Gangal Dental Clinic in Manpada, Thane provides preventive, conservative, and advanced restorative dentistry to implantology and smile designing. Unhurried consultations, compassionate care.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gangaldentalclinic.com',
  timezone: 'Asia/Kolkata',

  // Verified Coordinates & Location
  address: {
    line1: 'Shop No. 26, 28, 29, Happy Valley Shopping Complex',
    street: 'Tikujiniwadi Road, Manpada',
    city: 'Thane',
    district: 'Thane West',
    state: 'Maharashtra',
    pincode: '400610', // Verified pincode (Stitch also used 400607; 400610 is verified)
    country: 'India',
    fullFormatted:
      'Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane, Maharashtra 400610',
    geo: {
      latitude: 19.2312,
      longitude: 72.9754,
    },
    googleMapsUrl: 'https://maps.app.goo.gl/HdnbPPQoGewQZzfp7',
    googleMapsEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2343825000003!2d72.9754!3d19.2312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7bb6c483d29bd%3A0x6b4ebcb468e0d9b6!2sGangal%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  },

  // Verified Telecommunications (Single Source of Truth)
  contact: {
    landline: '022 25891949',
    landlineRaw: '02225891949',
    landlineTel: 'tel:02225891949',
    mobile: '+91 99870 76628',
    mobileRaw: '+919987076628',
    mobileTel: 'tel:+919987076628',
    email: 'dranandgangal@gmail.com',
    emailMailto: 'mailto:dranandgangal@gmail.com',
    whatsappNumber: '919987076628',
    whatsappUrl: 'https://wa.me/919987076628',
    emergencyNotice: '24-hour telephone service available for queries and urgent dental emergencies.',
  },

  // Verified Operating Hours (Asia/Kolkata)
  // Mon-Fri: 10:00 - 13:00 & 18:00 - 22:00
  // Sat: 10:00 - 17:00
  // Sun: Closed
  schedule: {
    1: {
      name: 'Monday',
      isOpen: true,
      sessions: [
        { start: '10:00', end: '13:00' },
        { start: '18:00', end: '22:00' },
      ],
    },
    2: {
      name: 'Tuesday',
      isOpen: true,
      sessions: [
        { start: '10:00', end: '13:00' },
        { start: '18:00', end: '22:00' },
      ],
    },
    3: {
      name: 'Wednesday',
      isOpen: true,
      sessions: [
        { start: '10:00', end: '13:00' },
        { start: '18:00', end: '22:00' },
      ],
    },
    4: {
      name: 'Thursday',
      isOpen: true,
      sessions: [
        { start: '10:00', end: '13:00' },
        { start: '18:00', end: '22:00' },
      ],
    },
    5: {
      name: 'Friday',
      isOpen: true,
      sessions: [
        { start: '10:00', end: '13:00' },
        { start: '18:00', end: '22:00' },
      ],
    },
    6: {
      name: 'Saturday',
      isOpen: true,
      sessions: [{ start: '10:00', end: '17:00' }],
    },
    0: {
      name: 'Sunday',
      isOpen: false,
      sessions: [],
      note: 'Closed',
    },
  } as Record<number, DaySchedule>,

  // Verified Team (From clinic site; no unverified qualifications or statistics)
  team: [
    {
      id: 'd1111111-1111-1111-1111-111111111111',
      name: 'Dr. Anand Gangal',
      role: 'Principal Dentist',
      isDentist: true,
      initials: 'AG',
      bio: 'Principal Dentist leading Gangal Dental Clinic in Manpada, Thane. Dedicated to gentle, comprehensive family care, dental implants, and aesthetic smile rehabilitation.',
      photoUrl: null, // Monogram avatar used until clinic supplies official photography
    },
    {
      id: 'd2222222-2222-2222-2222-222222222222',
      name: 'Dr. Padma Kurup',
      role: 'Associate Dentist',
      isDentist: true,
      initials: 'PK',
      bio: 'Associate Dentist providing empathetic and gentle general, cosmetic, and pediatric dental care for individuals and families.',
      photoUrl: null,
    },
    {
      id: 'staff-sayali',
      name: 'Sayali Jadhav',
      role: 'Receptionist',
      isDentist: false,
      initials: 'SJ',
      bio: 'The welcoming face of Gangal Dental Clinic. Coordinates patient appointments with warmth and attentive care.',
      photoUrl: null,
    },
    {
      id: 'staff-sanika',
      name: 'Sanika Pujari',
      role: 'Clinical Assistant',
      isDentist: false,
      initials: 'SP',
      bio: 'Experienced clinical assistant supporting gentle treatments and strict patient hygiene protocols.',
      photoUrl: null,
    },
    {
      id: 'staff-vaishali',
      name: 'Vaishali Kavankar',
      role: 'Clinical Assistant',
      isDentist: false,
      initials: 'VK',
      bio: 'Assists our dentists during delicate procedures, ensuring patient comfort at every moment.',
      photoUrl: null,
    },
    {
      id: 'staff-santosh',
      name: 'Santosh Yeram',
      role: 'Clinical Assistant',
      isDentist: false,
      initials: 'SY',
      bio: 'Dedicated dental assistant focused on operatory preparation, sterile instrument management, and chairside care.',
      photoUrl: null,
    },
    {
      id: 'staff-runali',
      name: 'Runali Tambe',
      role: 'Clinical Assistant',
      isDentist: false,
      initials: 'RT',
      bio: 'Supports our restorative and surgical workflows with attentive, gentle chairside care.',
      photoUrl: null,
    },
    {
      id: 'staff-preeti',
      name: 'Preeti Yeram',
      role: 'Clinical Assistant',
      isDentist: false,
      initials: 'PY',
      bio: 'Provides compassionate chairside assistance and coordinates sterilisation and patient comfort.',
      photoUrl: null,
    },
  ] as TeamMember[],

  // Verified 5-Step Patient Journey
  patientJourney: [
    {
      step: 1,
      title: 'First Contact',
      description:
        'Reach out via telephone, WhatsApp, or our online reservation system. We listen attentively to your dental concerns and schedule an unhurried consultation.',
    },
    {
      step: 2,
      title: 'Dentist Consultation',
      description:
        'A thorough oral health clinical examination. You receive an honest examination report alongside an itemized treatment plan estimate with zero obligation.',
    },
    {
      step: 3,
      title: 'Confirmation & Payment',
      description:
        'Your treatment appointment is confirmed. Clear, transparent discussion of procedures with payment completed on the day of treatment.',
    },
    {
      step: 4,
      title: 'Treatment & Follow-Up',
      description:
        'Care delivered in a gentle, unhurried atmosphere. A follow-up takes place to review healing and address any remaining questions.',
    },
    {
      step: 5,
      title: 'Periodic Review',
      description:
        'Scheduled periodic reviews at 6 or 12 months to maintain oral wellness and protect your restorations for the long term.',
    },
  ],

  // Real Testimonials (Verbatim from https://gangaldentalclinic.com/testimonials/)
  testimonials: [
    {
      author: 'Asmita Patil',
      location: 'Manpada, Thane',
      quote:
        'Very nice experience. Although I am afraid of dentists, this was quite comfortable. Staff was cooperative and always ready and willing to help.',
      initials: 'AP',
      verified: true,
    },
    {
      author: 'Sahil Desai',
      location: 'Thane',
      quote:
        'Very comfortable experience, painless tooth extraction. Staff is definitely well trained and patient service oriented.',
      initials: 'SD',
      verified: true,
    },
    {
      author: 'Jaya Iyer',
      location: 'Thane',
      quote:
        'Dr Gangal is the best and experienced doctor in Thane. Our family is taking treatment from him. We know him since many years. He is very genuine and give good advice. I recommend to go to him for all dental treatments. All his staff members are also polite.',
      initials: 'JI',
      verified: true,
    },
  ] as Testimonial[],

  // Navigation Links
  navLinks: [
    { label: 'Treatments', href: '/treatments' },
    { label: 'Our Team', href: '/our-team' },
    { label: 'New Patients', href: '/new-patients' },
    { label: 'Patient Stories', href: '/stories' },
    { label: 'Contact', href: '/contact' },
  ],
};

