import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config";
import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  FaArrowLeft,
  FaSave,
  FaSpinner,
  FaBookOpen,
  FaImage
} from "react-icons/fa";

import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function EditCourse() {

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

  const [previewImage, setPreviewImage] =
    useState("");

  const [formData, setFormData] =
    useState({
      course_name: "",
      description: "",
      price: "",
      hours: "",
      lesson: "",
      discount: "",
      status: "upcoming",
      image: null
    });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {

    try {

      setLoading(true);

      setError("");

      const res = await api.get(
        `/courses/${id}`
      );

      const course = res.data;

      setFormData({
        course_name:
          course.course_name || "",

        description:
          course.description || "",

        price:
          course.price || "",

        hours:
          course.hours || "",

        lesson:
          course.lesson || "",

        discount:
          course.discount || "",

        status:
          course.status || "upcoming",

        image: null
      });

      if (course.image) {
        setPreviewImage(
          `${API_BASE_URL}/uploads/${course.image}`
        );
      }

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load course"
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

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData({
        ...formData,
        image: file
      });

      setPreviewImage(
        URL.createObjectURL(file)
      );
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSubmitting(true);

      setError("");

      const submitData =
        new FormData();

      submitData.append(
        "course_name",
        formData.course_name
      );

      submitData.append(
        "description",
        formData.description
      );

      submitData.append(
        "price",
        formData.price
      );

      submitData.append(
        "hours",
        formData.hours
      );

      submitData.append(
        "lesson",
        formData.lesson
      );

      submitData.append(
        "discount",
        formData.discount
      );

      submitData.append(
        "status",
        formData.status
      );

      if (formData.image) {

        submitData.append(
          "image",
          formData.image
        );
      }

      await api.put(
        `/courses/${id}`,
        submitData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      navigate("/admin/courses");

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to update course"
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
              Edit Course
            </h4>

            <p className="text-muted small mb-0">
              Update course information
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/courses")
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
                Loading course...
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
                      <FaBookOpen className="me-2" />
                      Course Name
                    </label>

                    <input
                      type="text"
                      name="course_name"
                      className="form-control rounded-3"
                      value={formData.course_name}
                      onChange={handleChange}
                      required
                    />

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      name="description"
                      className="form-control rounded-3"
                      value={formData.description}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="row">

                    <div className="col-md-3 mb-4">

                      <label className="form-label fw-semibold">
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

                    <div className="col-md-3 mb-4">

                      <label className="form-label fw-semibold">
                        Hours
                      </label>

                      <input
                        type="number"
                        name="hours"
                        className="form-control rounded-3"
                        value={formData.hours}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-3 mb-4">

                      <label className="form-label fw-semibold">
                        Lessons
                      </label>

                      <input
                        type="number"
                        name="lesson"
                        className="form-control rounded-3"
                        value={formData.lesson}
                        onChange={handleChange}
                      />

                    </div>

                    <div className="col-md-3 mb-4">

                      <label className="form-label fw-semibold">
                        Discount
                      </label>

                      <input
                        type="number"
                        step="0.01"
                        name="discount"
                        className="form-control rounded-3"
                        value={formData.discount}
                        onChange={handleChange}
                      />

                    </div>

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      Status
                    </label>

                    <select
                      name="status"
                      className="form-select rounded-3"
                      value={formData.status}
                      onChange={handleChange}
                    >

                      <option value="upcoming">
                        Upcoming
                      </option>

                      <option value="active">
                        Active
                      </option>

                      <option value="completed">
                        Completed
                      </option>

                    </select>

                  </div>

                  <div className="mb-4">

                    <label className="form-label fw-semibold">
                      <FaImage className="me-2" />
                      Course Image
                    </label>

                    <input
                      type="file"
                      className="form-control rounded-3"
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                  </div>

                  {previewImage && (

                    <div className="mb-4">

                      <img
                        src={previewImage}
                        alt="Preview"
                        className="img-fluid rounded-4 border"
                        style={{
                          maxHeight: "220px",
                          objectFit: "cover"
                        }}
                      />

                    </div>

                  )}

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
                        Update Course
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