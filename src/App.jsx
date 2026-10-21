import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import TakeFeesModal from './components/layout/TakeFeesModal';
import GlobalSearchModal from './components/common/GlobalSearchModal';

// Screen A: Dashboard
import StatCard from './components/common/StatCard';
import FeeCollectionChart from './components/dashboard/FeeCollectionChart';
import ActivityCard from './components/dashboard/ActivityCard';
import ClassListSection from './components/dashboard/ClassListSection';
import { Users, IndianRupee, CalendarCheck2, ArrowUpRight, Plus, Sparkles, CreditCard, ChevronRight } from 'lucide-react';

// Screen B: Students
import StudentAnalyticsCards from './components/students/StudentAnalyticsCards';
import StudentCharts from './components/students/StudentCharts';
import StudentTable from './components/students/StudentTable';
import AddStudentModal from './components/students/AddStudentModal';

// Screen C: Attendance
import AttendanceStats from './components/attendance/AttendanceStats';
import ClassRegisterCard from './components/attendance/ClassRegisterCard';
import AttendanceRegisterModal from './components/attendance/AttendanceRegisterModal';
import { Calendar, FileText, RefreshCw } from 'lucide-react';

// Screen D: Classes & Subjects
import ClassListColumn from './components/classes/ClassListColumn';
import SubjectConfigColumn from './components/classes/SubjectConfigColumn';
import NewSubjectModal from './components/classes/NewSubjectModal';
import AddClassModal from './components/classes/AddClassModal';

// Screen E: Fees Management
import FeeMetrics from './components/fees/FeeMetrics';
import FeeLedgerTable from './components/fees/FeeLedgerTable';

// Screen F: Exams & Results
import ExamBanner from './components/exams/ExamBanner';
import ExamStats from './components/exams/ExamStats';
import TopperShowcase from './components/exams/TopperShowcase';
import ClassExamGrid from './components/exams/ClassExamGrid';
import MarksEntryModal from './components/exams/MarksEntryModal';

// Screen G: Settings
import SettingsTabs from './components/settings/SettingsTabs';

// Other Modules
import TransportModule from './components/transport/TransportModule';
import StaffDirectoryModule from './components/staff/StaffDirectoryModule';

