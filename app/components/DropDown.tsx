import React from "react";
import { DayOptions } from "../types/weather";
import { KeyboardArrowRight } from "@mui/icons-material";
interface DropDownProps {
  data: DayOptions[];
  onUpdate: (option: string) => void;
  currentDay: string;
}
export const DropDown = ({ data, onUpdate, currentDay }: DropDownProps) => {
  return (
    <ul className="glass absolute right-0 top-full mt-1 min-w-[14rem] w-full flex flex-col gap-3  px-3 py-5 rounded-3xl backdrop-blur-[0.35rem] backdrop-saturate-150 border border-[var(--glass-border)]">
      {data.map((day) => {
        const isActive = currentDay === day.date;
        return (
          <li key={day.date} className="w-full">
            <button
              type="button"
              className={`center group w-full h-10 justify-between! px-3 rounded-full hover:bg-[var(--primary)] hover:text-[var(--neutral-0)] hover:border-0 ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--neutral-0)] border border-[var(--glass-border)]"
                  : "glass inset border border-[var(--border)] hover:bg-[var(--primary)]!"
              }`}
              onClick={() => onUpdate(day.date)}
            >
              {day.label}
              <span className="group-hover:translate-x-3">
                <KeyboardArrowRight />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
