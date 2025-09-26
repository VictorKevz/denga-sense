import React from "react";
import { SelectorProps } from "@/app/types/settings";
import Image from "next/image";

export function SettingsSelector<T = string>({
  label,
  options,
  selected,
  onSelect,
  className,
}: SelectorProps<T>) {
  const isFont = label === "Font Style";
  return (
    <fieldset className={className || "w-full"}>
      <legend className="sr-only">{label}</legend>
      <h3 className="text-[var(--text-secondary)] text-xl my-1.5">{label}</h3>
      <ul
        role="radiogroup"
        className="w-full center gap-4 justify-between border border-[var(--glass-border)] rounded-full px-0.5 h-[3rem]"
      >
        {options.map((option) => {
          const isActive = option.value === selected;
          return (
            <li
              key={String(option.value)}
              className={`w-full h-[2.6rem] center gap-4  ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--neutral-0)] rounded-full"
                  : "hover:bg-[var(--primary)] hover:text-[var(--neutral-0)] hover:rounded-full"
              }`}
            >
              <button
                type="button"
                role="radio"
                aria-checked={isActive}
                aria-label={option.label}
                tabIndex={0}
                onClick={() => onSelect(option.value)}
                className="center w-full h-full text-xs sm:text-base"
              >
                {option.icon &&
                  (typeof option.icon === "string" ? (
                    <Image
                      width={32}
                      height={32}
                      src={option.icon}
                      alt=""
                      className={`${
                        isFont
                          ? "w-7! h-7! glass rounded-lg! p-1 backdrop-saturate-150 backdrop-brightness-30 mr-1.5"
                          : "w-8 mr-0.5"
                      }`}
                    />
                  ) : (
                    <option.icon
                      fontSize="small"
                      className={` ${isFont ? "" : "mr-0.5 mt-0.5"}`}
                    />
                  ))}
                {option.label}
              </button>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
