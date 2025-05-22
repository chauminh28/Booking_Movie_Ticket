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
import MovieDetailPage from "./pages/public/MovieDetailPage";
import MovieManager from "./pages/MovieManager/MovieManager";
import AddMovie from "./pages/MovieManager/AddMovie";
import EditMovie from "./pages/MovieManager/EditMovie";
import DeleteMovie from "./pages/MovieManager/DeleteMovie";
import AddDirector from "./pages/DirectorManager/AddDirector";
import EditDirector from "./pages/DirectorManager/EditDirector";
import AddActor from "./pages/ActorManager/AddActor";
import EditActor from "./pages/ActorManager/EditActor";
import DirectorManager from "./pages/DirectorManager/DirectorManager";
import DeleteDirector from "./pages/DirectorManager/DeleteDirector";
import ActorManager from "./pages/ActorManager/ActorManager";
import DeleteActor from "./pages/ActorManager/DeleteActor";
import MovieSchedulePage from "./pages/public/MovieSchedulePage";
import EditUser from "./pages/UserManager/EditUser";
import AddUser from "./pages/UserManager/AddUser";
import DeleteUser from "./pages/UserManager/DeleteUser";
import ServiceManager from "./pages/ServiceManager/ServiceManager";
import AddService from "./pages/ServiceManager/AddService";
import EditService from "./pages/ServiceManager/EditService";
import DeleteService from "./pages/ServiceManager/DeleteService";
import SeatTypeManager from "./pages/SeatTypeManager/SeatTypeManager";
import AddSeatType from "./pages/SeatTypeManager/AddSeatType";
import EditSeatType from "./pages/SeatTypeManager/EditSeatType";
import DeleteSeatType from "./pages/SeatTypeManager/DeleteSeatType";
import ScheduleManager from "./pages/ScheduleManager/ScheduleManager";
import AddSchedule from "./pages/ScheduleManager/AddSchedule";
import EditSchedule from "./pages/ScheduleManager/EditSchedule";
import DeleteSchedule from "./pages/ScheduleManager/DeleteSchedule";
import UserManager from "./pages/UserManager/UserManager";
import TicketManager from "./pages/TicketManager/TicketManager";
import DetailTicket from "./pages/TicketManager/DetailTicket";

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

        {/* Room Manager */}
        <Route path="/roomManager" element={<RoomManger />} />
        <Route path="/roomManager/addRoom" element={<AddRoom />} />
        <Route path="/roomManager/editRoom" element={<EditRoom />} />

        {/* Movie Manager */}
        <Route path="/movieManager" element={<MovieManager />} />
        <Route path="/movieManager/addMovie" element={<AddMovie />} />
        <Route path="/movieManager/editMovie" element={<EditMovie />} />
        <Route path="/movieManager/deleteMovie" element={<DeleteMovie />} />
        {/* Director Manager */}
        <Route path="/directorManager" element={<DirectorManager />} />
        <Route path="/directorManager/addDirector" element={<AddDirector />} />
        <Route
          path="/directorManager/editDirector"
          element={<EditDirector />}
        />
        <Route
          path="/directorManager/deleteDirector"
          element={<DeleteDirector />}
        />
        {/* Actor Manager */}
        <Route path="/actorManager" element={<ActorManager />} />
        <Route path="/actorManager/addActor" element={<AddActor />} />
        <Route path="/actorManager/editActor" element={<EditActor />} />
        <Route path="/actorManager/deleteActor" element={<DeleteActor />} />

        {/* User Manager */}
        <Route path="/userManager" element={<UserManager />} />
        <Route path="/userManager/editUser" element={<EditUser />} />
        <Route path="/userManager/addUser" element={<AddUser />} />
        <Route path="/userManager/deleteUser" element={<DeleteUser />} />

        {/* Service Manager */}
        <Route path="/serviceManager" element={<ServiceManager />} />
        <Route path="/serviceManager/editService" element={<EditService />} />
        <Route path="/serviceManager/addService" element={<AddService />} />
        <Route
          path="/serviceManager/deleteService"
          element={<DeleteService />}
        />

        {/* SeatType Manager */}
        <Route path="/seatTypeManager" element={<SeatTypeManager />} />
        <Route
          path="/seatTypeManager/editSeatType"
          element={<EditSeatType />}
        />
        <Route path="/seatTypeManager/addSeatType" element={<AddSeatType />} />
        <Route
          path="/seatTypeManager/deleteSeatType"
          element={<DeleteSeatType />}
        />

        {/* Schedule Manager */}
        <Route path="/scheduleManager" element={<ScheduleManager />} />
        <Route path="/scheduleManager/addSchedule" element={<AddSchedule />} />
        <Route
          path="/scheduleManager/editSchedule"
          element={<EditSchedule />}
        />
        <Route
          path="/scheduleManager/deleteSchedule"
          element={<DeleteSchedule />}
        />

        {/* TicketManger */}
        <Route path="/ticketManager" element={<TicketManager />} />
        <Route path="/ticketManager/detail" element={<DetailTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
