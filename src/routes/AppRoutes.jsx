import { Routes, Route, Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import CourseDetails from "../pages/CourseDetails";

import StudentDashboard from "../pages/StudentDashboard";
import MyCourses from "../pages/MyCourses";
import CourseMaterials from "../pages/CourseMaterials";

import AdminDashboard from "../pages/admin/AdminDashboard";

import ManageCourses from "../pages/admin/ManageCourses";
import NewCourse from "../pages/admin/NewCourse";
import EditCourse from "../pages/admin/EditCourse";

import ManageStudents from "../pages/admin/ManageStudents";
import AddStudent from "../pages/admin/AddStudent";
import EditStudent from "../pages/admin/EditStudent";

import ManageEnrollments from "../pages/admin/ManageEnrollments";
import AddEnrollment from "../pages/admin/AddEnrollment";
import EditEnrollment from "../pages/admin/EditEnrollment";

import ManageMaterials from "../pages/admin/ManageMaterials";
import NewMaterialLink from "../pages/admin/NewMaterialLink";
import EditMaterial from "../pages/admin/EditMaterial";

function PublicLayout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/courses/:id"
          element={<CourseDetails />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/materials/:courseId"
          element={
            <ProtectedRoute>
              <CourseMaterials />
            </ProtectedRoute>
          }
        />

      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly={true}>
            <Outlet />
          </ProtectedRoute>
        }
      >

        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="courses"
          element={<ManageCourses />}
        />

        <Route
          path="newcourse"
          element={<NewCourse />}
        />

        <Route
          path="edit-course/:id"
          element={<EditCourse />}
        />

        <Route
          path="students"
          element={<ManageStudents />}
        />

        <Route
          path="students/new"
          element={<AddStudent />}
        />

        <Route
          path="edit-student/:id"
          element={<EditStudent />}
        />

        <Route
          path="enrollments"
          element={<ManageEnrollments />}
        />

        <Route
          path="enrollments/new"
          element={<AddEnrollment />}
        />

        <Route
          path="edit-enrollment/:id"
          element={<EditEnrollment />}
        />

        <Route
          path="materials"
          element={<ManageMaterials />}
        />

        <Route
          path="materials/new"
          element={<NewMaterialLink />}
        />

        <Route
          path="edit-material/:id"
          element={<EditMaterial />}
        />

      </Route>

    </Routes>
  );
}