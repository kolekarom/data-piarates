import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../Assets/Logo.png";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notify = (text) => toast(text);
function NavBars() {
  const navigate = useNavigate(); // Use the useNavigate hook
  const auth = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch({ type: "AUTH_LOGOUT" }); // Dispatch logout action
    localStorage.removeItem("user"); // Clear user data from localStorage
    notify("Logged out"); // Show toast notification
    navigate("/login"); // Redirect to login page
  };
  return (
    <div className="navStick">
      <ToastContainer />
      <Navbar expand="lg">
        <Container fluid>
          <Link to={"/"} className="navbar-brand">
            <img src={Logo} title="logo" alt="img" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to={"/ourteam"} className="nav-link">
                Doctors
              </Link>
              <NavDropdown title="About us" id="basic-nav-dropdown">
                <Link to={"/team"} className="dropdown-item">
                  Creators
                </Link>
                <Link to={"/service"} className="dropdown-item">
                  Services
                </Link>
              </NavDropdown>
              <Link to={"/booking"} className="nav-link">
                Booking
              </Link>
              {auth ? (
                <Link
                  to=""
                  className="nav-link"
                  onClick={handleLogout} // Use the handleLogout function
                >
                  Logout
                </Link>
              ) : (
                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <Link to={"/login"} className="dropdown-item">
                    Patient
                  </Link>
                  <a
                    href="https://hm-system.netlify.app/"
                    className="dropdown-item"
                    target="_blank" // Open in new tab
                    rel="noopener noreferrer" // Security best practice
                  >
                    Staff
                  </a>
                </NavDropdown>
              )}
              <Link to="/Report" className="nav-link">
                <button type="button">
                  Report
                  <span>
                    <IoIosArrowForward />
                  </span>
                </button>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBars;