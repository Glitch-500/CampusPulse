export const mockSchoolData = {
  name: "DEEPTI MONTESSORI SCHOOL",
  hindiName: "दीप्ति मोंटेसरी स्कूल",
  code: "08120304501",
  udise: "08120304501",
  affiliationBody: "RBSE",
  affiliationNo: "RAJ-SCH-2018-9941",
  affiliationYear: "2018",
  session: "2026-27",
  category: "Secondary (Class 1 to 10)",
  medium: ["Hindi", "English"],
  hasPrePrimary: true,
  address: "Plot 42, Knowledge Park Road, Sector 5, Jaipur, Rajasthan - 302020",
  mobile: "+91 98290 12345",
  email: "office@deeptischool.edu.in",
  principal: "Sudarshan Maurya",
  role: "Owner",
  theme: "Royal Indigo (#130070) & Slate Grey (#808080)",
  notificationPosition: "Top Right"
};

export const mockDashboardMetrics = {
  totalStudents: 518,
  boysCount: 284,
  girlsCount: 234,
  rteCount: 86,
  feesCollected: 1835000,
  feesExpected: 2450000,
  feesPending: 615000,
  previousDues: 142000,
  todayAttendance: {
    total: 518,
    present: 472,
    absent: 34,
    onLeave: 12,
    notTaken: 0,
    percentage: 91.1
  }
};

export const mockFeeTrends = [
  { month: "Apr", amount: 380000, expected: 400000 },
  { month: "May", amount: 210000, expected: 250000 },
  { month: "Jun", amount: 110000, expected: 150000 },
  { month: "Jul", amount: 440000, expected: 480000 },
  { month: "Aug", amount: 165000, expected: 200000 },
  { month: "Sep", amount: 290000, expected: 320000 },
  { month: "Oct", amount: 240000, expected: 280000 },
  { month: "Nov", amount: 110000, expected: 140000 },
  { month: "Dec", amount: 95000, expected: 120000 },
  { month: "Jan", amount: 65000, expected: 90000 },
  { month: "Feb", amount: 35000, expected: 60000 },
  { month: "Mar", amount: 15000, expected: 30000 },
];

export const mockCategoryStats = [
  { name: "OBC", value: 215, color: "#130070" },
  { name: "General", value: 165, color: "#0284C7" },
  { name: "SC", value: 88, color: "#DB2777" },
  { name: "ST", value: 50, color: "#D97706" }
];

export const mockBoysGirlsByCategory = [
  { category: "General", Boys: 90, Girls: 75 },
  { category: "OBC", Boys: 118, Girls: 97 },
  { category: "SC", Boys: 48, Girls: 40 },
  { category: "ST", Boys: 28, Girls: 22 }
];

export const mockReminders = [
  {
    id: 1,
    title: "Upload RTE Quota Verification on Shala Darpan Portal",
    time: "Due: 25th Oct, 2026",
    priority: "high",
    category: "Portal Sync"
  },
  {
    id: 2,
    title: "Class 10th Board Exam registration form fee collection",
    time: "Due: 28th Oct, 2026",
    priority: "medium",
    category: "Accounts"
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting for Class 5th to 8th scheduled",
    time: "Saturday, 31st Oct (9:00 AM)",
    priority: "normal",
    category: "Academic"
  }
];

export const mockBirthdays = [
  { id: 1, name: "Aarav Sharma", class: "Class 3rd (Sec A)", rollNo: 7, avatarColor: "bg-[#130070]" },
  { id: 2, name: "Ananya Patel", class: "Class 7th (Sec A)", rollNo: 14, avatarColor: "bg-pink-500" },
  { id: 3, name: "Priyansh Meena", class: "Class 1st (Sec A)", rollNo: 22, avatarColor: "bg-sky-500" }
];

export const mockClasses = [
  { id: "c-nur", name: "Nursery", section: "A", studentCount: 28, teacher: "Sunita Sharma", room: "Room 101" },
  { id: "c-lkg", name: "LKG", section: "A", studentCount: 32, teacher: "Priyanka Joshi", room: "Room 102" },
  { id: "c-ukg", name: "UKG", section: "A", studentCount: 35, teacher: "Rekha Verma", room: "Room 103" },
  { id: "c-1", name: "Class 1st", section: "A", studentCount: 42, teacher: "Ramesh Meena", room: "Room 104" },
  { id: "c-2", name: "Class 2nd", section: "A", studentCount: 38, teacher: "Anita Chaudhary", room: "Room 105" },
  { id: "c-3", name: "Class 3rd", section: "A", studentCount: 40, teacher: "Vikram Rathore", room: "Room 201" },
  { id: "c-4", name: "Class 4th", section: "A", studentCount: 44, teacher: "Pooja Mishra", room: "Room 202" },
  { id: "c-5", name: "Class 5th", section: "A", studentCount: 46, teacher: "Manoj Tiwari", room: "Room 203" },
  { id: "c-6", name: "Class 6th", section: "A", studentCount: 45, teacher: "Kavita Chauhan", room: "Room 204" },
  { id: "c-7", name: "Class 7th", section: "A", studentCount: 48, teacher: "Deepak Saini", room: "Room 301" },
  { id: "c-8", name: "Class 8th", section: "A", studentCount: 52, teacher: "Harish Kumawat", room: "Room 302" },
  { id: "c-9", name: "Class 9th", section: "A", studentCount: 50, teacher: "Rajendra Vyas", room: "Room 303" },
  { id: "c-10", name: "Class 10th", section: "A", studentCount: 48, teacher: "Sunita Pareek", room: "Room 304" }
];

