import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./components/features/Login";
import Register from "./components/features/Register";
import ForgetPassword from "./components/features/ForgetPassword";
import NavbarAdmin from "./components/layouts/NavbarAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={< Register />} />
        <Route path="/forgetPassword" element={< ForgetPassword />} />
        <Route path="/navbar" element={< NavbarAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
