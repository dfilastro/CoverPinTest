import './App.css';
import { LeadsProvider } from './context/LeadsContext';
import LeadsList from './components/LeadsList';
import { getLeadsFromStorage, saveLeadsToStorage } from './data/useLeadsStorage';

const leads = getLeadsFromStorage();

if (leads.length > 0) {
  saveLeadsToStorage(leads);
}

function App() {
  return (
    <LeadsProvider>
      <div className='p-4'>
        <h1 className='text-2xl font-bold mb-4'>Mini Seller Console</h1>
        <LeadsList />
      </div>
    </LeadsProvider>
  );
}

export default App;
