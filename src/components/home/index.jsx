import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import laborServices from "../../services/LaborService";

export default function Home() {
  const [data, setData] = useState();
  const [searchInput, setSearchInput] = useState();
  const [searchLabors, setSearchLabors] = useState([]);
  console.log("data", data);
  console.log("searchLabors", searchLabors);

  const findAllLabor = async () => {
    const res = await laborServices
      .getAllLabor()
      .then((res) => setData(res.data.laborDtoList))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    findAllLabor();
  }, []);

  const getLaborWithHospitalId = async (hospitalId) => {
    const res = await laborServices
      .getLaborWithHospitalId(hospitalId)
      .then((res) => {
        console.log("HospitailId : ", res);
        setSearchLabors([res.data.laborDto]);
      })
      .catch((err) => console.log("err : ", err));
  };

  useEffect(() => {
    setSearchLabors([]);
    getLaborWithHospitalId(searchInput);
  }, [searchInput]);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Laborant</h2>

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
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
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

          <Link
            to="new"
            className="bg-orange-500 text-white font-semibold px-6 py-2 "
          >
            Yeni Laborant Ekle
          </Link>
        </div>

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
                Labor Hastane Numarası
              </th>
              <th scope="col" className="px-6 py-3">
                Patient
              </th>

              <th>Laborant</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>

          <tbody>
            {!searchInput &&
              data?.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.firstName}
                    </th>
                    <td className="px-6 py-4">{item.lastName}</td>
                    <td className="px-6 py-4">{item.hospitalId}</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">
                      <Link to="/patient-detail">Hasta</Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <Link to={`update/${item.id}`}>
                          <AiTwotoneEdit size={24} className="text-blue-500" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                </>
              ))}

            {searchLabors &&
              searchLabors?.map((item) => (
                <>
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.firstName}
                    </th>
                    <td className="px-6 py-4">{item.lastName}</td>
                    <td className="px-6 py-4">{item.hospitalId}</td>
                    <td className="px-6 py-4">$2999</td>
                    <td className="px-6 py-4">
                      <Link to="/patient-detail">Hasta</Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center gap-2 w-full justify-center">
                        <AiTwotoneEdit size={24} className="text-blue-500" />
                      </div>
                    </td>
                  </tr>
                </>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
