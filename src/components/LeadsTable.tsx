import type { Lead } from '../context/LeadsContext';
import { useLeads } from '../context/LeadsContext';
import HighlightText from './HighlightText';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';

export default function LeadsTable({
  leads,
  loading,
  error,
  setSelectedLead,
  lastLeadElementRef,
}: {
  leads: Lead[];
  loading: boolean;
  error: boolean;
  setSelectedLead: (lead: Lead) => void;
  lastLeadElementRef?: (node: HTMLDivElement) => void;
}) {
  const { search, setSortBy, setSortOrder } = useLeads();
  const { sortBy, sortOrder } = useLeads();

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Failed to load leads</p>;
  if (leads.length === 0) return <p>No leads found</p>;

  // Only sortable by score, as asked in the assignment,
  // to implement other sortable headers, just change sortable to true
  // and change fakeApi
  const tableHeaders = [
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Company', key: 'company', sortable: false },
    { title: 'Score', key: 'score', sortable: true },
    { title: 'Status', key: 'status', sortable: false },
  ];

  const handleSort = (header: string) => {
    setSortBy(header);
    setSortOrder(header === sortBy ? (sortOrder === 'desc' ? 'asc' : 'desc') : 'desc');
  };

  return (
    <div>
      {/* Leads Table */}
      <div className='w-full border-solid border-[1px] border-gray-200 rounded-md'>
        <div className='grid grid-cols-4 bg-[#F8FAFB] rounded-t-lg'>
          {tableHeaders.map((header) => (
            <div
              onClick={() => header.sortable && handleSort(header.key)}
              key={header.key}
              className={`border-gray-200 border-r-[1px] last:border-r-0 py-2 text-[#46566A] flex items-center justify-center gap-1 ${
                header.sortable ? 'cursor-pointer' : ''
              }`}
            >
              <p>{header.title}</p>
              {sortBy === header.key ? (
                sortOrder === 'asc' ? (
                  <GoArrowUp size={14} />
                ) : (
                  <GoArrowDown size={14} />
                )
              ) : null}
            </div>
          ))}
        </div>

        <div className='w-full'>
          {leads.map((lead, index) => (
            <div
              key={lead.id}
              ref={index === leads.length - 1 ? lastLeadElementRef : null}
              className='cursor-pointer hover:bg-[#F8FAFB] grid grid-cols-4 rounded-b-lg'
              onClick={() => setSelectedLead(lead)}
            >
              <div className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                <HighlightText text={lead.name} searchTerm={search} />
              </div>
              <div className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                <HighlightText text={lead.company} searchTerm={search} />
              </div>
              <div className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                {lead.score}
              </div>
              <div className='col-span-1 border-gray-200 border-t-[1px] py-2 px-4'>
                <p className='border-[1px] border-gray-400 rounded-full w-fit px-2'>
                  {lead.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
