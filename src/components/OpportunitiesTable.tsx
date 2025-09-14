import { useOpportunities } from '../context/OpportunitiesContext';
import { useLeads } from '../context/LeadsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OpportunitiesTable() {
  const { opportunities } = useOpportunities();
  const { leads, setSelectedLead } = useLeads();

  const formatCurrency = (amount?: number) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getLeadById = (leadId: number) => {
    return leads.find((lead) => lead.id === leadId);
  };

  const handleLeadClick = (leadId: number) => {
    const lead = getLeadById(leadId);
    if (lead) {
      setSelectedLead(lead);
    }
  };

  if (opportunities.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-center py-8 text-muted-foreground'>
            <p>No opportunities created yet.</p>
            <p className='text-sm mt-1'>Convert a lead to create your first opportunity.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg font-semibold'>
          Opportunities ({opportunities.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-3 px-2 font-medium text-sm text-muted-foreground sm:min-w-[15vw] min-w-[35vw]'>
                  Name
                </th>
                <th className='text-left py-3 px-2 font-medium text-sm text-muted-foreground sm:min-w-[15vw] min-w-[30vw]'>
                  Account
                </th>
                <th className='text-left py-3 px-2 font-medium text-sm text-muted-foreground sm:min-w-[10vw] min-w-[30vw]'>
                  Stage
                </th>
                <th className='text-left py-3 px-2 font-medium text-sm text-muted-foreground sm:min-w-[15vw] min-w-[30vw]'>
                  Amount
                </th>

                <th className='text-left py-3 px-2 font-medium text-sm text-muted-foreground sm:min-w-[15vw] min-w-[30vw]'>
                  Created
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr key={opportunity.id} className='border-b hover:bg-muted/50'>
                  <td className='py-3 px-2'>
                    <div
                      className='font-medium text-left underline cursor-pointer'
                      onClick={() => handleLeadClick(opportunity.leadId)}
                    >
                      {opportunity.name}
                    </div>
                    <div className='text-sm text-muted-foreground text-left'>
                      ID: {opportunity.id}
                    </div>
                  </td>
                  <td className='py-3 px-2 text-left'>
                    <div className='text-sm'>{opportunity.accountName}</div>
                  </td>
                  <td className='py-3 px-2 text-left'>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        opportunity.stage === 'Closed Won'
                          ? 'bg-green-100 text-green-800'
                          : opportunity.stage === 'Closed Lost'
                          ? 'bg-red-100 text-red-800'
                          : opportunity.stage === 'Negotiation'
                          ? 'bg-yellow-100 text-yellow-800'
                          : opportunity.stage === 'Proposal'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className='py-3 px-2 text-left'>
                    <div className='text-sm font-medium'>{formatCurrency(opportunity.amount)}</div>
                  </td>

                  <td className='py-3 px-2 text-left'>
                    <div className='text-sm text-muted-foreground'>
                      {formatDate(opportunity.createdAt)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
