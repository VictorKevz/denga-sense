"use client";
import React from "react";
import { PulseLoader } from "react-spinners";

interface LoadingGridProps {
  length?: number;
  className?: string;
  loaderClassName?: string;
  children?: React.ReactNode;
}

export const LoadingGrid = ({
  length = 4,
  className = "max-w-screen-xl w-full grid gap-8 md:grid-cols-2 xl:grid-cols-4",
  loaderClassName = "glass center w-full my-4 min-h-[15rem]",
  children,
}: LoadingGridProps) => {
  return (
    <div className={`w-full ${className}`}>
      {Array.from({ length }).map((_, i) => (
        <div key={i} className={loaderClassName}>
          {children || <PulseLoader color="var(--primary)" />}
        </div>
      ))}
    </div>
  );
};
