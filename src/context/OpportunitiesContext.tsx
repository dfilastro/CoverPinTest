import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Opportunity, CreateOpportunityData } from '../types/Opportunity';

interface OpportunitiesContextType {
  opportunities: Opportunity[];
  createOpportunity: (data: CreateOpportunityData) => Opportunity;
  getOpportunitiesByLead: (leadId: number) => Opportunity[];
  isLeadConverted: (leadId: number) => boolean;
  getConvertedLeadIds: () => number[];
}

const OpportunitiesContext = createContext<OpportunitiesContextType | undefined>(undefined);

export const useOpportunities = () => {
  const context = useContext(OpportunitiesContext);
  if (!context) throw new Error('useOpportunities must be used within OpportunitiesProvider');
  return context;
};

export const OpportunitiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  const createOpportunity = (data: CreateOpportunityData): Opportunity => {
    const newOpportunity: Opportunity = {
      id: `${data.leadId}_${Math.random().toString().slice(2, 6)}`,
      name: data.name,
      stage: data.stage,
      amount: data.amount,
      accountName: data.accountName,
      leadId: data.leadId,
      createdAt: new Date(),
    };

    setOpportunities((prev) => [...prev, newOpportunity]);
    return newOpportunity;
  };

  const getOpportunitiesByLead = (leadId: number): Opportunity[] => {
    return opportunities.filter((opp) => opp.leadId === leadId);
  };

  const isLeadConverted = (leadId: number): boolean => {
    return opportunities.some((opp) => opp.leadId === leadId);
  };

  const getConvertedLeadIds = (): number[] => {
    return [...new Set(opportunities.map((opp) => opp.leadId))];
  };

  return (
    <OpportunitiesContext.Provider
      value={{
        opportunities,
        createOpportunity,
        getOpportunitiesByLead,
        isLeadConverted,
        getConvertedLeadIds,
      }}
    >
      {children}
    </OpportunitiesContext.Provider>
  );
};
