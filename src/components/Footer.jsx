import React from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-white border-top pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4 mb-3">
            <h4 className="fw-extrabold mb-3" style={{ color: '#58111A' }}>EduPlatform</h4>
            <p className="text-secondary small lh-relaxed" style={{ maxWidth: '300px' }}>
              Professional online learning platform providing industry-grade technical training modules and streamlined material distribution.
            </p>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3 text-dark position-relative d-inline-block pb-1">
              Quick Navigation
              <span className="position-absolute bottom-0 start-0 rounded-pill" style={{ width: '25px', height: '3px', backgroundColor: '#58111A' }}></span>
            </h5>
            <ul className="list-unstyled d-flex flex-column gap-2 small">
              <li>
                <a href="/" className="text-decoration-none text-secondary hover-wine-nav">
                  Home Base
                </a>
              </li>
              <li>
                <a href="#about-section" className="text-decoration-none text-secondary hover-wine-nav">
                  About Our Matrix
                </a>
              </li>
              <li>
                <a href="#courses-section" className="text-decoration-none text-secondary hover-wine-nav">
                  Active Modules Catalog
                </a>
              </li>
              <li>
                <a href="/login" className="text-decoration-none text-secondary hover-wine-nav">
                  Portal Authorization
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-3">
            <h5 className="fw-bold mb-3 text-dark position-relative d-inline-block pb-1">
              Connect With Us
              <span className="position-absolute bottom-0 start-0 rounded-pill" style={{ width: '25px', height: '3px', backgroundColor: '#58111A' }}></span>
            </h5>
            <p className="text-secondary small mb-3">Have questions? Reach out instantly via our verified lines.</p>
            <div className="d-flex gap-3 fs-4">
              <a href="#" className="text-secondary footer-social-icon facebook-hover" aria-label="Facebook Link">
                <FaFacebook />
              </a>
              <a href="#" className="text-secondary footer-social-icon instagram-hover" aria-label="Instagram Link">
                <FaInstagram />
              </a>
              <a
                href="https://wa.me/96171000000"
                target="_blank"
                rel="noreferrer"
                className="text-secondary footer-social-icon whatsapp-hover"
                aria-label="WhatsApp Dispatch Channel"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 text-muted opacity-25" />

        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between text-muted small">
          <p className="mb-2 mb-sm-0">
            © {new Date().getFullYear()} <strong>EduPlatform</strong>. All rights reserved.
          </p>
          <p className="mb-0 font-monospace" style={{ fontSize: '0.75rem' }}>
            Designed for Secure System Management
          </p>
        </div>
      </div>
    </footer>
  );
}