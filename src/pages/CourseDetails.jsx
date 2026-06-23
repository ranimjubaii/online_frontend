import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaImage } from "react-icons/fa";
import WhatsAppButton from "../components/WhatsappButton";
import api from "../services/api";
export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourse();
  }, [id]); 
  const fetchCourse = async () => {
    try {
      const response = await api.get(`/courses/${id}`);
      if (response && response.data) {
        setCourse({
          title: response.data.course_name,      
          price: response.data.price,
          description: response.data.description,
          image: response.data.course_image || response.data.image  
        });
      }
    } catch (error) {
      console.log("Error querying specific course ID module context:", error);
    } finally {
      setLoading(false);
    }
  };

  // LOADING
  if (loading) {
    return (
      <div className="text-center py-5 my-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }
  if (!course) {
    return (
      <div className="container py-5 text-center">
        <h2 className="fw-bold text-dark">Course Not Found</h2>
        <p className="text-muted">The requested training track mapping does not exist on this cluster.</p>
      </div>
    );
  }
  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="row g-5 align-items-start">
          <div className="col-lg-6 mb-4">
            <div className="position-relative rounded-4 overflow-hidden shadow bg-white" style={{ minHeight: "350px" }}>
              {course.image ? (
                <img
                  src={`http://localhost:5000/uploads/${course.image}`}
                  alt={course.title}
                  className="w-100 h-100"
                  style={{ maxHeight: "450px", objectFit: "cover" }}
                  onError={(e) => {
                    
                    e.target.style.display = 'none';
                    // Show our localized fallback component block below
                    const localFallback = e.target.nextSibling;
                    if (localFallback) localFallback.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="w-100 flex-column align-items-center justify-content-center text-muted"
                style={{ 
                  display: course.image ? "none" : "flex", 
                  backgroundColor: "#e9ecef",
                  height: "350px",
                  border: "1px solid #dee2e6" 
                }}
              >
                <FaImage className="fs-1 mb-3 text-secondary opacity-50" />
                <span className="fw-bold opacity-75">No Syllabus Asset Loaded</span>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <h1 className="fw-extrabold text-dark mb-3">
              {course.title}
            </h1>

            <h3 className="fw-bold mb-4" style={{ color: "#58111A" }}>
              ${course.price}
            </h3>

            <p className="text-secondary mb-5" style={{ whiteSpace: "pre-line", lineHeight: "1.7" }}>
              {course.description || "No extended curriculum matrix profiles have been linked to this platform index."}
            </p>

            <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
              <h5 className="fw-bold text-dark mb-3">
                How to Enroll
              </h5>

              <p className="text-muted small mb-4">
                Contact us on WhatsApp and the admin will create your account credentials and bind this active class asset directly onto your workspace catalog dashboard view.
              </p>

              <WhatsAppButton courseTitle={course.title} />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}