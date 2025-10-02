import type { Metadata } from "next";
import { AppearanceManager } from "./AppearanceManager";
import { Localization } from "./LocalizationManager";
import { UnitsManager } from "./UnitsManager";

export const metadata: Metadata = {
  title: "Settings | Denga Sense",
  description:
    "Configure units, localization, and appearance preferences in Denga Sense.",
  alternates: { canonical: "/dashboard/settings" },
};

export default function Settings() {
  return (
    <main className="center w-full px-4 mt-6 pb-[6.5rem]">
      <div className="max-w-4xl w-full grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <section
          role="region"
          aria-labelledby="settings-units-heading"
          className="xl:max-w-2xl w-full flex flex-col col-span-2"
        >
          <h1
            id="settings-units-heading"
            className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4"
          >
            Units
          </h1>
          <UnitsManager />
        </section>

        <section
          role="region"
          aria-labelledby="settings-side-heading"
          className="sm:min-w-[22rem] w-full grid md:grid-cols-2 gap-6 h-full col-span-2 xl:col-span-1 xl:grid-cols-1"
        >
          <h2 id="settings-side-heading" className="sr-only">
            Localization and Appearance
          </h2>
          <section
            role="region"
            aria-labelledby="settings-localization-heading"
            className="w-full h-full"
          >
            <h2
              id="settings-localization-heading"
              className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4"
            >
              Localization
            </h2>
            <Localization />
          </section>
          <section
            role="region"
            aria-labelledby="settings-appearance-heading"
            className="w-full h-full"
          >
            <h2
              id="settings-appearance-heading"
              className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4"
            >
              Appearance
            </h2>
            <AppearanceManager />
          </section>
        </section>
      </div>
    </main>
  );
}
