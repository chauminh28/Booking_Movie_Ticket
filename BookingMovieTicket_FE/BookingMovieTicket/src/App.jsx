import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/features/Login";
import Register from "./components/features/Register";
import ForgetPassword from "./components/features/ForgetPassword";
import RoomManger from "./components/features/RoomManager/RoomManger";
import HomePage from "./pages/public/HomePage";
import NavbarAdmin from "./components/layouts/NavbarAdmin";
import AddRoom from "./components/features/RoomManager/AddRoom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/roomManager" element={<RoomManger />} />
        <Route path="/navbar" element={<NavbarAdmin />} />
        <Route path="/addRoom" element={<AddRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
