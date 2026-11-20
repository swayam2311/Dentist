# PLAN.md — Gangal Dental Clinic (Production Engineering Roadmap)

**Author:** Senior Full-Stack Engineer, UI/UX Designer & Creative Technologist  
**Target:** Turn `./stitch-export/` into a secure, completely functional Next.js 14 application deployed on Vercel with Supabase backend, zero unverified claims, and passing all acceptance tests.

---

## 1. Architectural Blueprint & Tech Stack

```text
gangal-dental-clinic/
├── src/
│   ├── app/
│   │   ├── layout.tsx                # App shell, next/font (Newsreader + Manrope), Lenis provider, meta
│   │   ├── page.tsx                  # Home (Hero 3D, Intent Tiles, Timeline, Treatments, Testimonials, Map)
│   │   ├── treatments/
│   │   │   ├── page.tsx              # Treatments catalog with URL category filter (?category=)
│   │   │   └── [slug]/page.tsx       # Service detail pages (FAQ, specs, preselected booking link)
│   │   ├── book/
│   │   │   ├── page.tsx              # 5-Step interactive booking flow with slide transitions & URL state
│   │   │   ├── confirmed/page.tsx    # Confirmation page (real ref code, .ics download, Google calendar, WhatsApp)
│   │   │   └── status/page.tsx       # Booking status check (ref + phone lookup, cancel request)
│   │   ├── our-team/page.tsx         # Verified team members (Dr. Anand, Dr. Padma, Sayali, Assistants)
│   │   ├── new-patients/page.tsx     # 5-step patient journey & interactive FAQ accordion (FAQPage JSON-LD)
│   │   ├── stories/page.tsx          # Real patient reviews (Asmita, Sahil, Jaya) & Google Reviews link
│   │   ├── contact/page.tsx          # Contact coordinates & validated contact form to Supabase
│   │   ├── privacy/page.tsx          # DPDP Act 2023 compliant privacy policy
│   │   ├── terms/page.tsx            # Terms of service
│   │   ├── admin/
│   │   │   ├── page.tsx              # Staff dashboard (Supabase realtime, appointments, status, reschedule)
│   │   │   └── login/page.tsx        # Staff auth portal
│   │   ├── api/
│   │   │   ├── appointments/
│   │   │   │   ├── route.ts          # Zod validation, honeypot, rate-limit, atomic booking RPC
│   │   │   │   └── status/route.ts   # Secure status lookup by ref + phone
│   │   │   ├── contact/route.ts      # Contact request submission, email alert via Resend
│   │   │   └── slots/route.ts        # get_available_slots query endpoint
│   │   ├── robots.ts                 # Search crawler rules (noindex /admin)
│   │   ├── sitemap.ts                # Dynamic XML sitemap generator
│   │   ├── not-found.tsx             # Custom 404 page in sanctuary aesthetic
│   │   └── error.tsx                 # Error boundary
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── DentalHeroScene.tsx   # Three.js molar & implant procedural model, interactive callouts
│   │   │   └── PosterFallback.tsx    # Accessible WebGL fallback poster
│   │   ├── motion/
│   │   │   ├── SmoothScrollProvider.tsx # Lenis + GSAP ScrollTrigger sync (safe ticker reference)
│   │   │   └── JourneyTimeline.tsx   # Scroll-driven SVG path with moving tooth marker
│   │   ├── navigation/
│   │   │   ├── Header.tsx            # Floating glass nav (blur 12, pill style)
│   │   │   ├── Footer.tsx            # Verified clinic details, hours, legal links
│   │   │   ├── MobileStickyBar.tsx   # Persistent mobile action bar (Call, WhatsApp, Directions, Book)
│   │   │   └── ThemeToggle.tsx       # Live theme switch between Warm Linen/Porcelain and Aqua
│   │   └── ui/
│   │       ├── Button.tsx            # Pill buttons with -2px lift & tactile press
│   │       ├── Card.tsx              # 28px radius, 1px brass hairline, ambient shadow
│   │       ├── Chip.tsx              # 36px filter chip
│   │       ├── Input.tsx             # 52px input with teal focus ring
│   │       ├── Accordion.tsx         # ARIA-compliant expandable accordion
│   │       ├── Calendar.tsx          # Asia/Kolkata live calendar (Sundays & closed dates disabled)
│   │       └── Stepper.tsx           # 5-step progress indicator
│   ├── config/
│   │   ├── site.config.ts            # Single source of truth: hours, phones, WhatsApp, address, team, services
│   │   └── redirects.ts              # 301 redirects for legacy WordPress URLs
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             # Browser anon Supabase client
│   │   │   ├── server.ts             # SSR cookie-based server client
│   │   │   └── admin.ts              # Service-role admin client (SERVER-ONLY)
│   │   ├── hours.ts                  # Asia/Kolkata "Open now / Opens at" live calculation
│   │   ├── ics.ts                    # iCalendar (.ics) file generation
│   │   └── rate-limit.ts             # In-memory / edge rate limiter for forms
│   └── styles/
│       └── globals.css               # Design system tokens, CSS variables, keyframe animations
├── supabase/
│   ├── migrations/
│   │   └── 20261120000000_init_gangal_schema.sql # Complete DDL, RLS, btree_gist exclusion, RPCs
│   └── seed.sql                      # Verified services, dentists, availability rules
└── tests/
    ├── rls.test.ts                   # Security assertions (anon denied on appointments, staff allowed)
    └── e2e/
        ├── booking.spec.ts           # End-to-end booking flow test
        └── links.spec.ts             # Link integrity & zero dead href="#" audit
```

