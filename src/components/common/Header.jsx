import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";
import { MdDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDarkMode,
  selectSidebarOpen,
  setDarkMode,
  setSideBarOpen,
} from "../../store/dashboard";

export default function Header() {
  const isDarkMode = useSelector(selectDarkMode);
  const isSidebarOpen = useSelector(selectSidebarOpen);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSideBarOpen(!isSidebarOpen));
    // setIsSideBarOpen((prev) => !prev);
  };
  return (
    <header className="header border-b border-gray-200 dark:border-gray-700">
      <div className="flex flex-col w-full">
        {/* Header */}
        <div className=" sticky px-4 py-4 flex items-center justify-between w-full border-b-2 z-[1]">
          <div className="flex items-center justify-center gap-2">
            <div
              className="px-2 hover:bg-gray-200 py-2 rounded-full cursor-pointer"
              onClick={handleClick}
            >
              {isSidebarOpen ? (
                <BiMenuAltLeft size={24} />
              ) : (
                <BiMenu size={24} />
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 cursor-pointer">
            {isDarkMode ? (
              <div
                className="px-2 hover:bg-gray-200 py-2 rounded-full"
                onClick={() => dispatch(setDarkMode(false))}
              >
                <MdDarkMode size={24} />
              </div>
            ) : (
              <div
                className="px-2 hover:bg-gray-200 py-2 rounded-full"
                onClick={() => dispatch(setDarkMode(true))}
              >
                <MdOutlineLightMode size={24} />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
