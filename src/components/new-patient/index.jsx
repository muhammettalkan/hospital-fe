import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { converFormData } from "../../utils/helpers";
import PatientService from "../../services/PatientService";
import toast, { Toaster } from "react-hot-toast";

export default function NewPatient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalId: "",
    password: "",
  });

  const addPatient = async () => {
    toast.loading("Kayıt Yapılıyor...");
    // const fd = converFormData(formData);
    const res = await axios
      .post("http://localhost:9087/patients/create", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast.dismiss();
        toast.success("Hasta Kayıt İşlemi Başarılı");
        setFormData({
          firstName: "",
          lastName: "",
          nationalId: "",
          password: "",
        });
      })
      .catch((err) => toast.error(err));
  };

  // Fomra herhangi bir veri girişi olunca tetiklenecek olan fonksiyon
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
      <h2 className="text-2xl font-semibold mb-6">Yeni Hasta Girişi</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {" "}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hasta Adı
              </th>
              <th scope="col" className="px-6 py-3">
                Hasta Soyadı
              </th>
              <th scope="col" className="px-6 py-3">
                TC. No
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
                  placeholder="Hasta adını giriniz"
                  required=""
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Hastanın Soyadını Giriniz"
                  required=""
                />
              </td>
              <td className="px-6 py-4">
                <input
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Hastanın TC nosunu Giriniz"
                  required=""
                />
              </td>

              <td className="px-6 py-4">
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Hastanın Şifresini Giriniz"
                  required=""
                />
              </td>

              <td className="px-6 py-4">
                <button
                  className="bg-orange-500 px-6 py-2 font-semibold text-white
              "
                  onClick={addPatient}
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
