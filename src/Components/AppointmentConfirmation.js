import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AppointmentConfirmation.css';
import { jsPDF } from 'jspdf';

function AppointmentConfirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { appointment, doctor } = state || {};

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add logo or header
    doc.setFontSize(20);
    doc.setTextColor(33, 150, 243); // Blue color
    doc.text('HEALTHCARE CLINIC', 105, 20, { align: 'center' });
    doc.setFontSize(16);
    doc.text('APPOINTMENT CONFIRMATION', 105, 30, { align: 'center' });
    
    // Add divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);
    
    // Add patient information section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Patient Information:', 20, 45);
    
    doc.setFontSize(12);
    doc.text(`Name: ${appointment?.patientName || 'Not specified'}`, 20, 55);
    if (appointment?.phone) {
      doc.text(`Phone: ${appointment.phone}`, 20, 65);
    }
    
    // Add doctor information section
    doc.setFontSize(14);
    doc.text('Doctor Information:', 20, 80);
    
    doc.setFontSize(12);
    doc.text(`Name: ${doctor?.name || 'Not specified'}`, 20, 90);
    doc.text(`Specialty: ${doctor?.specialty || 'Not specified'}`, 20, 100);
    if (doctor?.rating) {
      doc.text(`Rating: ${'★'.repeat(Math.round(doctor.rating))} (${doctor.rating}/5)`, 20, 110);
    }
    
    // Add appointment details section
    doc.setFontSize(14);
    doc.text('Appointment Details:', 20, 125);
    
    doc.setFontSize(12);
    doc.text(`Date: ${appointment?.date || 'Not specified'}`, 20, 135);
    doc.text(`Time: ${appointment?.time || 'Not specified'}`, 20, 145);
    
    // Add appointment relationship statement
    doc.setFontSize(12);
    doc.setTextColor(33, 150, 243);
    const relationshipText = `${appointment?.patientName || 'The patient'} has an appointment with ` +
                           `Dr. ${doctor?.name || 'the doctor'} on ${appointment?.date || 'the scheduled date'}` +
                           ` at ${appointment?.time || 'the scheduled time'}.`;
    const splitRelationship = doc.splitTextToSize(relationshipText, 170);
    doc.text(splitRelationship, 20, 160);
    
    if (appointment?.reason) {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text('Reason for Visit:', 20, 180);
      const splitReason = doc.splitTextToSize(appointment.reason, 170);
      doc.text(splitReason, 20, 190);
    }
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for choosing our clinic!', 105, 280, { align: 'center' });
    doc.text('For any changes, please contact our reception at (123) 456-7890', 105, 285, { align: 'center' });
    
    // Save the PDF with both patient and doctor names in filename
    const fileName = `Appointment_${appointment?.patientName?.replace(' ', '_') || 'Patient'}_` +
                    `with_Dr_${doctor?.name?.replace(' ', '_') || 'Doctor'}_` +
                    `${appointment?.date?.replace(/-/g, '') || ''}.pdf`;
    doc.save(fileName);
  };
  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-header">
          <div className="success-icon-container">
            <i className="material-icons success-icon">check_circle</i>
          </div>
          <h1>Appointment Confirmed!</h1>
          <p className="confirmation-subtext">Your appointment has been successfully scheduled</p>
        </div>

        <div className="confirmation-details">
          <div className="details-section">
            <h2>
              <i className="material-icons">person</i> Doctor Details
            </h2>
            <div className="detail-item">
              <span>Name:</span>
              <strong>{doctor?.name || 'Not specified'}</strong>
            </div>
            <div className="detail-item">
              <span>Specialty:</span>
              <strong>{doctor?.specialty || 'Not specified'}</strong>
            </div>
            {doctor?.rating && (
              <div className="detail-item">
                <span>Rating:</span>
                <div className="rating">
                  <span className="stars">★★★★★</span>
                  <span>{doctor.rating}/5</span>
                </div>
              </div>
            )}
          </div>

          <div className="details-section">
            <h2>
              <i className="material-icons">event</i> Appointment Details
            </h2>
            <div className="detail-item">
              <span>Date:</span>
              <strong>{appointment?.date || 'Not specified'}</strong>
            </div>
            <div className="detail-item">
              <span>Time:</span>
              <strong>{appointment?.time || 'Not specified'}</strong>
            </div>
            {appointment?.reason && (
              <div className="detail-item">
                <span>Reason:</span>
                <strong>{appointment.reason}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="confirmation-actions">
          <button 
            className="print-button"
            onClick={generatePDF}
          >
            <i className="material-icons">print</i> Download PDF
          </button>
          <button 
            className="back-to-profile"
            onClick={() => navigate('/patient-profile')}
          >
            <i className="material-icons">home</i> Back to Profile
          </button>
          <button 
            className="new-appointment"
            onClick={() => navigate('/book-appointment')}
          >
            <i className="material-icons">add</i> Book Another
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentConfirmation;