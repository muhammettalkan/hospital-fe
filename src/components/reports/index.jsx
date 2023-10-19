import React, { useEffect, useState } from "react";
import { AiTwotoneEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import reportServices from "../../services/ReportService";
import patientServices from "../../services/PatientService";
import { FaSortDown, FaSortUp } from "react-icons/fa";
import laborServices from "../../services/LaborService";
import Modal from "react-modal";
import { CgDetailsMore } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import moment from "moment";

export default function Reports() {
  const [reports, setReports] = useState([]);
  const [orderStatu, setOrderStatu] = useState("desc");
  const [orderReports, setOrderReports] = useState();
  const [modalContent, setModalContent] = useState();
  const [orderSelector, setOrderSelector] = useState();
  const [searchInput, setSearchInput] = useState();
  const [searchReports, setSearchReports] = useState();

  console.log("SearchInput ", searchInput);
  console.log("orderSelector", orderSelector);
  const getAllReport = async () => {
    const res = reportServices
      .findAllReports()
      .then((res) => {
        console.log("res", res.data.dataList);
        setReports(res.data.dataList);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllReport();
  }, []);

  useEffect(() => {}, [reports]);

  const deleteReport = async (reportId) => {
    const res = await reportServices
      .deleteReport(reportId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    getAllReport();
  };

  const orderReportByDate = async (orderStatu) => {
    const res = await reportServices
      .orderReportByDate(orderStatu)
      .then((res) => {
        console.log("Sıralama dönen : ", res.data.dataList);
        setOrderReports(res.data.dataList);
      })
      .catch((err) => console.log(err));
    return res;
  };

  const sortByDate = () => {
    if (orderStatu === "desc") {
      setOrderStatu("asc");
      orderReportByDate(orderStatu);
    } else {
      setOrderStatu("desc");
      setOrderReports([]);
    }
  };

  const searchOrder = async () => {
    const fullName = searchInput;
    const parts = fullName?.split(" ");
    let firstName;
    let lastName;
    if (parts) {
      firstName = parts[0];
      lastName = parts[1];
    }
    if (orderSelector === "laborNameSurname") {
      try {
        const res = await reportServices.findReportLaborNameAndSurname(
          firstName,
          lastName
        );
        console.log("Arama : ", res);
        if (res.data.message === "Reports found successfully") {
          setSearchReports(res.data.dataList);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (orderSelector === "patientNameSurname") {
      try {
        const res = await reportServices.findByPatientNameAndSurname(
          firstName,
          lastName
        );
        console.log("Arama : ", res);
        if (res.data.message === "Reports found successfully") {
          setSearchReports(res.data.dataList);
        }
      } catch (err) {
        console.log(err);
      }
    } else if (orderSelector === "patientTC") {
      try {
        const res = await reportServices.findPatientByNationalId(searchInput);
        console.log("Arama : ", res);
        if (res.data.message === "Reports found successfully") {
          setSearchReports(res.data.dataList);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    if (searchInput) {
      searchOrder();
    } else {
      setSearchInput("");
      setSearchReports();
    }
  }, [searchInput]);

  ///// MODAL ////////
  const customStyles = {
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      backgroundColor: "transparent",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
    overlay: {
      backgroundColor: "#2a9cf466",
      zIndex: 1000,
      opacity: 1,
    },
  };

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="bg-white shadow-2xl px-4 py-8">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <RxCross2 />
          </button>
          <h6 className="font-semibold text-base">Diagnosis Detail</h6>
          <p>{modalContent}</p>
        </div>
      </Modal>

      <h2 className="text-2xl font-semibold mb-6">Raporlar</h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <form className="w-1/3">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Arama"
                required=""
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>

          <select
            id="countries"
            onClick={(e) => setOrderSelector(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Lütfen Arama Kriterini seçiniz</option>
            <option value="laborNameSurname">Labor Ad / Soyad</option>
            <option value="patientNameSurname">Hasta Ad / Soyad</option>
            <option value="patientTC">Hasta TC No</option>
          </select>

          <Link
            to="new"
            className="bg-orange-500 text-white font-semibold px-6 py-2 "
          >
            Yeni Rapor Ekle
          </Link>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                File Number
              </th>
              <th scope="col" className="px-6 py-3">
                Diagnosis
              </th>
              <th scope="col" className="px-6 py-3">
                Diagnosis Detail
              </th>
              <th scope="col" className="px-6 py-3" onClick={sortByDate}>
                <div className="flex items-center gap-1">
                  Date
                  {orderStatu === "asc" && <FaSortDown />}
                  {orderStatu === "desc" && <FaSortUp />}
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Report Photo
              </th>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>

              <th>Laborant</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>

          <tbody>
            {!searchReports &&
              orderStatu === "desc" &&
              reports?.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap dark:text-white"
                  >
                    {item.fileNumber}
                  </th>
                  <td className="px-6 py-4">{item.diagnosis}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <CgDetailsMore
                        size={30}
                        onClick={() => {
                          openModal();
                          setModalContent(item.diagnosisDetail);
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.date).format("DD.MM.YYYY HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={item.reportPhotoUrl}
                      alt=""
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="px-6 py-4">{item.patientFullName}</td>
                  <td className="px-6 py-4">{item.laborFullName}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center">
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-red-200">
                        <MdDelete
                          size={24}
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteReport(item.id)}
                        />
                      </div>
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-blue-200 cursor-pointer">
                        <Link to={`update/${item.id}`}>
                          <AiTwotoneEdit size={24} className="text-blue-500" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

            {!searchReports &&
              orderStatu === "asc" &&
              orderReports?.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap dark:text-white"
                  >
                    {item.fileNumber}
                  </th>
                  <td className="px-6 py-4">{item.diagnosis}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <CgDetailsMore
                        size={30}
                        onClick={() => {
                          openModal();
                          setModalContent(item.diagnosisDetail);
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.date).format("DD.MM.YYYY HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={item.reportPhotoUrl}
                      alt=""
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="px-6 py-4">{item.patientFullName}</td>
                  <td className="px-6 py-4">{item.laborFullName}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center">
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-red-200">
                        <MdDelete
                          size={24}
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteReport(item.id)}
                        />
                      </div>
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-blue-200 cursor-pointer">
                        <Link to={`update/${item.id}`}>
                          <AiTwotoneEdit size={24} className="text-blue-500" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}

            {searchReports &&
              searchReports?.map((item, index) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap dark:text-white"
                  >
                    {item.fileNumber}
                  </th>
                  <td className="px-6 py-4">{item.diagnosis}</td>
                  <td>
                    <div className="flex items-center justify-center">
                      <CgDetailsMore
                        size={30}
                        onClick={() => {
                          openModal();
                          setModalContent(item.diagnosisDetail);
                        }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {moment(item.date).format("DD.MM.YYYY HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={item.reportPhotoUrl}
                      alt=""
                      className="h-10 w-10"
                    />
                  </td>
                  <td className="px-6 py-4">{item.patientFullName}</td>
                  <td className="px-6 py-4">{item.laborFullName}</td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center">
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-red-200">
                        <MdDelete
                          size={24}
                          className="text-red-500 cursor-pointer"
                          onClick={() => deleteReport(item.id)}
                        />
                      </div>
                      <div className="flex items-center px-2 py-2 rounded-full w-full justify-center hover:bg-blue-200 cursor-pointer">
                        <Link to={`update/${item.id}`}>
                          <AiTwotoneEdit size={24} className="text-blue-500" />
                        </Link>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
