import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/features/Login";
import Register from "./components/features/Register";
import ForgetPassword from "./components/features/ForgetPassword";
import NavbarAdmin from "./components/layouts/NavbarAdmin";
import HomePage from "./pages/public/HomePage";
import Profile from "./pages/public/Profile";
import ProfileChangePassword from "./pages/public/ProfileChangePassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* Page User */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/profile/changePassword"
          element={<ProfileChangePassword />}
        />
        {/* Page Admin */}
        <Route path="/navbar" element={<NavbarAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
