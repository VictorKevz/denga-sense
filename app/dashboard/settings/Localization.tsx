"use client";
import { useSettings } from "@/app/context/SettingsContext";
import { TimeFormat } from "@/app/types/settings";
import React from "react";

export const Localization = () => {
  const { localization, onLocalizationUpdate } = useSettings();
  return (
    <div className="inset glass w-full  px-4 py-6">
      <h3 className="text-[var(--text-secondary)] text-xl mb-1.5">
        Time Format
      </h3>
      <ul className="w-full center gap-4 justify-between border border-[var(--glass-border)] rounded-full px-0.5 py-0.5">
        {["12h", "24h"].map((format) => {
          const isActive = localization.timeFormat === format;
          return (
            <li
              key={format}
              className={`w-full center ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--neutral-0)] rounded-full"
                  : "hover:bg-[var(--primary)] hover:text-[var(--neutral-0)] hover:rounded-full"
              }`}
            >
              <button
                type="button"
                className="w-full h-full py-1.5"
                onClick={() =>
                  onLocalizationUpdate("timeFormat", format as TimeFormat)
                }
              >
                {format}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
