import leadsData from './leads.json';
import type { Lead } from '../context/LeadsContext';

export function fetchLeads(
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
  statusFilter: string = ''
): Promise<{ leads: Lead[]; total: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const filtered = leadsData.filter((lead) => {
          const matchesSearch =
            lead.name.toLowerCase().includes(search.toLowerCase()) ||
            lead.company.toLowerCase().includes(search.toLowerCase());
          const matchesStatus = statusFilter ? lead.status === statusFilter : true;
          return matchesSearch && matchesStatus;
        });

        const total = filtered.length;

        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const paginatedLeads = filtered.slice(start, end);

        resolve({ leads: paginatedLeads, total });
      } catch {
        reject(new Error('Failed to fetch leads'));
      }
    }, 500); // simulate 500ms latency
  });
}
