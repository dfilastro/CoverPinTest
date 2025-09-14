export interface Opportunity {
  id: string;
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  leadId: number; // Reference to the original lead
  createdAt: Date;
}

export interface CreateOpportunityData {
  name: string;
  stage: string;
  amount?: number;
  accountName: string;
  leadId: number;
}
