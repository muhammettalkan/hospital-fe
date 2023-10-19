import axios from "axios";

const addPatient = async (data) => {
  const url = "http://localhost:9087/patients/create";
  const res = await axios.post(url, data);
  return res;
};

const getPatientWithNationalId = async (id) => {
  const url = "http://localhost:9087/patients/national-id";
  const param = {
    nationalId: id,
  };

  const res = await axios.get(url, {
    params: param,
  });
  return res;
};

const getAllPatients = async () => {
  const url = "http://localhost:9087/patients";
  const res = await axios.get(url);
  return res;
};

const login = async (data) => {
  const url = "http://localhost:9087/patients/login";
  const res = await axios.post(url, data);
  return res;
};

const getPatientById = async (id) => {
  const url = "http://localhost:9087/patients/find-by-id";
  const params = {
    id: id,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const updatePatient = async (id, data) => {
  const url = `http://localhost:9087/patients/${id}/update`;
  const res = await axios.put(url, data);
  return res;
};

const patientServices = {
  addPatient,
  getPatientWithNationalId,
  getAllPatients,
  login,
  getPatientById,
  updatePatient,
};

export default patientServices;

/*
        headers: {
// "Content-Type": "multipart/form-data",
          "Content-Type": "application/json",
        }, */
