import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  useNavigate
} from "react-router-dom";
import "./App.css";

import {
  SAMPLE_STUDENT_CSV,
  SAMPLE_DIRTY_CSV,
  CERTIFICATES_DATABASE,
  DEFAULT_USERS
} from "./data/mockData";

import {
  detectColumnType,
  computeColumnStats,
  analyzeQuality
} from "./utils/analysisHelpers";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Public Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import VerifyPage from "./pages/VerifyPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Authenticated Pages
import DashboardPage from "./pages/DashboardPage";
import PythonWorkspacePage from "./pages/PythonWorkspacePage";
import DatasetPage from "./pages/DatasetPage";
import CleaningPage from "./pages/CleaningPage";
import VisualizationPage from "./pages/VisualizationPage";
import MachineLearningPage from "./pages/MachineLearningPage";
import InsightsPage from "./pages/InsightsPage";
import ReportsPage from "./pages/ReportsPage";
import CoursesAppPage from "./pages/CoursesAppPage";
import ProgressPage from "./pages/ProgressPage";
import CertificatesPage from "./pages/CertificatesPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";

// ====================================================
// ROUTE GUARDS & LAYOUT WRAPPERS
// ====================================================

function PublicLayout({ currentUser, onLogout }) {
  return (
    <div className="app">
      <Navbar currentUser={currentUser} onLogout={onLogout} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function ProtectedRoute({ currentUser, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function AppLayout({ currentUser, onLogout }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    if (pathname.includes("python")) return "Python Analysis Workspace";
    if (pathname.includes("dataset")) return "Dataset Management & Profiling";
    if (pathname.includes("cleaning")) return "Data Cleaning Studio";
    if (pathname.includes("visualization")) return "Data Visualization Studio";
    if (pathname.includes("ml")) return "Machine Learning Engine";
    if (pathname.includes("insights")) return "Automated Smart Insights";
    if (pathname.includes("reports")) return "Analysis & Audit Reports";
    if (pathname.includes("courses")) return "Enrolled Course Modules";
    if (pathname.includes("progress")) return "Learning Progress & Milestones";
    if (pathname.includes("certificates")) return "Earned Verified Certificates";
    if (pathname.includes("profile")) return "Student Profile";
    if (pathname.includes("settings")) return "Workspace Preferences";
    return "Dashboard Overview";
  };

  return (
    <div className="dashboard">
      <Sidebar onLogout={onLogout} />
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <p>AUTHENTICATED APPLICATION</p>
            <h1>{getPageTitle(location.pathname)}</h1>
          </div>

          <div className="profile-badge">
            <span>{currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "SP"}</span>
            <div>
              <strong>{currentUser.name}</strong>
              <small>● {currentUser.role || "Verified Student"}</small>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

// ====================================================
// MAIN APP COMPONENT
// ====================================================

function App() {
  // --------------------------------------------------
  // 1. AUTHENTICATION & USER STORE STATE
  // --------------------------------------------------
  // Purge any stale legacy boolean lock
  useEffect(() => {
    localStorage.removeItem("spa_loggedIn");
  }, []);

  const [usersDb, setUsersDb] = useState(() => {
    try {
      const saved = localStorage.getItem("spa_users_db");
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_USERS;
  });

  useEffect(() => {
    localStorage.setItem("spa_users_db", JSON.stringify(usersDb));
  }, [usersDb]);

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const token = localStorage.getItem("spa_session_token");
      const user = localStorage.getItem("spa_current_user");
      if (token && user) {
        return JSON.parse(user);
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [authNotice, setAuthNotice] = useState("");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");

  const handleLoginSubmit = (e, navigate) => {
    e.preventDefault();
    setLoginError("");
    const { email, password } = loginForm;

    if (!email.trim() || !password) {
      setLoginError("Please enter both email address and password.");
      return;
    }

    const found = usersDb.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      setLoginError("No account found with this email address. Please register first.");
      return;
    }

    if (found.password !== password) {
      setLoginError("Incorrect password. Please verify your credentials and try again.");
      return;
    }

    // Success
    const token = `spa_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("spa_session_token", token);
    localStorage.setItem("spa_current_user", JSON.stringify(found));
    setCurrentUser(found);
    setAuthNotice("");
    navigate("/app/dashboard");
  };

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [registerError, setRegisterError] = useState("");

  const handleRegisterSubmit = (e, navigate) => {
    e.preventDefault();
    setRegisterError("");
    const { name, email, password, confirmPassword } = registerForm;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setRegisterError("All fields are required.");
      return;
    }

    if (name.trim().length < 2) {
      setRegisterError("Full name must be at least 2 characters long.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setRegisterError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setRegisterError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match. Please re-enter.");
      return;
    }

    const existing = usersDb.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (existing) {
      setRegisterError("An account with this email address already exists. Please login instead.");
      return;
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: "Active Learner",
      enrolledTrack: "Python Data Analysis & Machine Learning"
    };

    const updatedUsers = [...usersDb, newUser];
    setUsersDb(updatedUsers);

    const token = `spa_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem("spa_session_token", token);
    localStorage.setItem("spa_current_user", JSON.stringify(newUser));
    setCurrentUser(newUser);
    setAuthNotice("");
    navigate("/app/dashboard");
  };

  const handleLogout = (navigate) => {
    localStorage.removeItem("spa_session_token");
    localStorage.removeItem("spa_current_user");
    setCurrentUser(null);
    setAuthNotice("You have logged out successfully.");
    if (navigate) navigate("/");
  };

  // --------------------------------------------------
  // 2. CERTIFICATE VERIFICATION ENGINE
  // --------------------------------------------------
  const [certificateInput, setCertificateInput] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);

  const verifyCertificate = (idToCheck) => {
    const target = (idToCheck || certificateInput).trim().toUpperCase();
    if (!target) {
      setVerificationResult(null);
      return;
    }

    const match = CERTIFICATES_DATABASE.find((c) => c.id.toUpperCase() === target);
    if (match) {
      setVerificationResult({
        valid: true,
        data: match
      });
    } else {
      setVerificationResult({
        valid: false,
        searchedId: target,
        message: "Certificate not found or invalid. This certificate identifier does not exist in the official Smart Python Analysis database registry."
      });
    }
  };

  const handleVerifyPreset = (id, navigate) => {
    setCertificateInput(id);
    verifyCertificate(id);
    if (navigate) navigate("/verify");
  };

  const [selectedCourseTab, setSelectedCourseTab] = useState("python");

  // --------------------------------------------------
  // 3. DATA PIPELINE STATE (AUTHENTICATED WORKSPACE)
  // --------------------------------------------------
  const [selectedFile, setSelectedFile] = useState({ name: "sample_data.csv", size: 109 });
  const [previewData, setPreviewData] = useState(() => {
    return SAMPLE_STUDENT_CSV.split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));
  });
  const [rawBackupData, setRawBackupData] = useState(() => {
    return SAMPLE_STUDENT_CSV.split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));
  });

  const [cleaningDone, setCleaningDone] = useState(false);
  const [cleaningMessage, setCleaningMessage] = useState("");
  const [beforeStats, setBeforeStats] = useState(null);

  const [analysisDone, setAnalysisDone] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [pythonCode, setPythonCode] = useState(
`# Smart Python Analysis Script
import pandas as pd
import numpy as np

# 1. Load active dataset
df = pd.read_csv("sample_data.csv")

# 2. Inspect dataset structure
print("Dataset Shape:", df.shape)

# 3. Descriptive statistical summary
print(df.describe())

# 4. Identify performance leaders
top_record = df.loc[df['Marks'].idxmax()]
print(f"Top Performer: {top_record['Name']} ({top_record['Marks']} Marks)")`
  );

  const [chartType, setChartType] = useState("bar");
  const [datasetSearchTerm, setDatasetSearchTerm] = useState("");

  const parseCSVText = (text, fileName = "dataset.csv") => {
    const rows = text
      .split(/\r?\n/)
      .filter((row) => row.trim() !== "")
      .map((row) => row.split(",").map((c) => c.trim()));

    if (rows.length === 0) return;

    setSelectedFile({ name: fileName, size: text.length });
    setPreviewData(rows);
    setRawBackupData(rows);
    setAnalysisDone(false);
    setAnalysisResult(null);
    setCleaningDone(false);
    setCleaningMessage("");
    setBeforeStats(null);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      parseCSVText(text, file.name);
    };
    reader.readAsText(file);
  };

  const loadSampleDataset = () => {
    parseCSVText(SAMPLE_STUDENT_CSV, "sample_data.csv");
  };

  const loadDirtyDataset = () => {
    parseCSVText(SAMPLE_DIRTY_CSV, "sample_with_issues.csv");
  };

  const captureBeforeStats = () => {
    if (!beforeStats && previewData.length > 0) {
      const q = analyzeQuality(previewData[0], previewData.slice(1));
      setBeforeStats({
        rows: previewData.length - 1,
        missing: q.totalMissing,
        duplicates: q.duplicateRowsCount,
        completeness: q.completeness
      });
    }
  };

  const removeDuplicates = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);
    const uniqueRows = rows.filter(
      (row, index, self) =>
        index === self.findIndex((item) => JSON.stringify(item) === JSON.stringify(row))
    );
    const duplicateCount = rows.length - uniqueRows.length;
    setPreviewData([headers, ...uniqueRows]);
    setCleaningDone(true);
    setCleaningMessage(
      duplicateCount === 0
        ? "No duplicate rows found in dataset."
        : `Removed ${duplicateCount} duplicate row(s) successfully.`
    );
    setAnalysisDone(false);
  };

  const removeRowsWithMissing = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);
    const cleanRows = rows.filter((row) =>
      row.every(
        (cell) =>
          cell !== undefined &&
          cell !== null &&
          cell.trim() !== "" &&
          cell !== "N/A" &&
          cell !== "null"
      )
    );
    const droppedCount = rows.length - cleanRows.length;
    setPreviewData([headers, ...cleanRows]);
    setCleaningDone(true);
    setCleaningMessage(
      droppedCount === 0
        ? "No missing cells found. All rows preserved."
        : `Dropped ${droppedCount} row(s) containing missing values.`
    );
    setAnalysisDone(false);
  };

  const fillMissingValues = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a dataset first.");
      return;
    }
    captureBeforeStats();
    const headers = previewData[0];
    const rows = previewData.slice(1);

    const colMeans = headers.map((_, colIdx) => {
      const nums = rows
        .map((r) => Number(r[colIdx]))
        .filter((n) => !isNaN(n) && r[colIdx] !== "" && r[colIdx] !== "N/A");
      if (nums.length === 0) return null;
      return (nums.reduce((a, b) => a + b, 0) / nums.length).toFixed(1);
    });

    let filledCount = 0;
    const cleanedRows = rows.map((row) => {
      return row.map((cell, colIdx) => {
        if (
          cell === undefined ||
          cell === null ||
          cell.trim() === "" ||
          cell === "N/A" ||
          cell === "null"
        ) {
          filledCount++;
          return colMeans[colIdx] !== null ? colMeans[colIdx] : "N/A";
        }
        return cell.trim();
      });
    });

    setPreviewData([headers, ...cleanedRows]);
    setCleaningDone(true);
    setCleaningMessage(
      filledCount === 0
        ? "No missing cells found to fill."
        : `Imputed ${filledCount} missing value(s) with column arithmetic mean.`
    );
    setAnalysisDone(false);
  };

  const resetToOriginal = () => {
    if (rawBackupData.length > 0) {
      setPreviewData(rawBackupData);
      setCleaningDone(false);
      setCleaningMessage("Dataset restored to initial unmodified state.");
      setBeforeStats(null);
      setAnalysisDone(false);
      setAnalysisResult(null);
    }
  };

  const runAnalysis = () => {
    if (previewData.length < 2) {
      alert("Please upload or select a CSV dataset first.");
      return;
    }

    const headers = previewData[0].map((item) => item.trim());
    const rows = previewData.slice(1);

    let marksIndex = headers.findIndex(
      (item) => item.toLowerCase() === "marks" || item.toLowerCase().includes("score")
    );

    if (marksIndex === -1) {
      for (let c = 0; c < headers.length; c++) {
        const isNum = rows.some((r) => !isNaN(Number(r[c])) && r[c] !== "" && r[c] !== "N/A");
        if (isNum && c !== 0) {
          marksIndex = c;
          break;
        }
      }
    }

    if (marksIndex === -1) {
      marksIndex = 2 < headers.length ? 2 : 1;
    }

    const validRows = rows.filter(
      (row) => !isNaN(Number(row[marksIndex])) && row[marksIndex] !== "N/A" && row[marksIndex] !== ""
    );
    const marks = validRows.map((row) => Number(row[marksIndex]));

    if (marks.length === 0) {
      alert("No numeric values found in the target column.");
      return;
    }

    const total = marks.reduce((sum, value) => sum + value, 0);
    const average = total / marks.length;
    const highest = Math.max(...marks);
    const lowest = Math.min(...marks);
    const highestIndex = validRows.findIndex((row) => Number(row[marksIndex]) === highest);
    const topStudent = highestIndex !== -1 ? validRows[highestIndex][0] : "Unknown";
    const targetColumnName = headers[marksIndex] || "Marks";

    const descriptiveStats = {};
    headers.forEach((h, idx) => {
      const stats = computeColumnStats(rows.map((r) => r[idx]));
      if (stats) descriptiveStats[h] = stats;
    });

    setAnalysisResult({
      rows: rows.length,
      columns: headers.length,
      headers: headers,
      marksColumn: targetColumnName,
      marksIndex: marksIndex,
      average: average.toFixed(2),
      highest: highest,
      lowest: lowest,
      topStudent: topStudent,
      descriptiveStats: descriptiveStats,
      chartData: validRows.map((row) => ({
        name: row[0],
        marks: Number(row[marksIndex])
      }))
    });

    setAnalysisDone(true);
  };

  // Helper variables for Dataset metadata
  const datasetHeaders = previewData[0] || [];
  const datasetRows = previewData.slice(1);
  const activeQuality = analyzeQuality(datasetHeaders, datasetRows);

  const columnTypes = datasetHeaders.map((h, idx) => {
    return {
      name: h,
      type: detectColumnType(datasetRows.map((r) => r[idx])),
      missingCount: activeQuality.missingByCol[h] || 0,
      missingPct:
        datasetRows.length > 0
          ? (((activeQuality.missingByCol[h] || 0) / datasetRows.length) * 100).toFixed(1)
          : "0.0",
      stats: computeColumnStats(datasetRows.map((r) => r[idx]))
    };
  });

  const filteredPreviewRows = datasetRows.filter((row) => {
    if (!datasetSearchTerm.trim()) return true;
    return row.some((cell) =>
      String(cell).toLowerCase().includes(datasetSearchTerm.toLowerCase())
    );
  });

  const activeMarksColIndex =
    analysisResult?.marksIndex ??
    (datasetHeaders.findIndex((h) => h.toLowerCase() === "marks") !== -1
      ? datasetHeaders.findIndex((h) => h.toLowerCase() === "marks")
      : 2);

  return (
    <BrowserRouter>
      <AppRoutes
        currentUser={currentUser}
        onLogout={handleLogout}
        selectedCourseTab={selectedCourseTab}
        setSelectedCourseTab={setSelectedCourseTab}
        certificateInput={certificateInput}
        setCertificateInput={setCertificateInput}
        verificationResult={verificationResult}
        verifyCertificate={verifyCertificate}
        handleVerifyPreset={handleVerifyPreset}
        loginForm={loginForm}
        setLoginForm={setLoginForm}
        loginError={loginError}
        authNotice={authNotice}
        handleLoginSubmit={handleLoginSubmit}
        registerForm={registerForm}
        setRegisterForm={setRegisterForm}
        registerError={registerError}
        handleRegisterSubmit={handleRegisterSubmit}
        datasetRows={datasetRows}
        datasetHeaders={datasetHeaders}
        activeQuality={activeQuality}
        selectedFile={selectedFile}
        analysisDone={analysisDone}
        analysisResult={analysisResult}
        pythonCode={pythonCode}
        setPythonCode={setPythonCode}
        runAnalysis={runAnalysis}
        columnTypes={columnTypes}
        filteredPreviewRows={filteredPreviewRows}
        datasetSearchTerm={datasetSearchTerm}
        setDatasetSearchTerm={setDatasetSearchTerm}
        handleFileUpload={handleFileUpload}
        loadSampleDataset={loadSampleDataset}
        loadDirtyDataset={loadDirtyDataset}
        cleaningDone={cleaningDone}
        cleaningMessage={cleaningMessage}
        beforeStats={beforeStats}
        removeDuplicates={removeDuplicates}
        fillMissingValues={fillMissingValues}
        removeRowsWithMissing={removeRowsWithMissing}
        resetToOriginal={resetToOriginal}
        activeMarksColIndex={activeMarksColIndex}
        chartType={chartType}
        setChartType={setChartType}
      />
    </BrowserRouter>
  );
}

