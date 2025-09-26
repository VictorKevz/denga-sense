"use client";
import { useSettings } from "@/app/context/SettingsContext";
import {
  LocalizationKey,
  LocalizationValues,
  SelectorDataType,
} from "@/app/types/settings";
import React from "react";
import { SettingsSelector } from "./SettingsSelector";

export const Localization = () => {
  const { localization, onLocalizationUpdate } = useSettings();
  const localizationData: SelectorDataType[] = [
    {
      id: "timeFormat",
      heading: "Time Format",
      options: [
        { value: "12h", label: "12-Hour" },
        { value: "24h", label: "24-Hour" },
      ],
    },
    {
      id: "language",
      heading: "Language",
      options: [
        { value: "en", label: "English", icon: "/images/en.png" },
        { value: "fi", label: "Suomi", icon: "/images/fi.png" },
      ],
    },
  ];
  return (
    <div className="glass flex w-full flex-col! gap-7 px-4 pt-5 pb-8 inset">
      <ul className="w-full center flex-col! gap-4 justify-between  px-0.5 py-0.5">
        {localizationData.map((obj) => {
          return (
            <SettingsSelector
              key={obj.id}
              label={obj.heading}
              options={obj.options}
              selected={localization[obj.id as LocalizationKey]}
              onSelect={(value) =>
                onLocalizationUpdate(
                  obj.id as LocalizationKey,
                  value as LocalizationValues
                )
              }
            />
          );
        })}
      </ul>
    </div>
  );
};
