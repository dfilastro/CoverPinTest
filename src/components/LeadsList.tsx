import { useCallback, useRef } from 'react';
import { useLeads } from '../context/LeadsContext';
import LeadsTable from './LeadsTable';
import SearchBox from './SearchBox';
import TableSkeleton from './TableSkeleton';

export default function LeadsList() {
  const {
    leads,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    setSelectedLead,
    hasMore,
    loadingMore,
    loadMoreLeads,
  } = useLeads();

  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastLeadElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreLeads();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, loadMoreLeads]
  );

  return (
    <div>
      <div className='mb-4 flex gap-2'>
        <SearchBox value={search} onChange={setSearch} />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className='border px-2 py-1 rounded'
        >
          <option value=''>All Status</option>
          <option value='New'>New</option>
          <option value='Contacted'>Contacted</option>
          <option value='Qualified'>Qualified</option>
          <option value='Lost'>Lost</option>
        </select>
      </div>
      <LeadsTable
        leads={leads}
        loading={loading}
        error={error}
        setSelectedLead={setSelectedLead}
        lastLeadElementRef={lastLeadElementRef}
      />

      {loadingMore && <TableSkeleton rows={6} />}
    </div>
  );
}
