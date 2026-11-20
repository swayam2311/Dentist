-- ============================================================================
-- GANGAL DENTAL CLINIC — SEED DATA (VERIFIED CLINIC FACTS ONLY)
-- All facts cross-checked against https://gangaldentalclinic.com/
-- ============================================================================

-- 1. SEED DENTISTS
INSERT INTO dentists (id, full_name, role, bio, is_active, sort_order)
VALUES 
  (
    'd1111111-1111-1111-1111-111111111111',
    'Dr. Anand Gangal',
    'Principal Dentist',
    'Principal Dentist at Gangal Dental Clinic, Manpada, Thane. Dedicated to preventive, conservative, and advanced restorative dentistry and implantology.',
    true,
    1
  ),
  (
    'd2222222-2222-2222-2222-222222222222',
    'Dr. Padma Kurup',
    'Associate Dentist',
    'Associate Dentist at Gangal Dental Clinic. Providing compassionate and comprehensive oral care for families and pediatric patients.',
    true,
    2
  )
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  bio = EXCLUDED.bio,
  is_active = EXCLUDED.is_active;

-- 2. SEED SERVICES (VERIFIED ONLY)
INSERT INTO services (id, slug, name, category, short_description, full_description, duration_minutes, is_bookable, is_active, sort_order)
VALUES
  (
    's0111111-1111-1111-1111-111111111101',
    'free-consultation',
    'Free Oral Health Consultation',
    'general',
    'Your first oral health consultation is completely free of charge. Comprehensive clinical examination and personalized treatment roadmap.',
    'During your free consultation, our dentists perform a thorough clinical examination of your oral health, discuss your dental goals, and provide an itemized treatment estimate with zero pressure.',
    30,
    true,
    true,
    1
  ),
  (
    's0111111-1111-1111-1111-111111111102',
    'emergency-care',
    'Emergency Care',
    'general',
    'Urgent dental relief, usually same-day. Immediate assistance for severe toothaches, trauma, or broken teeth. (Call-only service)',
    'We provide urgent emergency care for acute pain, broken restorations, or dental trauma. Please call us directly at 022 25891949 or +91 99870 76628 for immediate coordination.',
    30,
    false, -- Emergency is call-only
    true,
    2
  ),
  (
    's0111111-1111-1111-1111-111111111103',
    'dental-implants',
    'Dental Implants',
    'implants',
    'Permanent tooth replacement that restores full biting function and natural aesthetics. Can often be placed same day as extraction.',
    'Dental implants are titanium anchors placed in the jawbone that support custom lifelike crowns, providing a permanent solution that functions just like natural teeth.',
    60,
    true,
    true,
    3
  ),
  (
    's0111111-1111-1111-1111-111111111104',
    'invisalign',
    'Invisalign (Clear Aligners)',
    'orthodontics',
    'Clear, removable aligners changed about every 2 weeks. Adult treatments typically 12 to 18 months with progress reviews every 4 to 6 weeks.',
    'Invisalign straightens your teeth comfortably and discreetly using transparent medical-grade aligners. Includes custom retainer planning upon completion.',
    30,
    true,
    true,
    4
  ),
  (
    's0111111-1111-1111-1111-111111111105',
    'root-canal-treatment',
    'Root Canal Treatment',
    'restorative',
    'Gentle endodontic care to relieve acute toothache and preserve your natural tooth structure.',
    'Root canal therapy removes infection from within the tooth canal, cleans and disinfects the root structure, and seals it securely to save your natural tooth.',
    60,
    true,
    true,
    5
  ),
  (
    's0111111-1111-1111-1111-111111111106',
    'teeth-whitening',
    'Teeth Whitening',
    'cosmetic',
    'Professional in-office 1-hour brightening, customized at-home trays, and internal whitening for discolored teeth.',
    'Safe, gentle dental whitening tailored to your tooth sensitivity level, brightening natural enamel by several shades.',
    45,
    true,
    true,
    6
  ),
  (
    's0111111-1111-1111-1111-111111111107',
    'porcelain-veneers',
    'Porcelain Veneers',
    'cosmetic',
    'Custom ultra-thin ceramic veneers designed to correct chips, gaps, and persistent deep discoloration.',
    'Handcrafted porcelain shells bonded to the front surface of teeth to create a harmonious, radiant, and natural-looking smile.',
    60,
    true,
    true,
    7
  ),
  (
    's0111111-1111-1111-1111-111111111108',
    'digital-smile-design',
    'Digital Smile Design',
    'cosmetic',
    'Comprehensive aesthetic preview and planning tailored to facial proportions before initiating cosmetic dentistry.',
    'Digital Smile Design allows you to visualize your anticipated aesthetic outcome and collaborate with the dentist on shaping your new smile.',
    45,
    true,
    true,
    8
  ),
  (
    's0111111-1111-1111-1111-111111111109',
    'white-fillings',
    'White Fillings',
    'general',
    'Composite resin restorations closely matched to your natural tooth enamel shade for discreet, durable cavity repair.',
    'Tooth-colored composite restorations that blend seamlessly with your teeth while restoring strength and preventing decay progression.',
    30,
    true,
    true,
    9
  ),
  (
    's0111111-1111-1111-1111-111111111110',
    'smile-makeovers',
    'Smile Makeovers',
    'cosmetic',
    'Multidisciplinary cosmetic rejuvenation combining aligners, ceramic veneers, whitening, and gum contouring.',
    'A tailored treatment journey combining cosmetic techniques to restore harmony, symmetry, and youthful radiance to your smile.',
    60,
    true,
    true,
    10
  ),
  (
    's0111111-1111-1111-1111-111111111111',
    'oral-surgery-extractions',
    'Oral Surgery & Extractions',
    'restorative',
    'Careful, gentle removal of severely broken or impacted teeth with restorative socket preservation.',
    'Gentle extractions performed with thorough local numbing and meticulous post-operative guidance to ensure comfortable healing.',
    45,
    true,
    true,
    11
  ),
  (
    's0111111-1111-1111-1111-111111111112',
    'crowns',
    'Crowns',
    'restorative',
    'Full-coverage ceramic or porcelain caps to protect and strengthen weakened, fractured, or root-canal-treated teeth.',
    'Precision-milled crowns restore the exact anatomy, strength, and chewing capacity of structurally compromised teeth.',
    45,
    true,
    true,
    12
  ),
  (
    's0111111-1111-1111-1111-111111111113',
    'bridges',
    'Bridges',
    'restorative',
    'Fixed dental prostheses anchored by adjacent teeth to replace one or more missing teeth seamlessly.',
    'Custom dental bridges restore your dental arch, prevent adjacent teeth from shifting, and return confident chewing ability.',
    45,
    true,
    true,
    13
  ),
  (
    's0111111-1111-1111-1111-111111111114',
    'dentures',
    'Dentures',
    'restorative',
    'Precision-fitted complete and partial removable dentures engineered for comfortable daily speech and chewing.',
    'Custom crafted full or partial dentures designed to support facial structure and restore natural eating comfort.',
    45,
    true,
    true,
    14
  ),
  (
    's0111111-1111-1111-1111-111111111115',
    'broken-teeth',
    'Broken Teeth Repair',
    'restorative',
    'Immediate evaluation and restorative bonding or crowning for cracked, chipped, or fractured teeth.',
    'Prompt diagnosis and stabilization for traumatized or cracked teeth, restoring aesthetic form and sealing vulnerable dentin.',
    30,
    true,
    true,
    15
  ),
  (
    's0111111-1111-1111-1111-111111111116',
    'pediatric-dentistry',
    'Pediatric Dentistry',
    'children',
    'Gentle, comforting dental care and preventative sealants tailored specifically for infants, children, and teens.',
    'Child-friendly visits focused on gentle preventive hygiene, early orthodontic assessment, fluoride treatments, and gentle habit coaching.',
    30,
    true,
    true,
    16
  ),
  (
    's0111111-1111-1111-1111-111111111117',
    'preventative-dentistry',
    'Preventative Dentistry & Hygiene',
    'general',
    'Professional scaling, plaque removal, enamel remineralization, and customized home oral hygiene guidance.',
    'Routine dental cleaning and hygiene coaching to prevent gum disease, tartar buildup, and dental cavities before they start.',
    30,
    true,
    true,
    17
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  short_description = EXCLUDED.short_description,
  full_description = EXCLUDED.full_description,
  duration_minutes = EXCLUDED.duration_minutes,
  is_bookable = EXCLUDED.is_bookable,
  is_active = EXCLUDED.is_active,
  sort_order = EXCLUDED.sort_order;

-- 3. ASSOCIATE DENTISTS WITH SERVICES
-- Map all services to Dr Anand Gangal
INSERT INTO dentist_services (dentist_id, service_id)
SELECT 'd1111111-1111-1111-1111-111111111111', id FROM services
ON CONFLICT DO NOTHING;

-- Map pediatric, preventative, general, whitening, and consultation to Dr Padma Kurup
INSERT INTO dentist_services (dentist_id, service_id)
SELECT 'd2222222-2222-2222-2222-222222222222', id FROM services
WHERE category IN ('children', 'general', 'cosmetic') OR slug IN ('free-consultation', 'invisalign')
ON CONFLICT DO NOTHING;

-- 4. AVAILABILITY RULES (VERIFIED CLINIC HOURS)
-- Mon–Fri (1..5): 10:00 - 13:00 and 18:00 - 22:00
-- Sat (6): 10:00 - 17:00
-- Sun (0): Closed

DELETE FROM availability_rules;

-- Dr Anand Gangal Rules
-- Mon–Fri Morning (10:00 - 13:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
SELECT 'd1111111-1111-1111-1111-111111111111', d, '10:00'::TIME, '13:00'::TIME, 30
FROM generate_series(1, 5) AS d;

-- Mon–Fri Evening (18:00 - 22:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
SELECT 'd1111111-1111-1111-1111-111111111111', d, '18:00'::TIME, '22:00'::TIME, 30
FROM generate_series(1, 5) AS d;

-- Saturday (10:00 - 17:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
VALUES ('d1111111-1111-1111-1111-111111111111', 6, '10:00'::TIME, '17:00'::TIME, 30);

-- Dr Padma Kurup Rules
-- Mon–Fri Morning (10:00 - 13:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
SELECT 'd2222222-2222-2222-2222-222222222222', d, '10:00'::TIME, '13:00'::TIME, 30
FROM generate_series(1, 5) AS d;

-- Mon–Fri Evening (18:00 - 22:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
SELECT 'd2222222-2222-2222-2222-222222222222', d, '18:00'::TIME, '22:00'::TIME, 30
FROM generate_series(1, 5) AS d;

-- Saturday (10:00 - 17:00)
INSERT INTO availability_rules (dentist_id, weekday, start_time, end_time, slot_minutes)
VALUES ('d2222222-2222-2222-2222-222222222222', 6, '10:00'::TIME, '17:00'::TIME, 30);

