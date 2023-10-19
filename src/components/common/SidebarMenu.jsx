import React, { useState } from "react";
import { BsHospital } from "react-icons/bs";
import { BiLogOut, BiSolidReport } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaUserInjured } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { TiTimes } from "react-icons/ti";
import { useSelector } from "react-redux";
import { selectSidebarOpen } from "../../store/dashboard";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";

export default function SidebarMenu() {
  const navigate = useNavigate();
  const isSidebarOpen = useSelector(selectSidebarOpen);

  const navigation = [
    {
      name: "Laborant",
      icon: <BsHospital size={30} />,
      link: "/laborant",
      index: 1,
    },
    {
      name: "Raporlar",
      icon: <HiOutlineDocumentReport size={30} />,
      link: "/reports",
      index: 2,
    },
    {
      name: "Hasta Bilgileri",
      icon: <FaUserInjured size={30} />,
      link: "/patients",
      index: 3,
    },
    {
      name: "Çıkış Yap",
      icon: <BiLogOut size={30} />,
      link: "#",
      index: 4,
    },
  ];

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
          <h6 className="font-semibold text-base mb-6">
            Çıkış yapmak istediğinizden emin misiniz?
          </h6>
          <div className="flex items-center justify-between gap-10">
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="px-12 font-semibold text-base py-2 bg-red-500  text-white"
            >
              Evet
            </button>
            <button
              onClick={closeModal}
              className="px-12 font-semibold text-base py-2 bg-green-500 text-white"
            >
              Hayır
            </button>
          </div>
        </div>
      </Modal>

      {/* Side Bar Dekstop*/}
      <div className="py-4 border-r min-h-screen hidden md:block bg-[#fff5f0]">
        <div className="logo px-6 mb-4" style={{ width: "auto" }}>
          {!isSidebarOpen ? (
            <div className="w-[40px]">
              <Link to="/">
                <img src="/img/logo.png" />
              </Link>
            </div>
          ) : (
            <div className="w-[200px]">
              <Link to="/">
                <img src="/img/logo-2.png" />
              </Link>
            </div>
          )}
        </div>

        {!isSidebarOpen ? (
          <nav className="px-2">
            {navigation.map((item, index) => (
              <ul key={index} className="px-2 py-1 my-2">
                <li className="px-2 hover:bg-[#ffe0d1] py-2 rounded-lg ">
                  <Link
                    aria-label={item.name}
                    data-cooltipz-dir="right"
                    to={`${item.link}`}
                    className="title-style"
                    onClick={item.name === "Çıkış Yap" ? openModal : undefined}
                  >
                    {item.icon}
                  </Link>
                </li>
              </ul>
            ))}
          </nav>
        ) : (
          <nav className="px-4">
            {navigation.map((item, index) => (
              <ul key={index} className="py-1 my-2">
                <li>
                  <Link
                    to={`${item.link}`}
                    className="flex items-center justify-start gap-2 px-2 hover:bg-[#ffe0d1] py-2 rounded-lg"
                    onClick={item.name === "Çıkış Yap" ? openModal : undefined}
                  >
                    <div>{item.icon}</div>

                    <span className="pl-2 text-sm font-semibold">
                      {item.name}
                    </span>
                  </Link>
                </li>
              </ul>
            ))}
          </nav>
        )}
      </div>

      {/* Side Bar Mobil*/}
      <>
        <div className="absolute top-0 left-0 bg-[#fff5f0] w-[80%] z-50 mobil-sidebar">
          {isSidebarOpen && (
            <div className="py-4 block md:hidden border-r min-h-screen w-full">
              <div className="logo px-6 mb-2 w-auto flex items-center justify-between">
                <div className="w-[170px]">
                  <Link to="/dashboard">
                    <img src="/img/kasif-grupları-logo.png" />
                  </Link>
                </div>
                {/* <TiTimes size={24} onClick={handleClick} /> */}
              </div>
              <nav className="px-4">
                {navigation.map((item, index) => (
                  <ul key={index} className="py-1 my-2">
                    <Link
                      to={item.link}
                      className="flex items-center justify-start gap-2 px-2 hover:bg-[#ffe0d1]  py-2 rounded-lg"
                      onClick={
                        item.name === "Çıkış Yap" ? openModal : undefined
                      }
                    >
                      <div>{item.icon}</div>

                      <span className="pl-2 text-sm font-semibold">
                        {item.name}
                      </span>
                    </Link>
                  </ul>
                ))}
              </nav>
            </div>
          )}
        </div>
        {isSidebarOpen && <div className="overlay block md:hidden"></div>}
      </>
    </>
  );
}
