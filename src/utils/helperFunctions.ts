import type { Lead } from '@/context/LeadsContext';

export function aggregateBySource(leads: Lead[]) {
  const sources: Record<string, number> = {};

  leads.forEach((lead) => {
    sources[lead.source] = (sources[lead.source] || 0) + 1;
  });

  return Object.entries(sources).map(([name, value]) => ({ name, value }));
}

export function aggregateByStatus(leads: Lead[]) {
  const statuses: Record<string, number> = {};

  leads.forEach((lead) => {
    statuses[lead.status] = (statuses[lead.status] || 0) + 1;
  });

  const total = Object.values(statuses).reduce((acc, curr) => acc + curr, 0);
  const percentage = ((statuses['Qualified'] + statuses['Contacted']) / total) * 100;

  return Object.entries(statuses).map(([name, value]) => ({ name, value, percentage }));
}

export function aggregateByScore(leads: Lead[]) {
  const scoreRanges = [
    { name: '0-60', value: 0 },
    { name: '61-80', value: 0 },
    { name: '81-100', value: 0 },
  ];

  leads.forEach((lead) => {
    if (lead.score >= 0 && lead.score <= 60) {
      scoreRanges[0].value++;
    } else if (lead.score >= 61 && lead.score <= 80) {
      scoreRanges[1].value++;
    } else if (lead.score >= 81 && lead.score <= 100) {
      scoreRanges[2].value++;
    }
  });

  const total = Object.values(scoreRanges).reduce((acc, curr) => acc + curr.value, 0);
  const percentage = (scoreRanges[2].value / total) * 100;

  return scoreRanges.map((range) => ({ ...range, percentage }));
}
