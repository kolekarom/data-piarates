import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBars from "../Sections/navbar";
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  
  // Load initial data from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('patientProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1 234 567 890',
      address: '123 Main St, New York',
      bloodType: 'O+',
      gender: 'Male',
      dob: '1990-01-01',
      photo: null,
      age: 32,
      lastAppointment: '2023-05-15',
      nextAppointment: '2023-06-20',
      doctor: 'Dr. Sarah Smith',
      lastDiagnosis: 'Common Cold',
      lastPrescription: 'Antibiotics'
    };
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate age from DOB
    const dob = new Date(profile.dob);
    const ageDiff = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiff);
    const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    const updatedProfile = {
      ...profile,
      age: calculatedAge
    };
    
    // Save to localStorage and navigate
    localStorage.setItem('patientProfile', JSON.stringify(updatedProfile));
    navigate('/patient-profile', { state: { updatedProfile } });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <NavBars />
      
      <div className="edit-profile-container">
        <div className="edit-profile-header">
          <h1><i className="material-icons">edit</i> Edit Profile</h1>
          <button className="back-button" onClick={() => navigate('/patient-profile')}>
            <i className="material-icons">arrow_back</i> Back to Profile
          </button>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="profile-picture-section">
            <div className="profile-picture-placeholder">
              {profile.photo ? (
                <img src={profile.photo} alt="Profile" className="profile-photo" />
              ) : (
                <i className="material-icons">account_circle</i>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <button 
              type="button" 
              className="upload-photo-btn"
              onClick={() => fileInputRef.current.click()}
            >
              <i className="material-icons">photo_camera</i> 
              {profile.photo ? 'Change Photo' : 'Upload Photo'}
            </button>
          </div>

          {/* Personal Information Section */}
          <div className="form-section">
            <h2><i className="material-icons">person</i> Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gender</label>
                <select 
                  name="gender" 
                  value={profile.gender}
                  onChange={handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Blood Type</label>
                <select 
                  name="bloodType" 
                  value={profile.bloodType}
                  onChange={handleChange}
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h2><i className="material-icons">contact_mail</i> Contact Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={profile.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              <i className="material-icons">save</i> Save Changes
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/patient-profile')}
            >
              <i className="material-icons">cancel</i> Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditProfile;