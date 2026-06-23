import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaSpinner,
  FaUserPlus
} from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
export default function AddEnrollment() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [students, setStudents] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    student_id: "",
    course_id: "",
    price: "",
    payment_status: "paid"
  });
  const wineRed = "#722f37";
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/students");
      setStudents(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      console.error(error);
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };
  const handleStudentChange = async (e) => {
    const studentId = e.target.value;
    setFormData({
      student_id: studentId,
      course_id: "",
      price: "",
      payment_status: "paid"
    });
    if (!studentId) {
      setAvailableCourses([]);
      return;
    }
    try {
      const res = await api.get(
        `/enrollments/available/${studentId}`
      );
      setAvailableCourses(res.data || []);
    } catch (error) {
      console.error(error);
      setAvailableCourses([]);
      setError("Failed to load courses");
    }
  };
  const handleCourseChange = (e) => {
    const selectedCourseId = e.target.value;
    const selectedCourse =
      availableCourses.find(
        (course) =>
          String(course.course_id) ===
          String(selectedCourseId)
      );
    setFormData((prev) => ({
      ...prev,
      course_id: selectedCourseId,
      price: selectedCourse?.price || ""
    }));
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await api.post(
        "/enrollments",
        formData
      );
      navigate("/admin/enrollments");
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to create enrollment"
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="bg-light min-vh-100">

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
          transition: "0.3s"
        }}
      >
        <div className="bg-white border-bottom px-5 py-4">
          <button
            className="btn btn-light border rounded-pill px-4"
            onClick={() =>
              navigate("/admin/enrollments")
            }
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>
        </div>
        <div className="container py-5">
          <h1 className="fw-bold mb-4">
            Add Enrollment
          </h1>
          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}
          {loading ? (
            <div className="text-center py-5">
              <FaSpinner className="fa-spin fs-1" />
            </div>
          ) : (
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Student
                    </label>
                    <select
                      className="form-select p-3"
                      name="student_id"
                      value={formData.student_id}
                      onChange={handleStudentChange}
                      required
                    >
                      <option value="">
                        Select Student
                      </option>
                      {students.map((student) => (
                        <option
                          key={student.student_id}
                          value={student.student_id}
                        >
                          {student.full_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Course
                    </label>
                    <select
                      className="form-select p-3"
                      name="course_id"
                      value={formData.course_id}
                      onChange={handleCourseChange}
                      required
                    >
                      <option value="">
                        {availableCourses.length > 0
                          ? "Select Course"
                          : "No Available Courses"}
                      </option>
                      {availableCourses.map((course) => (
                        <option
                          key={course.course_id}
                          value={course.course_id}
                        >
                          {course.course_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Price
                    </label>
                    <input
                      type="number"
                      className="form-control p-3"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold">
                      Payment Status
                    </label>
                    <select
                      className="form-select p-3"
                      name="payment_status"
                      value={formData.payment_status}
                      onChange={handleChange}
                    >
                      <option value="paid">
                        Paid
                      </option>
                      <option value="unpaid">
                        Unpaid
                      </option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn text-white px-5 py-3 rounded-pill mt-5"
                  style={{
                    background: wineRed
                  }}
                >
                  <FaUserPlus className="me-2" />
                  {submitting
                    ? "Creating..."
                    : "Create Enrollment"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}