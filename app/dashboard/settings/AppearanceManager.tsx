"use client";
import { useSettings } from "@/app/context/SettingsContext";
import {
  AppearanceKey,
  AppearanceValues,
  SelectorDataType,
} from "@/app/types/settings";
import { Contrast, DarkMode, LightMode } from "@mui/icons-material";
import React from "react";
import { SettingsSelector } from "./SettingsSelector";
import { motion } from "framer-motion";
import { FadeInVariants } from "@/app/variants";

export const AppearanceManager = () => {
  const { appearance, onAppearanceUpdate } = useSettings();
  const appearanceData: SelectorDataType[] = [
    {
      id: "theme",
      heading: "Theme",
      options: [
        { value: "system", label: "System", icon: Contrast },
        { value: "light", label: "Light", icon: LightMode },
        { value: "dark", label: "Dark", icon: DarkMode },
      ],
    },
    {
      id: "font",
      heading: "Font Style",
      options: [
        {
          value: "sans-serif",
          label: "Modern",
          icon: "/images/font-modern.png",
        },
        { value: "serif", label: "Classic", icon: "/images/font-classic.png" },
      ],
    },
  ];
  return (
    <motion.article
      className="glass flex w-full flex-col! gap-7 px-4 pt-5 pb-8 inset"
      variants={FadeInVariants}
      initial="hidden"
      animate="visible"
    >
      {appearanceData.map((obj) => {
        return (
          <SettingsSelector
            key={obj.id}
            label={obj.heading}
            options={obj.options}
            selected={appearance[obj.id as AppearanceKey]}
            onSelect={(value) =>
              onAppearanceUpdate(
                obj.id as AppearanceKey,
                value as AppearanceValues
              )
            }
          />
        );
      })}
    </motion.article>
  );
};
