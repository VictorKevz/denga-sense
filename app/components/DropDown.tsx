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
    <ul className="absolute right-0 top-full mt-1 min-w-[13.5rem] w-full flex flex-col gap-3 bg-[var(--bg-secondary)] p-4 rounded-lg shadow-2xl border border-[var(--glass-border)]">
      {data.map((day) => {
        const isActive = currentDay === day.date;
        return (
          <li key={day.date} className="w-full">
            <button
              type="button"
              className={`center group w-full h-10 justify-between! px-4 rounded-sm hover:bg-[var(--primary)] hover:text-[var(--neutral-0)] hover:border-0 ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--neutral-0)]"
                  : "bg-[var(--bg-primary)] border border-[var(--border)]"
              }`}
              onClick={() => onUpdate(day.date)}
            >
              {day.label}
              <span className="group-hover:translate-x-4">
                <KeyboardArrowRight />
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
