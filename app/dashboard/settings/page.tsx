import { AppearanceManager } from "./AppearanceManager";
import { UnitsManager } from "./UnitsManager";

export default function Settings() {
  return (
    <div className="center w-full px-4 mt-6">
      <section className="max-w-screen-xl w-full grid gap-10 grid-cols-3">
        <UnitsManager />
        <div className="w-full flex flex-col h-full">
          <AppearanceManager />
        </div>
      </section>
    </div>
  );
}
