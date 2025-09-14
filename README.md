# Leads Management Dashboard

A simple **React + Vite + Tailwind** project that simulates a **Leads Management Dashboard**.  
It showcases leads in a searchable, filterable, and infinitely scrollable table, with detail editing and chart visualizations.

---

## 🚀 Tech Stack

- **React + Vite** → fast development environment.
- **Tailwind CSS** → styling and utility classes.
- **Recharts** → for charts and data visualizations.
- **Context API** → global state management (leads, filters, pagination, sorting).
- **localStorage** → used as a local database to persist updates.

---

## ✨ Features

### 🔹 Leads Table

- Displays a list of leads (id, name, company, email, source, score, status).
- Infinite scroll with windowing (loads more leads as you scroll).
- Sorting by score (asc/desc).
- Search by name/email/company.
- Filter by status.
- Optimized so only the table rerenders on search/filter changes.
- Table built with semantic HTML (flex-based option available).

### 🔹 Lead Detail Panel (Slide-over Drawer)

- Opens when a row is clicked.
- Inline edit for **status** and **email**.
- Email validation included.
- Save/Cancel actions.
- Updates persist in **localStorage**.

### 🔹 Persistence (localStorage DB)

- Leads are initialized from a fake JSON file.
- On first load, data is seeded into localStorage.
- Updates (status, email, etc.) are saved to localStorage.
- Data is rehydrated from localStorage on page reload (not reset).

### 🔹 Charts & Analytics

Built with **Recharts**:

- **Donut Chart (PieChart)** → shows distribution of lead sources (Website, Referral, etc.).
- Legend customized to display both **name and count** (e.g., `12 - Website`).
- Legend supports **sorting** (by count descending).
- Easily reusable: you can create new charts by passing filtered/aggregated lead data.

### 🔹 Styling & Fonts

- Tailwind utilities for fast styling.
- Custom fonts via Google Fonts:
  - **Bricolage Grotesque** → headers/titles.
  - **Geist** → body/paragraphs.
- Rounded corners, hover transitions (with left-to-right hover animation on buttons).

---

### 🔹 Lead to Opportunity Conversion

- **Convert Button** → Available in both the leads table and detail panel.
- **Business Rules** → Prevents duplicate conversions with visual indicators.
- **Opportunity Management** → Create opportunities with name, stage, amount, and account details.
- **Opportunities Table** → Displays all converted opportunities with source lead references.
- **Visual Feedback** → Converted leads show green checkmarks and highlighted rows.

### 🔹 Persistent Filters & Preferences

- **Search Persistence** → Search queries persist across browser sessions.
- **Filter Persistence** → Status filters are remembered between visits.
- **Sort Preferences** → Sort column and direction are saved automatically.
- **Clear Filters** → Easy reset option when filters are active.
- **Error Handling** → Graceful fallback if localStorage is unavailable.

---

## 🛠 Setup

1. Clone repo:

   ```bash
   git clone https://github.com/dfilastro/CoverPinTest.git
   cd CoverPinTest
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── drawer.tsx
│   │   └── ...
│   ├── LeadsTable.tsx         # Main leads table with infinite scroll
│   ├── LeadsList.tsx          # Leads container with filters
│   ├── LeadDetailPanel.tsx    # Slide-over drawer for editing
│   ├── OpportunitiesTable.tsx # Opportunities display
│   ├── ConvertToOpportunityDialog.tsx
│   ├── SearchBox.tsx          # Search input component
│   └── DonutChart.tsx         # Recharts pie chart
├── context/
│   ├── LeadsContext.tsx       # Leads state management
│   └── OpportunitiesContext.tsx # Opportunities state management
├── data/
│   ├── fakeApi.ts             # Mock API with pagination
│   ├── leads.json             # Seed data
│   └── useLeadsStorage.ts     # localStorage helpers
├── utils/
│   ├── localStorage.ts        # Filter persistence utilities
│   └── helperFunctions.ts     # General utility functions
├── types/
│   └── Opportunity.ts         # TypeScript interfaces
└── App.tsx                    # Main application component
```

---

## 🎯 Key Features Explained

### Infinite Scroll Implementation

- Uses **Intersection Observer API** for efficient scroll detection
- Loads data in chunks of 10 items
- Maintains scroll position during data updates

### State Management

- **Context API** for global state (leads, opportunities, filters)
- **localStorage** for persistence and data seeding
- **Optimistic updates** with error handling

### Business Logic

- **Lead conversion** prevents duplicates with visual indicators
- **Email validation** with real-time feedback
- **Filter persistence** across browser sessions

---

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start dev server with hot reload

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

---

## 🎨 Customization

### Adding New Lead Status

1. Update the status options in `LeadsList.tsx` and `LeadDetailPanel.tsx`
2. Add corresponding colors in the status badge styling

### Modifying Opportunity Stages

1. Edit the stage options in `ConvertToOpportunityDialog.tsx`
2. Update the color coding in `OpportunitiesTable.tsx`

### Styling Changes

- All styles use **Tailwind CSS** utility classes
- Custom colors defined in `tailwind.config.js`
- Font configuration in `index.css`

---

## 🔧 Technical Details

### Performance Optimizations

- **Memoized components** to prevent unnecessary re-renders
- **Virtual scrolling** for large datasets
- **Debounced search** to reduce API calls
- **localStorage** with error handling for offline capability

### Browser Compatibility

- Modern browsers with ES6+ support
- localStorage API required for persistence
- Intersection Observer API for infinite scroll

---

## 📝 License

This project is for demonstration purposes. Feel free to use it as a reference for your own projects.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
