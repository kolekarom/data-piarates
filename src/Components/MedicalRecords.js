import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicalRecords.css';

function MedicalRecords() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Simulate fetching records from an API
    const mockRecords = [
      {
        id: 1,
        type: 'Prescription',
        date: '2023-06-15',
        doctor: 'Dr. Sarah Smith',
        title: 'Amoxicillin 500mg',
        description: 'Take twice daily for 7 days for sinus infection',
        fileUrl: '#',
        category: 'medication'
      },
      {
        id: 2,
        type: 'Lab Result',
        date: '2023-05-20',
        doctor: 'Dr. Michael Johnson',
        title: 'Blood Test Results',
        description: 'Complete blood count with normal ranges',
        fileUrl: '#',
        category: 'test'
      },
      {
        id: 3,
        type: 'Consultation',
        date: '2023-04-10',
        doctor: 'Dr. Emily Wilson',
        title: 'Annual Checkup',
        description: 'Routine physical examination with normal findings',
        fileUrl: '#',
        category: 'consultation'
      },
      {
        id: 4,
        type: 'Imaging',
        date: '2023-03-05',
        doctor: 'Dr. Robert Brown',
        title: 'X-Ray Results',
        description: 'Right wrist fracture follow-up showing good healing',
        fileUrl: '#',
        category: 'imaging'
      },
      {
        id: 5,
        type: 'Prescription',
        date: '2023-02-18',
        doctor: 'Dr. Sarah Smith',
        title: 'Ibuprofen 400mg',
        description: 'Take as needed for pain, not to exceed 3 times daily',
        fileUrl: '#',
        category: 'medication'
      }
    ];
    setRecords(mockRecords);
    setFilteredRecords(mockRecords);
  }, []);

  useEffect(() => {
    let results = records;
    
    // Filter by tab
    if (activeTab !== 'all') {
      results = results.filter(record => 
        activeTab === 'medication' ? record.category === 'medication' :
        activeTab === 'test' ? record.category === 'test' :
        activeTab === 'consultation' ? record.category === 'consultation' :
        record.category === 'imaging'
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      results = results.filter(record =>
        record.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredRecords(results);
  }, [activeTab, searchTerm, records]);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'medication': return 'medication';
      case 'test': return 'science';
      case 'consultation': return 'stethoscope';
      case 'imaging': return 'photo_camera';
      default: return 'description';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'medication': return '#4CAF50';
      case 'test': return '#2196F3';
      case 'consultation': return '#FF9800';
      case 'imaging': return '#9C27B0';
      default: return '#607D8B';
    }
  };

  return (
    <div className="medical-records-container">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      
      <div className="records-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <h1>Medical Records</h1>
        <p>View and manage your complete medical history</p>
      </div>

      <div className="records-controls">
        <div className="search-bar">
          <i className="material-icons">search</i>
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            <i className="material-icons">all_inbox</i> All Records
          </button>
          <button
            className={`tab-btn ${activeTab === 'medication' ? 'active' : ''}`}
            onClick={() => setActiveTab('medication')}
          >
            <i className="material-icons">medication</i> Medications
          </button>
          <button
            className={`tab-btn ${activeTab === 'test' ? 'active' : ''}`}
            onClick={() => setActiveTab('test')}
          >
            <i className="material-icons">science</i> Test Results
          </button>
          <button
            className={`tab-btn ${activeTab === 'consultation' ? 'active' : ''}`}
            onClick={() => setActiveTab('consultation')}
          >
            <i className="material-icons">stethoscope</i> Consultations
          </button>
          <button
            className={`tab-btn ${activeTab === 'imaging' ? 'active' : ''}`}
            onClick={() => setActiveTab('imaging')}
          >
            <i className="material-icons">photo_camera</i> Imaging
          </button>
        </div>
      </div>

      <div className="records-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#4CAF50' }}>
            <i className="material-icons">medication</i>
          </div>
          <div className="stat-info">
            <h3>Medications</h3>
            <p>{records.filter(r => r.category === 'medication').length} records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#2196F3' }}>
            <i className="material-icons">science</i>
          </div>
          <div className="stat-info">
            <h3>Test Results</h3>
            <p>{records.filter(r => r.category === 'test').length} records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#FF9800' }}>
            <i className="material-icons">stethoscope</i>
          </div>
          <div className="stat-info">
            <h3>Consultations</h3>
            <p>{records.filter(r => r.category === 'consultation').length} records</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ backgroundColor: '#9C27B0' }}>
            <i className="material-icons">photo_camera</i>
          </div>
          <div className="stat-info">
            <h3>Imaging</h3>
            <p>{records.filter(r => r.category === 'imaging').length} records</p>
          </div>
        </div>
      </div>

      <div className="records-list">
        {filteredRecords.length > 0 ? (
          filteredRecords.map(record => (
            <div key={record.id} className="record-card">
              <div 
                className="record-icon"
                style={{ backgroundColor: getCategoryColor(record.category) }}
              >
                <i className="material-icons">{getCategoryIcon(record.category)}</i>
              </div>
              <div className="record-details">
                <div className="record-header">
                  <h3>{record.title}</h3>
                  <span className="record-type">{record.type}</span>
                </div>
                <div className="record-meta">
                  <span><i className="material-icons">person</i> {record.doctor}</span>
                  <span><i className="material-icons">event</i> {record.date}</span>
                </div>
                <p className="record-description">{record.description}</p>
                <div className="record-actions">
                  <button className="view-btn">
                    <i className="material-icons">visibility</i> View Details
                  </button>
                  <button className="download-btn">
                    <i className="material-icons">download</i> Download
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-records">
            <i className="material-icons">find_in_page</i>
            <h3>No records found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      <div className="upload-section">
        <h2><i className="material-icons">upload</i> Upload Medical Records</h2>
        <div className="upload-box">
          <i className="material-icons">cloud_upload</i>
          <p>Drag and drop files here or click to browse</p>
          <button className="upload-btn">
            <i className="material-icons">attach_file</i> Select Files
          </button>
        </div>
        <p className="upload-note">Supported formats: PDF, JPG, PNG (Max 10MB each)</p>
      </div>
    </div>
  );
}

export default MedicalRecords;