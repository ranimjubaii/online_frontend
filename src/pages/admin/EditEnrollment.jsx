import React, { useEffect, useState } from "react";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaSpinner,
  FaSave,
  FaArrowLeft,
  FaUserGraduate,
  FaBook,
  FaDollarSign,
  FaCheckCircle
} from "react-icons/fa";

import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function EditEnrollment() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [loading, setLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const [students, setStudents] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      student_id: "",
      course_id: "",
      price: "",
      payment_status: "unpaid"
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      setError("");

      const [
        enrollmentsRes,
        studentsRes,
        coursesRes
      ] = await Promise.all([
        api.get("/enrollments"),
        api.get("/students"),
        api.get("/courses")
      ]);

      const enrollment =
        enrollmentsRes.data.find(
          (item) =>
            Number(item.register_id) ===
            Number(id)
        );

      if (!enrollment) {

        setError("Enrollment not found");

        return;
      }

      setStudents(
        Array.isArray(studentsRes.data)
          ? studentsRes.data
          : []
      );

      setCourses(
        Array.isArray(coursesRes.data)
          ? coursesRes.data
          : []
      );

      setFormData({
        student_id:
          enrollment.student_id || "",

        course_id:
          enrollment.course_id || "",

        price:
          enrollment.price || "",

        payment_status:
          enrollment.payment_status ||
          "unpaid"
      });

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load enrollment"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      setError("");

      await api.put(
        `/enrollments/${id}`,
        {
          student_id:
            formData.student_id,

          course_id:
            formData.course_id,

          price:
            formData.price,

          payment_status:
            formData.payment_status
        }
      );

      navigate("/admin/enrollments");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to update enrollment"
      );

    } finally {

      setSubmitting(false);
    }
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

        <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom">

          <div>

            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A"
              }}
            >
              Edit Enrollment
            </h4>

            <p className="text-muted small mb-0">
              Update enrollment information
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/enrollments")
            }
            className="btn btn-outline-dark rounded-pill px-4"
          >
            <FaArrowLeft className="me-2" />
            Back
          </button>

        </div>

        <div className="p-4">

          {loading ? (

            <div className="text-center py-5">

              <FaSpinner
                className="fa-spin mb-3"
                size={30}
                style={{
                  color: "#58111A"
                }}
              />

              <div className="text-muted">
                Loading enrollment...
              </div>

            </div>

          ) : (

            <div className="card border-0 shadow-sm rounded-4">

              <div className="card-body p-4">

                {error && (
                  <div className="alert alert-danger rounded-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaUserGraduate className="me-2" />
                      Student
                    </label>

                    <select
                      name="student_id"
                      className="form-select rounded-3"
                      value={formData.student_id}
                      onChange={handleChange}
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

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaBook className="me-2" />
                      Course
                    </label>

                    <select
                      name="course_id"
                      className="form-select rounded-3"
                      value={formData.course_id}
                      onChange={handleChange}
                      required
                    >

                      <option value="">
                        Select Course
                      </option>

                      {courses.map((course) => (

                        <option
                          key={course.course_id}
                          value={course.course_id}
                        >
                          {course.course_name}
                        </option>

                      ))}

                    </select>

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaDollarSign className="me-2" />
                      Price
                    </label>

                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      className="form-control rounded-3"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaCheckCircle className="me-2" />
                      Payment Status
                    </label>

                    <select
                      name="payment_status"
                      className="form-select rounded-3"
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

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn text-white rounded-pill px-4 py-2 fw-semibold"
                    style={{
                      backgroundColor: "#58111A",
                      border: "none"
                    }}
                  >

                    {submitting ? (
                      <>
                        <FaSpinner className="fa-spin me-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaSave className="me-2" />
                        Update Enrollment
                      </>
                    )}

                  </button>

                </form>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}