// API & Mock Data
import { apiService } from './api/apiService';
import { mockDashboardMetrics, mockFeeTrends, mockCategoryStats, mockBoysGirlsByCategory, mockReminders, mockBirthdays } from './api/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [language, setLanguage] = useState('en');

  // Modals
  const [isTakeFeesOpen, setIsTakeFeesOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isNewSubjectOpen, setIsNewSubjectOpen] = useState(false);
  const [attendanceModalClass, setAttendanceModalClass] = useState(null);
  const [marksEntryClass, setMarksEntryClass] = useState(null);

  // Data states
  const [schoolConfig, setSchoolConfig] = useState(null);
  const [metrics, setMetrics] = useState(mockDashboardMetrics);
  const [feeTrends, setFeeTrends] = useState(mockFeeTrends);
  const [reminders, setReminders] = useState(mockReminders);
  const [birthdays, setBirthdays] = useState(mockBirthdays);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // Load initial data
  useEffect(() => {
    async function loadData() {
      const config = await apiService.getSchoolConfig();
      setSchoolConfig(config);

      const clsList = await apiService.getClasses();
      setClasses(clsList);
      if (clsList.length > 0) {
        setSelectedClass(clsList[0]);
      }

      const stList = await apiService.getStudents();
      setStudents(stList);

      const rems = await apiService.getReminders();
      setReminders(rems);

      const stf = await apiService.getStaff();
      setStaff(stf);

      const veh = await apiService.getVehicles();
      setVehicles(veh);
    }
    loadData();
  }, []);

  // When selected class changes, load subjects
  useEffect(() => {
    if (selectedClass) {
      apiService.getSubjectsByClass(selectedClass.id).then((subjs) => {
        setSubjects(subjs);
      });
    }
  }, [selectedClass]);

  // Handlers
  const handleAddReminder = async (newRem) => {
    const created = await apiService.addReminder(newRem);
    setReminders((prev) => [created, ...prev]);
  };

  const handleAddStudent = async (newStudentData) => {
    const created = await apiService.addStudent(newStudentData);
    setStudents((prev) => [created, ...prev]);
    setMetrics((prev) => ({
      ...prev,
      totalStudents: prev.totalStudents + 1,
      boysCount: newStudentData.gender === 'Male' ? prev.boysCount + 1 : prev.boysCount,
      girlsCount: newStudentData.gender === 'Female' ? prev.girlsCount + 1 : prev.girlsCount,
      rteCount: newStudentData.isRTE ? prev.rteCount + 1 : prev.rteCount,
    }));
  };

  const handleAddClass = async (newClassData) => {
    const created = await apiService.addClass(newClassData);
    setClasses((prev) => [...prev, created]);
    setSelectedClass(created);
  };

  const handleAddSubject = async (newSubjectData) => {
    if (!selectedClass) return;
    const created = await apiService.addSubjectToClass(selectedClass.id, newSubjectData);
    setSubjects((prev) => [...prev, created]);
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!selectedClass) return;
    await apiService.deleteSubjectFromClass(selectedClass.id, subjectId);
    setSubjects((prev) => prev.filter((s) => s.id !== subjectId));
  };

  const handleSaveConfig = async (updatedConfig) => {
    await apiService.updateSchoolConfig(updatedConfig);
    setSchoolConfig(updatedConfig);
  };

  return (
    <div className="min-h-screen bg-[#F0EBFA] flex font-sans antialiased text-slate-800">
      {/* 1. Collapsible Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        session={schoolConfig?.session || '2026-27'}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Header Bar */}
        <Header
          schoolName={schoolConfig?.name || 'DEEPTI MONTESSORI SCHOOL'}
          userName={schoolConfig?.principal || 'Sudarshan Maurya'}
          userRole={schoolConfig?.role || 'Owner'}
          language={language}
          setLanguage={setLanguage}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenTakeFees={() => setIsTakeFeesOpen(true)}
        />

        {/* View Page Router */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto pb-24">
          {/* SCREEN A: Main Overview Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Top Metric Cards (3 Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Total Students */}
                <StatCard
                  title="Total Students"
                  value={metrics.totalStudents}
                  subtitle={`${metrics.boysCount} Boys • ${metrics.girlsCount} Girls (${metrics.rteCount} RTE)`}
                  icon={Users}
                  variant="royal"
                  badgeText="Session 26-27"
                  badgeColor="bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]"
                  onClick={() => setActiveTab('students')}
                />

                {/* 2. Fees Collected */}
                <StatCard
                  title="Fees Collected"
                  value={`₹${metrics.feesCollected.toLocaleString('en-IN')}`}
                  subtitle={`₹${metrics.feesPending.toLocaleString('en-IN')} balance remaining for 2026-27`}
                  icon={IndianRupee}
                  variant="default"
                  badgeText="74.9% Realized"
                  badgeColor="bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]"
                  onClick={() => setActiveTab('fees')}
                />

                {/* 3. Today's Attendance */}
                <StatCard
                  title="Today's Attendance"
                  value={`${metrics.todayAttendance.percentage}%`}
                  subtitle={`${metrics.todayAttendance.present} Present • ${metrics.todayAttendance.absent} Absent • ${metrics.todayAttendance.onLeave} Leave`}
                  icon={CalendarCheck2}
                  variant="royal"
                  badgeText="Recorded Today"
                  badgeColor="bg-[#ECE7FE] text-[#130070] border border-[#DCD4FD]"
                  onClick={() => setActiveTab('attendance')}
                />
              </div>

              {/* Middle Section (2 Columns: Left 2/3, Right 1/3) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2">
                  <FeeCollectionChart data={feeTrends} />
                </div>
                <div className="lg:col-span-1">
                  <ActivityCard
                    reminders={reminders}
                    birthdays={birthdays}
                    onAddReminder={handleAddReminder}
                  />
                </div>
              </div>

              {/* Bottom Section - "Your Classes" */}
              <ClassListSection
                classes={classes}
                onSelectClass={(cls) => {
                  setSelectedClass(cls);
                  setActiveTab('classes');
                }}
                onOpenAttendance={(cls) => setAttendanceModalClass(cls)}
              />
            </div>
          )}

          {/* SCREEN B: Student Analytics & Management */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Student Analytics & Directory
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Universal student roster, RTE compliance metrics, and demographic distribution
                  </p>
                </div>
              </div>

              {/* 4 Gradient KPI Cards */}
              <StudentAnalyticsCards
                total={metrics.totalStudents}
                boys={metrics.boysCount}
                girls={metrics.girlsCount}
                rte={metrics.rteCount}
              />

              {/* Charts Row */}
              <StudentCharts
                categoryStats={mockCategoryStats}
                boysGirlsData={mockBoysGirlsByCategory}
              />

              {/* Student Table & Actions */}
              <StudentTable
                students={students}
                classes={classes}
                onOpenAddModal={() => setIsAddStudentOpen(true)}
                onTakeFeesForStudent={(st) => setIsTakeFeesOpen(true)}
              />
            </div>
          )}

          {/* SCREEN C: Daily Attendance Register */}
          {activeTab === 'attendance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F0EBFA] p-4 rounded-2xl border border-[#DCD4FD] shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#ECE7FE] border border-[#DCD4FD] rounded-xl text-xs font-bold text-[#130070]">
                    <Calendar className="w-4 h-4 text-[#130070]" />
                    <span>Tuesday, 20 Oct 2026</span>
                  </div>
                  <span className="text-xs text-[#808080] hidden md:inline">
                    Session 2026-27 Register
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-[#ECE7FE] hover:bg-[#E2DBFC] rounded-xl border border-[#DCD4FD] transition-colors">
                    <FileText className="w-3.5 h-3.5 text-[#808080]" />
                    <span>Reports</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-[#ECE7FE] hover:bg-[#E2DBFC] rounded-xl border border-[#DCD4FD] transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-[#808080]" />
                    <span>Shivira Calendar</span>
                  </button>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#130070] bg-[#ECE7FE] hover:bg-[#E2DBFC] rounded-xl border border-[#DCD4FD] transition-colors">
                    <RefreshCw className="w-3.5 h-3.5 text-[#130070]" />
                    <span>Sync From Portal</span>
                  </button>
                </div>
              </div>

              {/* Attendance Overview Bar */}
              <AttendanceStats
                total={metrics.todayAttendance.total}
                present={metrics.todayAttendance.present}
                absent={metrics.todayAttendance.absent}
                onLeave={metrics.todayAttendance.onLeave}
                notMarked={metrics.todayAttendance.notMarked}
                percentage={metrics.todayAttendance.percentage}
              />

              {/* Physical Notebook Register Grid View */}
              <div>
                <div className="mb-3">
                  <h3 className="font-bold text-slate-900 text-base">Physical Attendance Registers</h3>
                  <p className="text-xs text-slate-400">Click any classroom register book to record or verify attendance</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {classes.map((cls) => (
                    <ClassRegisterCard
                      key={cls.id}
                      classItem={cls}
                      session={schoolConfig?.session || '2026-27'}
                      date="20 Oct 2026"
                      onClick={() => setAttendanceModalClass(cls)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN D: Class & Subjects Configuration */}
          {activeTab === 'classes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Class & Subjects Configuration
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Manage class cohorts, faculty class assignments, and scholastic subject frameworks
                </p>
              </div>

              {/* Master-Detail Two-Column Split Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 h-[calc(100vh-16rem)] min-h-[550px]">
                {/* Left Column (Class List) - 5 Cols */}
                <div className="md:col-span-5 h-full">
                  <ClassListColumn
                    classes={classes}
                    selectedClass={selectedClass}
                    onSelectClass={setSelectedClass}
                    onAddClass={() => setIsAddClassOpen(true)}
                  />
                </div>

                {/* Right Column (Subject Config) - 7 Cols */}
                <div className="md:col-span-7 h-full">
                  <SubjectConfigColumn
                    selectedClass={selectedClass}
                    subjects={subjects}
                    onOpenNewSubject={() => setIsNewSubjectOpen(true)}
                    onDeleteSubject={handleDeleteSubject}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SCREEN E: Fees Management */}
          {activeTab === 'fees' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Fees Management & Financial Ledger
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Track student fee installments, issue receipts, and reconcile pending balances
                  </p>
                </div>
                <button
                  onClick={() => setIsTakeFeesOpen(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02]"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Take Fees Now</span>
                </button>
              </div>

              {/* Summary Cards */}
              <FeeMetrics
                expected={metrics.feesExpected}
                collected={metrics.feesCollected}
                pending={metrics.feesPending}
                previousDues={metrics.previousDues}
              />

              {/* Ledger Table */}
              <FeeLedgerTable
                students={students}
                onOpenTakeFees={(st) => setIsTakeFeesOpen(true)}
              />
            </div>
          )}

          {/* SCREEN F: Exam & Results Dashboard */}
          {activeTab === 'exams' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hero Banner & Timetable CTA */}
              <ExamBanner onOpenTimetable={() => alert('Timetable Builder opened!')} />

              {/* Stats Row */}
              <ExamStats
                students={metrics.totalStudents}
                classes={classes.length}
                incomplete={24}
                nso={12}
                lowAttendance={18}
              />

              {/* School Topper Showcase */}
              <TopperShowcase onViewLeaderboard={() => alert('Viewing State Rank & Merit Leaderboard')} />

              {/* Class Examination Marks Grid */}
              <ClassExamGrid
                classes={classes}
                onEnterMarks={(cls) => setMarksEntryClass(cls)}
                onViewResult={(cls) => alert(`Viewing comprehensive result card for ${cls.name}`)}
              />
            </div>
          )}

          {/* SCREEN G: School Configuration / Settings */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  School Settings & Master Configuration
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Update UDISE codes, RBSE/CBSE affiliation, branding logos, and app preferences
                </p>
              </div>

              <SettingsTabs
                schoolConfig={schoolConfig}
                onSaveConfig={handleSaveConfig}
              />
            </div>
          )}

          {/* Additional Module: Transport Facility */}
          {activeTab === 'transport' && (
            <div className="animate-in fade-in duration-200">
              <TransportModule vehicles={vehicles} />
            </div>
          )}

          {/* Additional Module: Staff */}
          {activeTab === 'staff' && (
            <div className="animate-in fade-in duration-200">
              <StaffDirectoryModule staff={staff} />
            </div>
          )}

          {/* Additional Module: Accounts */}
          {activeTab === 'accounts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  School Accounts & Cash Book
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Petty cash, bank transactions, vouchers, and audit reports
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard
                  title="Cash in Hand"
                  value="₹84,520"
                  subtitle="Counter cash balance"
                  icon={IndianRupee}
                  variant="emerald"
                />
                <StatCard
                  title="Bank Account (SBI)"
                  value="₹14,48,200"
                  subtitle="Current Account #98214"
                  icon={CreditCard}
                  variant="royal"
                />
                <StatCard
                  title="Expenses This Month"
                  value="₹1,26,400"
                  subtitle="Electricity, maintenance, printing"
                  icon={IndianRupee}
                  variant="alert"
                />
              </div>

              <div className="bg-[#F0EBFA] p-5 rounded-2xl border border-[#DCD4FD] shadow-sm">
                <h4 className="font-bold text-slate-900 text-sm mb-3">Recent Vouchers & Expenses</h4>
                <div className="divide-y divide-[#DCD4FD] text-xs">
                  <div className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Exam Question Paper Printing</p>
                      <p className="text-[10px] text-[#808080]">Voucher #V-891 • Paid via Cash</p>
                    </div>
                    <span className="font-bold font-mono text-rose-700">-₹12,400</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Bus #1 Diesel Refuel</p>
                      <p className="text-[10px] text-[#808080]">Voucher #V-890 • IOCL Station</p>
                    </div>
                    <span className="font-bold font-mono text-rose-700">-₹6,800</span>
                  </div>
                  <div className="py-2.5 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-slate-800">Counter Fee Collection (Day Batch)</p>
                      <p className="text-[10px] text-[#808080]">Receipt Batch #RB-204</p>
                    </div>
                    <span className="font-bold font-mono text-[#130070]">+₹42,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Module: Tools & Automation */}
          {(activeTab === 'automation' || activeTab === 'tools') && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Automation & Intelligent Tools
                </h2>
                <p className="text-xs text-[#808080] mt-0.5">
                  Automate WhatsApp parent communications, Shala Darpan data sync, and marksheets
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ECE7FE] text-[#130070] flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Automated Daily SMS / WhatsApp</h4>
                  <p className="text-xs text-[#808080]">
                    Sends automated absent alerts to parents at 10:30 AM every morning.
                  </p>
                  <span className="text-[10px] font-bold text-[#130070] bg-[#ECE7FE] border border-[#DCD4FD] px-2 py-0.5 rounded">
                    Active & Running
                  </span>
                </div>

                <div className="p-5 bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">PSP / Shala Darpan 1-Click Sync</h4>
                  <p className="text-xs text-[#808080]">
                    Syncs student admission numbers, Aadhaar verification, and RTE quotas automatically.
                  </p>
                  <button className="text-xs font-bold text-sky-700 hover:underline">
                    Trigger Sync Now →
                  </button>
                </div>

                <div className="p-5 bg-[#F0EBFA] rounded-2xl border border-[#DCD4FD] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Bulk Marksheet & TC Generator</h4>
                  <p className="text-xs text-[#808080]">
                    Print 500+ student marksheets with dynamic QR code verification.
                  </p>
                  <button className="text-xs font-bold text-amber-700 hover:underline">
                    Launch Generator →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Backup */}
          {activeTab === 'backup' && (
            <div className="bg-[#F0EBFA] p-6 rounded-2xl border border-[#DCD4FD] shadow-sm space-y-4 max-w-xl">
              <h3 className="text-base font-bold text-slate-900">Cloud Backup & Recovery</h3>
              <p className="text-xs text-[#808080]">
                Automatic daily encrypted snapshot backed up to secure Indian cloud servers.
              </p>
              <div className="p-3 bg-[#ECE7FE] border border-[#DCD4FD] rounded-xl text-xs font-mono text-[#130070] space-y-1">
                <p>Last Backup: Today at 04:00 AM (Size: 18.4 MB)</p>
                <p>Status: Healthy & Verified (SHA-256)</p>
              </div>
              <button
                onClick={() => alert('Encrypted backup archive created and downloaded!')}
                className="px-4 py-2 bg-[#130070] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#1C0191]"
              >
                Download Snapshot
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Floating Action Button: Sticky bottom-right royal indigo button "Take Fees" (#130070) */}
      <button
        onClick={() => setIsTakeFeesOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3.5 bg-[#130070] hover:bg-[#1C0191] text-white font-extrabold text-sm rounded-full shadow-2xl shadow-[#130070]/40 hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#6E4DF0]/30 group"
      >
        <div className="w-6 h-6 rounded-full bg-[#2C07BD]/80 flex items-center justify-center group-hover:rotate-12 transition-transform">
          <IndianRupee className="w-4 h-4 text-white" />
        </div>
        <span className="tracking-wide uppercase font-sans">Take Fees</span>
      </button>

      {/* Global Modals */}
      <TakeFeesModal
        isOpen={isTakeFeesOpen}
        onClose={() => setIsTakeFeesOpen(false)}
        students={students}
        onSuccess={(receipt) => {
          setMetrics((prev) => ({
            ...prev,
            feesCollected: prev.feesCollected + receipt.amount,
            feesPending: Math.max(0, prev.feesPending - receipt.amount),
          }));
        }}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setActiveTab}
        onTakeFees={() => setIsTakeFeesOpen(true)}
        students={students}
        classes={classes}
      />

      <AddStudentModal
        isOpen={isAddStudentOpen}
        onClose={() => setIsAddStudentOpen(false)}
        onAddStudent={handleAddStudent}
        classes={classes}
      />

      <AddClassModal
        isOpen={isAddClassOpen}
        onClose={() => setIsAddClassOpen(false)}
        onAddClass={handleAddClass}
      />

      <NewSubjectModal
        isOpen={isNewSubjectOpen}
        onClose={() => setIsNewSubjectOpen(false)}
        onAddSubject={handleAddSubject}
        className={selectedClass?.name || 'Class 10th'}
      />

      <AttendanceRegisterModal
        isOpen={Boolean(attendanceModalClass)}
        onClose={() => setAttendanceModalClass(null)}
        classItem={attendanceModalClass}
        students={students}
      />

      <MarksEntryModal
        isOpen={Boolean(marksEntryClass)}
        onClose={() => setMarksEntryClass(null)}
        classItem={marksEntryClass}
        students={students}
      />
    </div>
  );
}
