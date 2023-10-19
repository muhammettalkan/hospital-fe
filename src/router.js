import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import Layout from "./layout";
import PatienDetailPage from "./pages/patient-detail";
import PatientPage from "./pages/patient";
import NewPatientPage from "./pages/new-patient";
import ReportsPage from "./pages/reports/idnex";
import NewReportPage from "./pages/new-report";
import NewLaborantPage from "./pages/new-laborant";
import UpdateReportPage from "./pages/update-report";
import UpdateLabor from "./pages/update-labor";
import UpdateLaborPage from "./pages/update-labor";
import UpdatePatientPage from "./pages/update-patient";
import ReadMe from "./components/read-me";

export default function Router() {
  return (
    <React.Suspense>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <Layout>
              <ReadMe />
            </Layout>
          }
        />

        <Route
          path="/laborant"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        <Route
          path="/laborant/update/:laborantId"
          element={
            <Layout>
              <UpdateLaborPage />
            </Layout>
          }
        />

        <Route
          path="/laborant/new"
          element={
            <Layout>
              <NewLaborantPage />
            </Layout>
          }
        />

        <Route
          path="/patient-detail"
          element={
            <Layout>
              <PatienDetailPage />
            </Layout>
          }
        />

        <Route
          path="/patients"
          element={
            <Layout>
              <PatientPage />
            </Layout>
          }
        />

        <Route
          path="/patients/new"
          element={
            <Layout>
              <NewPatientPage />
            </Layout>
          }
        />
        <Route
          path="/patients/update/:patientId"
          element={
            <Layout>
              <UpdatePatientPage />
            </Layout>
          }
        />

        <Route
          path="/reports"
          element={
            <Layout>
              <ReportsPage />
            </Layout>
          }
        />

        <Route
          path="/reports/update/:reportId"
          element={
            <Layout>
              <UpdateReportPage />
            </Layout>
          }
        />

        <Route
          path="/reports/new"
          element={
            <Layout>
              <NewReportPage />
            </Layout>
          }
        />
      </Routes>
    </React.Suspense>
  );
}