---

## 2. Design System & Theme Strategy (Warm Linen vs Aqua)

To honor the visual identity in `DESIGN.md` while reconciling the prose vs token conflict:

- **Default Theme (`sanctuary-warm`):**
  - Base Canvas: Linen `#F6F1E8`
  - Cards & Elevated Surfaces: Porcelain `#FCFAF6`
  - Primary Accent: Medical Deep Teal `#1B6B6F`
  - Secondary Wash: Serene Sage `#A9C0B3`
  - Framing Hairlines: Warm Brushed Brass `#B8935A` / `rgba(184,147,90,0.25)`
  - Text: Deep Marine Ink `#0F2E33`
- **Alternate Theme (`sanctuary-aqua`):**
  - Base Canvas: Soft Mint Aqua `#EDFCFF`
  - Cards: Crisp Low Container `#DBF9FF` & `#FFFFFF`
  - Primary Accent: `#005255`
  - Secondary: `#4E6358`
  - Text: `#001F24`
- **Implementation:** Defined as root CSS variables (`--bg-surface`, `--bg-card`, `--color-primary`, `--color-brass`, `--color-ink`). A subtle theme switcher allows instant toggling, with `sanctuary-warm` selected as default.

---

## 3. Database Schema & RLS Security Architecture

### 3.1 Tables
1. `services`: `id uuid pk`, `slug text unique`, `name text`, `category text`, `short_description text`, `duration_minutes int default 30`, `is_bookable bool`, `is_active bool`, `sort_order int`.
2. `dentists`: `id uuid pk`, `full_name text`, `role text`, `photo_url text null`, `is_active bool`, `sort_order int`.
3. `dentist_services`: Junction table mapping dentists to services.
4. `availability_rules`: `dentist_id fk`, `weekday smallint (0=Sun..6=Sat)`, `start_time time`, `end_time time`, `slot_minutes int default 30`.
   - Seeded: Mon–Fri 10:00–13:00 & 18:00–22:00; Sat 10:00–17:00; Sun none.
5. `closed_dates`: `closed_on date unique`, `reason text`.
6. `time_off`: `dentist_id fk`, `starts_at timestamptz`, `ends_at timestamptz`, `reason text`.
7. `appointments`:
   - `id uuid pk`
   - `reference_code text unique not null` (Format: `GDC-XXXX`, generated in SQL via cryptographic retry function)
   - `service_id fk references services`
   - `dentist_id fk references dentists`
   - `starts_at timestamptz not null`
   - `ends_at timestamptz not null`
   - `status text check (status in ('pending','confirmed','cancelled','completed','no_show')) default 'pending'`
   - `patient_name text check (length(patient_name) between 2 and 100)`
   - `patient_phone text check (patient_phone ~ '^\+91[6-9][0-9]{9}$')`
   - `patient_email text null`
   - `is_new_patient bool default true`
   - `reply_preference text check (reply_preference in ('phone','whatsapp','email'))`
   - `notes text check (length(notes) <= 1000)`
   - `consent_given bool not null check (consent_given = true)`
   - `created_at timestamptz default now()`
   - **Exclusion Constraint (Double-Booking Prevention):**
     ```sql
     CREATE EXTENSION IF NOT EXISTS btree_gist;
     ALTER TABLE appointments ADD CONSTRAINT no_overlapping_appointments
       EXCLUDE USING gist (
         dentist_id WITH =,
         tstzrange(starts_at, ends_at) WITH &&
       ) WHERE (status IN ('pending', 'confirmed'));
     ```
