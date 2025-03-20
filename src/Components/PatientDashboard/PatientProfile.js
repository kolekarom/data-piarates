import React, { useState } from "react";
import "./PatientProfile.css";
import { Link } from "react-router-dom";
const PatientProfile = () => {
  // Separate useState for each part
  const [doctorName, setDoctorName] = useState("");
  const [document, setDocument] = useState(null);

  const [doctorsVisited, setDoctorsVisited] = useState([]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (doctorName && document) {
      setUploadedDocuments([
        ...uploadedDocuments,
        {
          doctorName,
          document: document.name,
        },
      ]);
      setDoctorName("");
      setDocument(null);
    }
  };

  const handleAddDoctor = () => {
    if (doctorName) {
      setDoctorsVisited([...doctorsVisited, doctorName]);
      setDoctorName("");
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    // Add logout logic here (e.g., clear localStorage, redirect to login page)
  };

  return (
    <div className="patient-profile">
      {/* Header with Hospital Logo and Profile Button */}
      <div className="header">
        <div className="hospital-logo"></div>
        <h1>Patient Profile Dashboard</h1>
        <div className="profile-button" onClick={toggleProfileMenu}>
          <div className="profile-icon"></div>
          {showProfileMenu && (
            <div className="profile-menu">
              <ul>
                <li><Link to="/patient_personal_details">Profile</Link></li>
                <li>Settings</li>
                <li>Patient Dashboard</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Motivational Quote Section */}
      <div className="motivational-quote">
        <p>"Your health is an investment, not an expense. Take care of yourself!"</p>
      </div>

      {/* Profile Sections */}
      <div className="profile-container">
        {/* Doctors Visited Section */}
        <div className="doctors-visited">
          <h2>Doctors Visited</h2>
          <div className="add-doctor">
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter doctor's name"
            />
            <button type="button" onClick={handleAddDoctor}>
              Add Doctor
            </button>
          </div>
          <ul>
            {doctorsVisited.map((doctor, index) => (
              <li key={index}>{doctor}</li>
            ))}
          </ul>
        </div>

        {/* Upload Documents Section */}
        <div className="upload-documents">
          <h2>Upload Documents</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Enter doctor's name"
            />
            <input
              type="file"
              onChange={(e) => setDocument(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
          <div className="uploaded-documents">
            <h3>Uploaded Documents</h3>
            <ul>
              {uploadedDocuments.map((doc, index) => (
                <li key={index}>
                  <strong>{doc.doctorName}</strong> - {doc.document}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;