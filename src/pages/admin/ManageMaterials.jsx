import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  FaFolderOpen,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSpinner,
  FaExternalLinkAlt,
  FaFileAlt
} from "react-icons/fa";

import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";

export default function ManageMaterials() {

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [materials, setMaterials] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {

    try {

      setLoading(true);

      setError(null);

      const [
        materialsRes,
        coursesRes
      ] = await Promise.all([
        api.get("/materials"),
        api.get("/courses")
      ]);

      const materialsData =
        Array.isArray(materialsRes.data)
          ? materialsRes.data
          : [];

      const coursesData =
        Array.isArray(coursesRes.data)
          ? coursesRes.data
          : [];

      setCourses(coursesData);

      const formattedMaterials =
        materialsData.map((item) => {

          const matchedCourse =
            coursesData.find(
              (course) =>
                Number(course.course_id) ===
                Number(item.course_id)
            );

          return {
            ...item,
            course_name:
              matchedCourse?.course_name ||
              "Unknown Course"
          };
        });

      setMaterials(formattedMaterials);

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to load materials"
      );

    } finally {

      setLoading(false);
    }
  };

  const handleDeleteMaterial = async (
    linkId
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this material permanently?"
      );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/materials/${linkId}`
      );

      fetchMaterials();

    } catch (error) {

      console.error(error);

      setError(
        error.response?.data?.message ||
        "Failed to delete material"
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

        <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom">

          <div>

            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A"
              }}
            >
              Manage Materials
            </h4>

            <p className="text-muted small mb-0">
              Course materials management
            </p>

          </div>

          <button
            onClick={() =>
              navigate("/admin/materials/new")
            }
            className="btn text-white rounded-pill px-4 py-2 fw-semibold shadow-sm"
            style={{
              backgroundColor: "#58111A",
              border: "none",
              fontSize: "13px"
            }}
          >
            <FaPlus className="me-2" />
            Add Material
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
                      Material
                    </th>

                    <th className="py-3 small fw-bold text-secondary">
                      Course
                    </th>

                    <th className="py-3 small fw-bold text-secondary">
                      Link
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
                          Loading materials...
                        </div>

                      </td>

                    </tr>

                  ) : materials.length === 0 ? (

                    <tr>

                      <td
                        colSpan="4"
                        className="text-center py-5"
                      >

                        <FaFolderOpen
                          size={40}
                          className="mb-2 opacity-25"
                          style={{
                            color: "#58111A"
                          }}
                        />

                        <div className="small text-muted">
                          No materials found
                        </div>

                      </td>

                    </tr>

                  ) : (

                    materials.map((item) => (

                      <tr key={item.link_id}>

                        <td className="px-4 py-3">

                          <div className="d-flex align-items-center gap-3">

                            <div
                              className="rounded-3 bg-light border d-flex align-items-center justify-content-center"
                              style={{
                                width: "45px",
                                height: "45px"
                              }}
                            >

                              <FaFileAlt
                                style={{
                                  color: "#58111A"
                                }}
                              />

                            </div>

                            <div
                              className="fw-bold text-dark"
                              style={{
                                fontSize: "14px"
                              }}
                            >
                              {item.title}
                            </div>

                          </div>

                        </td>

                        <td className="py-3 text-muted">
                          {item.course_name}
                        </td>

                        <td className="py-3">

                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="small text-decoration-none"
                          >
                            Open Material

                            <FaExternalLinkAlt
                              size={10}
                              className="ms-1"
                            />

                          </a>

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
                                  `/admin/edit-material/${item.link_id}`
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
                                handleDeleteMaterial(
                                  item.link_id
                                )
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