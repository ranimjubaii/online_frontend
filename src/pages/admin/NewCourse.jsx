import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBars, FaUpload } from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function NewCourse() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [error, setError] = useState(null);
  const [imageFile, setImageFile] = useState(null); 

  const [formData, setFormData] = useState({
    course_name: "",
    description: "",
    hours: "",
    lesson: "",
    price: "",
    discount: "0.00",
    status: "upcoming"
  });

  const wineRed = "#722f37";
  const wineRedBg = "rgba(114, 47, 55, 0.08)";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const data = new FormData();
      data.append("course_name", formData.course_name);
      data.append("description", formData.description);
      data.append("hours", formData.hours);
      data.append("lesson", formData.lesson);
      data.append("price", formData.price);
      data.append("discount", formData.discount);
      data.append("status", formData.status);
      if (imageFile) {
        data.append("image", imageFile);
      }
      await api.post("/courses", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("New course deployment finalized successfully!");
      navigate("/admin/courses"); 
    } catch (err) {
      console.error("Course Creation Error:", err);
      setError(err.response?.data?.message || "Failed deploying structural database entry mapping.");
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
                <FaBars className="text-dark" size={14} />
              </button>
            )}
            <span className="badge bg-opacity-10 text-uppercase tracking-wider px-3 py-2 rounded-pill fw-bold" style={{ backgroundColor: wineRedBg, color: wineRed, fontSize: "11px" }}>
              Academic Systems Core
            </span>
          </div>
        </div>
        <div className="px-5 py-5">
          <div className="d-flex align-items-center gap-3 mb-5">
            <button 
              type="button"
              onClick={() => navigate("/admin/courses")}
              className="btn btn-light border shadow-2xs rounded-circle p-0 d-flex align-items-center justify-content-center"
              style={{ width: "45px", height: "45px" }}
              title="Return to Catalog Grid"
            >
              <FaArrowLeft className="text-secondary" size={14} />
            </button>
            <div>
              <h1 className="fw-black tracking-tight text-dark mb-1" style={{ fontSize: "2rem" }}>Deploy New Course Blueprint</h1>
              <p className="text-secondary small fw-medium mb-0">Build out a fresh core configuration and save it directly into the server cluster database matrices.</p>
            </div>
          </div>
          {error && <div className="alert alert-danger border-0 rounded-4 p-4 shadow-sm mb-4">{error}</div>}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
            <div className="card-body p-5">
              <h3 className="fw-black tracking-tight text-dark mb-4" style={{ fontSize: "1.25rem" }}>
                ✨ Course Configuration Registry
              </h3>
              
              <form onSubmit={handleCreateCourse}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Course Title Name</label>
                    <input 
                      type="text" 
                      name="course_name"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-semibold" 
                      placeholder="e.g. Web Development (using React)"
                      value={formData.course_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Duration Scope (Hours)</label>
                    <input 
                      type="number" 
                      name="hours"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-bold" 
                      placeholder="e.g. 25"
                      value={formData.hours}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Lessons Target Counter</label>
                    <input 
                      type="number" 
                      name="lesson"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-bold" 
                      placeholder="e.g. 20"
                      value={formData.lesson}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Informational Profile Syllabus Abstract</label>
                    <textarea 
                      name="description"
                      rows="4"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-medium" 
                      placeholder="Write a clear, instructional summary regarding skills gained..."
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Base Tuition Retail Price ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      name="price"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-bold" 
                      placeholder="120.00"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Discount Markdown Valuation ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      name="discount"
                      className="form-control rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-medium" 
                      placeholder="0.00"
                      value={formData.discount}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Deployment Operations Visibility Check</label>
                    <select 
                      name="status"
                      className="form-select rounded-3 p-3 bg-light border-0 shadow-2xs text-dark fw-medium"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active (Live Stream Running)</option>
                      <option value="completed">Completed Archive Profile</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label text-secondary small uppercase fw-bold tracking-wide">Course Cover Banner Image</label>
                    <div className="d-flex align-items-center gap-3 bg-light p-3 rounded-3 border-0">
                      <label className="btn btn-secondary text-white btn-sm px-3 py-2 rounded-pill d-flex align-items-center gap-2 mb-0 cursor-pointer" style={{ fontSize: "13px" }}>
                        <FaUpload size={12} /> Choose Image File
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }} 
                        />
                      </label>
                      <span className="text-muted small fw-medium">
                        {imageFile ? imageFile.name : "No cover image chosen yet (Defaults to web.webp)"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-3 mt-5">
                  <button 
                    type="submit" 
                    className="btn text-white px-5 py-3 rounded-pill shadow-sm fw-semibold" 
                    style={{ backgroundColor: wineRed, fontSize: "14px" }}
                  >
                    Commit Blueprint to Cluster Nodes
                  </button>
                  <button 
                    type="button"
                    onClick={() => navigate("/admin/courses")}
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