import './App.css';
import { LeadsProvider } from './context/LeadsContext';
import LeadsList from './components/LeadsList';

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
