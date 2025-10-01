"use client";

import { Replay } from "@mui/icons-material";
import Link from "next/link";
import React from "react";
interface ErrorProps {
  error: string;
  action: "tryAgain" | "goHome";
  onAction?: () => void;
}

export const ErroUI = ({
  error,
  action = "tryAgain",
  onAction,
}: ErrorProps) => {
  const isTryAgain = action === "tryAgain";
  return (
    <div
      className={`center flex-col! w-full  px-6 ${
        isTryAgain ? "min-h-none" : "min-h-[80dvh]"
      }`}
    >
      <h2 className="text-4xl">An error occurred!</h2>
      <p className="text-xl!">{error}</p>
      {isTryAgain ? (
        <button
          onClick={onAction}
          className="center h-12 max-w-xs w-full border border-[var(--glass-border)] bg-[var(--primary)] text-[var(--neutral-0)] font-semibold rounded-full px-4 mt-10"
        >
          Try again <Replay />
        </button>
      ) : (
        <Link
          href={`/`}
          onClick={onAction}
          className="center h-12 max-w-xs w-full border border-[var(--glass-border)] bg-[var(--primary)] text-[var(--neutral-0)] font-semibold rounded-full px-4 mt-10"
        >
          Go home <Replay />
        </Link>
      )}
    </div>
  );
};
