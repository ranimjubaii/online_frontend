import React, { useEffect, useState } from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaBook,
  FaLink
} from "react-icons/fa";

import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function EditMaterial() {

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

  const [courses, setCourses] =
    useState([]);

  const [formData, setFormData] =
    useState({
      course_id: "",
      title: "",
      link: ""
    });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      setLoading(true);

      setError("");

      const [
        materialsRes,
        coursesRes
      ] = await Promise.all([
        api.get("/materials"),
        api.get("/courses")
      ]);

      const material =
        materialsRes.data.find(
          (item) =>
            Number(item.link_id) ===
            Number(id)
        );

      if (!material) {

        setError("Material not found");

        return;
      }

      setCourses(
        Array.isArray(coursesRes.data)
          ? coursesRes.data
          : []
      );

      setFormData({
        course_id:
          material.course_id || "",

        title:
          material.title || "",

        link:
          material.link || ""
      });

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load material"
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
        `/materials/${id}`,
        formData
      );

      navigate("/admin/materials");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to update material"
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
              Edit Material
            </h4>

            <p className="text-muted small mb-0">
              Update course material
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/materials")
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
                Loading material...
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
                      Material Title
                    </label>

                    <input
                      type="text"
                      name="title"
                      className="form-control rounded-3"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter material title"
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaLink className="me-2" />
                      Material Link
                    </label>

                    <input
                      type="text"
                      name="link"
                      className="form-control rounded-3"
                      value={formData.link}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      required
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
                        Update Material
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