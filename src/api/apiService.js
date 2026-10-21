import {
  mockSchoolData,
  mockDashboardMetrics,
  mockFeeTrends,
  mockCategoryStats,
  mockBoysGirlsByCategory,
  mockReminders,
  mockBirthdays,
  mockClasses,
  mockSubjectsByClass,
  mockStudents,
  mockExamStats,
  mockStaff,
  mockVehicles
} from './mockData';

// Simulated API latency helper
const simulateDelay = (ms = 150) => new Promise(resolve => setTimeout(resolve, ms));

const getStored = (key, fallbackKey) => {
  return localStorage.getItem(key) || (fallbackKey ? localStorage.getItem(fallbackKey) : null);
};

export const apiService = {
  // School Profile & Config
  getSchoolConfig: async () => {
    await simulateDelay();
    const stored = getStored('campuspulse_school_config', 'shalapro_school_config');
    return stored ? JSON.parse(stored) : mockSchoolData;
  },

  updateSchoolConfig: async (configData) => {
    await simulateDelay();
    localStorage.setItem('campuspulse_school_config', JSON.stringify(configData));
    return { success: true, data: configData };
  },

  // Dashboard Metrics
  getDashboardMetrics: async () => {
    await simulateDelay();
    return mockDashboardMetrics;
  },

  getFeeTrends: async (session = '2026-27') => {
    await simulateDelay();
    return mockFeeTrends;
  },

  getCategoryStats: async () => {
    await simulateDelay();
    return {
      categoryDistribution: mockCategoryStats,
      boysGirlsComparison: mockBoysGirlsByCategory
    };
  },

  // Reminders & Birthdays
  getReminders: async () => {
    await simulateDelay();
    const stored = getStored('campuspulse_reminders', 'shalapro_reminders');
    return stored ? JSON.parse(stored) : mockReminders;
  },

  addReminder: async (reminder) => {
    await simulateDelay();
    const stored = getStored('campuspulse_reminders', 'shalapro_reminders');
    const reminders = stored ? JSON.parse(stored) : [...mockReminders];
    const newReminder = { id: Date.now(), ...reminder };
    reminders.unshift(newReminder);
    localStorage.setItem('campuspulse_reminders', JSON.stringify(reminders));
    return newReminder;
  },

  getBirthdays: async () => {
    await simulateDelay();
    return mockBirthdays;
  },

  // Classes & Subjects
  getClasses: async () => {
    await simulateDelay();
    const stored = getStored('campuspulse_classes', 'shalapro_classes');
    return stored ? JSON.parse(stored) : mockClasses;
  },

  addClass: async (newClass) => {
    await simulateDelay();
    const stored = getStored('campuspulse_classes', 'shalapro_classes');
    const classes = stored ? JSON.parse(stored) : [...mockClasses];
    const created = { id: `c-${Date.now()}`, studentCount: 0, ...newClass };
    classes.push(created);
    localStorage.setItem('campuspulse_classes', JSON.stringify(classes));
    return created;
  },

  getSubjectsByClass: async (classId) => {
    await simulateDelay();
    const stored = getStored(`campuspulse_subjects_${classId}`, `shalapro_subjects_${classId}`);
    if (stored) return JSON.parse(stored);
    return mockSubjectsByClass[classId] || mockSubjectsByClass['c-10'] || [];
  },

  addSubjectToClass: async (classId, subject) => {
    await simulateDelay();
    const stored = getStored(`campuspulse_subjects_${classId}`, `shalapro_subjects_${classId}`);
    const subjects = stored ? JSON.parse(stored) : (mockSubjectsByClass[classId] || [...mockSubjectsByClass['c-10']]);
    const created = { id: `s-${Date.now()}`, ...subject };
    subjects.push(created);
    localStorage.setItem(`campuspulse_subjects_${classId}`, JSON.stringify(subjects));
    return created;
  },

  deleteSubjectFromClass: async (classId, subjectId) => {
    await simulateDelay();
    const stored = getStored(`campuspulse_subjects_${classId}`, `shalapro_subjects_${classId}`);
    let subjects = stored ? JSON.parse(stored) : (mockSubjectsByClass[classId] || [...mockSubjectsByClass['c-10']]);
    subjects = subjects.filter(s => s.id !== subjectId);
    localStorage.setItem(`campuspulse_subjects_${classId}`, JSON.stringify(subjects));
    return { success: true };
  },

  // Students
  getStudents: async (filters = {}) => {
    await simulateDelay();
    const stored = getStored('campuspulse_students', 'shalapro_students');
    let list = stored ? JSON.parse(stored) : mockStudents;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.srNo.toLowerCase().includes(q) ||
        s.fatherName.toLowerCase().includes(q) ||
        (s.mobile && s.mobile.includes(q))
      );
    }
    if (filters.className && filters.className !== 'All') {
      list = list.filter(s => s.className === filters.className);
    }
    if (filters.category && filters.category !== 'All') {
      list = list.filter(s => s.category === filters.category);
    }
    if (filters.feeStatus && filters.feeStatus !== 'All') {
      list = list.filter(s => s.feeStatus.toLowerCase().includes(filters.feeStatus.toLowerCase()));
    }
    return list;
  },

  addStudent: async (studentData) => {
    await simulateDelay();
    const stored = getStored('campuspulse_students', 'shalapro_students');
    const students = stored ? JSON.parse(stored) : [...mockStudents];
    const newStudent = {
      id: Date.now(),
      srNo: `SR-2026-${String(students.length + 1).padStart(3, '0')}`,
      rollNo: students.length + 1,
      attendancePercentage: 100,
      feeStatus: studentData.isRTE ? 'RTE (Govt Funded)' : 'Due',
      feePaid: 0,
      feeTotal: studentData.isRTE ? 0 : 25000,
      ...studentData
    };
    students.unshift(newStudent);
    localStorage.setItem('campuspulse_students', JSON.stringify(students));
    return newStudent;
  },

  // Fees Transaction
  recordFeePayment: async (paymentData) => {
    await simulateDelay();
    const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const receipt = {
      receiptNo,
      date: new Date().toISOString().split('T')[0],
      ...paymentData
    };
    const storedReceipts = getStored('campuspulse_receipts', 'shalapro_receipts');
    const receipts = storedReceipts ? JSON.parse(storedReceipts) : [];
    receipts.unshift(receipt);
    localStorage.setItem('campuspulse_receipts', JSON.stringify(receipts));
    return receipt;
  },

  // Attendance
  saveAttendance: async (classId, date, attendanceRecords) => {
    await simulateDelay();
    const key = `campuspulse_att_${classId}_${date}`;
    localStorage.setItem(key, JSON.stringify(attendanceRecords));
    return { success: true, count: Object.keys(attendanceRecords).length };
  },

  getAttendance: async (classId, date) => {
    await simulateDelay();
    const key = `campuspulse_att_${classId}_${date}`;
    const stored = localStorage.getItem(key) || localStorage.getItem(`shalapro_att_${classId}_${date}`);
    return stored ? JSON.parse(stored) : null;
  },

  // Exams
  getExamOverview: async () => {
    await simulateDelay();
    return mockExamStats;
  },

  // Staff & Transport
  getStaff: async () => {
    await simulateDelay();
    return mockStaff;
  },

  getVehicles: async () => {
    await simulateDelay();
    return mockVehicles;
  }
};
