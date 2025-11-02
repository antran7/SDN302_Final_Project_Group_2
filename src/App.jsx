import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import { AppProvider } from "./Context/AppContext";
import { Toaster } from "sonner";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import Footer from "./Components/Footer";

import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Vehicles from "./Pages/Vehicles";
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Quotations from "./Pages/Quotations";
import TestDrives from "./Pages/TestDrives";
import Promotions from "./Pages/Promotions";
import Feedback from "./Pages/Feedback";
import Dealers from "./Pages/Dealers";
import Inventory from "./Pages/Inventory";
import Reports from "./Pages/Reports";

import "./Styles/main.css";

const ProtectedLayout = () => {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  if (loading || !isInitialized) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Đang tải...</p>
      </div>
    );
  }

  // Only redirect if we're sure we're initialized and there's no user
  if (isInitialized && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/quotations" element={<Quotations />} />
            <Route path="/test-drives" element={<TestDrives />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/dealers" element={<Dealers />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <AppProvider>
      <Toaster position="top-right" richColors />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<ProtectedLayout />} />
        </Routes>
      </Router>
    </AppProvider>
  </AuthProvider>
);

export default App;
