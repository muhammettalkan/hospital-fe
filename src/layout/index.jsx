import React from "react";
import SidebarMenu from "../components/common/SidebarMenu";
import Header from "../components/common/Header";

export default function Layout({ children }) {
  return (
    <>
      <div className="flex items-stretch relative">
        <SidebarMenu />
        <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 h-full">
          <Header />
          <div className="h-full flex flex-auto flex-col justify-between">
            <main className="h-full">
              <div
                className={
                  "px-4 md:px-4 py-4 min-h-['calc(100vh_-_90px)',] h-full"
                }
              >
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
