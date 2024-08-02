"use client";
import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Dropdown, Avatar, Sidebar } from "flowbite-react";
import { HiChartPie, HiTable } from "react-icons/hi";



export default function NavSidebar() {
  const { data: session } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${isSidebarOpen ? 'lg:pl-64' : 'lg:px-5'}`}>
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={toggleSidebar}
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <a href="/dashboard" className="flex ml-2 md:mr-24">
                <img src="/pct-logo.png" className="h-8 mr-3" alt="PCT Logo" />
              </a>
            </div>
            <div className="flex items-center">
              {session ? (
                <Dropdown
                  label={<Avatar alt="User settings" img={session && session.user?.image as string} rounded />}
                  arrowIcon={false}
                  inline
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{session?.user?.name}</span>
                    <span className="block truncate text-sm font-medium">{session?.user?.email}</span>
                  </Dropdown.Header>
                  <Dropdown.Item onClick={() => signOut({ callbackUrl: "/" })}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              ) : ("")}

            </div>
          </div>
        </div>
      </nav>

      <Sidebar 
        className={`fixed z-40 pt-16 transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
        id="logo-sidebar"
        aria-label="Sidebar"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item href="/dashboard" icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
            <Sidebar.Item href="/#" icon={HiTable}>
              Attendance
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
