import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookAppointment.css';

// Add this in your index.html or import the Material Icons CSS
// <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

function BookAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    doctor: '',
    reason: '',
    patientName: '',
    phone: ''
  });

  const [errors, setErrors] = useState({});

  const doctors = [
    { id: 1, name: "Dr. Sarah Smith", specialty: "Cardiology", rating: 4.9 },
    { id: 2, name: "Dr. Michael Johnson", specialty: "Neurology", rating: 4.8 },
    { id: 3, name: "Dr. Emily Wilson", specialty: "Pediatrics", rating: 4.7 },
    { id: 4, name: "Dr. Robert Brown", specialty: "Dermatology", rating: 4.9 }
  ];

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", 
    "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step >= 1 && !formData.doctor) {
      newErrors.doctor = 'Please select a doctor';
    }
    
    if (step >= 2 && !formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (step >= 2 && !formData.time) {
      newErrors.time = 'Please select a time';
    }
    
    if (step >= 3 && !formData.patientName) {
      newErrors.patientName = 'Please enter your name';
    }
    
    if (step >= 3 && !formData.phone) {
      newErrors.phone = 'Please enter your phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when field is changed
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData(prev => ({ ...prev, doctor: doctor.name }));
    if (validateStep(1)) {
      setCurrentStep(2);
    }
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
    if (validateStep(2)) {
      setCurrentStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Appointment booked:', formData);
      
      // Format date for display
      const formattedDate = new Date(formData.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      navigate('/appointment-confirmation', { 
        state: { 
          appointment: {
            ...formData,
            date: formattedDate
          }, 
          doctor: selectedDoctor 
        } 
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      {/* Progress Steps */}
      <div className="progress-steps">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
          <div className="step-number">1</div>
          <div className="step-label">Choose Doctor</div>
        </div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
          <div className="step-number">2</div>
          <div className="step-label">Select Time</div>
        </div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
          <div className="step-number">3</div>
          <div className="step-label">Confirm</div>
        </div>
      </div>

      <div className="booking-content">
        {/* Left Side - CSS Illustration */}
        <div className="booking-illustration">
          <div className="css-doctor-illustration">
            <div className="doctor-head"></div>
            <div className="doctor-body"></div>
            <div className="doctor-stethoscope"></div>
          </div>
          <div className="illustration-text">
            <h3>Quality Healthcare</h3>
            <p>Book with top specialists in our network</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="booking-form-container">
          {currentStep === 1 && (
            <div className="doctor-selection">
              <h2>Select Your Doctor</h2>
              <p className="subtitle">Choose from our expert physicians</p>
              {errors.doctor && <div className="error-message">{errors.doctor}</div>}
              
              <div className="doctor-cards">
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className={`doctor-card ${selectedDoctor?.id === doctor.id ? 'selected' : ''}`}
                    onClick={() => handleDoctorSelect(doctor)}
                  >
                    <div className="doctor-avatar">
                      {doctor.name.charAt(0)}
                    </div>
                    <div className="doctor-info">
                      <h3>{doctor.name}</h3>
                      <p className="specialty">{doctor.specialty}</p>
                      <div className="rating">
                        <span className="stars">★★★★★</span>
                        <span>{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="time-selection">
              <div className="section-header">
                <button 
                  className="back-button"
                  onClick={() => setCurrentStep(1)}
                  type="button"
                >
                  <i className="material-icons">arrow_back</i>
                </button>
                <h2>Select Time Slot</h2>
              </div>
              <p className="subtitle">Available times for {selectedDoctor?.name}</p>
              
              <div className="date-picker">
                <label>
                  <i className="material-icons">calendar_today</i> Appointment Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="form-input"
                  required
                />
                {errors.date && <div className="error-message">{errors.date}</div>}
              </div>

              <div className="time-slots-grid">
                {timeSlots.map((time, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`time-slot ${formData.time === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
                {errors.time && <div className="error-message">{errors.time}</div>}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="confirmation-form">
              <div className="section-header">
                <button 
                  className="back-button"
                  onClick={() => setCurrentStep(2)}
                  type="button"
                >
                  <i className="material-icons">arrow_back</i>
                </button>
                <h2>Confirm Details</h2>
              </div>

              <div className="appointment-summary">
                <div className="summary-item">
                  <span>Doctor:</span>
                  <strong>{formData.doctor || 'Not selected'}</strong>
                </div>
                <div className="summary-item">
                  <span>Date:</span>
                  <strong>{formData.date || 'Not selected'}</strong>
                </div>
                <div className="summary-item">
                  <span>Time:</span>
                  <strong>{formData.time || 'Not selected'}</strong>
                </div>
              </div>

              <div className="form-group">
                <label>
                  <i className="material-icons">person</i> Full Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Your full name"
                  required
                  className="form-input"
                />
                {errors.patientName && <div className="error-message">{errors.patientName}</div>}
              </div>

              <div className="form-group">
                <label>
                  <i className="material-icons">phone</i> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Contact number"
                  required
                  className="form-input"
                />
                {errors.phone && <div className="error-message">{errors.phone}</div>}
              </div>

              <div className="form-group">
                <label>
                  <i className="material-icons">note</i> Reason for Visit
                </label>
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Briefly describe your symptoms or reason for visit"
                  rows="3"
                  className="form-input"
                />
              </div>

              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <i className="material-icons spin">refresh</i> Booking...
                  </>
                ) : (
                  <>
                    <i className="material-icons">book_online</i> Confirm Appointment
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookAppointment;