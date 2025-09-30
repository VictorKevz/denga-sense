"use client";

import { Replay } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
interface ErrorProps {
  error: string;
}

export const ErroUI = ({ error }: ErrorProps) => {
  return (
    <div className="center flex-col! w-full min-h-[80dvh] px-6">
      <h1 className="text-4xl">An error occurred!</h1>
      <p className="text-xl!">{error}</p>
      <Link
        href={`/`}
        className="center h-12 max-w-xs w-full border border-[var(--glass-border)] bg-[var(--primary)] text-[var(--neutral-0)] font-semibold rounded-full px-4 mt-10"
      >
        Try again <Replay />
      </Link>
    </div>
  );
};
