import React, { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Collapse } from "bootstrap";

function App() {
  const navigate = useNavigate();
  const collapseRef = useRef(null);

  const isLogin = localStorage.getItem("user");
  const user = isLogin ? JSON.parse(isLogin) : null;

  const handleLogout = () => {
    localStorage.clear();
    closeNavbar();
    navigate("/login", { replace: true });
  };

  // 🔹 Close navbar programmatically
  const closeNavbar = () => {
    if (collapseRef.current) {
      const bsCollapse =
        Collapse.getInstance(collapseRef.current) ||
        new Collapse(collapseRef.current, { toggle: false });

      bsCollapse.hide();
    }
  };

  // 🔹 Close navbar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        collapseRef.current &&
        !collapseRef.current.contains(event.target) &&
        !event.target.closest(".navbar-toggler")
      ) {
        closeNavbar();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isLogin) return navigate("/login");

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
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            ref={collapseRef}
          >
            <ul className="navbar-nav ms-auto align-items-lg-center">
              {user?.isSuperAdmin && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/data"
                      onClick={closeNavbar}
                    >
                      See Data
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/users"
                      onClick={closeNavbar}
                    >
                      Add User
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      to="/bulk-upload"
                      onClick={closeNavbar}
                    >
                      Bulk Upload
                    </NavLink>
                  </li>
                </>
              )}

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
