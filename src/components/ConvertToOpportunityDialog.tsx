import { useState, useEffect } from 'react';
import { useOpportunities } from '../context/OpportunitiesContext';
import type { Lead } from '../context/LeadsContext';
import type { CreateOpportunityData } from '../types/Opportunity';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';

interface ConvertToOpportunityDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function ConvertToOpportunityDialog({
  lead,
  open,
  onOpenChange,
  onSuccess,
}: ConvertToOpportunityDialogProps) {
  const { createOpportunity } = useOpportunities();
  const [name, setName] = useState('');
  const [stage, setStage] = useState('');
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && lead) {
      setName(lead.name);
      setAccountName(lead.company);
      setStage('');
      setAmount('');
      setError('');
    }
  }, [open, lead]);

  const handleConvert = async () => {
    if (!lead) return;

    setError('');
    setLoading(true);

    if (!name.trim()) {
      setError('Opportunity name is required');
      setLoading(false);
      return;
    }

    if (!stage) {
      setError('Stage is required');
      setLoading(false);
      return;
    }

    if (!accountName.trim()) {
      setError('Account name is required');
      setLoading(false);
      return;
    }

    try {
      const opportunityData: CreateOpportunityData = {
        name: name.trim(),
        stage,
        accountName: accountName.trim(),
        leadId: lead.id,
        amount: amount ? parseFloat(amount) : undefined,
      };

      createOpportunity(opportunityData);

      setName('');
      setStage('');
      setAmount('');
      setAccountName('');
      setError('');

      onOpenChange(false);
      onSuccess?.();
    } catch (err) {
      console.error(err);
      setError('Failed to create opportunity');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setName('');
    setStage('');
    setAmount('');
    setAccountName('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-xl font-semibold'>Convert to Opportunity</DialogTitle>
          <DialogDescription>Create an opportunity from {lead?.name}</DialogDescription>
        </DialogHeader>

        <Card className='border-0 shadow-none'>
          <CardContent className='space-y-4 pt-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Opportunity Name</Label>
              <Input
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Enter opportunity name'
                className='w-full'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='stage'>Stage</Label>
              <Select value={stage} onValueChange={setStage}>
                <SelectTrigger>
                  <SelectValue placeholder='Select stage' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Prospecting'>Prospecting</SelectItem>
                  <SelectItem value='Qualification'>Qualification</SelectItem>
                  <SelectItem value='Proposal'>Proposal</SelectItem>
                  <SelectItem value='Negotiation'>Negotiation</SelectItem>
                  <SelectItem value='Closed Won'>Closed Won</SelectItem>
                  <SelectItem value='Closed Lost'>Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='accountName'>Account Name</Label>
              <Input
                id='accountName'
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder='Enter account name'
                className='w-full'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='amount'>Amount (Optional)</Label>
              <Input
                id='amount'
                type='number'
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder='Enter amount'
                className='w-full'
              />
            </div>

            {error && (
              <div className='p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md'>
                {error}
              </div>
            )}

            <div className='flex justify-end gap-3 pt-4'>
              <Button variant='outline' onClick={handleCancel} className='px-6'>
                Cancel
              </Button>
              <Button
                onClick={handleConvert}
                className='px-6'
                variant='coverpin'
                disabled={loading}
              >
                {loading ? 'Creating...' : 'Convert to Opportunity'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
