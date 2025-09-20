import { AppearanceManager } from "./AppearanceManager";
import { Localization } from "./Localization";
import { UnitsManager } from "./UnitsManager";

export default function Settings() {
  return (
    <div className="center w-full min-h-[calc(100dvh-30dvh)] px-4 mt-6">
      <section className="max-w-screen-lg w-full grid gap-10 grid-cols-3">
        <UnitsManager />
        <div className="w-full flex flex-col justify-between gap-6 h-full">
          <Localization />
          <AppearanceManager />
        </div>
      </section>
    </div>
  );
}
