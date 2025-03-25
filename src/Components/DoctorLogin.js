import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './DoctorLogin.css';

function DoctorLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response data - in a real app this would come from your backend
      const mockDoctorData = {
        id: 'doc123',
        name: 'Dr. Sarah Smith',
        email: formData.email,
        specialty: 'Cardiology',
        photo: null,
        yearsOfExperience: 12,
        hospitalAffiliation: "New York General Hospital",
        education: "MD, Harvard Medical School",
        // Add other doctor profile fields as needed
      };
      
      // Store doctor data (in a real app, you might use context or redux)
      localStorage.setItem('doctorProfile', JSON.stringify(mockDoctorData));
      
      // Navigate to doctor profile with the doctor data
      navigate('/doctor-profile', {
        state: {
          doctor: mockDoctorData,
          loginTime: new Date().toISOString(),
          isNewLogin: true
        }
      });
      
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="doctor-login-container">
      <div className="login-left-panel">
        <div className="doctor-illustration">
          <div className="doctor-head">
            <div className="doctor-face">
              <div className="doctor-eyes">
                <div className="doctor-eye"></div>
                <div className="doctor-eye"></div>
              </div>
              <div className="doctor-mouth"></div>
            </div>
            <div className="doctor-hair"></div>
            <div className="doctor-ears">
              <div className="doctor-ear"></div>
              <div className="doctor-ear"></div>
            </div>
          </div>
          <div className="doctor-body">
            <div className="doctor-coat">
              <div className="doctor-collar"></div>
              <div className="doctor-pocket"></div>
            </div>
            <div className="doctor-arms">
              <div className="doctor-arm"></div>
              <div className="doctor-arm"></div>
            </div>
          </div>
          <div className="doctor-stethoscope"></div>
          <div className="pulse-effect"></div>
        </div>
        <div className="welcome-message">
          <h2>Welcome Back, Doctor</h2>
          <p>Access your medical dashboard and continue providing excellent care</p>
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-icon">❤️</div>
              <span>MediCare Pro</span>
            </div>
            <h2>Doctor Login</h2>
            <p>Sign in to your professional account</p>
          </div>

          {location.state?.successMessage && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              {location.state.successMessage}
            </div>
          )}

          {errors.submit && (
            <div className="error-message">
              <div className="error-icon">!</div>
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label>Email Address</label>
              <div className="input-with-icon">
                <div className="input-icon">✉️</div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="doctor@example.com"
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
              <label>Password</label>
              <div className="input-with-icon">
                <div className="input-icon">🔒</div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <button 
                  type="button" 
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button 
                type="button" 
                className="forgot-password"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </button>
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div> Logging in...
                </>
              ) : (
                <>
                  <div className="login-icon">→</div> Log in
                </>
              )}
            </button>

            <div className="social-login">
              <p>Or sign in with</p>
              <div className="social-icons">
                <button type="button" className="google-btn">
                  G
                </button>
                <button type="button" className="microsoft-btn">
                  M
                </button>
              </div>
            </div>
          </form>

          <div className="signup-link">
            Don't have an account?{' '}
            <button onClick={() => navigate('/doctor-signup')}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorLogin;