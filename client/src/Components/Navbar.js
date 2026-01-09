import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("user");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!isLogin) return null;

  // Navbar

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top main-navbar">
        <div className="container-fluid">
          {/* Brand */}
          <span className="navbar-brand">Advait Teleservices</span>

          {/* Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <NavLink className="nav-link" to="/data">
                  See Data
                </NavLink>
              </li>   

              <li className="nav-item">
                <NavLink className="nav-link" to="/data">
                  Add User
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/bulk-upload">
                  Bulk Upload
                </NavLink>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger btn-sm logout-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="page-content" />
    </>
  );
}

export default App;
