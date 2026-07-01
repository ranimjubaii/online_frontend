import { API_BASE_URL } from "../../config";
import React, {
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSpinner,
  FaDollarSign,
  FaClock
} from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
export default function ManageCourses() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(true);
  const [courses, setCourses] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response =
        await api.get("/courses");
      setCourses(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (
    courseId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this course permanently?"
      );

    if (!confirmDelete) return;
    try {
      await api.delete(
        `/courses/${courseId}`
      );
      fetchCourses();
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to delete course"
      );
    }
  };
  const formatCurrency = (value) => {
    const num = parseFloat(value);
    return isNaN(num)
      ? "0.00"
      : num.toFixed(2);
  };
  return (
    <div className="bg-light min-vh-100 overflow-x-hidden">
      <AdminSidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }
      />
      <div
        style={{
          marginLeft: sidebarOpen
            ? "260px"
            : "0px",
          transition: "0.25s ease"
        }}
      >
        <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom" >
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A"
              }}
            >
              Manage Courses
            </h4>

            <p className="text-muted small mb-0">
              Academic course management
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/newcourse")
            }
            className="btn text-white rounded-pill px-4 py-2 fw-semibold shadow-sm"
            style={{
              backgroundColor: "#58111A",
              border: "none",
              fontSize: "13px"
            }}
          >
            <FaPlus className="me-2" />
            Add Course
          </button>
        </div>
        <div className="p-4">
          {error && (
            <div className="alert alert-danger rounded-4 border-0 shadow-sm">
              {error}
            </div>
          )}
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="table-responsive">
              <table className="table align-middle table-hover mb-0">
                <thead
                  style={{
                    backgroundColor:
                      "rgba(88,17,26,0.05)"
                  }}
                >
                  <tr>
                    <th className="px-4 py-3 small fw-bold text-secondary">
                      Course
                    </th>
                    <th className="py-3 small fw-bold text-secondary">
                      Metrics
                    </th>
                    <th className="py-3 small fw-bold text-secondary">
                      Price
                    </th>
                    <th className="py-3 small fw-bold text-secondary">
                      Status
                    </th>
                    <th className="px-4 py-3 text-end small fw-bold text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <FaSpinner
                          className="fa-spin mb-2"
                          size={24}
                          style={{
                            color: "#58111A"
                          }}
                        />
                        <div className="small text-muted">
                          Loading courses...
                        </div>
                      </td>
                    </tr>
                  ) : courses.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <FaBook
                          size={40}
                          className="mb-2 opacity-25"
                          style={{
                            color: "#58111A"
                          }}
                        />
                        <div className="small text-muted">
                          No courses found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    courses.map((course) => {
                      const imageFile =
                        course.image ||
                        course.course_image;
                      const courseStatus =
                        String(
                          course.status ||
                          "upcoming"
                        ).toLowerCase();
                      const isUpcoming =courseStatus ==="upcoming";
                      return (
                        <tr
                          key={
                            course.course_id
                          }
                        >
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded-3 overflow-hidden bg-light border flex-shrink-0"
                                style={{
                                  width: "48px",
                                  height: "48px"
                                }}
                              >
                                {imageFile ? (
                                  <img
                                    src={`${API_BASE_URL}/uploads/${imageFile}`}
                                    alt={
                                      course.course_name
                                    }
                                    className="w-100 h-100"
                                    style={{
                                      objectFit:
                                        "cover"
                                    }}
                                  />

                                ) : (
                                  <div
                                    className="w-100 h-100 d-flex align-items-center justify-content-center text-muted fw-bold"
                                  >
                                    &lt;/&gt;
                                  </div>
                                )}
                              </div>
                              <div
                                style={{
                                  maxWidth: "250px"
                                }}
                              >
                                <div
                                  className="fw-bold text-dark text-truncate"
                                  style={{
                                    fontSize: "14px"
                                  }}
                                >{ course.course_name }
                                </div>
                                <div
                                  className="small text-muted text-truncate"
                                  style={{
                                    fontSize: "12px"
                                  }}
                                >
                                  {
                                    course.description
                                  }
                                </div>
                              </div>
                            </div>
                          </td>
                          
                          <td className="py-3">
                            <div className="small d-flex flex-column gap-1">
                              <span className="text-muted">
                                <FaClock
                                  size={11}
                                  className="me-1"
                                />
                                {
                                  course.hours
                                }{" "}
                                Hours
                              </span>
                              <span className="text-muted">
                                📚{" "}
                                {
                                  course.lesson
                                }{" "}
                                Lessons
                              </span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div
                              className="fw-bold"
                              style={{
                                color: "#58111A",
                                fontSize: "14px"
                              }}
                            >
                              <FaDollarSign
                                size={11}
                                className="me-1"
                              />
                              {formatCurrency(
                                course.price
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge rounded-pill px-3 py-2 fw-semibold ${
                                isUpcoming
                                  ? "bg-warning text-dark"
                                  : "bg-success"
                              }`}
                              style={{
                                fontSize: "11px"
                              }}
                            >
                              {isUpcoming
                                ? "Upcoming"
                                : "Active"}

                            </span>
                          </td>
                          <td className="px-4 py-3 text-end">
                            <div className="d-flex justify-content-end gap-2">
                              <button
                                className="btn btn-sm border-0 shadow-sm"
                                style={{
                                  backgroundColor:
                                    "rgba(88,17,26,0.08)",
                                  color: "#58111A",
                                  width: "36px",
                                  height: "36px"
                                }}
                                onClick={() =>
                                  navigate(
                                    `/admin/edit-course/${course.course_id}`
                                  )
                                }
                              >
                                <FaEdit size={13} />
                              </button>
                              <button
                                className="btn btn-sm border-0 shadow-sm"
                                style={{
                                  backgroundColor:
                                    "rgba(220,53,69,0.1)",
                                  color: "#dc3545",
                                  width: "36px",
                                  height: "36px"
                                }}
                                onClick={() =>
                                  handleDeleteCourse(
                                    course.course_id
                                  )
                                }
                              >
                                <FaTrash size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}