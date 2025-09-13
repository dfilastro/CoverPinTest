import { useEffect, useState } from 'react';
import { useLeads } from '../context/LeadsContext';
import { updateLeadInStorage } from '../data/useLeadsStorage';

export default function LeadDetailPanel() {
  const { selectedLead, setSelectedLead, updateLead } = useLeads();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedLead) {
      setEmail(selectedLead.email);
      setStatus(selectedLead.status);
      setError('');
    }
  }, [selectedLead]);

  if (!selectedLead) return null;

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    updateLead({ ...selectedLead, email, status });
    updateLeadInStorage({ ...selectedLead, email, status });
    setSelectedLead(null); // close panel
  };

  const handleCancel = () => {
    setSelectedLead(null); // close panel without saving
  };

  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/50' onClick={handleCancel}></div>

      {/* Panel */}
      <div className='ml-auto w-96 bg-white p-6 shadow-lg relative'>
        <h2 className='text-xl font-bold mb-4'>{selectedLead.name}</h2>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full border rounded px-2 py-1'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-medium mb-1'>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className='w-full border rounded px-2 py-1'
          >
            <option value='New'>New</option>
            <option value='Contacted'>Contacted</option>
            <option value='Qualified'>Qualified</option>
            <option value='Lost'>Lost</option>
          </select>
        </div>

        {error && <p className='text-red-500 text-sm mb-2'>{error}</p>}

        <div className='flex justify-end gap-2 mt-4'>
          <button onClick={handleCancel} className='px-4 py-2 border rounded hover:bg-gray-100'>
            Cancel
          </button>
          <button
            onClick={handleSave}
            className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
