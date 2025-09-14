import type { Lead } from '../context/LeadsContext';
import { getLeadsFromStorage } from './useLeadsStorage';

export function fetchLeads(
  page: number = 1,
  pageSize: number = 10,
  search: string = '',
  statusFilter: string = '',
  sortBy: string = 'score',
  sortOrder: string = 'desc'
): Promise<{ leads: Lead[]; total: number }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const leads = getLeadsFromStorage() as Lead[];
        const filtered = leads
          .filter((lead) => {
            const matchesSearch =
              lead.name.toLowerCase().includes(search.toLowerCase()) ||
              lead.company.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
              statusFilter === 'All' || statusFilter === '' ? true : lead.status === statusFilter;
            return matchesSearch && matchesStatus;
          })
          .sort((a, b) => {
            if (sortBy === 'score') {
              return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
            }
            return 0;
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

export function fetchMoreLeads(
  currentLeads: Lead[],
  pageSize: number = 10,
  search: string = '',
  statusFilter: string = '',
  sortBy: string = 'score',
  sortOrder: string = 'desc'
): Promise<{ leads: Lead[]; hasMore: boolean }> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const leads = getLeadsFromStorage() as Lead[];
        const filtered = leads
          .filter((lead) => {
            const matchesSearch =
              lead.name.toLowerCase().includes(search.toLowerCase()) ||
              lead.company.toLowerCase().includes(search.toLowerCase());
            const matchesStatus =
              statusFilter === 'All' || statusFilter === '' ? true : lead.status === statusFilter;
            return matchesSearch && matchesStatus;
          })
          .sort((a, b) => {
            if (sortBy === 'score') {
              return sortOrder === 'desc' ? b.score - a.score : a.score - b.score;
            }
            return 0;
          });

        // Get the IDs of leads we already have
        const existingIds = new Set(currentLeads.map((lead) => lead.id));

        // Filter out leads we already have
        const remainingLeads = filtered.filter((lead) => !existingIds.has(lead.id));

        // Take the next pageSize leads
        const newLeads = remainingLeads.slice(0, pageSize);
        const hasMore = remainingLeads.length > pageSize;

        resolve({ leads: newLeads, hasMore });
      } catch {
        reject(new Error('Failed to fetch more leads'));
      }
    }, 500); // simulate 500ms latency
  });
}