8. `appointment_events`: Audit log for every status change, cancellation, or reschedule.
9. `contact_requests`: Saves all submissions from `/contact`.
10. `staff`: `user_id references auth.users`, `role text check (role in ('admin','reception'))`, `is_active bool`.

### 3.2 SQL Functions
- `get_available_slots(p_service_id uuid, p_dentist_id uuid, p_date date)`: Generates potential slots based on operating hours for that weekday, ensures slots fit completely within the session (stops before 13:00, 22:00, or Sat 17:00), subtracts overlapping appointments, closed dates, and time off, filters out past times, and enforces a 2-hour minimum lead time.
- `book_appointment(...)`: `SECURITY DEFINER` function callable only by the server backend. Validates inputs, handles "No preference" dentist selection, inserts appointment and event, and returns reference code.

### 3.3 Non-Negotiable RLS Policies
- `anon`: Can SELECT active services and active dentists (public fields only). Can EXECUTE `get_available_slots`. CANNOT SELECT, INSERT, UPDATE, or DELETE from `appointments`, `contact_requests`, `staff`, or `appointment_events`.
- `authenticated (staff)`: Has read/write access to appointments, contact requests, and availability rules.

---

## 4. Procedural 3D Hero Scene & Motion System

### 4.1 Three.js Hero Scene
- Built procedurally without external GLTF assets to ensure zero network failure and instant load:
  - **Dental Implant:** Procedural `LatheGeometry` creating the cylindrical titanium fixture with tapered apex and extruded helical thread ridges (`#8A9A9A` brushed metal).
  - **Molar Crown:** Sculpted ceramic crown with 4 distinct cuspal peaks, occlusal grooves, and anatomical cervical line (`#FDFBF7` glazed porcelain).
  - **Jawbone & Gum Cross-Section:** Layered translucent alveolar bone structure (`#E8D8C8`) and soft gingival tissue (`#DDA5A5`).
- **Lighting:** Soft three-point studio lighting with subtle ambient fill.
- **Interactivity:**
  - Responsive mouse & touch rotation.
  - Interactive callouts: "Crown (Porcelain)", "Implant (Titanium)", "Jawbone". Tapping or hovering a callout rotates the camera smoothly to that part and highlights the mesh.
  - Idle breathing rotation.
- **Performance & Graceful Degradation:**
  - Off-screen pause via `IntersectionObserver`.
  - WebGL capability check: Automatically falls back to high-fidelity SVG/Canvas poster if WebGL is unavailable or on low-power mode.
  - Full disposal of geometries, materials, and renderer on unmount.
  - Pixel ratio capped at 2.

### 4.2 Lenis & GSAP Motion
- Official `lenis` package initialized with smooth scroll.
- GSAP ticker synchronized with named callback function and cleaned up properly on unmount.
- `prefers-reduced-motion` fully respected: Disables Lenis and smooth animations, providing immediate static rendering.
- Section fade-up reveals and scroll-driven tooth timeline marker traveling across the 5 patient journey steps.

---

## 5. Verification & Acceptance Testing Plan

1. **Automated Link Audit:** Verify zero dead `href="#"`, zero 404s, all `tel:` and `wa.me:` links point to verified numbers (`022 25891949`, `+91 99870 76628`).
2. **Database & RLS Tests:** Unit test verifying `anon` receives 403 when attempting direct SELECT/INSERT on `appointments`. Test concurrency collision to verify `btree_gist` rejects duplicate slot booking.
3. **End-to-End Booking Tests (Playwright):**
   - Book appointment end-to-end; verify row appears in database and admin dashboard.
   - Test "No preference" dentist assignment.
   - Verify server-side rejection of Sundays, closed dates, past slots, and invalid phones.
4. **Lighthouse & Performance:** Mobile score 85+ Performance, 95+ Accessibility, 95+ SEO, 95+ Best Practices. Zero layout shifts (CLS < 0.1).

---

## 6. Assumptions & Defaults Confirmed

1. **Palette:** Defaulting to Warm Linen (`#F6F1E8`) & Porcelain (`#FCFAF6`), with Aqua theme switchable.
2. **Hours:** Mon–Fri: 10:00–13:00 & 18:00–22:00; Sat: 10:00–17:00; Sun: Closed.
3. **Slot Duration:** 30 minutes default.
4. **Phone:** 022 25891949 (landline), +91 99870 76628 (WhatsApp & mobile).
5. **Address:** Shop No. 26, 28, 29, Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane West 400610.

*Awaiting approval to begin Phase 2 BUILD; continuing seamlessly with verified defaults.*
