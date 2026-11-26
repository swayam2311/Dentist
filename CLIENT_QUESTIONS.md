# Gangal Dental Clinic — Client Questions & Verification Log (DCI & DPDP Compliance)

**Document Reference:** `CLIENT_QUESTIONS.md`  
**Purpose:** In accordance with the Dental Council of India (DCI) Code of Ethics Regulations and the Digital Personal Data Protection (DPDP) Act 2023, medical claims, credentials, prices, amenities, and personnel details must never be fabricated. This document lists all items requiring formal confirmation from Dr. Anand Gangal before being published on the production website.

---

## 1. Clinic Coordinates & Physical Accessibility

- [ ] **Physical Access & Elevator:**
  - *Export Contradiction:* The initial design mock-up claimed "wheelchair-friendly ground-floor elevator access" in one section, but "no elevators required" in another.
  - *Question for Clinic:* Is the clinic at Shop No. 26, 28, 29 located strictly on the ground floor with zero steps, or is there a ramp/step at the entrance?
  - *Current Status on Site:* Described neutrally as ground-level shopping complex entry; wheelchair claim flagged with `// TODO(client-verify)`.

- [ ] **Address & Pincode:**
  - *Export Contradiction:* Some mock screens showed `400607` and "Ghodbunder Road", while others showed `400610` and "Tikujiniwadi Road".
  - *Question for Clinic:* We have verified `Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane, Maharashtra 400610`. Please confirm this is the exact postal dispatch address.

- [ ] **Parking / Valet:**
  - *Export Claim:* "Free reserved valet parking".
  - *Question for Clinic:* Does Happy Valley Shopping Complex offer valet parking, or standard open complex customer parking?
  - *Current Status on Site:* Omitted from public copy until confirmed.

---

## 2. Operating Hours & Emergency Line

- [ ] **Emergency & After-Hours Phone Service:**
  - *Verified Hours:*
    - Mon – Fri: 10:00 AM – 1:00 PM & 6:00 PM – 10:00 PM
    - Sat: 10:00 AM – 5:00 PM
    - Sun: Closed
  - *Export Claim:* "24/7 post-op concierge" and "Sundays reserved for UV-C sterilization".
  - *Question for Clinic:* The current site mentions a 24-hour telephone service for queries and urgent dental emergencies. Which exact number should patients dial for urgent after-hours emergencies — Landline `022 25891949` or Mobile `+91 99870 76628`?
  - *Current Status on Site:* Structured operating hours reflect the verified split sessions; Sunday is marked Closed.

---

## 3. Clinician Credentials & Team

- [ ] **Doctor Qualifications & Council Registration Numbers:**
  - *Export Claims:* "MDS Prosthodontics", "IPS", "Fellow ICOI", "ISPPD Certified", "22+ years experience", "12+ years experience", "34 combined years".
  - *Question for Clinic:* Under DCI ethics, only recognized degrees and registration details may be displayed. Please provide:
    1. Dr. Anand Gangal: Exact recognized qualification (e.g. BDS, MDS) and State Dental Council Registration Number.
    2. Dr. Padma Kurup: Exact qualification and State Dental Council Registration Number.
  - *Current Status on Site:* Displayed only as "Principal Dentist" and "Associate Dentist" with general descriptions; all unverified acronyms and years removed.

- [ ] **Real Team Photography:**
  - *Current State:* The design export included AI-generated portraits of doctors and clinical staff (`lh3.googleusercontent.com/aida-public`).
  - *Question for Clinic:* Please provide authentic high-resolution photos of Dr. Anand Gangal, Dr. Padma Kurup, the clinical assistants (Sanika, Vaishali, Santosh, Runali, Preeti), receptionist Sayali Jadhav, and the clinic interior/operatory.
  - *Current Status on Site:* Replaced with tasteful brand monogram avatars with `// TODO(client-verify)` tags until real photos are provided.

---

## 4. Clinical Techniques & Amenities

- [ ] **Clinical Technology Claims:**
  - *Export Claims:* "Complimentary 3D digital optical scan", "Oral cancer screening included", "Grade IV titanium implants", "Computer-guided 0.1mm placement", "Microscopic single-sitting endodontics", "Sedation protocols", "Strawberry numbing gel".
  - *Question for Clinic:* Which specific diagnostic equipment and treatment options should be highlighted?
  - *Current Status on Site:* Replaced with accurate, professional descriptions of standard gentle dental care, unhurried examinations, and patient comfort protocols.

- [ ] **Environment & Comfort Amenities:**
  - *Export Claims:* "Soundproof acoustically dampened suites", "Bose binaural noise-cancelling headphones", "Aromatherapy", "Warm fleece blankets", "Ceiling-mounted 4K entertainment monitors".
  - *Question for Clinic:* Does the clinic offer any of these comfort amenities, or should we describe the calm, quiet atmosphere without specific consumer electronics brands?
  - *Current Status on Site:* Omitted brand-name amenities and superlatives.

---

## 5. Patient Reviews & Testimonials

- [ ] **Review Consent & Direct Review Links:**
  - *Real Quotes on Site:* Asmita Patil, Sahil Desai, Jaya Iyer (migrated from current site).
  - *Question for Clinic:* 
    1. Please confirm explicit patient consent for displaying these reviews under DPDP Act 2023.
    2. Please provide the official Google Business Profile review link so prospective patients can read live third-party reviews directly.

---

## 6. Website Forms & Technical Integrations

- [ ] **Third-Party Static Form Endpoint:**
  - *Architecture:* The website is engineered as a 100% static site for maximum performance, security, and zero server maintenance costs.
  - *Question for Clinic:* Which service should receive email notifications when a patient submits the booking inquiry or contact form?
    - Recommended option: Formspree endpoint (e.g., `https://formspree.io/f/xyz...`) or Web3Forms access key.
    - Fallback: Form submissions automatically format a pre-filled WhatsApp message opening directly into `wa.me/919987076628`.

- [ ] **WhatsApp Business Confirmation:**
  - *Question for Clinic:* Confirm that `+91 99870 76628` is actively registered on WhatsApp Business to receive incoming patient booking inquiries.

- [ ] **Production Domain & DNS:**
  - *Question for Clinic:* Confirm that the target domain for launch is `gangaldentalclinic.com` and that Vercel DNS CNAME/A records will be configured during cutover.

