import { useEffect } from 'react';
import { useLeads } from '../context/LeadsContext';
import SearchBox from './SearchBox';
import LeadsTable from './LeadsTable';

export default function LeadsList() {
  const {
    leads,
    loading,
    error,
    page,
    total,
    pageSize,
    setPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    selectedLead,
    setSelectedLead,
  } = useLeads();

  useEffect(() => {
    console.log(selectedLead);
  }, [selectedLead]);

  const totalPages = Math.ceil(total / pageSize);

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
      <LeadsTable leads={leads} loading={loading} error={error} setSelectedLead={setSelectedLead} />

      {/* Pagination */}
      <div className='mt-4 flex justify-between items-center'>
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className='px-3 py-1 bg-gray-300 rounded disabled:opacity-50'
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => setPage(page + 1)}
          className='px-3 py-1 bg-gray-300 rounded disabled:opacity-50'
        >
          Next
        </button>
      </div>
    </div>
  );
}
