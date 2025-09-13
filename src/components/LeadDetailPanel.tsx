import { useEffect, useState } from 'react';
import { useLeads } from '../context/LeadsContext';
import { updateLeadInStorage } from '../data/useLeadsStorage';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    <Drawer open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
      <DrawerContent>
        <DrawerHeader className='text-center'>
          <DrawerTitle className='text-2xl font-semibold'>Edit Lead Details</DrawerTitle>
          <DrawerDescription>Update the information for {selectedLead?.name}</DrawerDescription>
        </DrawerHeader>

        <div className='px-4 pb-8'>
          <Card className='border-0 shadow-none'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-lg font-medium text-muted-foreground'>
                {selectedLead?.name}
              </CardTitle>
              <p className='text-sm text-muted-foreground'>{selectedLead?.company}</p>
            </CardHeader>

            <CardContent className='space-y-6'>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email Address</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='Enter email address'
                  className='w-full'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='status'>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder='Select status' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='New'>New</SelectItem>
                    <SelectItem value='Contacted'>Contacted</SelectItem>
                    <SelectItem value='Qualified'>Qualified</SelectItem>
                    <SelectItem value='Lost'>Lost</SelectItem>
                  </SelectContent>
                </Select>
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
                <Button onClick={handleSave} className='px-6' variant='coverpin'>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
