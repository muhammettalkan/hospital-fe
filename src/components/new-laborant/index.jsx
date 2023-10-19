import React, { useEffect, useState } from "react";
import patientServices from "../../services/PatientService";
import reportServices from "../../services/ReportService";
import laborServices from "../../services/LaborService";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function NewLaborant() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    hospitalId: "",
    password: "",
  });

  const handleSubmit = async () => {
    toast.loading("Laborant ekleniyor...");
    const res = await laborServices
      .createLabor(formData)
      .then((res) => {
        console.log(res);
        toast.dismiss();
        if (res.data.message === "Labor created successfully") {
          toast.success("Labor Başarıyla kaydedildi");
          setFormData({
            firstName: "",
            lastName: "",
            hospitalId: "",
            password: "",
          });
          navigate("/labors");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const addLabor = async () => {
    const res = laborServices
      .createLabor(formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    return res;
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
