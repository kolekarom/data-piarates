import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalHistory.css';
import NavBars from '../Sections/navbar';
import { jsPDF } from 'jspdf';

function MedicalHistory() {
  const navigate = useNavigate();
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Enhanced mock data with more prescription details
    const mockHistory = [
      {
        id: 1,
        date: '2023-06-15',
        type: 'Prescription',
        doctor: 'Dr. Sarah Smith',
        specialty: 'Cardiology',
        diagnosis: 'Sinus Infection',
        treatment: 'Amoxicillin 500mg',
        dosage: 'Take one tablet every 8 hours for 7 days',
        instructions: 'Take with food. Complete full course even if symptoms improve.',
        notes: 'Patient reported fever and sore throat. Allergies: Penicillin',
        status: 'completed',
        medications: [
          {
            name: 'Amoxicillin',
            strength: '500mg',
            form: 'Capsule',
            quantity: '21 capsules',
            refills: '0'
          }
        ]
      },
      {
        id: 2,
        date: '2023-05-20',
        type: 'Lab Test',
        doctor: 'Dr. Michael Johnson',
        diagnosis: 'Blood Test Results',
        treatment: 'No medication needed',
        notes: 'Complete blood count within normal ranges.',
        status: 'completed'
      },
      {
        id: 3,
        date: '2023-04-10',
        type: 'Prescription',
        doctor: 'Dr. Emily Wilson',
        specialty: 'Pediatrics',
        diagnosis: 'Allergic Rhinitis',
        treatment: 'Cetirizine 10mg',
        dosage: 'Take one tablet daily at bedtime',
        instructions: 'May cause drowsiness. Avoid alcohol.',
        notes: 'For seasonal allergies. Follow up in 3 months if symptoms persist.',
        status: 'active',
        medications: [
          {
            name: 'Cetirizine',
            strength: '10mg',
            form: 'Tablet',
            quantity: '30 tablets',
            refills: '2'
          }
        ]
      },
      {
        id: 4,
        date: '2023-03-05',
        type: 'Prescription',
        doctor: 'Dr. Robert Brown',
        specialty: 'Orthopedics',
        diagnosis: 'Knee Pain',
        treatment: 'Ibuprofen 400mg',
        dosage: 'Take one tablet every 6 hours as needed',
        instructions: 'Do not exceed 4 tablets in 24 hours. Take with food.',
        notes: 'For pain management after knee injury.',
        status: 'expired',
        medications: [
          {
            name: 'Ibuprofen',
            strength: '400mg',
            form: 'Tablet',
            quantity: '60 tablets',
            refills: '0'
          }
        ]
      }
    ];
    setMedicalHistory(mockHistory);
  }, []);

  const filteredHistory = medicalHistory.filter(record => {
    const matchesFilter = activeFilter === 'all' || 
      (activeFilter === 'prescription' ? record.type === 'Prescription' : 
       record.type.toLowerCase() === activeFilter.toLowerCase());
    const matchesSearch = searchTerm === '' || 
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.notes.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'consultation': return 'stethoscope';
      case 'lab test': return 'science';
      case 'imaging': return 'photo_camera';
      case 'prescription': return 'medication';
      default: return 'medical_services';
    }
  };

  const getTypeColor = (type) => {
    switch(type.toLowerCase()) {
      case 'consultation': return '#FF9800';
      case 'lab test': return '#2196F3';
      case 'imaging': return '#9C27B0';
      case 'prescription': return '#4CAF50';
      default: return '#607D8B';
    }
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'active': return '#4CAF50';
      case 'completed': return '#2196F3';
      case 'expired': return '#F44336';
      default: return '#9E9E9E';
    }
  };

  const downloadPrescription = (prescription) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(18);
    doc.setTextColor(33, 150, 243);
    doc.text('PRESCRIPTION', 105, 20, { align: 'center' });
    
    // Clinic Info
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('Healthcare Clinic', 105, 30, { align: 'center' });
    doc.text('123 Medical Drive, City, State 12345', 105, 36, { align: 'center' });
    doc.text('Phone: (123) 456-7890 | License: MD123456', 105, 42, { align: 'center' });
    
    // Divider
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 48, 190, 48);
    
    // Patient Info
    doc.setFontSize(14);
    doc.text('Patient Information:', 20, 58);
    doc.setFontSize(12);
    doc.text(`Name: John Doe`, 20, 66);
    doc.text(`DOB: 1990-01-01 | Age: 33`, 20, 74);
    
    // Prescription Info
    doc.setFontSize(14);
    doc.text('Prescription Details:', 20, 88);
    doc.setFontSize(12);
    doc.text(`Date: ${prescription.date}`, 20, 96);
    doc.text(`Prescribing Physician: ${prescription.doctor} (${prescription.specialty})`, 20, 104);
    doc.text(`Diagnosis: ${prescription.diagnosis}`, 20, 112);
    
    // Medications
    doc.setFontSize(14);
    doc.text('Medications:', 20, 126);
    prescription.medications.forEach((med, index) => {
      const yPos = 134 + (index * 30);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`${med.name} ${med.strength} (${med.form})`, 20, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(`Dosage: ${prescription.dosage}`, 20, yPos + 8);
      doc.text(`Quantity: ${med.quantity} | Refills: ${med.refills}`, 20, yPos + 16);
      doc.text(`Instructions: ${prescription.instructions}`, 20, yPos + 24);
    });
    
    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('This is a computer-generated prescription. No signature required.', 105, 280, { align: 'center' });
    
    // Save the PDF
    doc.save(`Prescription-${prescription.date}-${prescription.doctor.replace(' ', '-')}.pdf`);
  };

  return (
    <div className="medical-history-container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      
      <NavBars />
      
      <div className="history-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <h1>Medical History</h1>
        <p>Your complete medical records and history</p>
      </div>

      <div className="history-controls">
        <div className="search-bar">
          <i className="material-icons">search</i>
          <input
            type="text"
            placeholder="Search medical history..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            <i className="material-icons">all_inbox</i> All
          </button>
          <button
            className={`filter-btn ${activeFilter === 'consultation' ? 'active' : ''}`}
            onClick={() => setActiveFilter('consultation')}
          >
            <i className="material-icons">stethoscope</i> Consultations
          </button>
          <button
            className={`filter-btn ${activeFilter === 'lab test' ? 'active' : ''}`}
            onClick={() => setActiveFilter('lab test')}
          >
            <i className="material-icons">science</i> Lab Tests
          </button>
          <button
            className={`filter-btn ${activeFilter === 'imaging' ? 'active' : ''}`}
            onClick={() => setActiveFilter('imaging')}
          >
            <i className="material-icons">photo_camera</i> Imaging
          </button>
          <button
            className={`filter-btn ${activeFilter === 'prescription' ? 'active' : ''}`}
            onClick={() => setActiveFilter('prescription')}
          >
            <i className="material-icons">medication</i> Prescriptions
          </button>
        </div>
      </div>

      <div className="timeline-container">
        {filteredHistory.length > 0 ? (
          filteredHistory.map((record) => (
            <div key={record.id} className="timeline-item">
              <div className="timeline-date">
                <div className="date-badge">
                  <span className="day">{new Date(record.date).getDate()}</span>
                  <span className="month">{new Date(record.date).toLocaleString('default', { month: 'short' })}</span>
                  <span className="year">{new Date(record.date).getFullYear()}</span>
                </div>
              </div>
              
              <div className="timeline-content">
                <div className="timeline-icon" style={{ backgroundColor: getTypeColor(record.type) }}>
                  <i className="material-icons">{getTypeIcon(record.type)}</i>
                </div>
                
                <div className="timeline-card">
                  <div className="card-header">
                    <h3>{record.type}</h3>
                    <div className="header-right">
                      <span className="doctor-name">
                        <i className="material-icons">person</i> {record.doctor}
                        {record.specialty && ` (${record.specialty})`}
                      </span>
                      {record.type === 'Prescription' && (
                        <button 
                          className="download-btn"
                          onClick={() => downloadPrescription(record)}
                        >
                          <i className="material-icons">download</i> Download
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <div className="diagnosis">
                      <h4><i className="material-icons">healing</i> Diagnosis</h4>
                      <p>{record.diagnosis}</p>
                    </div>
                    
                    {record.treatment && record.treatment !== 'None' && (
                      <div className="treatment">
                        <h4><i className="material-icons">medication</i> Treatment</h4>
                        <p>{record.treatment}</p>
                        {record.type === 'Prescription' && record.medications && (
                          <div className="medication-details">
                            <h5>Medication Details:</h5>
                            <ul>
                              {record.medications.map((med, idx) => (
                                <li key={idx}>
                                  <strong>{med.name} {med.strength}</strong> ({med.form})<br />
                                  Quantity: {med.quantity} | Refills: {med.refills}
                                </li>
                              ))}
                            </ul>
                            {record.dosage && <p><strong>Dosage:</strong> {record.dosage}</p>}
                            {record.instructions && <p><strong>Instructions:</strong> {record.instructions}</p>}
                          </div>
                        )}
                      </div>
                    )}
                    
                    {record.notes && (
                      <div className="notes">
                        <h4><i className="material-icons">notes</i> Notes</h4>
                        <p>{record.notes}</p>
                      </div>
                    )}
                    
                    {record.type === 'Prescription' && (
                      <div className="prescription-status">
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(record.status) }}
                        >
                          {record.status}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-records">
            <i className="material-icons">find_in_page</i>
            <h3>No medical records found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalHistory;