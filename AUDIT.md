# AUDIT.md — Gangal Dental Clinic (Google Stitch Export Comprehensive Audit)

**Audit Date:** November 2026  
**Auditor:** Senior Full-Stack Engineer, UI/UX Designer & Creative Technologist  
**Project:** Gangal Dental Clinic (Manpada, Thane) — Modern Web Platform Rebuild  
**Source Export Inspected:** `./stitch-export/` (9 screens, `DESIGN.md`, `three.js/code.html`)

---

## 1. Executive Summary

The Google Stitch export provides a cohesive, calming aesthetic direction dubbed *"Serene Sanctuary Dental"*. However, as an engineering, clinical, and data artifact, it contains severe security vulnerabilities, broken scripts, unverified medical claims, dead navigation, and structural contradictions between its design specification and its implementation tokens.

This audit catalogues every screen, component defect, security flaw, and content discrepancy to guide Phase 1 (Planning) and Phase 2 (Production Build).

---

## 2. Screen-by-Screen Audit

| # | Screen Folder | Visual Purpose | Current State & Critical Defects |
|---|---------------|----------------|----------------------------------|
| 1 | `gangal_dental_clinic_gentle_family_dentistry` | Desktop Homepage (Static) | 18 dead `href="#"` links; broken monogram image tag showing raw alt text; Material Symbols web font dependency; Tailwind CDN script; AI-generated hero image hotlinked to `lh3.googleusercontent.com`; static map screenshot; invented claims in text. |
| 2 | `gangal_dental_clinic_gentle_family_dentistry_animated` | Desktop Homepage (Motion Spec) | Demonstrates CSS keyframes (`gentleFloat`, `calmBreathing`, `ambientDrift`, `toothPulse`), IntersectionObserver section reveal, monoline stroke-drawing, hero callouts, and scroll-driven tooth timeline marker. Lacks Lenis/GSAP integration; has dead links; uses aqua theme. |
| 3 | `gangal_dental_clinic_mobile_homepage` | Mobile Viewport Experience | Establishes the 4-item sticky action bar (Call, WhatsApp, Directions, Book), mobile typography scale, and stacked bento cards. Dead links; incorrect WhatsApp number (`9102225891949`); missing safe-area padding handling. |
| 4 | `treatments_gangal_dental_clinic` | Treatments & Services Catalog | Contains 12 treatment cards and client-side category filter buttons. All "Learn more" buttons link to `href="#"`; no detail route exists; contains unverified clinical claims ("microscopic single-sitting endodontics", "Grade IV titanium", "cancer screening"). |
| 5 | `book_appointment_gangal_dental_clinic` | Appointment Scheduling Flow | Static mockup only. Step 1 is mislabeled "Free Consultation" instead of a service picker; static calendar hardcoded to November 2025 (Nov 14 mislabeled as Thu instead of Fri); shows slots on Saturday evening past 17:00 close; shows a 21:45 slot that overruns 22:00 close; 45-minute cadence invented; no form fields for patient contact or DPDP consent; zero JS logic. |
| 6 | `booking_confirmed_gangal_dental_clinic` | Booking Confirmation Screen | Static display showing reference `GDC-4F7K`. Mock copy button with inline JS alert; no real database lookup; calendar and WhatsApp buttons link to `#`; unverified claims regarding 45-minute sessions and valet parking. |
| 7 | `our_team_gangal_dental_clinic` | Clinical Team Showcase | Features 9 staff cards, but all 9 portraits are AI-generated faces hosted on `lh3.googleusercontent.com`. Lists invented credentials ("MDS Prosthodontics", "IPS Fellow ICOI", "ISPPD Certified", "22+ years"). Buttons link to `href="#"`. |
| 8 | `new_patients_gangal_dental_clinic` | First-Visit Guide & FAQ | Contains a 5-step journey and an accessible accordion FAQ. However, it incorporates invented amenity claims ("Bose headphones", "soundproof suites", "aromatherapy", "3D optical wand") and unverified statistics ("3,400+ patients", "68% first-timers"). |
| 9 | `contact_gangal_dental_clinic` | Contact Page & Consultation Form | Form has no backend connection, only a fake `setTimeout` alert; no input validation; no DPDP consent checkbox; incorrect WhatsApp links; unverified claims regarding UV-C sterilization on Sundays and 2-hour response guarantees. |
| 10 | `serene_sanctuary_dental/DESIGN.md` | Design System Documentation | Prose specifies warm linen (`#F6F1E8`) and soft porcelain (`#FCFAF6`), but the YAML tokens and HTML templates define aqua cyan (`#edfcff`, `#d4f4fa`, `#005255`). |
| 11 | `three.js/code.html` | 3D Hero Scene | Completely broken: A markdown "Next.js Implementation Guide" was pasted verbatim inside the `<script>` tag, throwing a syntax error on parse. Contains severe security anti-patterns in its drafted guide. |

