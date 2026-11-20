import { z } from 'zod';

// Indian Mobile Regex: +91 followed by 10 digits starting with 6, 7, 8, or 9
export const indianMobileRegex = /^\+91[6-9]\d{9}$/;

export const BookingRequestSchema = z.object({
  serviceId: z.string().min(1, { message: 'Please select a valid treatment service.' }),
  dentistId: z.string().min(1).nullable().optional(),
  startsAt: z.string().datetime({ message: 'Invalid slot timestamp format.' }),
  patientName: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),
  patientPhone: z
    .string()
    .trim()
    .regex(indianMobileRegex, { message: 'Enter a valid 10-digit Indian mobile number (+91XXXXXXXXXX).' }),
  patientEmail: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  isNewPatient: z.boolean().default(true),
  replyPreference: z.enum(['phone', 'whatsapp', 'email']).default('phone'),
  notes: z
    .string()
    .trim()
    .max(1000, { message: 'Notes cannot exceed 1000 characters.' })
    .optional()
    .or(z.literal('')),
  consentGiven: z.literal(true, {
    errorMap: () => ({ message: 'You must provide consent under DPDP Act to submit this reservation.' }),
  }),
  honeypot: z.string().max(0, { message: 'Bot detected.' }).optional(),
});

export type BookingRequestInput = z.infer<typeof BookingRequestSchema>;

export const ContactRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),
  phone: z
    .string()
    .trim()
    .regex(indianMobileRegex, { message: 'Enter a valid 10-digit Indian mobile number (+91XXXXXXXXXX).' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please enter a valid email address.' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(5, { message: 'Message must be at least 5 characters.' })
    .max(2000, { message: 'Message cannot exceed 2000 characters.' }),
  replyPreference: z.enum(['phone', 'whatsapp', 'email']).default('phone'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must provide consent under DPDP Act to send your message.' }),
  }),
  honeypot: z.string().max(0, { message: 'Bot submission detected.' }).optional(),
});

export type ContactRequestInput = z.infer<typeof ContactRequestSchema>;

export const StatusLookupSchema = z.object({
  referenceCode: z
    .string()
    .trim()
    .regex(/^GDC-[23456789ABCDEFGHJKMNPQRSTUVWXYZ]{4}$/i, {
      message: 'Invalid booking reference code format. Expected GDC-XXXX.',
    }),
  phone: z
    .string()
    .trim()
    .regex(indianMobileRegex, { message: 'Enter the registered Indian mobile number.' }),
});

export type StatusLookupInput = z.infer<typeof StatusLookupSchema>;

