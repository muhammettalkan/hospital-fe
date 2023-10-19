import axios from "axios";
import React, { useEffect, useState } from "react";
import reportServices from "../../services/ReportService";
import patientServices from "../../services/PatientService";
import laborServices from "../../services/LaborService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewReport() {
  const [patients, setPatients] = useState([]);
  const [labors, setLabors] = useState([]);
  console.log("patients", patients);
  console.log("labors", labors);
  const [formData, setFormData] = useState({
    fileNumber: "",
    diagnosis: "",
    diagnosisDetail: "",
    reportPhotoUrl: "",
    patientId: "",
    laborId: "",
  });
  const navigate = useNavigate();

  const addReport = async () => {
    toast.loading("Kayıt Yapılıyor...");

    try {
      const res = await reportServices.createReport(formData);
      console.log("res: ", res);
      if (res.data.message === "Report created successfully") {
        toast.dismiss();
        toast.success("Rapor başarıyla kaydedildi");
        setFormData({
          fileNumber: "",
          diagnosis: "",
          diagnosisDetail: "",
          reportPhotoUrl: "",
          patientId: "",
          laborId: "",
        });
        setTimeout(() => {
          navigate("/reports");
        }, 1000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getAllLabors = async () => {
    const res = await laborServices
      .getAllLabor()
      .then((res) => {
        console.log("res", res);
        setLabors(res.data.laborDtoList);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllLabors();
  }, []);

  const getAllPatiens = async () => {
    const res = await patientServices
      .getAllPatients()
      .then((res) => setPatients(res.data.dataList))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllPatiens();
  }, []);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      <h2 className="text-2xl font-semibold mb-6">Yeni Rapor Girişi</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {" "}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Dosya Numarası
              </th>
              <th scope="col" className="px-6 py-3">
                Teşhis
              </th>
              <th scope="col" className="px-6 py-3">
                Teşhis Detayı
              </th>

              <th scope="col" className="px-6 py-3">
                Rapor Fotoğrafı
              </th>

              <th scope="col" className="px-6 py-3">
                Hasta
              </th>

              <th scope="col" className="px-6 py-3">
                Labor Id
              </th>

              <th scope="col" className="px-6 py-3">
                Kaydet
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="px-6 py-4">
                <input
                  name="fileNumber"
                  value={formData.fileNumber}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen dosya numarasını giriniz"
                  required=""
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="diagnosis"
                  value={formData.diagnosis}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen teşhisi yazınız"
                  required=""
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="diagnosisDetail"
                  value={formData.diagnosisDetail}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen teşhisin detayını giriniz"
                  required=""
                />
              </td>

              <td>
                <div className="px-6 py-3  border-t-0 flex items-center justify-center h-[80px] ">
                  <input
                    name="reportPhotoUrl"
                    value={formData.reportPhotoUrl}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Photo url"
                    required=""
                  />
                </div>
              </td>

              <td>
                <div className="px-6 py-3  border-t-0 flex items-center justify-center h-[80px]">
                  <select
                    name="patientId"
                    value={formData.patientId}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected className="!text-xs">
                      Hastayı Seçiniz
                    </option>
                    {patients?.map((item) => (
                      <>
                        <option value={item.id}>
                          {item.firstName} {item.lastName}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </td>

              <td>
                <div className="px-6 py-3  border-t-0  flex items-center justify-center h-[80px]">
                  <select
                    name="laborId"
                    value={formData.laborId}
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected className="!text-xs">
                      Labor Seçiniz
                    </option>
                    {labors?.map((item) => (
                      <>
                        <option value={item.id}>
                          {item.firstName} {item.lastName}
                        </option>
                      </>
                    ))}
                  </select>
                </div>
              </td>

              <td className="px-6 py-4">
                <button
                  className="bg-orange-500 px-6 py-2 font-semibold text-white"
                  onClick={addReport}
                >
                  Kaydet
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

/*
<input type="datetime-local" id="creationDate" name="creationDate">
*/
