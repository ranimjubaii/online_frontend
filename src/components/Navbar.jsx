import React from 'react';
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaBookOpen,
  FaUserShield,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const userRole = (user?.role || user?.user_type || "").toLowerCase();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-extrabold fs-3 d-flex align-items-center gap-2" to="/" style={{ color: '#58111A' }}>
          <FaBookOpen style={{ color: '#58111A' }} />
          <span>EduPlatform</span>
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link fw-bold px-3 text-dark hover-wine-nav" to="/">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <a className="nav-link fw-bold px-3 text-dark hover-wine-nav" href="#about-section">
                    About
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link fw-bold px-3 text-dark hover-wine-nav" href="#courses-section">
                    Courses
                  </a>
                </li>
              </>
            )}
            {user && userRole === "student" && (
              <>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link fw-bold px-3 hover-wine-nav ${isActive ? "text-wine-active" : "text-dark"}`} 
                    to="/dashboard"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link fw-bold px-3 hover-wine-nav ${isActive ? "text-wine-active" : "text-dark"}`} 
                    to="/my-courses"
                  >
                    My Courses
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => `nav-link fw-bold px-3 hover-wine-nav ${isActive ? "text-wine-active" : "text-dark"}`} 
                    to="/"
                  >
                    Browse Catalog
                  </NavLink>
                </li>
              </>
            )}
            {user && userRole === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link fw-bold px-3 text-dark hover-wine-nav d-flex align-items-center gap-1" to="/admin">
                  <FaUserShield style={{ color: '#58111A' }} />
                  <span>Admin Panel</span>
                </NavLink>
              </li>
            )}
            {!user ? (
              <li className="nav-item ms-lg-2">
                <NavLink 
                  className="btn text-white fw-bold px-4 rounded-pill shadow-sm border-0" 
                  to="/login"
                  style={{ backgroundColor: '#58111A', transition: 'all 0.2s ease' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#420c12'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#58111A'}
                >
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                <li className="nav-item text-dark fw-bold d-flex align-items-center px-3 py-2 py-lg-0 rounded bg-light border shadow-none ms-lg-2">
                  <FaUserCircle className="me-2 fs-5" style={{ color: '#58111A' }} />
                  <span style={{ color: '#2d3748' }}>{user.name}</span>
                </li>

                <li className="nav-item ms-lg-1">
                  <button
                    className="btn btn-outline-danger fw-bold px-3 rounded-pill d-flex align-items-center gap-1 shadow-none transition-all"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <style>{`
        .hover-wine-nav:hover {
          color: #58111A !important;
        }
        .text-wine-active {
          color: #58111A !important;
          border-bottom: 2px solid #58111A;
        }
        @media (max-width: 991px) {
          .text-wine-active {
            border-bottom: none;
            padding-left: 0.5rem;
            border-left: 3px solid #58111A;
          }
        }
      `}</style>
    </nav>
  );
}