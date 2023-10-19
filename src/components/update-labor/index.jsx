import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import reportServices from "../../services/ReportService";
import toast, { Toaster } from "react-hot-toast";
import laborServices from "../../services/LaborService";
import patientServices from "../../services/PatientService";

export default function UpdateLabor() {
  const { laborantId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    hospitalId: "",
    password: "",
  });

  const getLaborById = async () => {
    const res = await laborServices.getLaborById(laborantId);
    console.log("res , ", res.data.laborDto);
    setFormData(res.data.laborDto);
    setFormData((prevState) => {
      const { reportDtoList, ...rest } = prevState; // password alanını çıkar, geri kalanını al
      return rest;
    });

    console.log("formdata : ", formData);
  };

  useEffect(() => {
    getLaborById();
  }, []);

  const handleSubmit = async () => {
    toast.loading("Laborant güncelleniyor...");
    const res = await laborServices.updateLabor(laborantId, formData);
    if (res.data.message === "Labor updated successfully") {
      toast.dismiss();
      toast.success("Labor Başarıyla kaydedildi");
      setTimeout(() => {
        navigate("/laborant");
      }, 1000);
    } else {
      toast.dismiss();
      toast.error(res.data.message);
    }
  };

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

      <h2 className="text-2xl font-semibold mb-6">Yeni Labor Girişi</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {" "}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Labor Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Labor Soyadı
              </th>
              <th scope="col" className="px-6 py-3">
                Laborant Hastane No
              </th>
              <th scope="col" className="px-6 py-3">
                Şifre
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
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen dosya numarasını giriniz"
                  required=""
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen teşhisi yazınız"
                  required=""
                />
              </td>

              <td>
                <div className="px-6 py-3  border-t-0  flex items-center justify-center h-[80px]">
                  <input
                    name="hospitalId"
                    value={formData.hospitalId}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Hastane numarasını giriniz"
                    required=""
                  />
                </div>
              </td>

              <td className="px-6 py-4">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lütfen şifre belirleyiniz"
                  required=""
                />
              </td>

              <td className="px-6 py-4">
                <button
                  className="bg-orange-500 px-6 py-2 font-semibold text-white
      "
                  onClick={handleSubmit}
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
