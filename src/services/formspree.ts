import { LeadSubmission } from '../types';

export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xykqbvjk';

/**
 * Sends lead submission data directly to Formspree endpoint (https://formspree.io/f/xykqbvjk).
 */
export async function sendLeadToFormspree(lead: LeadSubmission): Promise<boolean> {
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: lead.name,
        phone: lead.phone,
        treatment: lead.treatment,
        preferredTime: lead.preferredTime || 'Not specified',
        consultationType: lead.consultationType || 'IN-CLINIC',
        submittedAt: lead.submittedAt || new Date().toISOString(),
        _subject: `New Appointment Lead: ${lead.name} - ${lead.treatment}`,
      }),
    });

    if (response.ok) {
      console.log('Lead submitted to Formspree successfully.');
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.warn('Formspree returned non-OK status:', response.status, errorData);
      return false;
    }
  } catch (err) {
    console.error('Error submitting form to Formspree:', err);
    return false;
  }
}
