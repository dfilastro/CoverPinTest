import { useCallback, useRef } from 'react';
import { useLeads } from '../context/LeadsContext';
import LeadsTable from './LeadsTable';
import SearchBox from './SearchBox';
import TableSkeleton from './TableSkeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

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
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
          <SelectTrigger>
            <SelectValue placeholder='Select status' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='All'>All Status</SelectItem>
            <SelectItem value='New'>New</SelectItem>
            <SelectItem value='Contacted'>Contacted</SelectItem>
            <SelectItem value='Qualified'>Qualified</SelectItem>
            <SelectItem value='Lost'>Lost</SelectItem>
          </SelectContent>
        </Select>
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
