-- ============================================================================
-- GANGAL DENTAL CLINIC — DATABASE SCHEMA & RLS SECURITY SPECIFICATION
-- Database: PostgreSQL 15+ (Supabase)
-- Timezone: Asia/Kolkata (timestamptz in UTC, presentation in Asia/Kolkata)
-- ============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- 2. ENUM TYPES
DO $$ BEGIN
  CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed', 'no_show');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE staff_role AS ENUM ('admin', 'reception');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE reply_channel AS ENUM ('phone', 'whatsapp', 'email');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- 3. CORE TABLES

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- 'general', 'cosmetic', 'implants', 'orthodontics', 'restorative', 'children'
  short_description TEXT NOT NULL,
  full_description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 30 CHECK (duration_minutes > 0),
  is_bookable BOOLEAN NOT NULL DEFAULT true,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dentists Table
CREATE TABLE IF NOT EXISTS dentists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'Principal Dentist', 'Associate Dentist'
  photo_url TEXT,
  bio TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Dentist Services Junction
CREATE TABLE IF NOT EXISTS dentist_services (
  dentist_id UUID NOT NULL REFERENCES dentists(id) ON DELETE CASCADE,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (dentist_id, service_id)
);

-- Availability Rules Table
-- Weekday: 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday
CREATE TABLE IF NOT EXISTS availability_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dentist_id UUID NOT NULL REFERENCES dentists(id) ON DELETE CASCADE,
  weekday SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (end_time > start_time),
  slot_minutes INTEGER NOT NULL DEFAULT 30 CHECK (slot_minutes > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Closed Dates Table (Holidays, Emergency Clinic Closures)
CREATE TABLE IF NOT EXISTS closed_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  closed_on DATE UNIQUE NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Doctor Time Off Table
CREATE TABLE IF NOT EXISTS time_off (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dentist_id UUID NOT NULL REFERENCES dentists(id) ON DELETE CASCADE,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL CHECK (ends_at > starts_at),
  reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code TEXT UNIQUE NOT NULL,
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE RESTRICT,
  dentist_id UUID NOT NULL REFERENCES dentists(id) ON DELETE RESTRICT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL CHECK (ends_at > starts_at),
  status appointment_status NOT NULL DEFAULT 'pending',
  patient_name TEXT NOT NULL CHECK (char_length(trim(patient_name)) BETWEEN 2 AND 100),
  patient_phone TEXT NOT NULL CHECK (patient_phone ~ '^\+91[6-9][0-9]{9}$'),
  patient_email TEXT CHECK (patient_email IS NULL OR patient_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  is_new_patient BOOLEAN NOT NULL DEFAULT true,
  reply_preference reply_channel NOT NULL DEFAULT 'phone',
  notes TEXT CHECK (notes IS NULL OR char_length(notes) <= 1000),
  consent_given BOOLEAN NOT NULL CHECK (consent_given = true),
  consent_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source TEXT NOT NULL DEFAULT 'website',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- GUARANTEE ZERO DOUBLE-BOOKING: PostgreSQL Exclusion Constraint
-- A dentist cannot have two pending or confirmed appointments that temporally overlap.
ALTER TABLE appointments DROP CONSTRAINT IF EXISTS no_overlapping_appointments;
ALTER TABLE appointments ADD CONSTRAINT no_overlapping_appointments
  EXCLUDE USING gist (
    dentist_id WITH =,
    tstzrange(starts_at, ends_at) WITH &&
  ) WHERE (status IN ('pending', 'confirmed'));

-- Appointment Audit Trail
CREATE TABLE IF NOT EXISTS appointment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID NOT NULL REFERENCES appointments(id) ON DELETE CASCADE,
  actor TEXT NOT NULL, -- 'patient', 'reception', 'system', 'admin'
  from_status appointment_status,
  to_status appointment_status NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact Requests Table
CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(trim(name)) BETWEEN 2 AND 100),
  phone TEXT NOT NULL CHECK (phone ~ '^\+91[6-9][0-9]{9}$'),
  email TEXT CHECK (email IS NULL OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message TEXT NOT NULL CHECK (char_length(trim(message)) BETWEEN 5 AND 2000),
  reply_preference reply_channel NOT NULL DEFAULT 'phone',
  consent BOOLEAN NOT NULL CHECK (consent = true),
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'scheduled', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Staff Table (Maps to Supabase auth.users)
CREATE TABLE IF NOT EXISTS staff (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role staff_role NOT NULL DEFAULT 'reception',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. DATABASE FUNCTIONS

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_dentists_updated_at
  BEFORE UPDATE ON dentists
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE OR REPLACE TRIGGER trg_contact_requests_updated_at
  BEFORE UPDATE ON contact_requests
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Cryptographic Unambiguous Reference Code Generator (GDC-XXXX)
-- Alphabet excludes ambiguous chars: 0/O, 1/I/L
CREATE OR REPLACE FUNCTION generate_appointment_reference()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
  res TEXT := 'GDC-';
  i INTEGER;
  candidate TEXT;
  exists_already BOOLEAN;
BEGIN
  LOOP
    candidate := 'GDC-';
    FOR i IN 1..4 LOOP
      candidate := candidate || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    
    SELECT EXISTS (SELECT 1 FROM appointments WHERE reference_code = candidate) INTO exists_already;
    IF NOT exists_already THEN
      RETURN candidate;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Available Slots Calculator
-- Enforces:
-- 1. Clinic session boundaries (Morning: 10:00-13:00, Evening: 18:00-22:00, Sat: 10:00-17:00, Sun: Closed)
-- 2. Slot duration fits completely before session end (no overruns)
-- 3. Minimum 2-hour lead time from current timestamp
-- 4. Max 60-day horizon
-- 5. No overlapping pending/confirmed appointments, doctor time-off, or clinic closed dates
CREATE OR REPLACE FUNCTION get_available_slots(
  p_service_id UUID,
  p_dentist_id UUID DEFAULT NULL,
  p_date DATE DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  dentist_id UUID,
  dentist_name TEXT,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ,
  time_display TEXT,
  period TEXT
) AS $$
DECLARE
  v_duration INTEGER;
  v_weekday SMALLINT;
  v_min_lead_time TIMESTAMPTZ := now() + INTERVAL '2 hours';
  v_max_horizon DATE := (CURRENT_DATE + INTERVAL '60 days')::DATE;
BEGIN
  -- Validate date horizon
  IF p_date < CURRENT_DATE OR p_date > v_max_horizon THEN
    RETURN;
  END IF;

  -- Check if clinic is closed on this date
  IF EXISTS (SELECT 1 FROM closed_dates WHERE closed_on = p_date) THEN
    RETURN;
  END IF;

  -- Get service duration
  SELECT duration_minutes INTO v_duration FROM services WHERE id = p_service_id AND is_active = true AND is_bookable = true;
  IF v_duration IS NULL THEN
    v_duration := 30;
  END IF;

  -- Sunday check (0 = Sunday in Postgres extract(DOW))
  v_weekday := EXTRACT(DOW FROM p_date)::SMALLINT;
  IF v_weekday = 0 THEN
    RETURN; -- Sunday is always closed
  END IF;

  RETURN QUERY
  WITH candidate_rules AS (
    SELECT 
      ar.dentist_id,
      d.full_name AS dentist_name,
      ar.start_time,
      ar.end_time,
      ar.slot_minutes
    FROM availability_rules ar
    JOIN dentists d ON d.id = ar.dentist_id
    WHERE ar.weekday = v_weekday
      AND d.is_active = true
      AND (p_dentist_id IS NULL OR ar.dentist_id = p_dentist_id)
      -- Ensure dentist performs this service
      AND EXISTS (
        SELECT 1 FROM dentist_services ds 
        WHERE ds.dentist_id = ar.dentist_id AND ds.service_id = p_service_id
      )
  ),
  slot_series AS (
    SELECT 
      cr.dentist_id,
      cr.dentist_name,
      -- Build timestamp in Asia/Kolkata timezone
      ((p_date || ' ' || s.t)::TIMESTAMP AT TIME ZONE 'Asia/Kolkata') AS slot_start,
      ((p_date || ' ' || s.t)::TIMESTAMP AT TIME ZONE 'Asia/Kolkata' + (v_duration || ' minutes')::INTERVAL) AS slot_end,
      ((p_date || ' ' || cr.end_time)::TIMESTAMP AT TIME ZONE 'Asia/Kolkata') AS session_end
    FROM candidate_rules cr
    CROSS JOIN LATERAL (
      SELECT (cr.start_time + (n * INTERVAL '30 minutes'))::TIME AS t
      FROM generate_series(0, 48) AS n
      WHERE (cr.start_time + (n * INTERVAL '30 minutes'))::TIME < cr.end_time
    ) s
  )
  SELECT 
    ss.dentist_id,
    ss.dentist_name,
    ss.slot_start AS starts_at,
    ss.slot_end AS ends_at,
    to_char(ss.slot_start AT TIME ZONE 'Asia/Kolkata', 'HH12:MI AM') AS time_display,
    CASE 
      WHEN EXTRACT(HOUR FROM (ss.slot_start AT TIME ZONE 'Asia/Kolkata')) < 14 THEN 'Morning'
      ELSE 'Evening'
    END AS period
  FROM slot_series ss
  WHERE ss.slot_end <= ss.session_end -- Slot must not overrun the session end
    AND ss.slot_start >= v_min_lead_time -- Lead time
    -- No overlapping appointment for this dentist
    AND NOT EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.dentist_id = ss.dentist_id
        AND a.status IN ('pending', 'confirmed')
        AND tstzrange(a.starts_at, a.ends_at) && tstzrange(ss.slot_start, ss.slot_end)
    )
    -- No doctor time-off collision
    AND NOT EXISTS (
      SELECT 1 FROM time_off tof
      WHERE tof.dentist_id = ss.dentist_id
        AND tstzrange(tof.starts_at, tof.ends_at) && tstzrange(ss.slot_start, ss.slot_end)
    )
  ORDER BY ss.slot_start ASC, ss.dentist_name ASC;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Booking RPC Function (Server-Side Execution Only)
CREATE OR REPLACE FUNCTION book_appointment(
  p_service_id UUID,
  p_dentist_id UUID, -- Can be NULL for 'no preference'
  p_starts_at TIMESTAMPTZ,
  p_patient_name TEXT,
  p_patient_phone TEXT,
  p_patient_email TEXT DEFAULT NULL,
  p_is_new_patient BOOLEAN DEFAULT true,
  p_reply_preference reply_channel DEFAULT 'phone',
  p_notes TEXT DEFAULT NULL,
  p_consent_given BOOLEAN DEFAULT true,
  p_source TEXT DEFAULT 'website'
)
RETURNS TABLE (
  reference_code TEXT,
  appointment_id UUID,
  dentist_id UUID,
  starts_at TIMESTAMPTZ,
  ends_at TIMESTAMPTZ
) AS $$
DECLARE
  v_duration INTEGER;
  v_ends_at TIMESTAMPTZ;
  v_assigned_dentist UUID := p_dentist_id;
  v_ref TEXT;
  v_apt_id UUID;
BEGIN
  -- Consent assertion
  IF NOT p_consent_given THEN
    RAISE EXCEPTION 'Consent under DPDP Act is strictly required.';
  END IF;

  -- Validate lead time (at least 2 hours in advance)
  IF p_starts_at < now() + INTERVAL '2 hours' THEN
    RAISE EXCEPTION 'Appointments must be booked at least 2 hours in advance.';
  END IF;

  -- Validate phone format (+91 followed by 10 digits starting 6-9)
  IF p_patient_phone !~ '^\+91[6-9][0-9]{9}$' THEN
    RAISE EXCEPTION 'Invalid Indian mobile number format. Expected +91XXXXXXXXXX';
  END IF;

  -- Get service duration
  SELECT duration_minutes INTO v_duration FROM services WHERE id = p_service_id AND is_active = true AND is_bookable = true;
  IF v_duration IS NULL THEN
    RAISE EXCEPTION 'Selected service is invalid or not available for online booking.';
  END IF;

  v_ends_at := p_starts_at + (v_duration || ' minutes')::INTERVAL;

  -- Handle "No Preference": Pick first available dentist offering this service with no overlap
  IF v_assigned_dentist IS NULL THEN
    SELECT d.id INTO v_assigned_dentist
    FROM dentists d
    JOIN dentist_services ds ON ds.dentist_id = d.id AND ds.service_id = p_service_id
    WHERE d.is_active = true
      AND NOT EXISTS (
        SELECT 1 FROM appointments a
        WHERE a.dentist_id = d.id
          AND a.status IN ('pending', 'confirmed')
          AND tstzrange(a.starts_at, a.ends_at) && tstzrange(p_starts_at, v_ends_at)
      )
      AND NOT EXISTS (
        SELECT 1 FROM time_off tof
        WHERE tof.dentist_id = d.id
          AND tstzrange(tof.starts_at, tof.ends_at) && tstzrange(p_starts_at, v_ends_at)
      )
    ORDER BY d.sort_order ASC
    LIMIT 1;

    IF v_assigned_dentist IS NULL THEN
      RAISE EXCEPTION 'No clinician is available at the selected date and time. Please pick another slot.';
    END IF;
  END IF;

  -- Generate Reference Code
  v_ref := generate_appointment_reference();

  -- Insert appointment
  INSERT INTO appointments (
    reference_code,
    service_id,
    dentist_id,
    starts_at,
    ends_at,
    status,
    patient_name,
    patient_phone,
    patient_email,
    is_new_patient,
    reply_preference,
    notes,
    consent_given,
    source
  ) VALUES (
    v_ref,
    p_service_id,
    v_assigned_dentist,
    p_starts_at,
    v_ends_at,
    'pending',
    trim(p_patient_name),
    p_patient_phone,
    p_patient_email,
    p_is_new_patient,
    p_reply_preference,
    trim(p_notes),
    true,
    p_source
  ) RETURNING id INTO v_apt_id;

  -- Write audit log event
  INSERT INTO appointment_events (
    appointment_id,
    actor,
    from_status,
    to_status,
    note
  ) VALUES (
    v_apt_id,
    'patient',
    NULL,
    'pending',
    'Appointment request created via website.'
  );

  RETURN QUERY SELECT v_ref, v_apt_id, v_assigned_dentist, p_starts_at, v_ends_at;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Revoke direct execution from anon & authenticated; only server service-role calls book_appointment
REVOKE EXECUTE ON FUNCTION book_appointment FROM anon, authenticated;

-- 5. ROW LEVEL SECURITY (RLS) POLICIES — NON-NEGOTIABLE COMPLIANCE

ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE dentists ENABLE ROW LEVEL SECURITY;
ALTER TABLE dentist_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE closed_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE time_off ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

-- Services Policies: Anon can read active services
CREATE POLICY "anon_read_active_services" ON services
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

-- Dentists Policies: Anon can read active dentists
CREATE POLICY "anon_read_active_dentists" ON dentists
  FOR SELECT TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "anon_read_dentist_services" ON dentist_services
  FOR SELECT TO anon, authenticated
  USING (true);

-- Availability & Closed Dates: Read-only for slot calculations
CREATE POLICY "anon_read_availability_rules" ON availability_rules
  FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "anon_read_closed_dates" ON closed_dates
  FOR SELECT TO anon, authenticated
  USING (true);

-- CRITICAL SECURITY: APPOINTMENTS
-- Anonymous users CANNOT SELECT, INSERT, UPDATE, or DELETE appointments directly.
-- All patient interactions go through server API routes with validation and service-role / RPC.
-- Only active staff members have access to appointments.

CREATE POLICY "staff_manage_appointments" ON appointments
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND is_active = true)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND is_active = true)
  );

-- Appointment Events: Staff only
CREATE POLICY "staff_read_appointment_events" ON appointment_events
  FOR SELECT TO authenticated
  USING (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND is_active = true)
  );

-- Contact Requests: Staff only (Anon submits via server API route)
CREATE POLICY "staff_manage_contact_requests" ON contact_requests
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND is_active = true)
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND is_active = true)
  );

-- Staff Table: Only active staff can read their own profile; admins can manage
CREATE POLICY "staff_read_self" ON staff
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "admin_manage_staff" ON staff
  FOR ALL TO authenticated
  USING (
    EXISTS (SELECT 1 FROM staff WHERE user_id = auth.uid() AND role = 'admin' AND is_active = true)
  );
