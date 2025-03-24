import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestPrescription.css';

function RequestPrescription() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    medication: '',
    dosage: '',
    frequency: '',
    reason: '',
    urgent: false
  });

  const doctors = [
    { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology" },
    { id: 2, name: "Dr. Michael Johnson", specialty: "Neurology" },
    { id: 3, name: "Dr. Emily Wilson", specialty: "Pediatrics" }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Prescription request submitted:', formData);
    alert('Prescription request submitted successfully!');
    navigate('/patient-profile');
  };

  return (
    <div className="prescription-container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      
      <div className="prescription-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <h1>Request Prescription</h1>
        <p>Fill out the form to request a medication prescription</p>
      </div>

      <div className="prescription-form-container">
        <form onSubmit={handleSubmit} className="prescription-form">
          <div className="form-section">
            <h2><i className="material-icons">person</i> Patient Information</h2>
            <div className="form-group">
              <label>
                <i className="material-icons">badge</i> Full Name
              </label>
              <input
                type="text"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="form-section">
            <h2><i className="material-icons">medical_services</i> Prescription Details</h2>
            <div className="form-group">
              <label>
                <i className="material-icons">person_search</i> Requesting Doctor
              </label>
              <select
                name="doctorName"
                value={formData.doctorName}
                onChange={handleChange}
                required
              >
                <option value="">Select a doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} ({doctor.specialty})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>
                  <i className="material-icons">medication</i> Medication Name
                </label>
                <input
                  type="text"
                  name="medication"
                  value={formData.medication}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Amoxicillin"
                />
              </div>

              <div className="form-group">
                <label>
                  <i className="material-icons">exposure</i> Dosage
                </label>
                <input
                  type="text"
                  name="dosage"
                  value={formData.dosage}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 500mg"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <i className="material-icons">schedule</i> Frequency
              </label>
              <input
                type="text"
                name="frequency"
                value={formData.frequency}
                onChange={handleChange}
                required
                placeholder="e.g., Twice daily for 7 days"
              />
            </div>

            <div className="form-group">
              <label>
                <i className="material-icons">note</i> Reason for Medication
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                placeholder="Briefly explain why you need this medication"
                rows="3"
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>
                <i className="material-icons">warning</i> This is an urgent request
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <i className="material-icons">send</i> Submit Request
            </button>
          </div>
        </form>

        <div className="prescription-info-card">
          <div className="info-card-header">
            <i className="material-icons">info</i>
            <h3>Prescription Guidelines</h3>
          </div>
          <ul className="info-list">
            <li>
              <i className="material-icons">check_circle</i>
              Please allow 24-48 hours for processing
            </li>
            <li>
              <i className="material-icons">check_circle</i>
              Urgent requests will be prioritized
            </li>
            <li>
              <i className="material-icons">check_circle</i>
              You'll be notified via email when ready
            </li>
            <li>
              <i className="material-icons">check_circle</i>
              Pick up at your preferred pharmacy
            </li>
          </ul>
          <div className="emergency-note">
            <i className="material-icons">error</i>
            <p>For medical emergencies, please call 911 or visit the nearest hospital</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestPrescription;