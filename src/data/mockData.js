export const SAMPLE_STUDENT_CSV = `Name,Age,Marks,Department
Aman,20,85,CSE
Riya,21,92,AIML
Rahul,20,78,CSE
Priya,22,88,AIML
Neha,21,95,CSE`;

export const SAMPLE_DIRTY_CSV = `Name,Age,Marks,Department
Aman,20,85,CSE
Riya,21,92,AIML
Rahul,20,78,CSE
Priya,22,,AIML
Neha,21,95,CSE
Aman,20,85,CSE`;

export const CERTIFICATES_DATABASE = [
  {
    id: "SPA-2026-001",
    student: "Demo Student",
    course: "Python for Data Analysis",
    issueDate: "15 September 2026",
    issuedBy: "Smart Python Analysis Academy",
    status: "VALID",
    grade: "Grade A+ (Distinction)",
    skills: ["NumPy", "Pandas", "Tabular Analysis", "EDA", "Statistical Profiling"]
  },
  {
    id: "SPA-2026-002",
    student: "Aman Sharma",
    course: "Data Visualization & Analytics",
    issueDate: "20 September 2026",
    issuedBy: "Smart Python Analysis Academy",
    status: "VALID",
    grade: "Grade A",
    skills: ["Bar Charts", "Trend Lines", "Proportional Distribution", "Storytelling"]
  },
  {
    id: "SPA-2026-003",
    student: "Riya Patel",
    course: "Practical Machine Learning",
    issueDate: "28 September 2026",
    issuedBy: "Smart Python Analysis Academy",
    status: "VALID",
    grade: "Grade A+ (Distinction)",
    skills: ["Linear Regression", "Gradient Descent", "Classification", "Model Metrics"]
  },
  {
    id: "SPA-2026-004",
    student: "Neha Verma",
    course: "Data Cleaning & Preprocessing Studio",
    issueDate: "05 October 2026",
    issuedBy: "Smart Python Analysis Academy",
    status: "VALID",
    grade: "Grade A",
    skills: ["Missing Value Imputation", "Deduplication", "Type Casting", "Quality Profiling"]
  }
];

export const DEFAULT_USERS = [
  {
    id: "usr-001",
    name: "Demo Student",
    email: "student@smartpythonanalysis.com",
    password: "Password123!",
    role: "Active Learner",
    enrolledTrack: "Python Data Analysis & Machine Learning"
  },
  {
    id: "usr-002",
    name: "Aman Sharma",
    email: "aman@smartpythonanalysis.com",
    password: "Password123!",
    role: "Data Analyst",
    enrolledTrack: "Data Visualization Studio"
  }
];
