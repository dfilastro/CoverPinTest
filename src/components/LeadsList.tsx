import { useEffect, useRef, useCallback } from 'react';
import { useLeads } from '../context/LeadsContext';
import SearchBox from './SearchBox';
import LeadsTable from './LeadsTable';

export default function LeadsList() {
  const {
    leads,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedLead,
    setSelectedLead,
    hasMore,
    loadingMore,
    loadMoreLeads,
  } = useLeads();

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    console.log(selectedLead);
  }, [selectedLead]);

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
      {/* Search + Filter */}
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

      {/* Loading More Indicator */}
      {loadingMore && (
        <div className='mt-4 flex justify-center'>
          <div className='text-gray-600'>Loading more leads...</div>
        </div>
      )}

      {/* End of Results */}
      {!hasMore && leads.length > 0 && !loading && (
        <div className='mt-4 flex justify-center'>
          <div className='text-gray-500'>No more leads to load</div>
        </div>
      )}
    </div>
  );
}
