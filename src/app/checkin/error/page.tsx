"use client"

import ErrorIcon from "@/components/checkin/error/ErrorIcon";
import Loader from "@/components/Loader";
import { AdminTextStyles, DimmedAdminTextStyles } from "@/styles/TextStyles";
import { useThemeMode } from "flowbite-react";
import React, { useEffect, useState } from "react";

export default function Error() {
  const { mode } = useThemeMode();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (mode) setIsLoading(false);
  },[mode])

  if (isLoading) return <Loader />
  
  return (

    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <ErrorIcon mode={mode} />
        <h1 className={AdminTextStyles.title}>Uh-oh!</h1>
        <p className={DimmedAdminTextStyles.default}>We can't find that page.</p>
      </div>
    </div>
  );
}


