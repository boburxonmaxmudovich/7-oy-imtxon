import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import Managers from "./pages/Managers";
import Admins from "./pages/Admins";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";
import Groups from "./pages/Groups";
import Courses from "./pages/Courses";
import Payment from "./pages/Payment";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Exit from "./pages/Exit";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/managers" element={<ProtectedRoute><Layout><Managers /></Layout></ProtectedRoute>} />
      <Route path="/admins" element={<ProtectedRoute><Layout><Admins /></Layout></ProtectedRoute>} />
      <Route path="/teachers" element={<ProtectedRoute><Layout><Teachers /></Layout></ProtectedRoute>} />
      <Route path="/students" element={<ProtectedRoute><Layout><Students /></Layout></ProtectedRoute>} />
      <Route path="/groups" element={<ProtectedRoute><Layout><Groups /></Layout></ProtectedRoute>} />
      <Route path="/courses" element={<ProtectedRoute><Layout><Courses /></Layout></ProtectedRoute>} />
      <Route path="/payment" element={<ProtectedRoute><Layout><Payment /></Layout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/Exit" element={<ProtectedRoute><Layout><Exit /></Layout></ProtectedRoute>} />
    </Routes>
  );
}
export default App;