---

## 3. Detailed Technical & Architectural Defects

### 3.1 Three.js & Draft Guide Defects (from `three.js/code.html`)
1. **Broken JavaScript Execution:** The file cannot execute because a markdown guide is pasted on line 27 inside the `<script>` block.
2. **Severe Security Vulnerability (Anon Select All):** The drafted Supabase schema suggested an RLS policy `CREATE POLICY "anon_select" ON appointments FOR SELECT USING (true);`. This would allow any anonymous visitor to read every patient's name, phone, email, and medical notes.
3. **Unvalidated Anon Insert:** Suggested `CREATE POLICY "anon_insert" ON appointments FOR INSERT WITH CHECK (true);` with no server-side constraint, schema validation, rate-limiting, or honeypot.
4. **Client-Side Reference Code Generation:** Used `Math.random().toString(36).substring(2, 6)` in client code. This is vulnerable to race conditions, duplicates, and spoofing. Reference codes must be generated securely by PostgreSQL with collision retry.
5. **No Double-Booking Prevention:** Appointments were modeled without temporal exclusion constraints. Two patients selecting the same slot simultaneously would both be saved. We must use `btree_gist` with `tstzrange(starts_at, ends_at)` exclusion.
6. **Time Slots Stored as Plain Strings:** Drafted slots as `'10:00'` instead of UTC `timestamptz`. Prevents accurate timezone offsets (Asia/Kolkata), duration arithmetic, and calendar integration.
7. **No Staff Authentication / Dashboard:** Zero role-based access control; no staff dashboard to manage bookings or status transitions.
8. **Memory & Animation Leaks:**
   - Lenis + GSAP sync in the draft called `gsap.ticker.remove(() => ...)` with a fresh anonymous function, meaning the ticker listener was never removed, causing memory leaks on page transitions.
   - Deprecated package `@studio-freight/lenis` was specified (the official package is now `lenis`).
   - Three.js scene lacked WebGL detection, poster fallback, touch event handlers, off-screen animation pausing via `IntersectionObserver`, and disposal of geometries, textures, and renderers on unmount.
   - 3D model consisted of crude geometric primitives (a basic cylinder for a tooth and pink cylinder for bone) with no anatomical accuracy.

### 3.2 Navigation & Link Audit
- **Dead Links:** Between 7 and 29 `href="#"` occurrences per screen across all headers, footers, card links, and buttons.
- **Nav Profile Icon:** Unlinked circle button with person icon performing no action.
- **Dangling Footer Routes:** References to "Sensory Care Protocol" and "Clinical Standards" which have no content and were invented by Stitch.
- **Privacy Policy Route:** Referenced as `href="#"` rather than `/privacy`.

### 3.3 Contact Coordinates & Identity Discrepancies
- **Wrong WhatsApp Links:** Stitch exported `https://wa.me/9102225891949`, `https://wa.me/912225891949`, and `https://wa.me/919820000000`. The verified clinic mobile for WhatsApp is `+91 99870 76628`.
- **Address & Pincode Discrepancy:** Stitch interchangeably used `400607` and `400610`, and cited "Ghodbunder Road" rather than "Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane West". The verified pincode is `400610`.
- **Sunday Operating Hours:** Stitch claimed Sundays are "Reserved for UV-C sterilization". The clinic's verified policy is simply "Sunday: Closed" with 24-hour telephone query/emergency availability.

