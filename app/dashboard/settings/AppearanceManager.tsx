"use client";
import { useSettings } from "@/app/context/SettingsContext";
import { AppearanceKey, AppearanceValues } from "@/app/types/settings";
import React from "react";

type Options = {
  value: AppearanceValues;
  label: string;
  icon: string;
};
interface AppearanceDataType {
  id: AppearanceKey;
  title: string;
  options: Options[];
}
export const AppearanceManager = () => {
  const { appearance, onAppearanceUpdate } = useSettings();
  const appearanceData: AppearanceDataType[] = [
    {
      id: "theme",
      title: "Theme",
      options: [
        {
          value: "system",
          label: "System",
          icon: "",
        },
        {
          value: "light",
          label: "Light",
          icon: "",
        },
        {
          value: "dark",
          label: "Dark",
          icon: "",
        },
      ],
    },
    {
      id: "font",
      title: "Font Style",
      options: [
        {
          value: "sans-serif",
          label: "Modern",
          icon: "",
        },
        {
          value: "serif",
          label: "Classic",
          icon: "",
        },
      ],
    },
  ];
  return (
    <article className="glass flex w-full flex-col! gap-7 px-4 pt-5 pb-8 inset">
      {appearanceData.map((obj) => {
        const isFont = obj.id === "font";
        return (
          <div key={obj.id} className="w-full">
            <h3 className="text-[var(--text-secondary)] text-xl my-1.5">
              {obj.title}
            </h3>
            <ul className="w-full center justify-between! border border-[var(--glass-border)] rounded-full px-0.5 py-0.5">
              {obj.options.map((option) => {
                const isActive = appearance[obj.id] === option.value;
                const isModern = option.label === "Modern";
                return (
                  <li
                    key={option.label}
                    className={`w-full center ${
                      isActive
                        ? "bg-[var(--primary)] text-[var(--neutral-0)] rounded-full"
                        : ""
                    } ${isFont ? "text-xl" : ""}`}
                    style={{
                      fontFamily: `${
                        isFont
                          ? isModern
                            ? "'DM Sans', sans-serif"
                            : "'EB Garamond',serif"
                          : ""
                      }`,
                    }}
                  >
                    <button
                      type="button"
                      className="w-full h-full py-1.5"
                      onClick={() => onAppearanceUpdate(obj.id, option.value)}
                    >
                      {option.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </article>
  );
};
