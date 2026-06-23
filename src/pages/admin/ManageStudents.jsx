import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserGraduate,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSpinner,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
export default function ManageStudents() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(true);
  const [students, setStudents] =
    useState([]);
  const [loading, setLoading] =
    useState(true);
  const [error, setError] =
    useState(null);
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response =
        await api.get("/students");
      setStudents(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to load students"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteStudent = async (
    studentId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this student permanently?"
      );
    if (!confirmDelete) return;
    try {
      await api.delete(
        `/students/${studentId}`
      );
      fetchStudents();
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
        "Failed to delete student"
      );
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
        <div
          className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom"
        >
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A"
              }}
            >
              Manage Students
            </h4>
            <p className="text-muted small mb-0">
              Student directory management
            </p>
          </div>
          <button
            onClick={() =>
              navigate("/admin/students/new")
            }
            className="btn text-white rounded-pill px-4 py-2 fw-semibold shadow-sm"
            style={{
              backgroundColor: "#58111A",
              border: "none",
              fontSize: "13px"
            }}
          >
            <FaPlus className="me-2" />
            Add Student
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
                      Contact
                    </th>
                    <th className="py-3 small fw-bold text-secondary">
                      Address
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
                        colSpan="4"
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
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  ) : students.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-5"
                      >
                        <FaUserGraduate
                          size={40}
                          className="mb-2 opacity-25"
                          style={{
                            color: "#58111A"
                          }}
                        />
                        <div className="small text-muted">
                          No students found
                        </div>
                      </td>
                    </tr>
                  ) : (
                    students.map((student) => (
                      <tr
                        key={student.student_id}
                      >
                        <td className="px-4 py-3">

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                              style={{
                                width: "45px",
                                height: "45px",
                                backgroundColor: "#58111A"
                              }}
                            >
                              {
                                student.full_name?.charAt(0)
                              }
                            </div>
                            <div>
                              <div
                                className="fw-bold text-dark"
                                style={{
                                  fontSize: "14px"
                                }}
                              >
                                {student.full_name}
                              </div>
                              <div
                                className="small text-muted"
                              >
                                @{student.username}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="small d-flex flex-column gap-1">
                            <span className="text-muted">
                              <FaEnvelope
                                size={11}
                                className="me-1"
                              />
                              {student.email}
                            </span>
                            <span className="text-muted">
                              <FaPhone
                                size={11}
                                className="me-1"
                              />
                              {student.phone}
                            </span>
                          </div>
                        </td>
                        <td className="py-3">
                          <span className="text-muted small">
                            <FaMapMarkerAlt
                              size={11}
                              className="me-1"
                            />
                            {student.address || "No address"}
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
                                navigate(`/admin/edit-student/${student.student_id}`)
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
                                handleDeleteStudent(student.student_id)
                              }
                            >
                              <FaTrash size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
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