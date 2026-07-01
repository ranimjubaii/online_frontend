import { useEffect } from "react";
import { FaBars,FaTachometerAlt,FaBook,FaUsers,FaClipboardList,FaFolderOpen,FaSignOutAlt, } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
export default function AdminSidebar({sidebarOpen, toggleSidebar,}) {
   const navigate = useNavigate();

   useEffect(() => {
     document.body.classList.add("has-admin-sidebar");
     return () => {
       document.body.classList.remove("has-admin-sidebar");
     };
   }, []);

   const navigationLinks = [
    {
      to: "/admin",
      text: "Dashboard",
      icon: <FaTachometerAlt />,
      end: true,
    },
    {
      to: "/admin/courses",
      text: "Manage Courses",
      icon: <FaBook />,
      end: false,
    },
    {
      to: "/admin/students",
      text: "Manage Students",
      icon: <FaUsers />,
      end: false,
    },
    {
      to: "/admin/enrollments",
      text: "Enrollments",
      icon: <FaClipboardList />,
      end: false,
    },
    {
      to: "/admin/materials",
      text: "Materials",
      icon: <FaFolderOpen />,
      end: false,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
 return ( <> {!sidebarOpen && ( 
   <div className="position-fixed top-0 start-0" style={{ zIndex: 3000, padding: "14px" }}>
        <button onClick={toggleSidebar} className=" btn border-0 shadow-lg d-flex align-items-center justify-content-center rounded-3"
            style={{ width: "46px", height: "46px", background:"linear-gradient(180deg, #58111A 0%, #2b070c 100%)", color: "#fff", transition: "all 0.25s ease",}}>
            <FaBars size={18} />
          </button>
        </div>
      )}
      <aside
        className="
          position-fixed
          top-0
          start-0
          vh-100
          d-flex
          flex-column
          justify-content-between
          text-light
          shadow-lg
        "
        style={{
          width: "260px",
          zIndex: 2050,
          padding: "24px 18px",
          background:
            "linear-gradient(180deg, #1d090b 0%, #0d0203 100%)",
          borderRight:
            "1px solid rgba(255,255,255,0.05)",
          transform: sidebarOpen
            ? "translateX(0)"
            : "translateX(-100%)",
          transition: "all 0.3s ease",
        }}
      >
        <div>
          <div className="d-flex align-items-center justify-content-between mb-5">
            <div>
              <h5
                className="fw-bold mb-1"
                style={{
                  letterSpacing: "0.5px",
                }}
              >
                Admin Panel
              </h5>
              <span
                className="text-light opacity-50 small"
                style={{
                  fontSize: "11px",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}>
                Management System
              </span>

            </div>

            <button
              onClick={toggleSidebar}
              className="
                btn
                btn-sm
                border-0
                text-light
                d-flex
                align-items-center
                justify-content-center
              "
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "12px",
                background:
                  "rgba(255,255,255,0.06)",
              }}
            >
              <FaBars size={15} />
            </button>
          </div>
          {/* NAVIGATION */}
          <nav>

            <ul className="nav flex-column gap-2 list-unstyled">

              {navigationLinks.map((link, index) => (

                <li key={index}>

                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      `
                        nav-link
                        d-flex
                        align-items-center
                        gap-3
                        px-3
                        py-3
                        rounded-4
                        text-light
                        fw-medium
                        sidebar-link
                        ${isActive ? "sidebar-active" : ""}
                      `
                    }
                  >
                    <div
                      className="
                        d-flex
                        align-items-center
                        justify-content-center
                        rounded-3
                      "
                      style={{
                        width: "42px",
                        height: "42px",
                        background:
                          "rgba(255,255,255,0.06)",
                        flexShrink: 0,
                      }}
                    >
                     <span className="fs-6">
                        {link.icon}
                      </span>
                    </div>
                    <div className="d-flex flex-column">
                      <span
                        className="fw-semibold"
                        style={{
                          fontSize: "14px",
                        }}
                      >
                        {link.text}
                      </span>
                    </div>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div>

          <div
            className="mb-4"
            style={{
              height: "1px",
              background:
                "rgba(255,255,255,0.08)",
            }}
          />
          <button
            onClick={handleLogout}
            className="
              btn
              w-100
              border-0
              d-flex
              align-items-center
              gap-3
              px-3
              py-3
              rounded-4
              text-light
              logout-btn
            "
            style={{
              background:
                "rgba(255,255,255,0.04)",
            }}
          >

            <div
              className="
                d-flex
                align-items-center
                justify-content-center
                rounded-3
              "
              style={{
                width: "42px",
                height: "42px",
                background:
                  "rgba(220,53,69,0.12)",
                color: "#ff6b6b",
                flexShrink: 0,
              }}
            >

              <FaSignOutAlt />

            </div>

            <div className="text-start">

              <div
                className="fw-semibold"
                style={{
                  fontSize: "14px",
                }}
              >
                Logout
              </div>

              <small className="text-light opacity-50">
                Exit dashboard
              </small>

            </div>

          </button>

        </div>

      </aside>

      <style>{`

        .sidebar-link {
          transition: all 0.25s ease;
          opacity: 0.82;
        }

        .sidebar-link:hover {
          background: rgba(255,255,255,0.05);
          transform: translateX(4px);
          opacity: 1;
        }

        .sidebar-active {
          background:
            linear-gradient(
              135deg,
              rgba(114,47,55,0.95),
              rgba(58,15,21,0.95)
            ) !important;

          box-shadow:
            0 10px 25px rgba(0,0,0,0.22);
        }

        .logout-btn {
          transition: all 0.25s ease;
        }

        .logout-btn:hover {
          background:
            rgba(220,53,69,0.08) !important;

          transform: translateX(4px);
        }

        @media (max-width: 767px) {
          body.has-admin-sidebar {
            padding-top: 64px;
          }
        }

      `}</style>
    </>
  );
}