export const mockSubjectsByClass = {
  "c-10": [
    { id: "s-1", code: "EN", name: "English Language & Literature", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-2", code: "HI", name: "Hindi (Course A)", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-3", code: "MA", name: "Mathematics (Standard)", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-4", code: "SC", name: "Science & Technology", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-5", code: "SS", name: "Social Science", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-6", code: "SK", name: "Third Language - Sanskrit", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-7", code: "CS", name: "Information Technology (Vocational)", type: "CO_SCHOLASTIC", maxMarks: 50, passMarks: 17 },
    { id: "s-8", code: "PE", name: "Physical & Health Education", type: "CO_SCHOLASTIC", maxMarks: 50, passMarks: 17 },
    { id: "s-9", code: "AC", name: "Art Education & Work Experience", type: "CO_SCHOLASTIC", maxMarks: 50, passMarks: 17 }
  ],
  "c-8": [
    { id: "s-11", code: "EN", name: "English Reader", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-12", code: "HI", name: "Hindi Vasant", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-13", code: "MA", name: "Mathematics", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-14", code: "SC", name: "General Science", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-15", code: "SS", name: "Social Studies", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-16", code: "SK", name: "Sanskrit Ruchira", type: "COMPULSORY", maxMarks: 100, passMarks: 33 },
    { id: "s-17", code: "CS", name: "Computer Fundamentals", type: "CO_SCHOLASTIC", maxMarks: 50, passMarks: 17 }
  ]
};

export const mockStudents = [
  {
    id: 101,
    srNo: "SR-2024-001",
    rollNo: 1,
    name: "Divyanshi Sharma",
    fatherName: "Mahesh Sharma",
    motherName: "Suman Sharma",
    className: "Class 10th",
    section: "A",
    gender: "Female",
    category: "General",
    isRTE: false,
    dob: "2011-04-12",
    mobile: "9829100001",
    aadhaar: "XXXX-XXXX-4589",
    feeTotal: 28000,
    feePaid: 28000,
    feeStatus: "Paid",
    attendancePercentage: 96.5,
    rank: 1,
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 102,
    srNo: "SR-2024-002",
    rollNo: 2,
    name: "Aditya Singh Rathore",
    fatherName: "Kalyan Singh",
    motherName: "Meenakshi Rathore",
    className: "Class 10th",
    section: "A",
    gender: "Male",
    category: "General",
    isRTE: false,
    dob: "2011-06-18",
    mobile: "9829100002",
    aadhaar: "XXXX-XXXX-9821",
    feeTotal: 28000,
    feePaid: 20000,
    feeStatus: "Partial",
    attendancePercentage: 92.0,
    rank: 2,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 103,
    srNo: "SR-2024-003",
    rollNo: 3,
    name: "Rohit Meena",
    fatherName: "Govind Ram Meena",
    motherName: "Kamla Meena",
    className: "Class 10th",
    section: "A",
    gender: "Male",
    category: "ST",
    isRTE: true,
    dob: "2011-08-04",
    mobile: "9829100003",
    aadhaar: "XXXX-XXXX-1123",
    feeTotal: 0,
    feePaid: 0,
    feeStatus: "RTE (Govt Funded)",
    attendancePercentage: 94.0,
    rank: 3,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 104,
    srNo: "SR-2024-004",
    rollNo: 4,
    name: "Sneha Kumawat",
    fatherName: "Babulal Kumawat",
    motherName: "Pooja Kumawat",
    className: "Class 10th",
    section: "A",
    gender: "Female",
    category: "OBC",
    isRTE: false,
    dob: "2011-02-15",
    mobile: "9829100004",
    aadhaar: "XXXX-XXXX-7744",
    feeTotal: 28000,
    feePaid: 14000,
    feeStatus: "Partial",
    attendancePercentage: 89.5,
    rank: 4,
    photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 105,
    srNo: "SR-2024-005",
    rollNo: 5,
    name: "Manish Bairwa",
    fatherName: "Ramswaroop Bairwa",
    motherName: "Sunita Devi",
    className: "Class 10th",
    section: "A",
    gender: "Male",
    category: "SC",
    isRTE: false,
    dob: "2011-11-20",
    mobile: "9829100005",
    aadhaar: "XXXX-XXXX-5561",
    feeTotal: 28000,
    feePaid: 0,
    feeStatus: "Due",
    attendancePercentage: 85.0,
    rank: 5,
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 106,
    srNo: "SR-2024-006",
    rollNo: 6,
    name: "Priya Saini",
    fatherName: "Mukesh Saini",
    motherName: "Geeta Saini",
    className: "Class 8th",
    section: "A",
    gender: "Female",
    category: "OBC",
    isRTE: false,
    dob: "2013-05-10",
    mobile: "9829100006",
    aadhaar: "XXXX-XXXX-8991",
    feeTotal: 22000,
    feePaid: 22000,
    feeStatus: "Paid",
    attendancePercentage: 98.0,
    rank: 1,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 107,
    srNo: "SR-2024-007",
    rollNo: 7,
    name: "Devendra Verma",
    fatherName: "Rakesh Verma",
    motherName: "Pushpa Verma",
    className: "Class 8th",
    section: "A",
    gender: "Male",
    category: "SC",
    isRTE: true,
    dob: "2013-09-25",
    mobile: "9829100007",
    aadhaar: "XXXX-XXXX-3412",
    feeTotal: 0,
    feePaid: 0,
    feeStatus: "RTE (Govt Funded)",
    attendancePercentage: 91.0,
    rank: 2,
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: 108,
    srNo: "SR-2024-008",
    rollNo: 8,
    name: "Komal Yadav",
    fatherName: "Subhash Yadav",
    motherName: "Santosh Yadav",
    className: "Class 5th",
    section: "A",
    gender: "Female",
    category: "OBC",
    isRTE: false,
    dob: "2016-01-14",
    mobile: "9829100008",
    aadhaar: "XXXX-XXXX-6622",
    feeTotal: 18000,
    feePaid: 18000,
    feeStatus: "Paid",
    attendancePercentage: 95.0,
    rank: 1,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80"
  }
];

export const mockExamStats = {
  totalStudents: 518,
  classesCount: 13,
  incompleteMarks: 24,
  nsoStudents: 12,
  lowAttendance: 18,
  topper: {
    name: "Divyanshi Sharma",
    class: "Class 10th - Sec A",
    rollNo: 1,
    marks: "588 / 600",
    percentage: "98.0%",
    rank: 1,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  }
};

export const mockStaff = [
  { id: 1, name: "Sunita Pareek", role: "Vice Principal & PGT English", mobile: "98290 88711", email: "sunita.p@deeptischool.edu.in", classAssigned: "Class 10th", experience: "12 Yrs", status: "Active" },
  { id: 2, name: "Rajendra Vyas", role: "TGT Mathematics", mobile: "98290 88712", email: "rajendra.v@deeptischool.edu.in", classAssigned: "Class 9th", experience: "9 Yrs", status: "Active" },
  { id: 3, name: "Harish Kumawat", role: "TGT Science", mobile: "98290 88713", email: "harish.k@deeptischool.edu.in", classAssigned: "Class 8th", experience: "8 Yrs", status: "Active" },
  { id: 4, name: "Deepak Saini", role: "TGT Social Studies", mobile: "98290 88714", email: "deepak.s@deeptischool.edu.in", classAssigned: "Class 7th", experience: "6 Yrs", status: "Active" },
  { id: 5, name: "Ramesh Meena", role: "PRT Primary Coordinator", mobile: "98290 88715", email: "ramesh.m@deeptischool.edu.in", classAssigned: "Class 1st", experience: "10 Yrs", status: "Active" },
  { id: 6, name: "Sunita Sharma", role: "NTT Pre-Primary In-Charge", mobile: "98290 88716", email: "sunita.s@deeptischool.edu.in", classAssigned: "Nursery", experience: "7 Yrs", status: "Active" }
];

export const mockVehicles = [
  { id: "BUS-01", route: "Route 1: Vaishali Nagar - Khatipura - School", driver: "Ram Lal Gurjar", phone: "98293 44551", studentsCount: 42, capacity: 50, status: "On Route" },
  { id: "BUS-02", route: "Route 2: Mansarovar - Gopalpura - School", driver: "Mohan Singh", phone: "98293 44552", studentsCount: 46, capacity: 50, status: "On Route" },
  { id: "VAN-01", route: "Route 3: Raja Park - C-Scheme - School", driver: "Mukesh Kumar", phone: "98293 44553", studentsCount: 16, capacity: 18, status: "Stationed" }
];
