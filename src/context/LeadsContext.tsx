import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { fetchLeads, fetchMoreLeads } from '../data/fakeApi';

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
  pageSize: number;
  search: string;
  statusFilter: string;
  hasMore: boolean;
  loadingMore: boolean;
  setSearch: (search: string) => void;
  setStatusFilter: (status: string) => void;
  setSelectedLead: (lead: Lead | null) => void;
  updateLead: (lead: Lead) => void;
  loadMoreLeads: () => void;
  sortBy: string;
  sortOrder: string;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: string) => void;
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
  const [pageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [sortOrder, setSortOrder] = useState('desc');
  useEffect(() => {
    setLoading(true);
    setLeads([]); // Reset leads when search/filter changes
    setHasMore(true);
    fetchLeads(1, pageSize, search, statusFilter, sortBy, sortOrder)
      .then((res) => {
        setLeads(res.leads);
        setHasMore(res.leads.length === pageSize && res.leads.length < res.total);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [pageSize, search, statusFilter, sortBy, sortOrder]);

  const updateLead = (updatedLead: Lead) => {
    setLeads((prev) => prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)));
  };

  const loadMoreLeads = () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    fetchMoreLeads(leads, pageSize, search, statusFilter, sortBy, sortOrder)
      .then((res) => {
        setLeads((prev) => [...prev, ...res.leads]);
        setHasMore(res.hasMore);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoadingMore(false);
      });
  };

  return (
    <LeadsContext.Provider
      value={{
        leads,
        loading,
        error,
        selectedLead,
        pageSize,
        search,
        statusFilter,
        hasMore,
        loadingMore,
        setSearch,
        setStatusFilter,
        setSelectedLead,
        updateLead,
        loadMoreLeads,
        sortBy,
        sortOrder,
        setSortBy,
        setSortOrder,
      }}
    >
      {children}
    </LeadsContext.Provider>
  );
};
