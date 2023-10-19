import React, { useState } from "react";
import patientServices from "../../services/PatientService";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useNavigate } from "react-router-dom";
import laborServices from "../../services/LaborService";
export default function Login() {
  const navigate = useNavigate();
  const [isLabor, setIsLabor] = useState("patient");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  console.log("form : ", formData);

  const loginPatient = async (e) => {
    e.preventDefault();

    if (isLabor === "patient") {
      toast.loading("Giriş Yapılıyor...");
      const res = await patientServices.login(formData);
      console.log(res);
      if (res.data.message === "Patient logged in successfully") {
        toast.dismiss();
        toast.success("Giriş Başarılı");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } else if (isLabor === "labor") {
      try {
        const res = await laborServices.login(formData);
        console.log("Login : ", res);
        if ((res.data.message = "Labor logged in successfully")) {
          toast.dismiss();
          toast.success("Giriş Başarılı");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      } catch (err) {
        toast.error(err);
      }
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
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 2000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-10 h-10 mr-2" src="/img/logo.png" alt="logo" />
            TC. Sağlık Bakanlığı
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Giriş Yapın
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={loginPatient}
              >
                <>
                  <label
                    htmlFor="countries"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Kullanıcı tipini seçiniz
                  </label>
                  <select
                    id="countries"
                    onClick={(e) => setIsLabor(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="patient" selected>
                      Hasta Girişi
                    </option>
                    <option value="labor">Laborant Girişi</option>
                  </select>
                </>

                <div>
                  {isLabor === "patient" && (
                    <>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        TC Kimlik Numaranız
                      </label>

                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Lütfen hastanın tc sini giriniz"
                        required=""
                      />
                    </>
                  )}

                  {isLabor === "labor" && (
                    <>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Hospital ID
                      </label>

                      <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Lütfen Hastene Numaranızı Giriniz"
                        required=""
                      />
                    </>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Şifre
                  </label>
                  <input
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>

                <button
                  className="w-full text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  onClick={loginPatient}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
