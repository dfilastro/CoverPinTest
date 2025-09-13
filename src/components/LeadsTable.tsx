import type { Lead } from '../context/LeadsContext';
import { useLeads } from '../context/LeadsContext';
import HighlightText from './HighlightText';

export default function LeadsTable({
  leads,
  loading,
  error,
  setSelectedLead,
}: {
  leads: Lead[];
  loading: boolean;
  error: boolean;
  setSelectedLead: (lead: Lead) => void;
}) {
  const { search } = useLeads();

  if (loading) return <p>Loading leads...</p>;
  if (error) return <p>Failed to load leads</p>;
  if (leads.length === 0) return <p>No leads found</p>;

  const tableHeaders = ['Name', 'Company', 'Score', 'Status'];

  return (
    <div>
      {/* Leads Table */}
      <div className='w-full border-solid border-[1px] border-gray-200 rounded-md'>
        <div className='grid grid-cols-4 bg-[#F8FAFB] rounded-t-lg'>
          {tableHeaders.map((header) => (
            <p
              key={header}
              className='border-gray-200 border-r-[1px] last:border-r-0 py-2 text-[#46566A]'
            >
              {header}
            </p>
          ))}
        </div>

        <div className='w-full'>
          {leads.map((lead) => (
            <div
              key={lead.id}
              className='cursor-pointer hover:bg-[#F8FAFB] grid grid-cols-4 rounded-b-lg'
              onClick={() => setSelectedLead(lead)}
            >
              <p className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                <HighlightText text={lead.name} searchTerm={search} />
              </p>
              <p className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                <HighlightText text={lead.company} searchTerm={search} />
              </p>
              <p className='col-span-1 border-gray-200 border-r-[1px] border-t-[1px] py-2'>
                {lead.score}
              </p>
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
