import { PlacesManager } from "./PlacesManager";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saved Places | Denga Sense",
  description: "View and manage your saved places with live weather snapshots.",
  openGraph: {
    title: "Saved Places | Denga Sense",
    description: "Manage saved places and see live weather at a glance.",
  },
  alternates: { canonical: "/dashboard/places" },
};

export default function Places() {
  return (
    <main
      className="max-w-screen-xl min-h-[80vh] w-full mx-auto center flex-col! px-4 md:px-6 pb-[6rem]"
      role="main"
    >
      <header className="w-full text-center mt-6">
        <h1 className="text-4xl sm:text-5xl text-[var(--neutral-0)]">
          Your Places
        </h1>
      </header>
      <PlacesManager />
    </main>
  );
}