### 3.4 Palette Conflict (Prose vs Tokens)
- **DESIGN.md Prose:**
  - Base Canvas: Warm Linen `#F6F1E8`
  - Elevated Surfaces / Cards: Soft Porcelain `#FCFAF6`
  - Primary Teal: `#1B6B6F`
  - Serene Sage: `#A9C0B3`
  - Warm Brushed Brass: `#B8935A`
  - Neutral Ink: `#0F2E33`
- **DESIGN.md Tokens & Rendered HTML:**
  - Surface: `#edfcff` (Aqua Cyan)
  - Surface-Container: `#d4f4fa`
  - Primary: `#005255`
  - On-Surface: `#001f24`
- **Resolution Strategy:** Implement CSS custom variables supporting both palettes. Default to the serene Warm Linen & Porcelain palette as specified in DESIGN.md prose, with an instant toggle for the Aqua Sanctuary theme.

---

## 4. Unverified Medical Claims & Fabricated Content

Per Rule Zero and DCI advertising ethics, the following claims in Stitch must never appear on the public site and must be moved to `CONTENT_TO_CONFIRM.md`:

1. **Credentials & Experience:**
   - "MDS Prosthodontics", "IPS", "Fellow ICOI", "ISPPD Certified".
   - "22+ years", "12+ years", "34 combined years", "6+ years with Gangal Clinic".
   - "3,400+ patients", "68% of first-timers", "94% don't feel anaesthetic", "5.0 star", "Verified Patient".
   - "Dr. Gangal & Partners", "Clinical Direct".
2. **Clinical Equipment & Techniques:**
   - "Complimentary 3D digital scan / low-radiation render", "cancer screening".
   - "Grade IV titanium", "computer-guided 0.1mm placement", "zirconia", "biomimetic".
   - "Microscopic single-sitting endodontics", "sedation protocols", "3D optical wand", "ultrasonic micro-vibrations", "strawberry numbing gel", "no impression pastes ever".
3. **Amenities & Architecture:**
   - "Soundproof / acoustically dampened suites", "Bose / binaural audio", "aromatherapy", "warm blankets", "4K monitor", "UV-C air purification".
   - "Never double-booked", "no waiting room congestion", "45-minute buffer", "20-minute discussion", "quotes guaranteed for 90 days", "reply within 2 hours", "insurance navigation".
   - "Free valet / reserved parking", "step-free / wheelchair-friendly entry", "ground-floor elevator access" (contradicted by "no elevators"), "Opp. D-Mart", "12 minutes from Thane Station", "pharmacy and organic tea cafe nearby".
4. **Absolute Claims:**
   - "Zero pain", "zero enamel sensitivity", "lifetime durability", "flawless", "zero residual pain".
5. **Fabricated Testimonial Additions:**
   - Sentence appended to Asmita Patil's quote: *"They walked me through every micro-step..."* (Not present on clinic site; removed).
6. **Synthetic Staff Imagery:**
   - All 9 staff photos on the team page are AI-generated stock renders from Google UserContent. Replaced with typographic monogram avatars until official clinic photography is supplied.

---

## 5. Audit Conclusion & Next Steps

The Stitch export represents a visually serene concept with deep technical debt and regulatory risks. In Phase 1 (PLAN.md), we establish:
1. Strict relational database schema with PostgreSQL exclusion constraints to guarantee zero double bookings.
2. Next.js 14 App Router architecture with full TypeScript typing.
3. Centralized `site.config.ts` enforcing verified clinical facts.
4. Procedural Three.js hero with anatomically accurate molar and implant models, graceful WebGL fallback, and memory safety.
5. End-to-end booking flow with Zod validation, rate limiting, and staff administration dashboard.
