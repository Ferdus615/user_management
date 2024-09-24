import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect the root ("/") to the login page */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        {/* Register route */}
        <Route path="/register" element={<Register />} />
        
        {/* Login route */}
        <Route path="/login" element={<Login />} />
        
        {/* Admin panel route with protection */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
