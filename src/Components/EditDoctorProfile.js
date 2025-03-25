import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";
import "./EditDoctorProfile.css";
import NavBars from "../Sections/navbar";

function EditDoctorProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [doctorData, setDoctorData] = useState({
    name: "",
    photo: null,
    gender: "",
    dob: "",
    email: "",
    phone: "",
    address: "",
    languages: [],
    specialty: "",
    subSpecialties: [],
    yearsOfExperience: 0,
    education: [],
    licenseNumber: "",
    hospitalAffiliation: "",
    clinicName: "",
    consultationFee: "",
    insuranceAccepted: [],
    officeHours: {},
    emergencyContact: "",
    publications: [],
    awards: []
  });

  const [newLanguage, setNewLanguage] = useState("");
  const [newSubSpecialty, setNewSubSpecialty] = useState("");
  const [newInsurance, setNewInsurance] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    const savedProfile = localStorage.getItem('doctorProfile');
    if (savedProfile) {
      setDoctorData(JSON.parse(savedProfile));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value
    });
  };

  const handleArrayChange = (field, value, index) => {
    const updatedArray = [...doctorData[field]];
    updatedArray[index] = value;
    setDoctorData({
      ...doctorData,
      [field]: updatedArray
    });
  };

  const handleAddItem = (field, value, setValue) => {
    if (value.trim() === "") return;
    setDoctorData({
      ...doctorData,
      [field]: [...doctorData[field], value.trim()]
    });
    setValue("");
  };

  const handleRemoveItem = (field, index) => {
    const updatedArray = doctorData[field].filter((_, i) => i !== index);
    setDoctorData({
      ...doctorData,
      [field]: updatedArray
    });
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...doctorData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setDoctorData({
      ...doctorData,
      education: updatedEducation
    });
  };

  const handleAddEducation = () => {
    setDoctorData({
      ...doctorData,
      education: [...doctorData.education, { degree: "", institution: "", year: "" }]
    });
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = doctorData.education.filter((_, i) => i !== index);
    setDoctorData({
      ...doctorData,
      education: updatedEducation
    });
  };

  const handleOfficeHoursChange = (day, value) => {
    setDoctorData({
      ...doctorData,
      officeHours: {
        ...doctorData.officeHours,
        [day]: value
      }
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setDoctorData({
          ...doctorData,
          photo: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('doctorProfile', JSON.stringify(doctorData));
    navigate('/doctor-profile', {
      state: {
        updatedProfile: doctorData,
        successMessage: "Profile updated successfully!"
      }
    });
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <NavBars />
      
      <div className="edit-doctor-profile-container">
        <div className="edit-profile-header">
          <h1>Edit Profile</h1>
          <p>Update your professional information</p>
        </div>

        <form onSubmit={handleSubmit} className="edit-profile-form">
          <div className="form-section personal-info">
            <h2>Personal Information</h2>
            <div className="form-grid">
              <div className="form-group photo-upload">
                <label>Profile Photo</label>
                <div className="photo-preview">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" />
                  ) : doctorData.photo ? (
                    <img src={doctorData.photo} alt="Current Profile" />
                  ) : (
                    <div className="photo-placeholder">
                      <i className="material-icons">person</i>
                    </div>
                  )}
                  <label className="upload-btn">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <i className="material-icons">edit</i> Change Photo
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={doctorData.name}
                  onChange={handleChange}
                  placeholder="Dr. Full Name"
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={doctorData.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={doctorData.dob}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={doctorData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={doctorData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 890"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={doctorData.address}
                  onChange={handleChange}
                  placeholder="123 Medical Center Dr"
                />
              </div>

              <div className="form-group">
                <label>Languages Spoken</label>
                <div className="array-input">
                  <div className="tags-container">
                    {doctorData.languages.map((lang, index) => (
                      <span key={index} className="tag">
                        {lang}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('languages', index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="add-item">
                    <input
                      type="text"
                      value={newLanguage}
                      onChange={(e) => setNewLanguage(e.target.value)}
                      placeholder="Add language"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('languages', newLanguage, setNewLanguage)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section professional-info">
            <h2>Professional Information</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Specialty</label>
                <input
                  type="text"
                  name="specialty"
                  value={doctorData.specialty}
                  onChange={handleChange}
                  placeholder="Cardiology"
                />
              </div>

              <div className="form-group">
                <label>Sub-Specialties</label>
                <div className="array-input">
                  <div className="tags-container">
                    {doctorData.subSpecialties.map((spec, index) => (
                      <span key={index} className="tag">
                        {spec}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('subSpecialties', index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="add-item">
                    <input
                      type="text"
                      value={newSubSpecialty}
                      onChange={(e) => setNewSubSpecialty(e.target.value)}
                      placeholder="Add sub-specialty"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('subSpecialties', newSubSpecialty, setNewSubSpecialty)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Years of Experience</label>
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={doctorData.yearsOfExperience}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="form-group">
                <label>License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={doctorData.licenseNumber}
                  onChange={handleChange}
                  placeholder="MED1234567"
                />
              </div>

              <div className="form-group">
                <label>Hospital Affiliation</label>
                <input
                  type="text"
                  name="hospitalAffiliation"
                  value={doctorData.hospitalAffiliation}
                  onChange={handleChange}
                  placeholder="New York General Hospital"
                />
              </div>

              <div className="form-group">
                <label>Clinic Name</label>
                <input
                  type="text"
                  name="clinicName"
                  value={doctorData.clinicName}
                  onChange={handleChange}
                  placeholder="Manhattan Heart Center"
                />
              </div>

              <div className="form-group">
                <label>Consultation Fee</label>
                <input
                  type="text"
                  name="consultationFee"
                  value={doctorData.consultationFee}
                  onChange={handleChange}
                  placeholder="$200"
                />
              </div>

              <div className="form-group">
                <label>Emergency Contact</label>
                <input
                  type="text"
                  name="emergencyContact"
                  value={doctorData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Hospital Switchboard: (212) 555-6789"
                />
              </div>

              <div className="form-group">
                <label>Insurance Accepted</label>
                <div className="array-input">
                  <div className="tags-container">
                    {doctorData.insuranceAccepted.map((insurance, index) => (
                      <span key={index} className="tag">
                        {insurance}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem('insuranceAccepted', index)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="add-item">
                    <input
                      type="text"
                      value={newInsurance}
                      onChange={(e) => setNewInsurance(e.target.value)}
                      placeholder="Add insurance"
                    />
                    <button
                      type="button"
                      onClick={() => handleAddItem('insuranceAccepted', newInsurance, setNewInsurance)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section education-info">
            <h2>Education & Certifications</h2>
            {doctorData.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="form-group">
                  <label>Degree</label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                    placeholder="MD"
                  />
                </div>
                <div className="form-group">
                  <label>Institution</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder="Harvard Medical School"
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="text"
                    value={edu.year}
                    onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                    placeholder="2005"
                  />
                </div>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveEducation(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-education-btn"
              onClick={handleAddEducation}
            >
              <i className="material-icons">add</i> Add Education
            </button>
          </div>

          <div className="form-section office-hours">
            <h2>Office Hours</h2>
            <div className="hours-grid">
              {Object.entries(doctorData.officeHours).map(([day, hours]) => (
                <div key={day} className="hours-item">
                  <label>{day.charAt(0).toUpperCase() + day.slice(1)}</label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => handleOfficeHoursChange(day, e.target.value)}
                    placeholder="9:00 AM - 5:00 PM"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/doctor-profile')}
            >
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditDoctorProfile;