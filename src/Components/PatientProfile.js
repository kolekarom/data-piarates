import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";
import "./PatientProfile.css";
import NavBars from "../Sections/navbar";

function PatientProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [patientData, setPatientData] = useState({
    name: "John Doe",
    age: 32,
    gender: "Male",
    bloodType: "O+",
    email: "john@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, New York",
    dob: "1990-01-01",
    lastAppointment: "2023-05-15",
    nextAppointment: "2023-06-20",
    doctor: "Dr. Sarah Smith",
    lastDiagnosis: "Common Cold",
    lastPrescription: "Antibiotics",
    photo: null
  });

  useEffect(() => {
    // Check for updated data from navigation state
    if (location.state?.updatedProfile) {
      setPatientData(location.state.updatedProfile);
    }
    // Load from localStorage if available
    const savedProfile = localStorage.getItem('patientProfile');
    if (savedProfile) {
      setPatientData(JSON.parse(savedProfile));
    }
  }, [location.state]);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <NavBars />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image-container">
            {patientData.photo ? (
              <img
                src={patientData.photo}
                alt="Profile"
                className="profile-photo"
              />
            ) : (
              <div className="profile-image-circle">
                <span className="profile-initial">{patientData.name.charAt(0)}</span>
              </div>
            )}
            <button
              className="edit-profile-btn"
              onClick={() => navigate('/edit-profile')}
            >
              <i className="material-icons">edit</i> Edit Profile
            </button>
          </div>
          <div className="profile-info">
            <h1>{patientData.name}</h1>
            <div className="patient-meta">
              <span><i className="material-icons">person_outline</i> Age: {patientData.age}</span>
              <span><i className="material-icons">wc</i> Gender: {patientData.gender}</span>
              <span><i className="material-icons">bloodtype</i> Blood Type: {patientData.bloodType}</span>
              <span><i className="material-icons">email</i> Email: {patientData.email}</span>
              <span><i className="material-icons">phone</i> Phone: {patientData.phone}</span>
              <span><i className="material-icons">home</i> Address: {patientData.address}</span>
              <span><i className="material-icons">cake</i> DOB: {new Date(patientData.dob).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-card upcoming-appointment">
            <div className="card-header">
              <div className="icon-circle bg-blue">
                <i className="material-icons">event</i>
              </div>
              <h2>Upcoming Appointment</h2>
            </div>
            <div className="card-body">
              <p><i className="material-icons">date_range</i> <strong>Date:</strong> {patientData.nextAppointment}</p>
              <p><i className="material-icons">person</i> <strong>With:</strong> {patientData.doctor}</p>
              <button className="reschedule-btn">
                <i className="material-icons">schedule</i> Reschedule
              </button>
            </div>
          </div>

          <div className="profile-card medical-history">
            <div className="card-header">
              <div className="icon-circle bg-green">
                <i className="material-icons">medical_services</i>
              </div>
              <h2>Medical History</h2>
            </div>
            <div className="card-body">
              <div className="history-item">
                <h3><i className="material-icons">history</i> Last Visit</h3>
                <p><i className="material-icons">event</i> Date: {patientData.lastAppointment}</p>
                <p><i className="material-icons">healing</i> Diagnosis: {patientData.lastDiagnosis}</p>
                <p><i className="material-icons">medication</i> Prescription: {patientData.lastPrescription}</p>
              </div>
              <button
                className="view-all-btn"
                onClick={() => navigate('/medical-history')}
              >
                <i className="material-icons">list_alt</i> View Full History
              </button>
            </div>
          </div>

          <div className="quick-actions">
            <button
              className="action-btn"
              onClick={() => navigate('/book-appointment')}
            >
              <i className="material-icons">event_available</i>
              Book Appointment
            </button>
            <button
              className="action-btn"
              onClick={() => navigate('/request-prescription')}
            >
              <i className="material-icons">receipt_long</i>
              Request Prescription
            </button>
            <button className="action-btn" onClick={() => navigate('/medical-records')}>
              <i className="material-icons">folder_shared</i>
              Medical Records
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PatientProfile; 