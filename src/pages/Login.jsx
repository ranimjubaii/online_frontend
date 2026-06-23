import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaGraduationCap } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const result = await login(formData);
    if (result.success) {
      if (result.user && result.user.user_type === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else {
      setError(result.message || "Invalid credentials profile verification.");
    }
    setLoading(false);
  };

  return (
    <section className="py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div className="card w-100 shadow-lg border-0 bg-white rounded-4 overflow-hidden" style={{ maxWidth: "460px" }}>
        
        <div 
          className="p-4 text-center text-white position-relative" 
          style={{ background: "linear-gradient(135deg, #3b0b11 0%, #58111A 100%)" }}
        >
          <div className="fs-1 mb-2"><FaGraduationCap /></div>
          <h3 className="fw-extrabold mb-1 tracking-tight">Portal Authorization</h3>
          <p className="text-white text-opacity-75 small mb-0">Enter your credentials to continue</p>
        </div>

        <div className="card-body p-4 p-md-5">
          {error && (
            <div className="alert alert-danger border-0 small shadow-sm text-center mb-4 rounded-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-extrabold text-secondary text-uppercase tracking-wider">
                Email Address
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaEnvelope size={14} />
                </span>
                <input
                  type="email"
                  name="email"
                  className="form-control bg-light border-start-0 py-2.5 ps-1 shadow-none"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-extrabold text-secondary text-uppercase tracking-wider">
                Secure Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0 text-muted">
                  <FaLock size={14} />
                </span>
                <input
                  type="password"
                  name="password"
                  className="form-control bg-light border-start-0 py-2.5 ps-1 shadow-none"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn text-white w-100 fw-bold py-2.5 rounded-3 shadow mt-2 transition-all border-0 d-flex align-items-center justify-content-center gap-2"
              style={{ backgroundColor: "#58111A" }}
              disabled={loading}
            >
              {loading ? "Verifying Session..." : "Secure Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}