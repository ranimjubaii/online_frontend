import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars, FaLink } from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function NewMaterialLink() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    course_id: ""
  });
  const wineRed = "#722f37";
  const wineRedBg = "rgba(114, 47, 55, 0.08)";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/courses");
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to fetch courses for dropdown:", err);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      setError(null);

      if (!formData.course_id) {
        setError("Please select an associated course blueprint unit.");
        return;
      }
      await api.post("/materials", formData);
      
      alert("New reference link mapped successfully!");
      navigate("/admin/materials"); 
    } catch (err) {
      console.error("Material Link Creation Error:", err);
      setError(err.response?.data?.message || "Failed deploying structural resource endpoint link matrix.");
    }
  };

  return (
    <div className="bg-light min-vh-100 overflow-x-hidden">
      <AdminSidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div 
        style={{ 
          marginLeft: sidebarOpen ? "260px" : "0px", 
          paddingLeft: !sidebarOpen ? "60px" : "0px", 
          transition: "all 0.25s ease-in-out", 
          minHeight: "100vh" 
        }}
      >
        <div className="d-flex align-items-center justify-content-between px-5 py-4 bg-white border-bottom border-light shadow-2xs">
          <div className="d-flex align-items-center gap-3">
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)} 
                className="btn btn-light rounded-circle p-2 d-flex align-items-center justify-content-center shadow-2xs border" 
                style={{ width: "40px", height: "40px" }}
              >
                <span className="fs-5 text-dark">☰</span>
              </button>
            )}
            <span className="badge bg-opacity-10 text-uppercase tracking-wider px-3 py-2 rounded-pill fw-bold" style={{ backgroundColor: wineRedBg, color: wineRed, fontSize: "11px" }}>
              Content Storage Matrix
            </span>
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="d-flex align-items-center gap-3 mb-5">
            <button 
              type="button"
              onClick={() => navigate("/admin/materials")}
              className="btn btn-light border shadow-2xs rounded-circle p-0 d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
              title="Return to Materials Console"
            >
              <FaArrowLeft className="text-secondary" size={14} />
            </button>
            <div>
              <h1 className="fw-black tracking-tight text-dark mb-1" style={{ fontSize: "2rem" }}>Upload New Link Reference</h1>
              <p className="text-secondary small fw-medium mb-0">Register a new document resource route or external asset cloud destination mapping.</p>
            </div>
          </div>
          {error && <div className="alert alert-danger border-0 rounded-4 p-4 shadow-sm mb-4">{error}</div>}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="card-body p-5">
              <h3 className="fw-black tracking-tight text-dark mb-4" style={{ fontSize: "1.25rem" }}>
                <FaLink className="me-2 text-secondary" size={18} /> Resource Endpoint Mapping
              </h3>
              <form onSubmit={handleCreateLink}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Material Document Name / Title</label>
                    <input 
                      type="text" 
                      name="title"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-semibold" 
                      placeholder="e.g. React Basics Lecture Slides PDF"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Assigned Course Target Unit</label>
                    <select 
                      name="course_id"
                      className="form-select rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-medium"
                      value={formData.course_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">-- Select Course Blueprint --</option>
                      {courses.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                          {course.course_name} (ID: {course.course_id})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Storage Access Endpoint URL Link</label>
                    <input 
                      type="url" 
                      name="link"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark font-monospace" 
                      placeholder="https://drive.google.com/your-lecture-link"
                      value={formData.link}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="d-flex gap-3 mt-5">
                  <button 
                    type="submit" 
                    className="btn text-white px-5 py-3 rounded-pill shadow-sm fw-semibold" 
                    style={{ backgroundColor: wineRed, fontSize: "14px" }}
                  >
                    Deploy Reference Vector Link
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigate("/admin/materials")}
                    className="btn btn-light border px-4 py-3 rounded-pill text-secondary small fw-medium"
                    style={{ fontSize: "14px" }}
                  >
                    Cancel Operations
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}