import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import reportServices from "../../services/ReportService";
import { CgDetailsMore } from "react-icons/cg";
import moment from "moment";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import Modal from "react-modal";
import toast, { Toaster } from "react-hot-toast";
import patientServices from "../../services/PatientService";
import laborServices from "../../services/LaborService";

export default function UpdateReport() {
  const { reportId } = useParams();
  const [formData, setFormData] = useState({
    diagnosis: "",
    diagnosisDetail: "",
    reportPhotoUrl: "",
  });

  const navigate = useNavigate();

  const getReportById = async () => {
    const res = await reportServices.getReportById(reportId, formData);
    setFormData({
      diagnosis: res.data.data.diagnosis,
      diagnosisDetail: res.data.data.diagnosisDetail,
      reportPhotoUrl: res.data.data.reportPhotoUrl,
    });
  };

  useEffect(() => {
    getReportById();
  }, []);

  const updateReport = async () => {
    toast.loading("Rapor Güncelleniyor ");

    try {
      const res = await reportServices.updateReport(reportId, formData);
      console.log("res: ", res);
      if (res.data.message === "Report updated successfully") {
        toast.dismiss();
        toast.success("Rapor başarıyla güncellendi");
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
                Teşhis
              </th>
              <th scope="col" className="px-6 py-3">
                Teşhis Detayı
              </th>

              <th scope="col" className="px-6 py-3">
                Rapor Fotoğrafı
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

              <td className="px-6 py-4">
                <button
                  className="bg-orange-500 px-6 py-2 font-semibold text-white"
                  onClick={updateReport}
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
