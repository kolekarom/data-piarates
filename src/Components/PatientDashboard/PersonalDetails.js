import React, { useState, useEffect } from "react";
import "./PersonalDetails.css";
import { useNavigate } from "react-router-dom";

const PersonalDetails = ({ onComplete = () => { } }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emergency_num, setemergency_num] = useState("");
  const [patient, setPatient] = useState(null); // State to store the logged-in user's patient details
  const Navigate = useNavigate();

  // Calculate profile completion percentage
  const calculateProgress = () => {
    const fields = [name, address, pincode, age, bloodGroup, dateOfBirth, emergency_num];
    const filledFields = fields.filter((field) => field.trim() !== "").length;
    return Math.round((filledFields / fields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const progress = calculateProgress();
    onComplete({ name, address, pincode, age, emergency_num, bloodGroup, dateOfBirth, progress });

    // Call SavePersonalDetails
    await SavePersonalDetails();
  };

  const SavePersonalDetails = async () => {
    try {
        const user = JSON.parse(localStorage.getItem('user')); 
        
        if (!user || !user._id) {
            console.error("User not found in localStorage", user);
            alert("Please log in again.");
            return;
        }

        const userId = user._id; 
        console.log("Extracted userId:", userId); // Check if userId exists

        let result = await fetch('http://127.0.0.1:5000/patient_personal_details', {
            method: 'POST',
            body: JSON.stringify({
                name,
                address,
                pincode,
                age,
                emergency_num,
                bloodGroup,
                dateOfBirth,
                userId, // Include userId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        result = await result.json();
        console.log("Response:", result);
        if (result) {
            Navigate('/profile');
        }
    } catch (e) {
        alert("Something went wrong. Please try again.");
        console.error(e);
    }
};



  const seePatientInfo = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user._id) {
        throw new Error("User not found in localStorage");
      }

      const userId = user._id; // Ensure userId exists
      console.log("Fetching patient details for userId:", userId);

      const response = await fetch(`http://127.0.0.1:5000/see_patient_personal_details?userId=${userId}`);
      const result = await response.json();
      console.log("Patient details:", result);

      if (response.ok) {
        setPatient(result);
      } else {
        alert(result.message || "No patient details found");
      }
    } catch (error) {
      console.error("Error fetching patient details:", error);
      alert("Error fetching patient details. Please try again.");
    }
  };


  // Fetch patient details when the component mounts
  useEffect(() => {
    seePatientInfo();
  }, []);

  return (
    <div className="personal-details-container">
      {/* Header with Logo */}
      <div className="header">
        <div className="logo">
          <div className="logo-icon">🏥</div>
          <div className="logo-text">HealthConnect</div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="motivational-quote">
        <div className="quote-text">
          "Your health is your greatest wealth. Take care of it every day!"
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}>
          {calculateProgress()}%
        </div>
      </div>

      {/* Personal Details Form */}
      <form onSubmit={handleSubmit} className="animated-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Pincode:</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter your pincode"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Blood Group:</label>
          <input
            type="text"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            placeholder="Enter your blood group"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label>Alternate Contact No:</label>
          <input
            type="number"
            value={emergency_num}
            onChange={(e) => setemergency_num(e.target.value)}
            placeholder="Enter alternate contact number"
            className="input-field"
          />
        </div>
        <button type="submit" className="animated-button">
          Save Details
        </button>
      </form>

      {/* Button to Fetch Patient Details */}
      <button type="button" className="animated-button" onClick={seePatientInfo}>
        See Your Details
      </button>

      {/* Table to Display Patient Details */}
      {patient && (
        <div className="patient-table-container">
          <h2>Your Patient Details</h2>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Age</th>
                <th>Blood Group</th>
                <th>Date of Birth</th>
                <th>Emergency Contact</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{patient.name}</td>
                <td>{patient.address}</td>
                <td>{patient.pincode}</td>
                <td>{patient.age}</td>
                <td>{patient.bloodGroup}</td>
                <td>{new Date(patient.dateOfBirth).toLocaleDateString()}</td>
                <td>{patient.emergency_num}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;