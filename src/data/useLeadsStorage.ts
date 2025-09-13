import leadsJson from './leads.json';
import type { Lead } from '../context/LeadsContext';

const STORAGE_KEY = 'leads_data';

export function getLeadsFromStorage(): Lead[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return leadsJson;
}

export function saveLeadsToStorage(leads: Lead[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
}

export function updateLeadInStorage(lead: Lead) {
  const leads = getLeadsFromStorage();
  const updatedLeads = leads.map((l) => (l.id === lead.id ? lead : l));
  saveLeadsToStorage(updatedLeads);
}
