import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchLeads } from '../data/fakeApi';

export interface Lead {
  id: number;
  name: string;
  company: string;
  email: string;
  source: string;
  score: number;
  status: string;
}

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: boolean;
  selectedLead: Lead | null;
  page: number;
  pageSize: number;
  total: number;
  search: string;
  statusFilter: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string) => void;
  setSelectedLead: (lead: Lead | null) => void;
  updateLead: (lead: Lead) => void;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (!context) throw new Error('useLeads must be used within LeadsProvider');
  return context;
};

export const LeadsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchLeads(page, pageSize, search, statusFilter)
      .then((res) => {
        setLeads(res.leads);
        setTotal(res.total);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [page, pageSize, search, statusFilter]);

  const updateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        error,
        selectedLead,
        page,
        pageSize,
        total,
        search,
        statusFilter,
        setPage,
        setSearch,
        setStatusFilter,
        setSelectedLead,
        updateLead,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
