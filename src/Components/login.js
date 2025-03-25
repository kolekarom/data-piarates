import "./login.css";
import "../index.css";
import logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";
import NavBars from "../Sections/navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [form, setForm] = useState({ patientID: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!form.patientID || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }
    
    // In a real app, you would verify credentials here
    // For now, we'll just navigate to the profile page
    toast.success("Login successful!");
    navigate("/patient-profile");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <ToastContainer />
      <NavBars />
      
      <div className="section-area account-wraper2">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5 col-lg-6 col-md-8">
              <div className="appointment-form form-wraper">
                <div className="logo">
                  <img src={logo} alt="Company Logo" />
                </div>
                
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Patient ID</label>
                    <input
                      name="patientID"
                      value={form.patientID}
                      type="text"
                      className="form-control"
                      placeholder="Enter your patient ID"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      name="password"
                      value={form.password}
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-lg btn-primary w-100"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;