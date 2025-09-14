import './App.css';
import { LeadsProvider } from './context/LeadsContext';
import { OpportunitiesProvider } from './context/OpportunitiesContext';
import LeadsList from './components/LeadsList';
import OpportunitiesTable from './components/OpportunitiesTable';
import { getLeadsFromStorage, saveLeadsToStorage } from './data/useLeadsStorage';

const leads = getLeadsFromStorage();

if (leads.length > 0) {
  saveLeadsToStorage(leads);
}

function App() {
  return (
    <LeadsProvider>
      <OpportunitiesProvider>
        <div className='p-4 space-y-6 sm:border-solid sm:border-[1px] border-gray-200 rounded-md my-10'>
          <h1 className='text-2xl font-bold mb-4 text-left'>Leads Console</h1>
          <OpportunitiesTable />
          <LeadsList />
        </div>
      </OpportunitiesProvider>
    </LeadsProvider>
  );
}

export default App;
