import { useState } from 'react';
import type { Lead } from '../context/LeadsContext';
import { useLeads } from '../context/LeadsContext';
import { useOpportunities } from '../context/OpportunitiesContext';
import HighlightText from './HighlightText';
import { GoArrowDown, GoArrowUp } from 'react-icons/go';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TableSkeleton from './TableSkeleton';
import LeadDetailPanel from './LeadDetailPanel';
import ConvertToOpportunityDialog from './ConvertToOpportunityDialog';

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
  const { isLeadConverted } = useOpportunities();
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const [selectedLeadForConversion, setSelectedLeadForConversion] = useState<Lead | null>(null);

  if (!loading && error) return <p>Failed to load leads</p>;
  if (!loading && leads.length === 0) return <p>No leads found</p>;

  // Only sortable by score, as asked in the assignment,
  // to implement other sortable headers, just change sortable to true
  // and change fakeApi
  const tableHeaders = [
    { title: 'Name', key: 'name', sortable: false },
    { title: 'Company', key: 'company', sortable: false },
    { title: 'Score', key: 'score', sortable: true },
    { title: 'Status', key: 'status', sortable: false },
    { title: 'Action', key: 'action', sortable: false },
  ];

  const handleSort = (header: string) => {
    setSortBy(header);
    setSortOrder(header === sortBy ? (sortOrder === 'desc' ? 'asc' : 'desc') : 'desc');
  };

  const handleConvertClick = (lead: Lead, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent row click
    setSelectedLeadForConversion(lead);
    setShowConvertDialog(true);
  };

  return (
    <div>
      <div className='w-full border-solid border-[1px] border-gray-200 rounded-md'>
        <div className='grid grid-cols-5 bg-[#F8FAFB] rounded-t-lg'>
          {tableHeaders.map((header) => (
            <div
              onClick={() => header.sortable && handleSort(header.key)}
              key={header.key}
              className={`border-gray-200 py-2 text-[#46566A] flex items-center justify-start px-4 gap-1 ${
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

        {loading ? (
          <div className='w-full'>
            <TableSkeleton rows={10} />
          </div>
        ) : (
          <div className='w-full'>
            {leads.map((lead, index) => {
              const isConverted = isLeadConverted(lead.id);
              return (
                <div
                  key={lead.id}
                  ref={index === leads.length - 1 ? lastLeadElementRef : null}
                  className={`cursor-pointer hover:bg-[#F8FAFB] grid grid-cols-5 rounded-b-lg ${
                    isConverted ? 'bg-green-50/50' : ''
                  }`}
                  onClick={() => setSelectedLead(lead)}
                >
                  <div className='col-span-1 border-gray-200 text-start border-t-[1px] px-4 py-2'>
                    <HighlightText text={lead.name} searchTerm={search} />
                  </div>
                  <div className='col-span-1 border-gray-200 text-start border-t-[1px] px-4 py-2'>
                    <HighlightText text={lead.company} searchTerm={search} />
                  </div>
                  <div className='col-span-1 border-gray-200 text-start border-t-[1px] px-4 py-2'>
                    {lead.score}
                  </div>
                  <div className='col-span-1 border-gray-200 border-t-[1px] px-4 py-2 flex flex-col justify-center'>
                    <p className='border-[1px] border-gray-400 rounded-full text-xs w-fit px-2 py-1'>
                      {lead.status}
                    </p>
                  </div>
                  <div className='col-span-1 border-gray-200 border-t-[1px] py-2 px-4 flex items-center justify-start'>
                    {isConverted ? (
                      <div className='flex items-center gap-1 text-green-600'>
                        <CheckCircle size={16} />
                        <span className='text-xs font-medium'>Converted</span>
                      </div>
                    ) : (
                      <Button
                        variant='coverpin'
                        size='sm'
                        onClick={(e) => handleConvertClick(lead, e)}
                        className='text-xs px-3 py-1 rounded-full h-auto'
                      >
                        Convert
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <LeadDetailPanel />

      <ConvertToOpportunityDialog
        lead={selectedLeadForConversion}
        open={showConvertDialog}
        onOpenChange={setShowConvertDialog}
        onSuccess={() => {
          setShowConvertDialog(false);
          setSelectedLeadForConversion(null);
        }}
      />
    </div>
  );
}
