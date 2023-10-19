import axios from "axios";
const createLabor = async (data) => {
  const url = "http://localhost:9087/labors/create";
  const res = await axios.post(url, data);
  return res;
};

const getAllLabor = async () => {
  const url = "http://localhost:9087/labors";
  const res = await axios.get(url);
  return res;
};

const getLaborWithHospitalId = async (hospitalId) => {
  const url = "http://localhost:9087/labors/hospital-id";
  const params = {
    id: hospitalId,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const login = async (data) => {
  const url = "http://localhost:9087/labors/login";
  const res = await axios.post(url, data);
  return res;
};

const getLaborById = async (id) => {
  const url = "http://localhost:9087/labors/find-by-id";
  const params = {
    id: id,
  };
  const res = await axios.get(url, {
    params: params,
  });
  return res;
};

const updateLabor = async (id, data) => {
  const url = `http://localhost:9087/labors/${id}/update`;
  const res = await axios.put(url, data);
  return res;
};

const laborServices = {
  getAllLabor,
  createLabor,
  getLaborWithHospitalId,
  login,
  getLaborById,
  updateLabor,
};
export default laborServices;
