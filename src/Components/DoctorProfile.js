import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";
import "./DoctorProfile.css";
import NavBars from "../Sections/navbar";

function DoctorProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorData, setDoctorData] = useState({
    // Personal Information
    name: "Dr. Sarah Smith",
    photo: null,
    gender: "Female",
    dob: "1980-05-15",
    email: "sarah.smith@example.com",
    phone: "+1 987 654 321",
    address: "456 Medical Center Dr, New York",
    languages: ["English", "Spanish"],
    
    // Professional Information
    specialty: "Cardiology",
    subSpecialties: ["Interventional Cardiology", "Heart Failure"],
    yearsOfExperience: 12,
    education: [
      { degree: "MD", institution: "Harvard Medical School", year: 2005 },
      { degree: "PhD in Cardiovascular Research", institution: "Johns Hopkins University", year: 2010 }
    ],
    licenseNumber: "MED1234567",
    boardCertifications: ["American Board of Internal Medicine", "American Board of Cardiology"],
    hospitalAffiliation: "New York General Hospital",
    clinicName: "Manhattan Heart Center",
    
    // Practice Details
    consultationFee: "$200",
    insuranceAccepted: ["Aetna", "Blue Cross", "Medicare"],
    officeHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "10:00 AM - 3:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 2:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    emergencyContact: "Hospital Switchboard: (212) 555-6789",
    
    // Professional Activity
    publications: [
      { title: "Advances in Coronary Stent Technology", journal: "New England Journal of Medicine", year: 2020 },
      { title: "Managing Heart Failure in Elderly Patients", journal: "Journal of Cardiology", year: 2018 }
    ],
    awards: [
      "Top Doctor Award - New York Magazine (2022)",
      "Excellence in Patient Care - AMA (2019)"
    ],
    professionalMemberships: [
      "American Medical Association",
      "American College of Cardiology",
      "Heart Rhythm Society"
    ],
    
    // Practice Statistics
    patientsTreated: 4200,
    averageRating: 4.9,
    reviewsCount: 128,
    upcomingAppointments: 8
  });

  useEffect(() => {
    // Check for updated data from navigation state
    if (location.state?.updatedProfile) {
      setDoctorData(location.state.updatedProfile);
      localStorage.setItem('doctorProfile', JSON.stringify(location.state.updatedProfile));
    }
    // Check for data passed from login
    else if (location.state?.doctor) {
      setDoctorData(location.state.doctor);
      localStorage.setItem('doctorProfile', JSON.stringify(location.state.doctor));
    }
    // Fallback to localStorage
    else {
      const savedProfile = localStorage.getItem('doctorProfile');
      if (savedProfile) {
        setDoctorData(JSON.parse(savedProfile));
      }
    }
  }, [location.state]);

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <NavBars />
      
      <div className="doctor-profile-container">
        {/* Success message */}
        {location.state?.successMessage && (
          <div className="success-message">
            <i className="material-icons">check_circle</i>
            {location.state.successMessage}
          </div>
        )}

        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-image-container">
            {doctorData.photo ? (
              <img src={doctorData.photo} alt="Profile" className="profile-photo" />
            ) : (
              <div className="profile-image-circle">
                <span className="profile-initial">{doctorData.name.charAt(0)}</span>
              </div>
            )}
            <div className="rating-badge">
              <i className="material-icons">star</i> {doctorData.averageRating} ({doctorData.reviewsCount} reviews)
            </div>
            <button
              className="edit-profile-btn"
              onClick={() => navigate('/edit-doctor-profile')}
            >
              <i className="material-icons">edit</i> Edit Profile
            </button>
          </div>
          
          <div className="profile-info">
            <h1>{doctorData.name}</h1>
            <h2 className="specialty">{doctorData.specialty}</h2>
            {doctorData.subSpecialties && (
              <h3 className="sub-specialties">
                {doctorData.subSpecialties.join(" • ")}
              </h3>
            )}
            
            <div className="quick-stats">
              <div className="stat-item">
                <i className="material-icons">work</i>
                <span>{doctorData.yearsOfExperience}+ years</span>
              </div>
              <div className="stat-item">
                <i className="material-icons">group</i>
                <span>{doctorData.patientsTreated.toLocaleString()}+ patients</span>
              </div>
              <div className="stat-item">
                <i className="material-icons">monetization_on</i>
                <span>{doctorData.consultationFee} consultation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="doctor-profile-content">
          {/* Left Column */}
          <div className="left-column">
            {/* Contact Information Card */}
            <div className="profile-card contact-info">
              <div className="card-header">
                <i className="material-icons">contact_mail</i>
                <h3>Contact Information</h3>
              </div>
              <div className="card-body">
                <p><i className="material-icons">email</i> {doctorData.email}</p>
                <p><i className="material-icons">phone</i> {doctorData.phone}</p>
                <p><i className="material-icons">home</i> {doctorData.address}</p>
                <p><i className="material-icons">language</i> Languages: {doctorData.languages.join(", ")}</p>
                <p><i className="material-icons">warning</i> Emergency: {doctorData.emergencyContact}</p>
              </div>
            </div>

            {/* Education & Certification Card */}
            <div className="profile-card education-card">
              <div className="card-header">
                <i className="material-icons">school</i>
                <h3>Education & Certifications</h3>
              </div>
              <div className="card-body">
                <h4>Education</h4>
                {doctorData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <p><strong>{edu.degree}</strong> - {edu.institution} ({edu.year})</p>
                  </div>
                ))}
                
                <h4>Board Certifications</h4>
                <ul className="certifications-list">
                  {doctorData.boardCertifications.map((cert, index) => (
                    <li key={index}>
                      <i className="material-icons">verified</i> {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Professional Memberships */}
            <div className="profile-card memberships">
              <div className="card-header">
                <i className="material-icons">groups</i>
                <h3>Professional Memberships</h3>
              </div>
              <div className="card-body">
                <ul className="memberships-list">
                  {doctorData.professionalMemberships.map((org, index) => (
                    <li key={index}>
                      <i className="material-icons">account_balance</i> {org}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            {/* Practice Information */}
            <div className="profile-card practice-info">
              <div className="card-header">
                <i className="material-icons">medical_services</i>
                <h3>Practice Information</h3>
              </div>
              <div className="card-body">
                <h4>Hospital Affiliation</h4>
                <p><i className="material-icons">local_hospital</i> {doctorData.hospitalAffiliation}</p>
                
                <h4>Clinic</h4>
                <p><i className="material-icons">business</i> {doctorData.clinicName}</p>
                
                <h4>Insurance Accepted</h4>
                <div className="insurance-badges">
                  {doctorData.insuranceAccepted.map((insurance, index) => (
                    <span key={index} className="insurance-badge">
                      <i className="material-icons">verified_user</i> {insurance}
                    </span>
                  ))}
                </div>
                
                <h4>Office Hours</h4>
                <div className="office-hours">
                  {Object.entries(doctorData.officeHours).map(([day, hours]) => (
                    <div key={day} className="hours-row">
                      <span className="day">
                        <i className="material-icons">schedule</i> 
                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                      </span>
                      <span className="hours">{hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Schedule & Appointments */}
            <div className="profile-card schedule">
              <div className="card-header">
                <i className="material-icons">calendar_today</i>
                <h3>Today's Schedule</h3>
                <span className="appointment-count">{doctorData.upcomingAppointments} appointments</span>
              </div>
              <div className="card-body">
                <div className="appointment-list">
                  <div className="appointment-item">
                    <span className="time">9:00 AM</span>
                    <div className="patient-info">
                      <span className="name">John Doe</span>
                      <span className="purpose">Follow-up • Hypertension</span>
                    </div>
                    <button className="action-btn">
                      <i className="material-icons">visibility</i>
                    </button>
                  </div>
                  <div className="appointment-item">
                    <span className="time">10:30 AM</span>
                    <div className="patient-info">
                      <span className="name">Jane Smith</span>
                      <span className="purpose">New Patient • Chest Pain</span>
                    </div>
                    <button className="action-btn">
                      <i className="material-icons">visibility</i>
                    </button>
                  </div>
                  <div className="appointment-item">
                    <span className="time">1:00 PM</span>
                    <div className="patient-info">
                      <span className="name">Robert Johnson</span>
                      <span className="purpose">Post-Op Checkup</span>
                    </div>
                    <button className="action-btn">
                      <i className="material-icons">visibility</i>
                    </button>
                  </div>
                </div>
                <button className="view-all-btn">
                  View Full Schedule <i className="material-icons">chevron_right</i>
                </button>
              </div>
            </div>

            {/* Professional Achievements */}
            <div className="profile-card achievements">
              <div className="card-header">
                <i className="material-icons">military_tech</i>
                <h3>Awards & Publications</h3>
              </div>
              <div className="card-body">
                <h4>Awards</h4>
                <ul className="awards-list">
                  {doctorData.awards.map((award, index) => (
                    <li key={index}>
                      <i className="material-icons">emoji_events</i> {award}
                    </li>
                  ))}
                </ul>
                
                <h4>Recent Publications</h4>
                <div className="publications-list">
                  {doctorData.publications.map((pub, index) => (
                    <div key={index} className="publication-item">
                      <p className="publication-title">
                        <i className="material-icons">article</i> <strong>{pub.title}</strong>
                      </p>
                      <p className="publication-details">
                        {pub.journal}, {pub.year}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Footer */}
        <div className="quick-actions-footer">
          <button className="action-btn primary" onClick={() => navigate('/manage-schedule')}>
            <i className="material-icons">calendar_today</i>
            Manage Schedule
          </button>
          <button className="action-btn" onClick={() => navigate('/patient-records')}>
            <i className="material-icons">folder_shared</i>
            Patient Records
          </button>
          <button className="action-btn" onClick={() => navigate('/telemedicine')}>
            <i className="material-icons">videocam</i>
            Start Telemedicine
          </button>
          <button className="action-btn" onClick={() => navigate('/write-prescription')}>
            <i className="material-icons">note_add</i>
            Write Prescription
          </button>
          <button className="action-btn" onClick={() => navigate('/research-portal')}>
            <i className="material-icons">library_books</i>
            Research Portal
          </button>
        </div>
      </div>
    </>
  );
}

export default DoctorProfile;