import React, { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import { API_BASE_URL } from '../../config';
import api from "../services/api";
export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = async () => {
    try {
      const response = await api.get("/courses");
      setCourses(response.data);
    } catch (error) {
      console.log("Catalog fetch exception:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white min-vh-100">
      <header 
        className="d-flex align-items-center text-white position-relative overflow-hidden w-100 px-3" 
        style={{ 
          minHeight: 'calc(100vh - 77px)', 
          background: 'linear-gradient(135deg, #3b0b11 0%, #58111A 60%, #722F37 100%)' 
        }}
      >
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <span className="badge bg-white text-dark text-uppercase px-3 py-2 rounded-pill fw-extrabold mb-3 shadow-sm" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#58111A' }}>
                 Premium Academy Systems
              </span>
              <h1 className="display-4 fw-extrabold mb-3 tracking-tight text-white lh-sm">
                Advance Your Skills With Professional Training Tracks
              </h1>
              <p className="lead opacity-90 mb-4 fw-normal" style={{ maxWidth: '650px', fontSize: '1.2rem' }}>
                Browse our expert-led modules, choose your next educational vector, and connect directly with us to acquire manual platform credentials and start your classes.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
                <a href="#courses-section" className="btn btn-light fw-bold px-4 py-3 rounded-3 shadow-lg fs-5" style={{ color: '#58111A' }}>
                  Explore Courses ↓
                </a>
                <a href="#about-section" className="btn btn-outline-light border-2 fw-bold px-4 py-3 rounded-3 fs-5">
                  Learn About Us
                </a>
              </div>
            </div>
            <div className="col-lg-6 text-center d-none d-lg-block">
              <div className="position-relative rounded-4 overflow-hidden shadow-lg border border-white border-opacity-10" style={{ height: '450px', backgroundColor: "rgba(0,0,0,0.15)" }}>
                <img
                  src="${API_BASE_URL}/uploads/platformm.jpg"
                  alt="Online Courses"
                  className="w-100 h-100"
                  style={{ objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const offlinePlaceholder = e.target.nextSibling;
                    if (offlinePlaceholder) offlinePlaceholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="w-100 h-100 flex-column align-items-center justify-content-center text-white text-opacity-70"
                  style={{ display: "none", backgroundColor: "rgba(88, 17, 26, 0.4)", backdropFilter: "blur(10px)" }}
                >
                  <div className="font-monospace mb-2" style={{ fontSize: "5rem" }}>&lt;/&gt;</div>
                  <h4 className="fw-bold tracking-wide">Academic Catalog Vector</h4>
                  <p className="small opacity-75 mb-0">Local backend configuration active</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="position-absolute end-0 bottom-0 p-5 opacity-10 d-none d-lg-block fs-1 font-monospace select-none" style={{ fontSize: '18rem', transform: 'translate(40px, 80px)' }}>
          &lt;/&gt;
        </div>
      </header>
      <section className="py-4 position-relative overflow-hidden bg-white"id="about-section">
      < div className="position-absolute top-0 start-0 w-100 h-100"
    style={{
      background:
        "radial-gradient(circle at top left, rgba(88,17,26,0.05), transparent 30%)",
      zIndex: 0,
    }}
  />
  <div
    className="container position-relative py-4"
    style={{ zIndex: 2 }}
  >
    <div className="text-center mb-4">
      <span
        className="px-3 py-2 rounded-pill fw-bold small"
        style={{
          backgroundColor:
            "rgba(88,17,26,0.08)",
          color: "#58111A",
          letterSpacing: "1px",
        }}
      >
        ABOUT US
      </span>

      <h2
        className="fw-bold mt-3 mb-3"
        style={{
          color: "#1f1f1f",
          fontSize: "clamp(1.9rem,4vw,3rem)",
        }}
      >
        Learn Modern Skills
        <span style={{ color: "#58111A" }}>
          {" "}
          With Confidence
        </span>
      </h2>

      <p
        className="text-secondary mx-auto mb-0"
        style={{
          maxWidth: "650px",
          lineHeight: "1.8",
          fontSize: "0.97rem",
        }}
      >
        Explore professional courses, contact us directly through
        WhatsApp, and instantly access organized learning materials
        through your personal dashboard.
      </p>

    </div>

    <div className="row g-4 align-items-stretch">
      <div className="col-lg-6">
        <div
          className="h-100 rounded-5 p-4 shadow-sm position-relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #58111A 0%, #2d080d 100%)",
          }}
        >
          <div
            className="position-absolute top-0 end-0"
            style={{
              width: "160px",
              height: "160px",
              background:
                "rgba(255,255,255,0.05)",
              borderRadius: "50%",
              transform:
                "translate(40%, -40%)",
            }}
          />
          <span
            className="badge rounded-pill px-3 py-2 mb-3"
            style={{
              backgroundColor:
                "rgba(255,255,255,0.12)",
              color: "#fff",
            }}
          >
            OUR MISSION
          </span>
          <h3
            className="fw-bold text-white mb-3"
            style={{
              fontSize: "1.7rem",
              lineHeight: "1.4",
            }}
          >
            Building Better Digital Learning Experiences.
          </h3>
          <p
            className="mb-0"
            style={{
              color: "rgba(255,255,255,0.8)",
              lineHeight: "1.8",
              fontSize: "0.95rem",
            }}
          >
            We help students learn modern technical skills through
            structured courses, direct communication, and organized
            educational resources.
          </p>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="h-100 bg-white rounded-5 shadow-sm border p-4">
          <h4
            className="fw-bold mb-4"
            style={{ color: "#58111A" }}
          >
            How It Works
          </h4>

          <div className="d-flex flex-column gap-4">
            {[
              {
                num: "1",
                title: "Choose a Course",
                text: "Browse modern professional courses from our catalog.",
              },

              {
                num: "2",
                title: "Contact via WhatsApp",
                text: "Send your enrollment request instantly and securely.",
              },

              {
                num: "3",
                title: "Start Learning",
                text: "Access your dashboard and download course materials.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="d-flex align-items-start gap-3"
              >
                <div
                  className="rounded-circle d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg, #58111A 0%, #7b1e2c 100%)",
                    color: "#fff",
                    boxShadow:
                      "0 8px 20px rgba(88,17,26,0.18)",
                  }}
                >
                  {item.num}
                </div>
                <div>
                  <h6 className="fw-bold mb-1">
                    {item.title}
                  </h6>
                  <p
                    className="text-secondary mb-0"
                    style={{
                      lineHeight: "1.7",
                      fontSize: "0.93rem",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>

  </div>
</section>
      <section className="py-5 bg-light border-top scroll-margin-top" id="courses-section" style={{ minHeight: '100vh' }}>
        <div className="container py-5">
          <div className="text-center mb-5">
            <h2 className="fw-extrabold text-dark mb-2 position-relative d-inline-block pb-3 display-5">
              Available Training Modules
              <span className="position-absolute bottom-0 start-50 translate-middle-x rounded-pill" style={{ width: '80px', height: '5px', backgroundColor: '#58111A' }}></span>
            </h2>
            <p className="text-muted mt-2 mx-auto fs-5" style={{ maxWidth: '600px' }}>Select your ideal study program and securely register interest via WhatsApp.</p>
          </div>
          {loading ? (
            <div className="text-center py-5 my-5">
              <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#58111A' }}></div>
            </div>
          ) : (
            <div className="row g-4 justify-content-center">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <CourseCard
                    key={course.id || course.course_id}
                    course={course}
                  />
                ))
              ) : (
                <div className="text-center py-5">
                  <h4 className="text-secondary fw-bold">No modules are currently live.</h4>
                  <p className="text-muted small">Check back later or contact support lines for asset deployment updates.</p>
                </div>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
}