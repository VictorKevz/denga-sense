import { PlacesManager } from "./PlacesManager";

export default function Places() {
  return (
    <div className="w-full center flex-col! px-4 md:px-6 pb-[6rem]">
      <header className="center w-full min-h-[30vh] flex-col! glass">
        <h1 className="text-5xl md:text-7xl text-[var(--neutral-0)]">
          Your Favorite Places
        </h1>
        <p className="text-xl">Quickly look up your saved places</p>
      </header>
      <PlacesManager />
    </div>
  );
}
