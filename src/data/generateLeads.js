// generateLeads.js
import { writeFileSync } from 'fs';

const firstNames = [
  'Alice',
  'Bob',
  'Cathy',
  'David',
  'Eva',
  'Frank',
  'Grace',
  'Henry',
  'Isabel',
  'Jack',
  'Karen',
  'Leo',
  'Mia',
  'Nathan',
  'Olivia',
  'Paul',
  'Quinn',
  'Rachel',
  'Steve',
  'Tina',
  'Uma',
  'Victor',
  'Wendy',
  'Xavier',
  'Yara',
  'Zach',
  'Aaron',
  'Bella',
  'Carlos',
  'Diana',
];
const lastNames = [
  'Johnson',
  'Smith',
  'Lee',
  'Brown',
  'Green',
  'Miller',
  'Kim',
  'Adams',
  'Turner',
  'White',
  'Scott',
  'Parker',
  'Davis',
  'Young',
  'Hall',
  'Allen',
  'Roberts',
  'Evans',
  'Martin',
  'Brooks',
  'Patel',
  'Hughes',
  'Clark',
  'Lopez',
  'Simmons',
  'Carter',
  'Kelly',
  'Ramirez',
  'Mendes',
  'Stone',
];
const companies = [
  'Acme Corp',
  'Tech Solutions',
  'Innovate Inc',
  'NextGen Systems',
  'Creative Minds',
  'AlphaTech',
  'BlueWave',
  'Smart Solutions',
  'Visionary Labs',
  'TechFlow',
  'Bright Future',
  'NextStep',
  'EcoTech',
  'Global Dynamics',
  'Bright Ideas',
  'Skyline Tech',
  'NextLevel',
  'Innovatech',
  'TechBridge',
  'CreativeWorks',
];
const sources = ['Website', 'Referral', 'Event'];
const statuses = ['New', 'Contacted', 'Qualified', 'Lost'];
const filePath = 'src/data/leads.json';

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const leads = Array.from({ length: 100 }, (_, i) => {
  const first = randomItem(firstNames);
  const last = randomItem(lastNames);
  const company = randomItem(companies);
  return {
    id: i + 1,
    name: `${first} ${last}`,
    company,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@${company
      .replace(/\s+/g, '')
      .toLowerCase()}.com`,
    source: randomItem(sources),
    score: Math.floor(Math.random() * 41) + 60, // 60–100
    status: randomItem(statuses),
  };
});

writeFileSync(filePath, JSON.stringify(leads, null, 2));
console.log('✅ leads.json generated with 100 fake leads');
