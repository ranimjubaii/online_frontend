import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
export default function CourseMaterials() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (courseId) {
      fetchCourseAndMaterials();
    } else {
      setLoading(false);
    }
  }, [courseId]);

  const fetchCourseAndMaterials = async () => {
    try {
      const materialsResponse = await api.get(`/materials/course/${courseId}`);
      const courseResponse = await api.get(`/courses/${courseId}`);

      if (courseResponse && courseResponse.data) {
        setCourse({
          title: courseResponse.data.course_name,
          description: courseResponse.data.description
        });
      }

      if (materialsResponse && Array.isArray(materialsResponse.data)) {
        const formattedMaterials = materialsResponse.data.map(item => ({
          id: item.id || item.link_id, 
          title: item.title,
          type: "Study Resource",      
          url: item.link               
        }));
        setMaterials(formattedMaterials);
      }

    } catch (error) {
      console.error("Error fetching course materials data array:", error);
      setCourse(null);
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  if (!course && materials.length === 0) {
    return (
      <div className="text-center py-5 bg-light min-vh-100">
        <div className="container">
          <div className="card border-0 shadow p-5 rounded-4">
            <h4 className="text-muted fw-bold">No Course Selected</h4>
            <p className="text-secondary mb-0">Please select a valid course module to view its materials.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-5 bg-light min-vh-100">
      <div className="container">
        <div className="card border-0 shadow rounded-4 mb-5">
          <div className="card-body p-5">
            <h1 className="fw-bold mb-3">
              {course?.title || "Course Material Module"}
            </h1>
            <p className="text-muted mb-0">
              {course?.description || "Access related links and course study guides below."}
            </p>
          </div>
        </div>
        <div className="card border-0 shadow rounded-4">
          <div className="card-body p-4">
            <h3 className="fw-bold mb-4">Course Materials</h3>

            {materials && materials.length > 0 ? (
              <div className="row">
                {materials.map((material) => (
                  <div
                    key={material.id || Math.random()}
                    className="col-md-6 mb-4"
                  >
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="fw-bold mb-0">
                            {material.title}
                          </h5>
                          <span className="badge bg-primary">
                            {material.type}
                          </span>
                        </div>
                        <a
                          href={material.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-dark"
                        >
                          Open Material
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-5">
                <h4>No materials added yet</h4>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}