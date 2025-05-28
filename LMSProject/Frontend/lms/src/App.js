import logo from './logo.svg';
import './App.css';
import Login from "./Pages/Login"
import CustomerDetails from './Pages/CustomerDetails';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import ProtectedRoute from './Services/ProtectedRoute';
import Profile from './Pages/Profile';
import UserDashboard from './Pages/UserDashboard';
import AdminDashboard from './Pages/AdminDashboard';
import ApplyForLoan from './Pages/ApplyForLoan';
import AdminLoanDataEdit from './Pages/AdminLoanDataEdit';
import { CustomerItemsPurchased } from './Pages/CustomerItemsPurchased';
import { CustomerLoanCards } from './Pages/CustomerLoanCards';
import AdminAddItem from './Pages/AdminAddItem';
import CustomerDataManagement from './Pages/CustomerDataManagement';
import AdminItemMaster from './Pages/AdminItemMaster';
import AdminLoanDataInsert from './Pages/AdminLoanDataInsert';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<CustomerDetails />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/UserDashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
            <Route path="/AdminDashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            <Route path="/ViewLoan" element={<ProtectedRoute><CustomerLoanCards /></ProtectedRoute>} />
            <Route path="/ApplyLoan" element={<ApplyForLoan />} />
            <Route path="/ViewItem" element={<ProtectedRoute><CustomerItemsPurchased /></ProtectedRoute>} />
            <Route path="/AdminAddItem" element={<ProtectedRoute><AdminAddItem /></ProtectedRoute>} />
            <Route path="/CustomerDataManagement" element={<ProtectedRoute><CustomerDataManagement /></ProtectedRoute>} />
            <Route path="/AdminLoanDataEdit" element={<ProtectedRoute><AdminLoanDataEdit /></ProtectedRoute>} />
            <Route path="/AdminLoanDataInsert" element={<ProtectedRoute><AdminLoanDataInsert /></ProtectedRoute>} />
            <Route path="/AdminItemsMaster" element={<ProtectedRoute><AdminItemMaster /></ProtectedRoute>} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
