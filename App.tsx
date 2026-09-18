import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './components/common/Toast';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedRoute } from './layouts/ProtectedRoute';

// Public Pages
import { Login } from './pages/Login';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { StudentManagement } from './pages/admin/StudentManagement';
import { FormerStudents } from './pages/admin/FormerStudents';
import { RoomManagement } from './pages/admin/RoomManagement';
import { AllocationManagement } from './pages/admin/AllocationManagement';
import { FeeManagement } from './pages/admin/FeeManagement';
import { ComplaintManagement } from './pages/admin/ComplaintManagement';
import { NoticeManagement } from './pages/admin/NoticeManagement';
import { VisitorManagement } from './pages/admin/VisitorManagement';
import { AdminProfile } from './pages/admin/AdminProfile';
import { SettingsPage } from './pages/admin/SettingsPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { StudentRoom } from './pages/student/StudentRoom';
import { StudentFees } from './pages/student/StudentFees';
import { StudentComplaints } from './pages/student/StudentComplaints';
import { StudentNotices } from './pages/student/StudentNotices';
import { StudentProfile } from './pages/student/StudentProfile';

// Root redirect handler
const RootRedirect: React.FC = () => {
  const { currentUser, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner label="Initializing Hostel Management System..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/student/dashboard'} replace />;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <ToastProvider>
            <Routes>
              {/* Root */}
              <Route path="/" element={<RootRedirect />} />

              {/* Login & Auth */}
              <Route path="/login" element={<Login />} />

              {/* Admin Portal Protected Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRole="admin">
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="rooms" element={<RoomManagement />} />
                <Route path="allocations" element={<AllocationManagement />} />
                <Route path="fees" element={<FeeManagement />} />
                <Route path="complaints" element={<ComplaintManagement />} />
                <Route path="notices" element={<NoticeManagement />} />
                <Route path="visitors" element={<VisitorManagement />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Student Portal Protected Routes */}
              <Route
                path="/student"
                element={
                  <ProtectedRoute allowedRole="student">
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/student/dashboard" replace />} />
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="room" element={<StudentRoom />} />
                <Route path="fees" element={<StudentFees />} />
                <Route path="complaints" element={<StudentComplaints />} />
                <Route path="notices" element={<StudentNotices />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
