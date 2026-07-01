import React, { useState } from "react";
import { API_BASE_URL } from '../config';
import { Link } from "react-router-dom";
import {
  FaClock,
  FaBookOpen,
  FaDollarSign
} from "react-icons/fa";
import WhatsAppButton from "./WhatsappButton";
export default function CourseCard({ course }) {
  const imageFile =
    course.image ||
    course.course_image;
  const basePrice = parseFloat(course.price || 0);

  const discount = parseFloat(
    course.discount || 0
  );

  const hasDiscount = discount > 0;
  const finalPrice =
    basePrice - discount;
  const courseStatus = String(
    course.status || "upcoming"
  ).toLowerCase();
  const isUpcoming =
    courseStatus === "upcoming";
  const isActive =
    courseStatus === "active";
  const [imgFailed, setImgFailed] =
    useState(false);
  return (
    <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch mb-4">
      <div className="card w-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative h-100">
        <div className="position-absolute top-0 start-0 m-3 z-3">

          <span
            className={`badge rounded-pill px-3 py-2 fw-bold shadow-sm ${
              isUpcoming
                ? "bg-warning text-dark"
                : "bg-success"
            }`}
            style={{
              fontSize: "11px",
              letterSpacing: "0.5px"
            }}
          >
            {isUpcoming
              ? "UPCOMING"
              : "ACTIVE"}
          </span>
        </div>
        <div className="position-absolute top-0 end-0 m-3 z-3">

          <span
            className="bg-white px-3 py-2 rounded-pill fw-bold shadow-sm border"
            style={{
              color: "#58111A",
              fontSize: "13px"
            }}
          >
            {hasDiscount ? (
              <>
                <span className="text-muted text-decoration-line-through me-1">
                  ${basePrice.toFixed(2)}
                </span>

                ${finalPrice.toFixed(2)}
              </>
            ) : (
              <>
                ${basePrice.toFixed(2)}
              </>
            )}
          </span>
        </div>
        <div
          className="position-relative overflow-hidden bg-light"
          style={{
            height: "220px"
          }}
        >
          {imageFile && !imgFailed ? (

            <img
              src={
                imageFile.startsWith("http")
                  ? imageFile
                  : `${API_BASE_URL}/uploads/${imageFile}`
              }
              alt={course.course_name}
              className="w-100 h-100"
              style={{
                objectFit: "cover"
              }}
              onError={() =>
                setImgFailed(true)
              }
            />
          ) : (
            <div
              className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{
                backgroundColor: "#f8f9fa"
              }}
            >
              <div
                className="fw-bold opacity-25"
                style={{
                  fontSize: "3rem",
                  color: "#58111A"
                }}
              >
                &lt;/&gt;
              </div>

              <span className="small text-muted fw-semibold">
                NO COURSE IMAGE
              </span>

            </div>

          )}

        </div>
        <div className="card-body d-flex flex-column p-4">
          <h5 className="fw-bold text-dark mb-2">
            {course.course_name ||
              course.title}
          </h5>
          <p
            className="text-secondary small mb-4 flex-grow-1"
            style={{
              lineHeight: "1.7"
            }}
          >
            {course.description ||
              "No course description available."}
          </p>
          <div className="d-flex flex-column gap-2 mb-4 small">

            <div className="d-flex align-items-center gap-2 text-muted">
              <FaClock size={12} />
              <span>
                {course.hours || 0} Hours
              </span>
            </div>

            <div className="d-flex align-items-center gap-2 text-muted">
              <FaBookOpen size={12} />
              <span>
                {course.lesson || 0} Lessons
              </span>
            </div>
            <div className="d-flex align-items-center gap-2 text-muted">
              <FaDollarSign size={12} />
              <span>
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="mt-auto d-flex flex-column gap-2">
            {isUpcoming ? (

              <button
                className="btn btn-warning fw-bold rounded-pill py-2"
                disabled
              >
                Upcoming Soon
              </button>

            ) : (

              <WhatsAppButton
                courseTitle={
                  course.course_name ||
                  course.title
                }
              />

            )}

        
            <Link
              to={`/courses/${
                course.course_id ||
                course.id
              }`}
              className="btn btn-link text-decoration-none fw-bold"
              style={{
                color: "#58111A",
                fontSize: "14px"
              }}
            >
              Review Detailed Syllabus →
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}