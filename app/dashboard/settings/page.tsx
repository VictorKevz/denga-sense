import { AppearanceManager } from "./AppearanceManager";
import { Localization } from "./LocalizationManager";
import { UnitsManager } from "./UnitsManager";

export default function Settings() {
  return (
    <div className="center w-full px-4 mt-6 pb-[6.5rem]">
      <section className="max-w-screen-lg w-full grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:max-w-2xl w-full flex flex-col col-span-2">
          <h1 className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4">
            Units
          </h1>

          <UnitsManager />
        </div>

        <div className="sm:min-w-[22rem] w-full grid md:grid-cols-2 gap-6 h-full col-span-2 xl:col-span-1 xl:grid-cols-1">
          <div className="w-full h-full">
            <h2 className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4">
              Localization
            </h2>
            <Localization />
          </div>
          <div className="w-full h-full">
            <h2 className="text-xl font-bold text-[var(--text-primary)] ml-1 my-4">
              Appearance
            </h2>
            <AppearanceManager />
          </div>
        </div>
      </section>
    </div>
  );
}
