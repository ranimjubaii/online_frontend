import React, { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaUserGraduate,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaLock
} from "react-icons/fa";

import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function EditStudent() {

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

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
      full_name: "",
      phone: "",
      address: "",
      payment_status: "unpaid"
    });

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await api.get(
        "/students"
      );

      const student =
        res.data.find(
          (item) =>
            Number(item.student_id) ===
            Number(id)
        );

      if (!student) {

        setError("Student not found");

        return;
      }

      setFormData({
        username:
          student.username || "",

        email:
          student.email || "",

        password: "",

        full_name:
          student.full_name || "",

        phone:
          student.phone || "",

        address:
          student.address || "",

        payment_status:
          student.payment_status ||
          "unpaid"
      });

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load student"
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
        `/students/${id}`,
        formData
      );

      navigate("/admin/students");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to update student"
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
              Edit Student
            </h4>

            <p className="text-muted small mb-0">
              Update student information
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/students")
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
                Loading student...
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

                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        <FaUser className="me-2" />
                        Username
                      </label>

                      <input
                        type="text"
                        name="username"
                        className="form-control rounded-3"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />

                    </div>

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        <FaEnvelope className="me-2" />
                        Email
                      </label>

                      <input
                        type="email"
                        name="email"
                        className="form-control rounded-3"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaLock className="me-2" />
                      Password
                    </label>

                    <input
                      type="password"
                      name="password"
                      className="form-control rounded-3"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Leave empty to keep current password"
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaUserGraduate className="me-2" />
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="full_name"
                      className="form-control rounded-3"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="row">

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
                        <FaPhone className="me-2" />
                        Phone
                      </label>

                      <input
                        type="text"
                        name="phone"
                        className="form-control rounded-3"
                        value={formData.phone}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-6 mb-4">

                      <label className="form-label fw-semibold">
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

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaMapMarkerAlt className="me-2" />
                      Address
                    </label>

                    <textarea
                      rows="4"
                      name="address"
                      className="form-control rounded-3"
                      value={formData.address}
                      onChange={handleChange}
                    />

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
                        Update Student
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