import emailjs from '@emailjs/browser'

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
const CONTACT_TID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!
const RESUME_TID = process.env.NEXT_PUBLIC_EMAILJS_RESUME_TEMPLATE_ID!

export interface ContactPayload {
  from_name: string
  from_email: string
  from_phone: string
  purpose: string
  message: string
}

export interface ResumeGatePayload {
  visitor_name: string
  whatsapp_number: string
}

export async function sendContactEmail(payload: ContactPayload): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await emailjs.send(SERVICE_ID, CONTACT_TID, payload as any, PUBLIC_KEY)
}

export async function sendResumeGateEmail(payload: ResumeGatePayload): Promise<void> {
  const enriched = {
    ...payload,
    download_time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await emailjs.send(SERVICE_ID, RESUME_TID, enriched as any, PUBLIC_KEY)
}
