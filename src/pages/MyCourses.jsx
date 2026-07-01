import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { API_BASE_URL } from '../config';
export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await api.get("/enrollments/my-courses");
      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5 bg-white min-vh-100">
      <div className="container py-4">

        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom pb-4">
          <div>
            <h1 className="fw-extrabold" style={{ color: '#58111A' }}>My Courses</h1>
            <p className="text-secondary mb-0">Manage and access your assigned learning modules</p>
          </div>
          <span className="badge rounded-pill px-4 py-2 fs-6" style={{ backgroundColor: '#58111A' }}>
            {courses.length} Active Tracks
          </span>
        </div>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" style={{ color: '#58111A' }}></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="row g-4">
            {courses.map((course) => {
              const courseImageFile = course.image || course.course_image;
              return (
                <div key={course.id || course.course_id} className="col-md-6 col-lg-4">
                  <div className="card border-0 shadow-sm h-100 rounded-4 overflow-hidden transition-all" style={{ border: "1px solid rgba(88, 17, 26, 0.1)" }}>
                    <div className="position-relative" style={{ height: "220px", backgroundColor: "#f8f9fa" }}>
                      {courseImageFile ? (
                        <img
                          src={`${API_BASE_URL}/uploads/${courseImageFile}`}
                          alt={course.title || course.course_name}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            const fallbackUI = e.target.nextSibling;
                            if (fallbackUI) fallbackUI.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div 
                        className="w-100 h-100 flex-column align-items-center justify-content-center text-muted"
                        style={{ 
                          display: courseImageFile ? "none" : "flex", 
                          backgroundColor: "#fdf2f3"
                        }}
                      >
                        <div className="mb-2" style={{ fontSize: "2rem", color: "#58111A" }}>&lt;/&gt;</div>
                        <span className="small fw-bold" style={{ color: "#58111A" }}>Asset Pending</span>
                      </div>
                    </div>

                    <div className="card-body d-flex flex-column p-4">
                      <h4 className="fw-bold mb-3 text-dark">{course.title || course.course_name}</h4>
                      <p className="text-secondary flex-grow-1 small lh-lg">
                        {course.description 
                          ? `${course.description.substring(0, 100)}...` 
                          : "Professional training module assigned to your dashboard."}
                      </p>

                      <Link
                        to={`/materials/${course.id || course.course_id}`}
                        className="btn fw-bold w-100 py-2 rounded-3 text-white"
                        style={{ backgroundColor: '#58111A' }}
                      >
                        Open Materials →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-5 bg-light rounded-4 border">
            <h3 className="fw-bold mb-2">No Active Tracks</h3>
            <p className="text-secondary">You have not been assigned to any courses yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}