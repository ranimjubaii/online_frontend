import { useEffect, useState } from "react";
import {
  FaBook,
  FaUsers,
  FaClipboardList,
  FaFolderOpen,
  FaExternalLinkAlt,
  FaArrowUp,
  FaChartLine,
  FaGraduationCap,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminSidebar from "../../components/AdminSidebar";
export default function AdminDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] =
    useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    students: 0,
    enrollments: 0,
    materials: 0,
  });
  const [loading, setLoading] =
    useState(true);
  const monthlyMetrics = [
    { month: "Jan", count: 45 },
    { month: "Feb", count: 68 },
    { month: "Mar", count: 85 },
    { month: "Apr", count: 110 },
    { month: "May", count: 145 },
    { month: "Jun", count: 190 },
  ];
  useEffect(() => {
    fetchStats();
  }, []);
  const fetchStats = async () => {
    try {
      setLoading(true);
      const response =
        await api.get("/admin/stats");
      if (response?.data) {
        setStats({
          courses:
            response.data.courses ??
            response.data.totalCourses ??
            response.data.courses_count ??
            0,

          students:
            response.data.students ??
            response.data.totalStudents ??
            response.data.students_count ??
            0,

          enrollments:
            response.data.enrollments ??
            response.data.totalEnrollments ??
            response.data.enrollments_count ??
            0,

          materials:
            response.data.materials ??
            response.data.totalMaterials ??
            response.data.materials_count ??
            0,
        });
      }
    } catch (error) {
      console.error(
        "Error fetching admin stats:",
        error
      );
    } finally {
      setLoading(false);
    }
  };
  const dashboardCards = [
    {
      title: "Courses",
      value: stats.courses,
      icon: <FaBook />,
      color: "#58111A",
      bg: "rgba(88,17,26,0.08)",
    },

    {
      title: "Students",
      value: stats.students,
      icon: <FaUsers />,
      color: "#198754",
      bg: "rgba(25,135,84,0.08)",
    },

    {
      title: "Enrollments",
      value: stats.enrollments,
      icon: <FaClipboardList />,
      color: "#0d6efd",
      bg: "rgba(13,110,253,0.08)",
    },

    {
      title: "Materials",
      value: stats.materials,
      icon: <FaFolderOpen />,
      color: "#dc3545",
      bg: "rgba(220,53,69,0.08)",
    },
  ];
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
          transition: "0.25s ease",
        }}
      >
        <div className="d-flex align-items-center justify-content-between px-4 py-3 bg-white border-bottom">
          <div>
            <h4
              className="fw-bold mb-1"
              style={{
                color: "#58111A",
              }}
            >
              Dashboard Overview
            </h4>
            <p className="text-muted small mb-0">
              Online course platform statistics
            </p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="btn rounded-pill px-4 py-2 fw-semibold shadow-sm"
            style={{
              border: "1px solid #58111A",
              color: "#58111A",
              backgroundColor: "white",
              fontSize: "13px",
            }}
          >
            View Website
            <FaExternalLinkAlt
              className="ms-2"
              size={11}
            />
          </button>
        </div>
        <div className="p-4">
          <div className="row g-4 mb-4">
            {dashboardCards.map(
              (card, index) => (
                <div
                  className="col-md-6 col-lg-3"
                  key={index}
                >
                  <div className="card border-0 shadow-sm rounded-4 h-100">
                    <div className="card-body p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <p className="text-muted small fw-semibold mb-2">
                            {card.title}
                          </p>
                          <h2
                            className="fw-bold mb-0"
                            style={{
                              color: "#212529",
                            }}
                          >
                            {loading
                              ? "..."
                              : card.value}
                          </h2>
                        </div>
                        <div
                          className="d-flex align-items-center justify-content-center rounded-4"
                          style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor:
                              card.bg,
                            color: card.color,
                            fontSize: "22px",
                          }}
                        >
                          {card.icon}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="row g-4">
            <div className="col-lg-8">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center justify-content-between mb-4">
                    <div>
                      <h5
                        className="fw-bold mb-1"
                        style={{
                          color: "#58111A",
                        }}
                      >
                        Platform Growth
                      </h5>
                      <p className="text-muted small mb-0">
                        Monthly enrollment activity
                      </p>
                    </div>
                    <div
                      className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                      style={{
                        backgroundColor:
                          "rgba(25,135,84,0.08)",
                        color: "#198754",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      <FaArrowUp size={10} />
                      +24%
                    </div>
                  </div>
                  <div
                    className="d-flex align-items-end justify-content-between pt-4"
                    style={{
                      height: "260px",
                    }}
                  >
                    {monthlyMetrics.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="d-flex flex-column align-items-center justify-content-end h-100"
                          style={{
                            width: "13%",
                          }}
                        >
                          <span
                            className="small fw-bold mb-2"
                            style={{
                              color: "#58111A",
                            }}
                          >
                            {item.count}
                          </span>
                          <div
                            className="w-100 rounded-top"
                            style={{
                              height: `${
                                (item.count /
                                  200) *
                                100
                              }%`,
                              background:
                                "linear-gradient(180deg, #58111A 0%, #2c080d 100%)",
                              transition:
                                "0.4s ease",
                              minHeight:
                                "40px",
                            }}
                          />
                          <span className="small text-muted mt-2 fw-semibold">
                            {item.month}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 h-100">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <FaChartLine
                      style={{
                        color: "#58111A",
                      }}
                    />
                    <h5
                      className="fw-bold mb-0"
                      style={{
                        color: "#58111A",
                      }}
                    >
                      Recent Activity
                    </h5>
                  </div>
                  <div className="d-flex flex-column gap-4">
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor:
                            "rgba(25,135,84,0.1)",
                          color: "#198754",
                          flexShrink: 0,
                        }}
                      >
                        <FaUsers size={14} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">
                          New student joined
                        </h6>
                        <p className="small text-muted mb-0">
                          Student account created successfully
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor:
                            "rgba(13,110,253,0.1)",
                          color: "#0d6efd",
                          flexShrink: 0,
                        }}
                      >
                        <FaGraduationCap size={14} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">
                          New course uploaded
                        </h6>
                        <p className="small text-muted mb-0">
                          Admin added a new learning course
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-items-start gap-3">
                      <div
                        className="rounded-circle d-flex align-items-center justify-content-center"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor:
                            "rgba(255,193,7,0.12)",
                          color: "#ffc107",
                          flexShrink: 0,
                        }}
                      >
                        <FaCheckCircle size={14} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">
                          Enrollment completed
                        </h6>
                        <p className="small text-muted mb-0">
                          A student successfully enrolled
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}