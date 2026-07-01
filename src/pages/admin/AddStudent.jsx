import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function AddStudent() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await api.post("/students", formData);
      navigate("/admin/students");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Could not register new student record entries safely.");
    }
  };

  return (
    <div className="bg-light min-vh-100 overflow-x-hidden">
      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div
        className="content-wrapper"
        style={{
          marginLeft: sidebarOpen ? "260px" : "0px",
          transition: "all 0.25s ease-in-out",
          minHeight: "100vh",
        }}
      >
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 px-3 px-md-5 py-3 py-md-4 bg-white border-bottom border-light shadow-2xs">
          <button
            onClick={() => navigate("/admin/students")}
            className="btn btn-light rounded-pill px-3 py-2 small d-flex align-items-center gap-2 border"
          >
            <FaArrowLeft size={12} /> Back to Directory
          </button>
          <span
            className="badge bg-opacity-10 text-uppercase tracking-wider px-3 py-2 rounded-pill fw-bold"
            style={{ backgroundColor: "rgba(114, 47, 55, 0.08)", color: "#722f37", fontSize: "11px" }}
          >
            Identity Administration Engine
          </span>
        </div>

        <div className="px-3 px-md-5 py-4 py-md-5" style={{ maxWidth: "1000px" }}>
          <div className="mb-4 mb-md-5">
            <h1 className="fw-black tracking-tight text-dark mb-1" style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>
              Register New Student
            </h1>
            <p className="text-secondary small fw-medium mb-0">
              Provision baseline credential properties safely into the application security schema layers.
            </p>
          </div>

          {error && <div className="alert alert-danger border-0 rounded-4 p-4 shadow-sm mb-4">{error}</div>}

          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="card-body p-3 p-md-5">
              <form onSubmit={handleAddStudent}>
                <div className="row g-3 g-md-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Full Legal Name</label>
                    <input type="text" name="full_name" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="Enter student's name" value={formData.full_name} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Email Communication Link</label>
                    <input type="email" name="email" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="student@university.edu" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Mobile Vector Contact Phone</label>
                    <input type="text" name="phone" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="Phone data entry" value={formData.phone} onChange={handleChange} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Database Target Username</label>
                    <input type="text" name="username" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="Unique account handle" value={formData.username} onChange={handleChange} required />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Physical Address Registry</label>
                    <input type="text" name="address" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="Street, City, Postal Codes" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Secure Access Token Password</label>
                    <input type="password" name="password" className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark" placeholder="••••••••••••" value={formData.password} onChange={handleChange} required />
                  </div>
                </div>
                <div className="d-flex flex-wrap gap-3 mt-4 mt-md-5">
                  <button type="submit" className="btn btn-dark text-white px-4 px-md-5 py-3 rounded-pill shadow-sm fw-semibold d-flex align-items-center gap-2" style={{ fontSize: "14px" }}>
                    <FaUserPlus size={14} /> Deploy Student Profile
                  </button>
                  <button type="button" className="btn btn-light text-secondary border px-4 py-3 rounded-pill" onClick={() => navigate("/admin/students")} style={{ fontSize: "14px" }}>
                    Cancel Setup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .content-wrapper {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}