import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';
import { Accordion } from '@/components/ui/Accordion';
import {
  Calendar,
  Phone,
  Clock,
  CheckCircle2,
  ArrowRight,
  Shield,
  HelpCircle,
} from 'lucide-react';

interface TreatmentDetail {
  slug: string;
  name: string;
  category: string;
  duration: string;
  overview: string;
  whoItIsFor: string[];
  howItWorks: { step: string; title: string; description: string }[];
  faqs: { id: string; question: string; answer: string }[];
  isBookable: boolean;
  relatedSlugs: string[];
}

const detailedTreatments: Record<string, TreatmentDetail> = {
  'free-consultation': {
    slug: 'free-consultation',
    name: 'Free Oral Health Consultation',
    category: 'General Dentistry',
    duration: '30 Minutes',
    overview:
      'Your first oral health consultation at Gangal Dental Clinic is completely free of charge. We perform a thorough clinical examination of your teeth, gums, and bite, listen to any anxieties or goals, and develop a personalized treatment plan with clear, itemized estimates.',
    whoItIsFor: [
      'Anyone seeking an honest, zero-pressure assessment of their dental health',
      'Patients experiencing mild discomfort, sensitivity, or gum bleeding',
      'Individuals who have postponed dental visits due to dental anxiety',
      'Those wanting second opinions or transparent price estimates before care',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Warm Welcome & Listening',
        description:
          'We sit down with you to understand your medical history, dental concerns, and past experiences in an unhurried, comfortable consultation setting.',
      },
      {
        step: '02',
        title: 'Thorough Clinical Examination',
        description:
          'A gentle, comprehensive visual examination of teeth, restorations, and soft tissues to assess overall oral hygiene and detect early issues.',
      },
      {
        step: '03',
        title: 'Itemized Plan & Open Q&A',
        description:
          'We explain our findings clearly and present an itemized treatment estimate with zero hidden costs and absolutely zero obligation to proceed.',
      },
    ],
    faqs: [
      {
        id: 'fc-1',
        question: 'Is the first consultation genuinely free of charge?',
        answer:
          'Yes. Your initial consultation and clinical examination report are completely free of charge with zero obligation.',
      },
      {
        id: 'fc-2',
        question: 'Can I start treatment on the same day if I wish?',
        answer:
          'If you choose to begin urgent or routine treatment and clinical chair time permits, we can proceed. Otherwise, we schedule your treatment for a dedicated future appointment.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['preventative-dentistry', 'white-fillings', 'dental-implants'],
  },

  'emergency-care': {
    slug: 'emergency-care',
    name: 'Emergency Dental Care',
    category: 'Urgent Care',
    duration: 'Priority Same-Day',
    overview:
      'Urgent dental relief for sudden pain, cracked teeth, acute swelling, or dental trauma. We maintain telephone availability and prioritize immediate same-day pain management so you receive calm, decisive treatment when you need it most.',
    whoItIsFor: [
      'Patients experiencing severe or throbbing toothaches',
      'Knocked-out, loose, or fractured teeth from trauma',
      'Sudden facial or gum swelling and acute dental abscesses',
      'Broken crowns, bridges, or lost fillings causing acute pain or bleeding',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Direct Telephonic Triage',
        description:
          'Call our desk directly at 022 25891949 or +91 99870 76628. We provide immediate guidance and prepare an operatory room for your arrival.',
      },
      {
        step: '02',
        title: 'Immediate Pain Alleviation',
        description:
          'Our priority is gentle, effective pain relief and diagnostic assessment to identify the root cause of the urgency.',
      },
      {
        step: '03',
        title: 'Stabilization & Restoration',
        description:
          'We stabilize the tooth, prevent further infection or damage, and plan definitive restorative follow-up care.',
      },
    ],
    faqs: [
      {
        id: 'em-1',
        question: 'Should I book an emergency visit online?',
        answer:
          'No. For acute dental emergencies, please call us immediately at 022 25891949 or +91 99870 76628 so our team can prepare for your arrival without delay.',
      },
      {
        id: 'em-2',
        question: 'What if an emergency happens on Sunday or late night?',
        answer:
          'We maintain a 24-hour telephone service for queries and urgent dental emergencies. Call our emergency helpline for instructions.',
      },
    ],
    isBookable: false,
    relatedSlugs: ['root-canal-treatment', 'broken-teeth', 'oral-surgery-extractions'],
  },

  'dental-implants': {
    slug: 'dental-implants',
    name: 'Dental Implants',
    category: 'Implantology',
    duration: '60 Minutes',
    overview:
      'Dental implants represent the modern standard for replacing missing teeth. A biocompatible titanium anchor is placed securely within the jawbone, acting as a natural tooth root. Once integrated, a custom porcelain crown is affixed, restoring natural biting strength, aesthetics, and preventing adjacent bone loss. Can often be placed same day as extraction.',
    whoItIsFor: [
      'Individuals missing one, several, or all natural teeth',
      'Patients seeking a permanent, non-removable alternative to dentures',
      'Those wishing to preserve natural facial structure and jawbone density',
      'Patients requiring tooth extraction who want immediate socket implant placement',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Diagnostic Assessment & 3D Planning',
        description:
          'Clinical exam and radiographic imaging to evaluate bone quality, density, and optimal implant positioning.',
      },
      {
        step: '02',
        title: 'Gentle Titanium Fixture Placement',
        description:
          'Under comfortable local anaesthesia, the titanium implant is placed in the jawbone. In eligible cases, immediate placement following extraction is possible.',
      },
      {
        step: '03',
        title: 'Osseointegration & Crown Placement',
        description:
          'Over several weeks, the implant integrates firmly with surrounding bone. A custom ceramic crown is securely attached to restore natural chewing and smiles.',
      },
    ],
    faqs: [
      {
        id: 'di-1',
        question: 'Can an implant be placed on the same day as tooth extraction?',
        answer:
          'Yes, in many cases where healthy surrounding jawbone and absence of acute infection permit, an immediate implant can often be placed during the extraction visit.',
      },
      {
        id: 'di-2',
        question: 'How long do dental implants last?',
        answer:
          'With diligent daily hygiene and regular 6-month dental reviews, dental implants are exceptionally durable and provide long-lasting, reliable function.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['crowns', 'bridges', 'free-consultation'],
  },

  'invisalign': {
    slug: 'invisalign',
    name: 'Invisalign (Clear Aligners)',
    category: 'Orthodontics',
    duration: '30 Minutes',
    overview:
      'Invisalign straightens teeth discreetly using a sequence of clear, removable medical-grade aligners. Aligners are changed about every 2 weeks, with in-clinic progress visits every 4 to 6 weeks. Adult treatments typically span 12 to 18 months, concluded with custom retainers to maintain lifelong alignment.',
    whoItIsFor: [
      'Adults and teenagers seeking discreet teeth alignment without metal brackets or wires',
      'Correction of crowding, gaps, mild overbites, underbites, or crossbites',
      'Individuals needing removable aligners to eat, brush, and floss normally without restrictions',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Orthodontic Assessment & Digital Scans',
        description:
          'We evaluate your bite, take precise digital impressions, and create a visual preview of your anticipated tooth movements.',
      },
      {
        step: '02',
        title: 'Custom Aligner Series',
        description:
          'A personalized series of clear aligners is fabricated. You wear each set for 20 to 22 hours daily, switching to the next aligner approximately every 2 weeks.',
      },
      {
        step: '03',
        title: 'Progress Checks & Retainers',
        description:
          'Routine clinic visits every 4 to 6 weeks ensure smooth tracking. Upon completion, custom retainers preserve your new smile alignment.',
      },
    ],
    faqs: [
      {
        id: 'inv-1',
        question: 'How long does adult Invisalign treatment take?',
        answer:
          'Adult treatment typically ranges from 12 to 18 months depending on case complexity, with aligner changes every 2 weeks and reviews every 4 to 6 weeks.',
      },
      {
        id: 'inv-2',
        question: 'Are clear aligners available for teenagers?',
        answer:
          'Yes, Invisalign Teen is designed specifically with compliance indicators and space for erupting permanent teeth.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['digital-smile-design', 'porcelain-veneers', 'free-consultation'],
  },

  'root-canal-treatment': {
    slug: 'root-canal-treatment',
    name: 'Root Canal Treatment',
    category: 'Restorative Dentistry',
    duration: '60 Minutes',
    overview:
      'Root canal treatment relieves acute pain caused by inflamed or infected dental pulp. Rather than extracting the tooth, the infected nerve tissue is gently removed, the root canals are meticulously disinfected and sealed, and the tooth is restored with a protective crown.',
    whoItIsFor: [
      'Severe, lingering pain upon eating hot or cold foods',
      'Spontaneous, throbbing toothaches or pain when biting down',
      'Deep cavities that have reached the nerve chamber',
      'Darkened or traumatized teeth with localized root tip infection',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Numbing & Diagnosis',
        description:
          'Thorough local anaesthesia ensures the procedure is comfortable and pain-free.',
      },
      {
        step: '02',
        title: 'Canal Cleaning & Disinfection',
        description:
          'The infected pulp is removed, and root canals are cleaned and sterilized.',
      },
      {
        step: '03',
        title: 'Hermetic Sealing & Crown Restoration',
        description:
          'Canals are sealed with gutta-percha. A crown is typically placed to reinforce the tooth against future fractures.',
      },
    ],
    faqs: [
      {
        id: 'rct-1',
        question: 'Is root canal treatment painful?',
        answer:
          'No. With modern local anaesthetic techniques, root canal treatment is performed comfortably, directly relieving the toothache that brought you in.',
      },
      {
        id: 'rct-2',
        question: 'Is a crown always necessary after a root canal?',
        answer:
          'For premolars and molars that bear heavy chewing forces, a crown is strongly recommended to protect the treated tooth from cracking.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['crowns', 'white-fillings', 'emergency-care'],
  },

  'teeth-whitening': {
    slug: 'teeth-whitening',
    name: 'Teeth Whitening',
    category: 'Cosmetic Dentistry',
    duration: '45 Minutes',
    overview:
      'Brighten your natural smile safely under professional dental supervision. We provide in-office 1-hour whitening treatments, customized at-home whitening trays, and internal whitening for discolored non-vital teeth.',
    whoItIsFor: [
      'Enamel stained by coffee, tea, red wine, or tobacco',
      'Age-related enamel yellowing or dullness',
      'Patients preparing for milestone events or smile makeovers',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Shade Assessment & Cleaning',
        description:
          'We record your baseline tooth shade and perform a light polish to remove external surface plaque.',
      },
      {
        step: '02',
        title: 'Protective Barrier & Gel Application',
        description:
          'Gum tissues are carefully shielded before applying professional-grade whitening gel.',
      },
      {
        step: '03',
        title: 'Radiant Results & Maintenance Guidance',
        description:
          'Teeth are lightened visibly in about 1 hour. We provide desensitizing care and guidance for long-lasting brightness.',
      },
    ],
    faqs: [
      {
        id: 'tw-1',
        question: 'Will professional whitening damage my enamel?',
        answer:
          'No. Supervised dental whitening is safe for healthy enamel and does not strip or weaken tooth structure.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['digital-smile-design', 'porcelain-veneers', 'preventative-dentistry'],
  },

  'porcelain-veneers': {
    slug: 'porcelain-veneers',
    name: 'Porcelain Veneers',
    category: 'Cosmetic Dentistry',
    duration: '60 Minutes',
    overview:
      'Porcelain veneers are custom-crafted, ultra-thin ceramic shells bonded securely to the front surface of your teeth to correct persistent discoloration, minor misalignment, chips, or gaps.',
    whoItIsFor: [
      'Teeth with stubborn internal discoloration unresponsive to whitening',
      'Chipped, worn down, or irregularly shaped teeth',
      'Diastemas (unwanted gaps between front teeth)',
    ],
    howItWorks: [
      {
        step: '01',
        title: 'Smile Consultation & Design',
        description: 'Collaborative analysis of facial proportions and desired tooth contours.',
      },
      {
        step: '02',
        title: 'Minimal Preparation & Impressions',
        description: 'Conservative enamel shaping and high-precision impressions for the dental laboratory.',
      },
      {
        step: '03',
        title: 'Bonding & Polishing',
        description: 'Handcrafted ceramic veneers are bonded permanently with high-strength composite cement.',
      },
    ],
    faqs: [
      {
        id: 'pv-1',
        question: 'How do porcelain veneers look compared to natural teeth?',
        answer:
          'High-grade porcelain mimics the natural translucency, light reflection, and texture of tooth enamel seamlessly.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['digital-smile-design', 'teeth-whitening', 'smile-makeovers'],
  },

  'digital-smile-design': {
    slug: 'digital-smile-design',
    name: 'Digital Smile Design',
    category: 'Cosmetic Dentistry',
    duration: '45 Minutes',
    overview:
      'Digital Smile Design (DSD) uses facial photographs, video analysis, and digital models to design your ideal smile in harmony with your facial expressions, lips, and personal characteristics before any clinical treatment begins.',
    whoItIsFor: [
      'Patients contemplating extensive cosmetic or restorative treatments',
      'Those who wish to visually preview their anticipated smile before committing',
    ],
    howItWorks: [
      { step: '01', title: 'Facial & Dental Documentation', description: 'Comprehensive photo and video analysis.' },
      { step: '02', title: 'Digital Architectural Simulation', description: 'Designing proportional tooth lengths and contours.' },
      { step: '03', title: 'Patient Review & Roadmap', description: 'Reviewing the simulated outcome together with Dr. Gangal.' },
    ],
    faqs: [
      {
        id: 'dsd-1',
        question: 'Why is Digital Smile Design beneficial?',
        answer:
          'It eliminates guesswork, ensuring you and your dentist share the exact same aesthetic goal before treatment starts.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['porcelain-veneers', 'invisalign', 'smile-makeovers'],
  },

  'white-fillings': {
    slug: 'white-fillings',
    name: 'White Fillings (Composite Restorations)',
    category: 'General Dentistry',
    duration: '30 Minutes',
    overview:
      'Composite resin fillings are custom shade-matched to your surrounding enamel, restoring tooth strength after cavity removal without unsightly silver amalgam.',
    whoItIsFor: [
      'Treating newly diagnosed dental cavities',
      'Replacing old or failing silver amalgam fillings',
      'Repairing minor chipped edges',
    ],
    howItWorks: [
      { step: '01', title: 'Gentle Decay Removal', description: 'Cleaning the affected tooth structure under local numbing.' },
      { step: '02', title: 'Layered Composite Placement', description: 'Applying resin matched to your natural tooth shade.' },
      { step: '03', title: 'Light Curing & Bite Check', description: 'Curing with blue light and polishing for a smooth finish.' },
    ],
    faqs: [
      {
        id: 'wf-1',
        question: 'How long do composite white fillings last?',
        answer:
          'With good oral hygiene, composite fillings typically provide many years of durable, aesthetically invisible service.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['preventative-dentistry', 'root-canal-treatment', 'free-consultation'],
  },

  'smile-makeovers': {
    slug: 'smile-makeovers',
    name: 'Smile Makeovers',
    category: 'Cosmetic Dentistry',
    duration: '60 Minutes',
    overview:
      'A comprehensive, customized rejuvenation that combines aligners, ceramic veneers, teeth whitening, and restorative work to restore youthful harmony, symmetry, and confidence to your smile.',
    whoItIsFor: [
      'Patients with multiple aesthetic concerns (wear, discoloration, gaps, crowding)',
      'Full architectural smile rehabilitation',
    ],
    howItWorks: [
      { step: '01', title: 'Comprehensive Consultation', description: 'Evaluating oral health, bite function, and aesthetics.' },
      { step: '02', title: 'Staged Treatment Plan', description: 'Orchestrating orthodontic, restorative, and cosmetic steps.' },
      { step: '03', title: 'Harmonious Transformation', description: 'Executing care with deliberate unhurried precision.' },
    ],
    faqs: [
      {
        id: 'sm-1',
        question: 'How long does a full smile makeover take?',
        answer:
          'It varies based on procedures chosen; aligners take several months, while veneer and whitening combinations can conclude in a few weeks.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['digital-smile-design', 'porcelain-veneers', 'invisalign'],
  },

  'oral-surgery-extractions': {
    slug: 'oral-surgery-extractions',
    name: 'Oral Surgery & Extractions',
    category: 'Oral Surgery',
    duration: '45 Minutes',
    overview:
      'When a tooth is broken beyond repair or impacted (such as problematic wisdom teeth), our dentists perform gentle, comfortable extractions with careful local numbing and meticulous socket preservation.',
    whoItIsFor: [
      'Severely cracked or infected teeth that cannot be preserved with a root canal',
      'Impacted, painful, or crowded wisdom teeth',
      'Pre-orthodontic extraction requirements',
    ],
    howItWorks: [
      { step: '01', title: 'Pre-Surgical Radiography', description: 'Assessing root anatomy and bone relation.' },
      { step: '02', title: 'Comfortable Numbing & Extraction', description: 'Gentle luxation and removal with minimal tissue disturbance.' },
      { step: '03', title: 'Socket Care & Post-Op Guidance', description: 'Detailed verbal and written recovery instructions.' },
    ],
    faqs: [
      {
        id: 'ose-1',
        question: 'Will I feel pain during an extraction?',
        answer:
          'No. Thorough local anaesthesia ensures you only feel mild pressure, never sharp pain. We never begin until you are completely numb.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['dental-implants', 'broken-teeth', 'emergency-care'],
  },

  'crowns': {
    slug: 'crowns',
    name: 'Dental Crowns',
    category: 'Restorative Dentistry',
    duration: '45 Minutes',
    overview:
      'Crowns are custom-fitted ceramic or porcelain caps that encase a damaged tooth, restoring its natural anatomical shape, biting strength, and appearance.',
    whoItIsFor: [
      'Teeth weakened by large cavities or root canal treatment',
      'Severely worn down or fractured teeth',
      'Anchoring dental bridges or topping dental implants',
    ],
    howItWorks: [
      { step: '01', title: 'Tooth Preparation & Shaping', description: 'Conservative reduction to create space for the crown.' },
      { step: '02', title: 'Impression & Temporary Crown', description: 'Precise impressions while you wear a temporary restoration.' },
      { step: '03', title: 'Definitive Cementation', description: 'Bonding your permanent crown and verifying comfortable bite occlusion.' },
    ],
    faqs: [
      {
        id: 'cr-1',
        question: 'What materials are used for crowns?',
        answer:
          'We utilize biocompatible porcelain and all-ceramic materials matched to your natural tooth shade.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['bridges', 'root-canal-treatment', 'dental-implants'],
  },

  'bridges': {
    slug: 'bridges',
    name: 'Dental Bridges',
    category: 'Restorative Dentistry',
    duration: '45 Minutes',
    overview:
      'A fixed dental bridge bridges the space created by one or more missing teeth, using crowns on healthy adjacent teeth as anchors.',
    whoItIsFor: [
      'Replacing one or more consecutive missing teeth',
      'Patients seeking a fixed, non-removable solution without implant surgery',
    ],
    howItWorks: [
      { step: '01', title: 'Abutment Preparation', description: 'Preparing supporting teeth on either side of the space.' },
      { step: '02', title: 'Fabrication', description: 'Precision milling of the multi-unit bridge.' },
      { step: '03', title: 'Final Bonding', description: 'Securing the bridge and checking balanced chewing function.' },
    ],
    faqs: [
      {
        id: 'br-1',
        question: 'How do I clean underneath a dental bridge?',
        answer:
          'We demonstrate simple specialized floss threaders or interdental brushes to keep the space beneath the pontic clean.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['crowns', 'dental-implants', 'dentures'],
  },

  'dentures': {
    slug: 'dentures',
    name: 'Dentures (Complete & Partial)',
    category: 'Removable Prosthetics',
    duration: '45 Minutes',
    overview:
      'Dentures are custom-crafted removable appliances that replace missing teeth and surrounding gum tissues, restoring facial fullness and comfortable eating.',
    whoItIsFor: [
      'Patients missing multiple or all teeth in an arch',
      'Those seeking an accessible, non-surgical tooth replacement option',
    ],
    howItWorks: [
      { step: '01', title: 'Anatomical Impressions', description: 'Detailed molds of your alveolar ridges and palate.' },
      { step: '02', title: 'Wax Try-In & Shade Selection', description: 'Checking tooth arrangement, aesthetics, and bite harmony.' },
      { step: '03', title: 'Delivery & Fine-Tuning', description: 'Delivering the prosthesis and making comfort adjustments.' },
    ],
    faqs: [
      {
        id: 'dt-1',
        question: 'How long does it take to get used to new dentures?',
        answer:
          'Most patients adapt comfortably within a few weeks as oral muscles become accustomed to the new contours.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['dental-implants', 'bridges', 'free-consultation'],
  },

  'broken-teeth': {
    slug: 'broken-teeth',
    name: 'Broken Teeth Repair',
    category: 'Restorative Care',
    duration: '30 Minutes',
    overview:
      'Chipped, cracked, or traumatized teeth require prompt evaluation to prevent nerve exposure and bacterial infection. We stabilize the fracture and restore natural aesthetics using bonding, inlays, or crowns.',
    whoItIsFor: [
      'Accidental trauma, sports injuries, or biting on hard objects',
      'Cracked tooth syndrome with pain on biting release',
    ],
    howItWorks: [
      { step: '01', title: 'Clinical & Radiographic Diagnosis', description: 'Determining if the fracture extends into the pulp or root.' },
      { step: '02', title: 'Stabilization & Restoration', description: 'Bonding or crowning the tooth to seal dentinal tubules.' },
      { step: '03', title: 'Follow-up Monitoring', description: 'Confirming pulp vitality and comfortable bite function.' },
    ],
    faqs: [
      {
        id: 'bt-1',
        question: 'What should I do immediately if I break a tooth?',
        answer:
          'Rinse gently with warm water, save any tooth fragments if possible, and call our clinic right away at 022 25891949.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['crowns', 'white-fillings', 'emergency-care'],
  },

  'pediatric-dentistry': {
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    category: 'Children & Teens',
    duration: '30 Minutes',
    overview:
      'Gentle, child-centered dental visits designed to cultivate trust and positive lifelong oral hygiene habits. We focus on preventive cleanings, cavity-preventing fissure sealants, gentle habit coaching, and early bite guidance.',
    whoItIsFor: [
      'Toddlers having their first dental visit',
      'School-age children needing cavity prevention or fluoride applications',
      'Teens requiring early orthodontic screening',
    ],
    howItWorks: [
      { step: '01', title: 'Unhurried Introduction', description: 'Making your child feel safe and comfortable in the operatory room.' },
      { step: '02', title: 'Gentle Examination & Cleaning', description: 'Checking developing teeth, gums, and bite alignment.' },
      { step: '03', title: 'Positive Reinforcement', description: 'Engaging oral hygiene coaching and congratulations.' },
    ],
    faqs: [
      {
        id: 'ped-1',
        question: 'When should a child have their first dental visit?',
        answer:
          'We recommend their first visit when their first baby tooth erupts or by their first birthday, ensuring early guidance.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['preventative-dentistry', 'invisalign', 'white-fillings'],
  },

  'preventative-dentistry': {
    slug: 'preventative-dentistry',
    name: 'Preventative Dentistry & Hygiene',
    category: 'Preventive Care',
    duration: '30 Minutes',
    overview:
      'Preventative dental care is the cornerstone of lifelong oral health. Professional ultrasonic scaling and gentle polishing remove hardened tartar (calculus) and harmful bacterial plaque that routine brushing cannot reach.',
    whoItIsFor: [
      'Routine 6-month preventative checkups for all family members',
      'Managing gum inflammation (gingivitis) and bleeding gums',
      'Preventing dental decay and freshening breath',
    ],
    howItWorks: [
      { step: '01', title: 'Periodontal Assessment', description: 'Measuring gum pocket depths and checking for tartar buildup.' },
      { step: '02', title: 'Gentle Scaling & Polishing', description: 'Removing plaque and stains comfortably.' },
      { step: '03', title: 'Custom Hygiene Strategy', description: 'Reviewing flossing techniques and diet recommendations.' },
    ],
    faqs: [
      {
        id: 'prev-1',
        question: 'How often should I get my teeth cleaned?',
        answer:
          'Most patients benefit from professional dental hygiene cleaning every 6 months to prevent periodontal disease.',
      },
    ],
    isBookable: true,
    relatedSlugs: ['free-consultation', 'white-fillings', 'pediatric-dentistry'],
  },
};

export async function generateStaticParams() {
  return Object.keys(detailedTreatments).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const treatment = detailedTreatments[params.slug];
  if (!treatment) {
    return { title: 'Treatment Not Found' };
  }

  return {
    title: `${treatment.name} in Manpada, Thane`,
    description: treatment.overview,
    openGraph: {
      title: `${treatment.name} · Gangal Dental Clinic`,
      description: treatment.overview,
    },
  };
}

export default function TreatmentDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const treatment = detailedTreatments[params.slug];

  if (!treatment) {
    notFound();
  }

  // FAQPage JSON-LD schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: treatment.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <article className="w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-12">
        <div className="flex flex-col items-start gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-theme-container text-primary font-sans text-[12px] font-semibold uppercase tracking-wider">
            <span>{treatment.category}</span>
            <span>·</span>
            <span>{treatment.duration}</span>
          </div>

          <h1 className="font-serif text-[36px] sm:text-[48px] text-primary font-normal leading-tight">
            {treatment.name}
          </h1>

          <p className="font-sans text-[17px] sm:text-[19px] text-theme-muted leading-relaxed">
            {treatment.overview}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            {treatment.isBookable ? (
              <Link
                href={`/book?service=${treatment.slug}`}
                className="inline-flex items-center gap-2 min-h-[50px] px-8 rounded-full bg-primary text-white font-sans text-[15px] font-medium shadow-button hover:bg-theme-primary-container interactive-button"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </Link>
            ) : (
              <a
                href={siteConfig.contact.landlineTel}
                className="inline-flex items-center gap-2 min-h-[50px] px-8 rounded-full bg-error text-white font-sans text-[15px] font-semibold shadow-button hover:bg-error/90 interactive-button"
              >
                <Phone className="w-4 h-4" />
                <span>Call Urgent Desk (022 25891949)</span>
              </a>
            )}

            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 min-h-[50px] px-6 rounded-full bg-theme-card text-theme-ink font-sans text-[15px] font-medium border border-theme-border hover:bg-theme-container-low interactive-button shadow-sm"
            >
              <span>Ask a Question on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Who it is for & Step-by-step breakdown */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* Who is this for? */}
            <div className="p-8 rounded-[28px] bg-theme-card border border-theme-border/70 shadow-sm">
              <h2 className="font-serif text-[24px] sm:text-[28px] text-primary mb-4 font-normal">
                Who this treatment is for
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {treatment.whoItIsFor.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="font-sans text-[15px] text-theme-ink leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div>
              <h2 className="font-serif text-[26px] sm:text-[30px] text-primary mb-6 font-normal">
                How treatment unfolds
              </h2>
              <div className="flex flex-col gap-4">
                {treatment.howItWorks.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-[24px] bg-theme-card border border-theme-border/60 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4"
                  >
                    <span className="w-9 h-9 rounded-full bg-theme-container text-primary font-sans text-[13px] font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="font-serif text-[20px] text-primary mb-1 font-normal">
                        {step.title}
                      </h3>
                      <p className="font-sans text-[15px] text-theme-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment FAQs */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h2 className="font-serif text-[26px] sm:text-[30px] text-primary font-normal">
                  Common questions
                </h2>
              </div>
              <Accordion items={treatment.faqs} />
            </div>
          </div>

          {/* Right Column: Sticky Booking Card & Clinical Reassurance */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="sticky top-28 p-7 rounded-[28px] bg-theme-card border border-theme-border shadow-ambient flex flex-col gap-5">
              <div>
                <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-theme-secondary block mb-1">
                  Ready to reserve time?
                </span>
                <h3 className="font-serif text-[22px] text-primary font-normal leading-tight">
                  {treatment.name}
                </h3>
              </div>

              <div className="flex flex-col gap-2.5 text-[14px] font-sans text-theme-muted border-y border-theme-border/40 py-4">
                <div className="flex items-center justify-between">
                  <span>Duration</span>
                  <span className="font-medium text-theme-ink">{treatment.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>First Visit Consultation</span>
                  <span className="font-medium text-primary">Free of Charge</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Location</span>
                  <span className="font-medium text-theme-ink">Manpada, Thane</span>
                </div>
              </div>

              {treatment.isBookable ? (
                <Link
                  href={`/book?service=${treatment.slug}`}
                  className="w-full min-h-[48px] rounded-full bg-primary text-white font-sans text-[14px] font-medium flex items-center justify-center shadow-button hover:bg-theme-primary-container transition-colors"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Choose Day &amp; Time</span>
                </Link>
              ) : (
                <a
                  href={siteConfig.contact.landlineTel}
                  className="w-full min-h-[48px] rounded-full bg-error text-white font-sans text-[14px] font-semibold flex items-center justify-center shadow-button hover:bg-error/90 transition-colors"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span>Call {siteConfig.contact.landline}</span>
                </a>
              )}

              <div className="pt-2 flex items-start gap-2.5 text-[13px] text-theme-muted font-sans">
                <Shield className="w-4 h-4 text-theme-secondary shrink-0 mt-0.5" />
                <span>
                  Our reception will contact you to confirm details before your appointment.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

