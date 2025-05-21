import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/features/Login";
import Register from "./components/features/Register";
import ForgetPassword from "./components/features/ForgetPassword";
import RoomManger from "./pages/RoomManager/RoomManger";
import AddRoom from "./pages/RoomManager/AddRoom";
import EditRoom from "./pages/RoomManager/EditRoom";
import HomePage from "./pages/public/HomePage";
import Profile from "./pages/public/Profile";
import ProfileChangePassword from "./pages/public/ProfileChangePassword";
import MoviePage from "./pages/public/MoviePage";
import MovieDetailPage from "./pages/public/MovieDetailPage"
import MovieSchedulePage from "./pages/public/MovieSchedulePage";
import UserManager from "./pages/UserManager/UserManager";
import EditUser from "./pages/UserManager/EditUser"

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
        <Route path="/schedule" element={<MovieSchedulePage />} />
        <Route
          path="/profile/changePassword"
          element={<ProfileChangePassword />}
        />
        <Route path="/movie" element={<MoviePage />} />
        <Route path="/movie/detail" element={<MovieDetailPage />} />
        {/* Page Admin */}
        <Route path="/roomManager" element={<RoomManger />} />
        <Route path="/roomManager/addRoom" element={<AddRoom />} />
        <Route path="/roomManager/editRoom" element={<EditRoom />} />
        <Route path="/userManager" element={<UserManager />} />
        <Route path="/userManager/editUser" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
