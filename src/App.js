import "./index.css";
import Home from "./Components/home";
import About from "./Components/about";
import OurTeam from "./Components/ourteam";
import Booking from "./Components/booking";
import NotFound from "./Components/notfound";
import MedicalHistory from './Components/MedicalHistory';
import Login from "./Components/login";
import Service from "./Components/service";
import PatientProfile from "./Components/PatientProfile";
import BookAppointment from './Components/BookAppointment';
import Report from "./Components/Report";
import AppointmentConfirmation from "./Components/AppointmentConfirmation";
import { Routes, Route } from "react-router-dom";
import Team from "./Sections/Team";
import EditProfile from "./Components/EditProfile";
import RequestPrescription from "./Components/RequestPrescription";
import MedicalRecords from "./Components/MedicalRecords";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/team" element={<Team />} />
      <Route path="/ourteam" element={<OurTeam />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/login" element={<Login />} />
      <Route path="/service" element={<Service />} />
      <Route path="/Report" element={<Report />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/patient-profile" element={<PatientProfile />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
      <Route path="/request-prescription" element={<RequestPrescription />} />
      <Route path="/medical-records" element={<MedicalRecords/>}/>
      <Route path="/medical-history" element={<MedicalHistory />} />
    </Routes>
  );
}

export default App;
