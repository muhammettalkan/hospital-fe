import axios from "axios";
import { act } from "react-dom/test-utils";
import { Await } from "react-router-dom";

const createReport = async (data) => {
  const url = "http://localhost:9087/reports/create";
  const res = await axios.post(url, data);
  return res;
};

const findByPatientNameAndSurname = async (firstName, lastName) => {
  const url = `http://localhost:9087/reports/find-by-patient-name/${firstName}/${lastName}`;
  const res = await axios.get(url);
  return res;
};

const findPatientByNationalId = async (nationalId) => {
  const url = "http://localhost:9087/reports/find-patient";
  const params = {
    nationalId: nationalId,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const updateReport = async (reportId, data) => {
  const url = "http://localhost:9087/reports/update";
  const params = {
    id: reportId,
  };
  const res = await axios.put(url, data, {
    params: params,
  });
  return res;
};

const deleteReport = async (reportId) => {
  const url = "http://localhost:9087/reports/delete";
  const params = {
    id: reportId,
  };
  const res = await axios.delete(url, {
    params: params,
  });
  return res;
};

const findReportByPatientNationalId = async (nationalId) => {
  const url = `http://localhost:9087/reports/find-patient`;
  const params = {
    nationalId: nationalId,
  };

  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const findAllPatients = async () => {
  const url = "http://localhost:9087/reports/find-patient";
};

const findAllReports = async () => {
  const url = "http://localhost:9087/reports";
  const res = await axios.get(url);
  return res;
};

const orderReportByDate = async (orderStatu) => {
  const url = "http://localhost:9087/reports/find-all-by-order";
  const params = {
    orderBy: orderStatu,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;

  // asc - desc
};

const getPhotoUrl = async () => {
  const url = "http://localhost:9087/reports/photo-url";
  const res = await axios.get(url);
  return res;
};

const getReportById = async (reportId) => {
  const url = "http://localhost:9087/reports/find-by-id";
  const params = {
    id: reportId,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const findReportLaborNameAndSurname = async (firstName, lastName) => {
  const url = `http://localhost:9087/reports/find-by-labor-name/${firstName}/${lastName}`;
  const res = await axios.get(url);
  return res;
};

const reportServices = {
  createReport,
  updateReport,
  deleteReport,
  findByPatientNameAndSurname,
  findReportByPatientNationalId,
  findAllPatients,
  findAllReports,
  findPatientByNationalId,
  orderReportByDate,
  getPhotoUrl,
  getReportById,
  findReportLaborNameAndSurname,
};
export default reportServices;