// Inner routes component with hook access
function AppRoutes(props) {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* ----------------------------------------------------
          PART 1: PUBLIC WEBSITE (DEFAULT FOR ALL VISITORS)
          ---------------------------------------------------- */}
      <Route
        element={
          <PublicLayout
            currentUser={props.currentUser}
            onLogout={() => props.onLogout(navigate)}
          />
        }
      >
        <Route
          index
          element={
            <HomePage
              currentUser={props.currentUser}
              onSelectCourse={props.setSelectedCourseTab}
            />
          }
        />
        <Route
          path="courses"
          element={
            <CoursesPage
              selectedCourseTab={props.selectedCourseTab}
              setSelectedCourseTab={props.setSelectedCourseTab}
              onVerifyPreset={(id) => props.handleVerifyPreset(id, navigate)}
            />
          }
        />
        <Route path="course-details" element={<Navigate to="/courses" replace />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="verify"
          element={
            <VerifyPage
              certificateInput={props.certificateInput}
              setCertificateInput={props.setCertificateInput}
              verificationResult={props.verificationResult}
              onVerify={props.verifyCertificate}
            />
          }
        />
        <Route path="certificate" element={<Navigate to="/verify" replace />} />
        <Route
          path="login"
          element={
            <LoginPage
              loginForm={props.loginForm}
              setLoginForm={props.setLoginForm}
              loginError={props.loginError}
              authNotice={props.authNotice}
              onSubmit={(e) => props.handleLoginSubmit(e, navigate)}
            />
          }
        />
        <Route
          path="register"
          element={
            <RegisterPage
              registerForm={props.registerForm}
              setRegisterForm={props.setRegisterForm}
              registerError={props.registerError}
              onSubmit={(e) => props.handleRegisterSubmit(e, navigate)}
            />
          }
        />
      </Route>

      {/* ----------------------------------------------------
          PART 2: AUTHENTICATED APPLICATION (PROTECTED)
          ---------------------------------------------------- */}
      <Route
        path="app"
        element={
          <ProtectedRoute currentUser={props.currentUser}>
            <AppLayout
              currentUser={props.currentUser}
              onLogout={() => props.onLogout(navigate)}
            />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/app/dashboard" replace />} />
        <Route
          path="dashboard"
          element={
            <DashboardPage
              datasetRows={props.datasetRows}
              datasetHeaders={props.datasetHeaders}
              activeQuality={props.activeQuality}
              selectedFile={props.selectedFile}
              analysisDone={props.analysisDone}
            />
          }
        />
        <Route
          path="python"
          element={
            <PythonWorkspacePage
              selectedFile={props.selectedFile}
              datasetRows={props.datasetRows}
              datasetHeaders={props.datasetHeaders}
              pythonCode={props.pythonCode}
              setPythonCode={props.setPythonCode}
              analysisDone={props.analysisDone}
              analysisResult={props.analysisResult}
              runAnalysis={props.runAnalysis}
            />
          }
        />
        <Route
          path="dataset"
          element={
            <DatasetPage
              selectedFile={props.selectedFile}
              datasetRows={props.datasetRows}
              datasetHeaders={props.datasetHeaders}
              activeQuality={props.activeQuality}
              columnTypes={props.columnTypes}
              filteredPreviewRows={props.filteredPreviewRows}
              datasetSearchTerm={props.datasetSearchTerm}
              setDatasetSearchTerm={props.setDatasetSearchTerm}
              handleFileUpload={props.handleFileUpload}
              loadSampleDataset={props.loadSampleDataset}
              loadDirtyDataset={props.loadDirtyDataset}
            />
          }
        />
        <Route
          path="cleaning"
          element={
            <CleaningPage
              datasetRows={props.datasetRows}
              activeQuality={props.activeQuality}
              cleaningDone={props.cleaningDone}
              cleaningMessage={props.cleaningMessage}
              beforeStats={props.beforeStats}
              removeDuplicates={props.removeDuplicates}
              fillMissingValues={props.fillMissingValues}
              removeRowsWithMissing={props.removeRowsWithMissing}
              resetToOriginal={props.resetToOriginal}
            />
          }
        />
        <Route
          path="visualization"
          element={
            <VisualizationPage
              datasetRows={props.datasetRows}
              datasetHeaders={props.datasetHeaders}
              activeMarksColIndex={props.activeMarksColIndex}
              chartType={props.chartType}
              setChartType={props.setChartType}
            />
          }
        />
        <Route path="ml" element={<MachineLearningPage />} />
        <Route
          path="insights"
          element={
            <InsightsPage
              analysisResult={props.analysisResult}
              activeQuality={props.activeQuality}
            />
          }
        />
        <Route
          path="reports"
          element={
            <ReportsPage
              selectedFile={props.selectedFile}
              datasetRows={props.datasetRows}
              datasetHeaders={props.datasetHeaders}
              analysisResult={props.analysisResult}
              activeQuality={props.activeQuality}
            />
          }
        />
        <Route path="courses" element={<CoursesAppPage />} />
        <Route path="progress" element={<ProgressPage />} />
        <Route
          path="certificates"
          element={
            <CertificatesPage
              currentUser={props.currentUser}
              onVerifyShortcut={(id) => props.handleVerifyPreset(id, navigate)}
            />
          }
        />
        <Route path="profile" element={<ProfilePage currentUser={props.currentUser} />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* CATCH-ALL REDIRECT TO HOME */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
