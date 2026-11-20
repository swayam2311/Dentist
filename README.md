# Gangal Dental Clinic — Production Web Platform

Production-grade, fully functional web platform for **Gangal Dental Clinic** (Happy Valley Shopping Complex, Tikujiniwadi Road, Manpada, Thane West 400610), modernizing their legacy WordPress site into an unhurried, reassuring sanctuary experience with zero fake medical claims, robust temporal double-booking prevention, and an interactive 3D hero.

Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Supabase (PostgreSQL 15+)**, **Three.js**, **Lenis + GSAP ScrollTrigger**, and **Resend**.

---

## 1. Quick Start & Setup

### Prerequisites
- Node.js 18.17+ or 20+
- npm 9+ or pnpm 8+
- Supabase CLI or Supabase cloud project

### Installation
```bash
# Clone the repository
cd Dentist

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Environment Variables (`.env.local`)

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Public / Client | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public / Client | Anonymous public key (RLS enforced; cannot read patient appointments) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Service role key for atomic booking RPC (`book_appointment`) and admin operations |
| `RESEND_API_KEY` | Server-Only | Resend API key for clinic and patient notification emails |
| `NOTIFICATION_EMAIL` | Server-Only | Clinic inbox (`dranandgangal@gmail.com`) for new booking and inquiry alerts |
| `NEXT_PUBLIC_SITE_URL` | Public / Client | Canonical URL (`https://gangaldentalclinic.com`) for OpenGraph and sitemap |

> [!CAUTION]
> `SUPABASE_SERVICE_ROLE_KEY` must **never** be prefixed with `NEXT_PUBLIC_` and must never be exposed to the client bundle.

---

## 3. Database Setup & Migrations

The database is built on PostgreSQL with strict Row Level Security (RLS) and cryptographic exclusion constraints to mathematically guarantee zero double bookings:

```bash
# 1. Apply the schema migration
psql -h <host> -U postgres -d postgres -f supabase/migrations/20261120000000_init_gangal_schema.sql

# 2. Seed verified clinic services, clinicians, and availability rules
psql -h <host> -U postgres -d postgres -f supabase/seed.sql
```

### Double-Booking Prevention Mechanism
```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE appointments ADD CONSTRAINT no_overlapping_appointments
  EXCLUDE USING gist (
    dentist_id WITH =,
    tstzrange(starts_at, ends_at) WITH &&
  ) WHERE (status IN ('pending', 'confirmed'));
```

---

## 4. How to Manage Clinic Operations

### 4.1 How to Edit Operating Hours & Availability Rules
Operating hours are configured both in the central code config (`src/config/site.config.ts`) and in the database (`availability_rules`):
- **Code:** Open `src/config/site.config.ts` and modify the `schedule` object. Times are in `HH:mm` format in Asia/Kolkata timezone.
- **Database:** Insert or update rows in `availability_rules`:
  ```sql
  -- Example: Change Dr. Anand Gangal's Saturday hours to 10:00 - 18:00
  UPDATE availability_rules
  SET end_time = '18:00'::TIME
  WHERE dentist_id = 'd1111111-1111-1111-1111-111111111111' AND weekday = 6;
  ```

### 4.2 How to Add a Holiday or Closed Date
Clinic holidays or emergency closure dates disable all booking slots automatically:
```sql
INSERT INTO closed_dates (closed_on, reason)
VALUES ('2026-12-25', 'Christmas Clinic Holiday');
```

### 4.3 How to Add or Edit Services
Add new treatments to `services` table and update `src/config/site.config.ts`:
```sql
INSERT INTO services (slug, name, category, short_description, duration_minutes, is_bookable)
VALUES ('laser-gum-contouring', 'Laser Gum Contouring', 'cosmetic', 'Gentle aesthetic gingival contouring.', 45, true);
```

### 4.4 How to Add a Staff User for `/admin`
1. Create a user in Supabase Auth (via Dashboard or `supabase.auth.admin.createUser`).
2. Insert a row in the `staff` table:
```sql
INSERT INTO staff (user_id, role, is_active)
VALUES ('<uuid-from-auth-users>', 'reception', true);
```

---

## 5. Architectural Features

1. **Dual Theme Sanctuary Palette:**
   - **Default (`sanctuary-warm`):** Warm Linen (`#F6F1E8`), Soft Porcelain (`#FCFAF6`), Deep Medical Teal (`#1B6B6F`), Serene Sage (`#A9C0B3`), and Brushed Brass (`#B8935A`).
   - **Alternate (`sanctuary-aqua`):** Soft Mint Aqua (`#EDFCFF`) and Low Container (`#DBF9FF`).
   - Switchable via live theme button and persistent in `localStorage`.
2. **Procedural 3D Hero Scene:**
   - Anatomically accurate molar and titanium implant procedural model with LatheGeometry threads, soft studio three-point lighting, and interactive plain-fact callouts ("Crown", "Implant", "Jawbone").
   - Off-screen pause via `IntersectionObserver` to preserve battery.
   - Graceful fallback poster (`PosterFallback.tsx`) rendered for non-WebGL devices or `prefers-reduced-motion`.
3. **5-Step Interactive Booking:**
   - Real calendar in Asia/Kolkata timezone with Sundays and past dates disabled.
   - Morning (10:00-13:00) and Evening (18:00-22:00 / Sat 10:00-17:00) slots.
   - Instant copyable booking reference (`GDC-XXXX`), Google Calendar web intent link, and downloadable `.ics` file.
   - WhatsApp deep link prefilled with reference code.
4. **Staff Operations Portal (`/admin`):**
   - Realtime live appointments table, search, status filters (pending, confirmed, completed, cancelled).
   - One-click status transitions and patient WhatsApp messaging button.
   - Contact requests inbox and CSV export.
5. **Legacy WordPress 301 Redirects:**
   - 28 permanent 301 redirects preserve SEO rankings from the old WordPress URL structure (`/services/...`, `/team-members`, etc.).

---

## 6. Testing & Quality Assurance

Run the automated verification suite:
```bash
npm test
```
The test suite validates:
- **Zero dead `href="#"` links** across all components.
- **Section 3 Unverified Claims Audit** (zero invented credentials, zero absolute claims).
- **Database RLS & Client Bundle Security** (service role key not in client bundle; anon denied on appointments).
- **Operating Hours & Sunday Closure Verification**.

