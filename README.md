# CampusPulse - Next-Gen School ERP & Campus Management System

[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-130070.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-Royal_Indigo_(#130070)_%26_Slate_Grey_(#808080)_%26_Lavender_White_(#F0EBFA)-130070)](tailwind.config.js)
[![Version](https://img.shields.io/badge/Version-v2.3.115-808080)](package.json)

**CampusPulse** is a modern, responsive, and pixel-perfect School ERP & Management System Dashboard built with **React**, **Tailwind CSS**, and **Lucide React**. Anchored on a prestigious **Royal Indigo (`#130070`)**, **Classic Slate Grey (`#808080`)**, and soothing **Lavender-White Canvas (`#F0EBFA`)** palette with soft purple-lavender cards and subtle high-contrast borders, it offers a friendly SaaS aesthetic, intuitive workflows, realistic physical attendance registers, and comprehensive academic analytics.

---

## ✨ Key Features & Modules

### 1. 📊 Executive Overview Dashboard
- **Top Metric Cards**: Real-time summary of Total Students, Realized Fee Collections, and Today's Attendance percentage.
- **Fee Realization Area Chart**: Interactive **Recharts** month-by-month financial trend (Apr – Mar) with session filters and cumulative sum badges.
- **Activity & Celebration Center**: Tabbed panel toggling between high-priority reminders and **Today's Student Birthdays**.
- **Classroom Cohort Grid**: Quick-access cards displaying student counts, sections, and assigned class teachers.
- **Quick Action Drawer**: Sticky floating **"Take Fees"** button accessible from anywhere in the app.

### 2. 👥 Student Lifecycle & Demographic Analytics
- **4 Gradient KPI Cards**: Soft pastel cards for Total Students (with SVG wave sparkline), Boys count, Girls count, and RTE Quota beneficiaries.
- **Category Donut Chart**: Radial representation of General, OBC, SC, and ST roster distribution.
- **Clustered Gender Comparison Bar Chart**: Segregated Boys vs. Girls representation across categories.
- **Universal Student Directory**: Search by SR No., Roll No., student name, or father name with class, category, and fee status filters.
- **Student Dossier Viewer**: Detailed popup card displaying student academic records, parents' contact details, and fee balances.
- **Admission Enrollment Modal**: Built-in modal to admit new students with automatic SR number assignment and RTE flags.

### 3. 📖 Physical Notebook Daily Attendance Register
- **Realistic Leather-Bound Notebook Registers**: Classroom register cards crafted with a deep royal indigo (`#130070`) leather spine, metallic spiral rings, and cream-colored ruled paper texture.
- **Attendance Overview Bar**: 5 status counters (Total Students, Present, Absent, On Leave, Not Marked) with real-time percentage indicators.
- **Interactive Daily Register Sheet**: Open any class register to toggle individual students between **Present (P)**, **Absent (A)**, and **Leave (L)**, with a single-click "Mark All Present" action and persistent storage.

### 4. 💳 Financial Ledger & Fee Collection
- **Executive Fee Metrics**: Total Expected Fees, Total Collected, Outstanding Balance, and Previous Year Arrears.
- **Student Fee Ledger**: Comprehensive table tracking payments, partial dues, and government-funded RTE seats.
- **Thermal Receipt Printer**: Generates printable official school receipts with receipt numbers, student details, payment mode, and remaining balance.

### 5. 📚 Class & Subjects Configuration (Master-Detail)
- **Split Layout**: Left column displays classes list with teachers and edit/delete actions; right column displays subject configurations for the active class.
- **Curriculum Framework**: Tag subjects as `COMPULSORY` (teal badge) or `CO_SCHOLASTIC` (slate badge) with max theory/practical marks, passing cutoff, and drag handles.
- **Modals**: Add new classes, sections, and curriculum subjects on the fly.

### 6. 🏆 Examination & Merit Leaderboard
- **Hero Examination Suite**: Clean emerald banner for academic term management (Quarterly, Half-Yearly, Pre-Board, Annual).
- **Golden Trophy School Topper**: Spotlight showcase displaying the rank #1 school topper with scores, percentage, and state merit status.
- **Class Marks Entry Roster**: Select any classroom and subject to enter student marks with automatic pass/fail grading and CGPA computation.

### 7. ⚙️ School Settings & Customization
- **Identity & Branding**: School English & Hindi legal names, address, affiliation numbers, and crest upload preview.
- **Academic Framework**: Pre-Primary toggle, language mediums (Hindi / English), and school categories (Primary to Senior Secondary).
- **Affiliation Bodies**: RBSE, CBSE, ICSE, and State Board configuration with UDISE+ codes.
- **Personalized Theme Selector**: Choose between Emerald Green, Classic Blue, Professional Orange, and Royal Purple.

### 8. 🚌 Fleet & Staff Modules
- **Transport Facility**: School bus routes, designated stops, driver contacts, student seat occupancy, and GPS safety status.
- **Faculty Directory**: Teaching and non-teaching personnel, assigned classrooms, qualification records, and attendance.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Modern UI components, hooks (`useState`, `useMemo`, `useEffect`) |
| **Vite 8** | High-performance lightning-fast bundler & dev server |
| **Tailwind CSS 3.4** | Utility-first responsive design system with custom palettes |
| **Lucide React** | Consistent, crisp iconography |
| **Recharts 3** | Responsive charts (Area charts, Donut charts, Bar charts) |
| **Canvas Confetti** | Micro-interaction celebrations on fee collection and enrollments |

---

## 📂 Project Architecture

```
CampusPulse/
├── index.html                   # Entry HTML with Google Fonts & metadata
├── vite.config.js               # Vite build configuration
├── tailwind.config.js           # Custom emerald/pastel theme palette
├── postcss.config.js            # PostCSS Autoprefixer setup
├── package.json                 # Dependencies and npm scripts
└── src/
    ├── main.jsx                 # React root renderer
    ├── App.jsx                  # Main application orchestrator & layout router
    ├── index.css                # Base directives, scrollbars & notebook spine styles
    ├── api/
    │   ├── mockData.js          # Realistic mock datasets for Indian school ERP
    │   └── apiService.js        # Async API layer with persistent localStorage fallbacks
    └── components/
        ├── common/
        │   ├── Badge.jsx        # Status and category badges
        │   ├── GlobalSearchModal.jsx # Command palette (Ctrl+K)
        │   ├── Modal.jsx        # Reusable animated dialog component
        │   └── StatCard.jsx     # Soft pastel analytics card
        ├── layout/
        │   ├── Header.jsx       # Greeting, school name, language toggle, notifications
        │   ├── Sidebar.jsx      # Collapsible navigation sidebar with session indicator
        │   └── TakeFeesModal.jsx# Quick fee collection drawer with receipt generation
        ├── dashboard/
        │   ├── ActivityCard.jsx # Reminders & birthday celebrations
        │   ├── ClassListSection.jsx # Active class cards grid
        │   └── FeeCollectionChart.jsx # Area chart for fee trends
        ├── students/
        │   ├── AddStudentModal.jsx
        │   ├── StudentAnalyticsCards.jsx # 4 Pastel gradient metric cards
        │   ├── StudentCharts.jsx # Donut & Bar demographic charts
        │   └── StudentTable.jsx  # Student directory & dossier modal
        ├── attendance/
        │   ├── AttendanceRegisterModal.jsx # Daily attendance marking sheet
        │   ├── AttendanceStats.jsx # Status summary cards
        │   └── ClassRegisterCard.jsx # Physical leather notebook register card
        ├── classes/
        │   ├── AddClassModal.jsx
        │   ├── ClassListColumn.jsx
        │   ├── NewSubjectModal.jsx
        │   └── SubjectConfigColumn.jsx
        ├── fees/
        │   ├── FeeLedgerTable.jsx # Student account ledger & thermal receipt
        │   └── FeeMetrics.jsx     # Financial summary cards
        ├── exams/
        │   ├── ClassExamGrid.jsx
        │   ├── ExamBanner.jsx
        │   ├── ExamStats.jsx
        │   ├── MarksEntryModal.jsx
        │   └── TopperShowcase.jsx # Golden trophy topper card
        ├── settings/
        │   └── SettingsTabs.jsx   # Tabbed identity, affiliation, theme & alerts
        ├── transport/
        │   └── TransportModule.jsx
        └── staff/
            └── StaffDirectoryModule.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (`v20+` recommended)
- **NPM**: `v9.0.0` or higher

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Glitch-500/CampusPulse.git
   cd CampusPulse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 🔌 Backend Integration Guide

All data operations are centralized in [`src/api/apiService.js`](file:///c:/Users/LENOVO/OneDrive/Desktop/sms_project/src/api/apiService.js). Each service function is `async` and returns Promises, making it straightforward to connect to any REST or GraphQL backend (Express, Django, Laravel, NestJS, or Supabase):

```javascript
// Example: Connecting to a real backend in apiService.js
export const apiService = {
  getStudents: async (filters = {}) => {
    const response = await fetch('/api/v1/students?' + new URLSearchParams(filters));
    return response.json();
  },
  recordFeePayment: async (paymentData) => {
    const response = await fetch('/api/v1/fees/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentData)
    });
    return response.json();
  }
};
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Glitch-500/CampusPulse/issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
6. test

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ for modern schools and educators by <strong>CampusPulse</strong>.
</p>
