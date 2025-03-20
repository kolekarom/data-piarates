import "./index.css";
import Home from "./Components/home";
import About from "./Components/about";
import OurTeam from "./Components/ourteam";
import Booking from "./Components/booking";
import Signup from "./Components/Signup";
import NotFound from "./Components/notfound";
import Login from "./Components/login";
import Service from "./Components/service";
import Report from "./Components/Report";
import { Routes, Route } from "react-router-dom";
import Team from "./Sections/Team";
import PersonalDetails from "./Components/PatientDashboard/PersonalDetails";
import PatientProfile from "./Components/PatientDashboard/PatientProfile";
import PrivateComponent from "./Components/PrivateComponent"; // Ensure the correct import name

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* Private Routes */}
      <Route element={<PrivateComponent />}>
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/ourteam" element={<OurTeam />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/service" element={<Service />} />
        <Route path="/report" element={<Report />} />
      </Route>

      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<PatientProfile/>}/>
      <Route path="/patient_personal_details" element={<PersonalDetails/>}/>

    </Routes>
  );
}

export default App;