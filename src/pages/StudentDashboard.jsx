import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from '../config';
import { 
  FaBookOpen, 
  FaClock, 
  FaGraduationCap, 
  FaWhatsapp, 
  FaArrowRight,
  FaFolderOpen,
  FaImage
} from "react-icons/fa";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";
export default function StudentDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const totalLessons = courses.reduce((acc, curr) => acc + (Number(curr.lessons_count) || 0), 0);
  const totalHours = courses.reduce((acc, curr) => acc + (Number(curr.duration) || Number(curr.hours) || 0), 0);
  useEffect(() => {
    fetchMyCourses();
  }, []);
  const fetchMyCourses = async () => {
    try {
      const response = await api.get("/enrollments/my-courses");
      setCourses(response.data);
    } catch (error) {
      console.log("Error fetching courses matrix:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-5 min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">
        <div 
          className="text-light p-4 p-md-5 rounded-4 shadow-sm mb-5 position-relative overflow-hidden"
          style={{ 
            background: "linear-gradient(135deg, #58111A 0%, #2b050a 100%)",
            borderLeft: "5px solid #dda7a5"
          }}
        >
          <div className="position-relative" style={{ zIndex: 2 }}>
            <span className="badge bg-white text-dark mb-3 px-3 py-2 rounded-pill fw-bold small shadow-sm">
              Student Workspace
            </span>
            <h1 className="fw-extrabold mb-2 display-6 tracking-tight">
              Welcome Back, <span style={{ color: "#dda7a5" }}>{user?.username || user?.name || "Scholar"}</span>! 👋
            </h1>
            <p className="mb-0 opacity-80 max-w-xl fw-medium">
              Track your academic registration details, reference instructional syllabus media layouts, and resume learning pipelines.
            </p>
          </div>
  
          <div 
            className="position-absolute end-0 bottom-0 opacity-10 d-none d-md-block" 
            style={{ transform: "translate(10%, 20%)", fontSize: "14rem" }}
          >
            <FaGraduationCap />
          </div>
        </div>
        <div className="row g-4 mb-5">
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 transition-up">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(88, 17, 26, 0.08)", color: "#58111A" }}>
                  <FaBookOpen className="fs-4" />
                </div>
                <div>
                  <h6 className="text-secondary fw-bold small uppercase mb-1">Enrolled Courses</h6>
                  <h3 className="fw-extrabold mb-0 text-dark">{courses.length}</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 transition-up">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(88, 17, 26, 0.08)", color: "#58111A" }}>
                  <FaFolderOpen className="fs-4" />
                </div>
                <div>
                  <h6 className="text-secondary fw-bold small uppercase mb-1">Total Lessons</h6>
                  <h3 className="fw-extrabold mb-0 text-dark">{totalLessons || "—"}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-lg-4">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100 transition-up">
              <div className="d-flex align-items-center gap-3">
                <div className="rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgba(88, 17, 26, 0.08)", color: "#58111A" }}>
                  <FaClock className="fs-4" />
                </div>
                <div>
                  <h6 className="text-secondary fw-bold small uppercase mb-1">Study Duration</h6>
                  <h3 className="fw-extrabold mb-0 text-dark">{totalHours ? `${totalHours} Hrs` : "—"}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <div>
            <h3 className="fw-extrabold text-dark mb-1">My Active Learning Tracks</h3>
            <p className="text-muted small mb-0">Select any course platform card layout below to stream core syllabus materials.</p>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-5 my-5">
            <div className="spinner-border" style={{ color: "#58111A", width: "3rem", height: "3rem" }} role="status"></div>
            <p className="text-muted mt-3 fw-medium">Syncing academic workspace vectors...</p>
          </div>
        ) : courses.length > 0 ? (
          <div className="row g-4">
            {courses.map((course) => {
              const imageName = course.course_image || course.image;
              
              return (
                <div key={course.id || course.course_id} className="col-md-6 col-lg-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden course-hover-card bg-white">
                    <div className="position-relative" style={{ height: "200px", backgroundColor: "#e9ecef" }}>
                      {imageName ? (
                        <img
                          src={`${API_BASE_URL}/uploads/${imageName}`}
                          alt={course.title || course.course_name}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const placeholder = e.target.nextSibling;
                            if (placeholder) placeholder.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-100 h-100 flex-column align-items-center justify-content-center text-muted"
                        style={{ 
                          display: imageName ? "none" : "flex", 
                          backgroundColor: "#f1f3f5",
                          borderBottom: "1px solid #dee2e6" 
                        }}
                      >
                        <FaImage className="fs-2 mb-2 text-secondary opacity-50" />
                        <span className="small fw-bold opacity-75">No Asset Attached</span>
                      </div>

                      <div className="position-absolute bottom-0 start-0 m-3 d-flex gap-2">
                        {(course.duration || course.hours) && (
                          <span className="badge bg-dark bg-opacity-75 backdrop-blur text-white px-2.5 py-1.5 rounded-3 fw-bold small">
                            <FaClock className="me-1" /> {course.duration || course.hours}h
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="card-body d-flex flex-column p-4">
                      <h5 className="fw-bold text-dark text-capitalize mb-2 line-clamp-1">
                        {course.title || course.course_name}
                      </h5>
                      
                      <p className="text-muted small flex-grow-1 mb-4 line-clamp-3">
                        {course.description || "No supplemental informational breakdown profiles have been set for this academic class tracking index yet."}
                      </p>

                      <Link
                        to={`/materials/${course.id || course.course_id}`}
                        className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2.5 fw-bold rounded-pill border-0 text-white btn-premium-wine shadow-none"
                        style={{ backgroundColor: "#58111A", transition: "all 0.25s ease" }}
                      >
                        <span>Open Workspace</span>
                        <FaArrowRight className="small" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white my-4">
            <div className="py-4">
              <div 
                className="rounded-circle d-inline-flex align-items-center justify-content-center mb-4 text-white shadow-sm"
                style={{ width: "80px", height: "80px", backgroundColor: "#58111A" }}
              >
                <FaGraduationCap className="fs-1" />
              </div>
              <h4 className="fw-extrabold text-dark">No Enrolled Courses Found</h4>
              <p className="text-muted mx-auto mb-4 small" style={{ maxWidth: "420px" }}>
                Your student profile registration isn't linked to any active courses. Contact administration on WhatsApp to bind class licenses to your account dashboard.
              </p>
              <a
                href="https://wa.me/+96176783258" 
                target="_blank"
                rel="noreferrer"
                className="btn btn-success fw-bold px-4 py-2.5 rounded-pill shadow-sm border-0 d-inline-flex align-items-center gap-2"
              >
                <FaWhatsapp className="fs-5" />
                <span>Message Admin on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .uppercase { text-transform: uppercase; letter-spacing: 0.5px; }
        .backdrop-blur { backdrop-filter: blur(8px); }
        .max-w-xl { max-width: 600px; }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;  
          overflow: hidden;
        }

        .transition-up {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .transition-up:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06) !important;
        }

        .course-hover-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .course-hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 25px rgba(88, 17, 26, 0.1) !important;
        }

        .btn-premium-wine:hover {
          background-color: #3b0b11 !important;
          box-shadow: 0 4px 15px rgba(88, 17, 26, 0.3) !important;
        }
      `}</style>
    </section>
  );
}