import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSpinner,
  FaDollarSign,
  FaCheckCircle,
  FaTimesCircle,
  FaUserGraduate,
  FaBook
} from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
export default function ManageEnrollments() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(true);
  const [enrollments, setEnrollments] =
    useState([]);
  const [students, setStudents] =
    useState([]);
  const [courses, setCourses] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {

    try {

      setLoading(true);

      setError(null);

      const [
        enrollmentsRes,
        studentsRes,
        coursesRes
      ] = await Promise.all([
        api.get("/enrollments"),
        api.get("/students"),
        api.get("/courses")
      ]);

      setEnrollments(
        Array.isArray(enrollmentsRes.data)
          ? enrollmentsRes.data
          : []
      );

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

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load enrollments"
      );

    } finally {

      setLoading(false);
    }
  };
  const handleDeleteEnrollment = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this enrollment permanently?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/enrollments/${id}`
      );

      fetchAllData();

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to delete enrollment"
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
        <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom">

          <div>

            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A"
              }}
            >
              Manage Enrollments
            </h4>
            <p className="text-muted small mb-0">
              Student enrollment management
            </p>
          </div>
          <button
            onClick={() =>
              navigate("/admin/enrollments/new")
            }
            className="btn text-white rounded-pill px-4 py-2 fw-semibold shadow-sm"
            style={{
              backgroundColor: "#58111A",
              border: "none",
              fontSize: "13px"
            }}
          >
            <FaPlus className="me-2" />
            Add Enrollment
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
                      Student
                    </th>
                    <th className="py-3 small fw-bold text-secondary">
                      Course
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
                          Loading enrollments...
                        </div>
                      </td>
                    </tr>
                  ) : enrollments.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-5"
                      >
                        <FaBookOpen
                          size={40}
                          className="mb-2 opacity-25"
                          style={{
                            color: "#58111A"
                          }}
                        />
                        <div className="small text-muted">
                          No enrollments found
                        </div>
                      </td>
                    </tr>

                  ) : (

                    enrollments.map((item) => {

                      const student =
                        students.find(
                          (s) =>
                            Number(s.student_id) ===
                            Number(item.student_id)
                        );
                      const course =
                        courses.find(
                          (c) =>
                            Number(c.course_id) ===
                            Number(item.course_id)
                        );
                      return (
                        <tr key={item.register_id}>
                          <td className="px-4 py-3">
                            <div className="d-flex align-items-center gap-3">
                              <div
                                className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                                style={{
                                  width: "42px",
                                  height: "42px",
                                  backgroundColor: "#58111A"
                                }}
                              >
                                <FaUserGraduate size={15} />
                              </div>
                              <div>
                                <div
                                  className="fw-bold text-dark"
                                  style={{
                                    fontSize: "14px"
                                  }}
                                >
                                  {student?.full_name ||
                                    item.student_name ||
                                    "Unknown Student"}
                                </div>
                                <div
                                  className="small text-muted"
                                  style={{
                                    fontSize: "12px"
                                  }}
                                >
                                  ID: {item.student_id}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                className="rounded d-flex align-items-center justify-content-center"
                                style={{
                                  width: "36px",
                                  height: "36px",
                                  backgroundColor:
                                    "rgba(88,17,26,0.08)",
                                  color: "#58111A"
                                }}
                              >
                                <FaBook size={14} />
                              </div>
                              <div>
                                <div
                                  className="fw-bold text-dark"
                                  style={{
                                    fontSize: "14px"
                                  }}
                                >
                                  {course?.course_name ||
                                    item.course_title ||
                                    "Unknown Course"}
                                </div>
                                <div
                                  className="small text-muted"
                                  style={{
                                    fontSize: "12px"
                                  }}
                                >
                                  Course ID: {item.course_id}
                                </div>
                              </div>
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
                                item.price
                              )}
                            </div>
                          </td>
                          <td className="py-3">
                            <span
                              className={`badge rounded-pill px-3 py-2 fw-semibold ${
                                item.payment_status === "paid"
                                  ? "bg-success"
                                  : "bg-danger"
                              }`}
                              style={{
                                fontSize: "11px"
                              }}
                            >
                              {item.payment_status === "paid"
                                ? (
                                  <>
                                    <FaCheckCircle className="me-1" />
                                    Paid
                                  </>
                                )
                                : (
                                  <>
                                    <FaTimesCircle className="me-1" />
                                    Unpaid
                                  </>
                                )}
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
                                    `/admin/edit-enrollment/${item.register_id}`
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
                                  handleDeleteEnrollment(
                                    item.register_id
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