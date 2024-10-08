"use client"

import Loader from "@/components/Loader";
import { useThemeMode } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { mode } = useThemeMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mode) setIsLoading(false);
  },[mode])

  if (isLoading) return <Loader />
  
  return (
    <section>
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="WhyPhi Cover Image"
            src={mode === 'dark' ? 
              'https://images.unsplash.com/photo-1557264337-e8a93017fe92?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
              :
              'https://images.unsplash.com/photo-1641763773957-35922086117c?q=80&w=4740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main
          className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div className="max-w-xl lg:max-w-3xl">
            <a className="block text-blue-600" href="https://bupct.com/">
              <img
                src={mode === 'dark' ? '/pct-logo-dark.png' : '/pct-logo.png'}
                className="h-8 sm:h-10"
                alt="Phi Chi Theta Zeta Chapter Logo"
              />
            </a>

            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Welcome to WhyPhi!
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-200">
              {`WhyPhi is Phi Chi Theta Zeta Chapter's rush checkin and application website.`}
            </p>

            <div className="col-span-6">
              <a
                href={`/dashboard`}
                className="flex justify-center items-center px-4 py-3 mt-6 text-gray-900 dark:text-white bg-transparent border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 w-full"
              >

                <img className="mr-3 w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"></img>
                Sign in with Google
              </a>
            </div>


            <div className="mt-6  col-span-6">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Not working? Contact PCT Tech Team!
              </p>
            </div>
          </div>
        </main>
      </div>
    </section >
  );
}

