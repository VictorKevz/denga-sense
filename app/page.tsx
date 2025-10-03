import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Denga Sense | Smart Weather App",
  description:
    "Check live weather, forecasts, and AI-powered insights. Start with a clean, accessible landing page.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Denga Sense | Smart Weather App",
    description:
      "Live weather, forecasts, and AI insights with a fast, accessible experience.",
  },
};

export default async function Home() {
  return (
    <>
      <a href="#home-main" className="sr-only">
        Skip to main content
      </a>
      <main
        id="home-main"
        tabIndex={-1}
        className="relative min-h-screen bg-[var(--bg-primary)] bg-center bg-cover bg-no-repeat object-cover w-full center gap-20 z-1 px-4"
        style={{
          backgroundImage: "var(--main-bg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="center glass inset max-w-screen-sm w-full  rounded-3xl! flex-col! px-4 py-8 text-center">
          <figure className="">
            <Image
              src={"/images/logo-dark.webp"}
              alt="Denga Sense logo"
              width={150}
              height={150}
              className="glass w-[50%] rounded-full! inset mx-auto"
              priority
            />
          </figure>
          <h1 className="text-4xl mt-4">DengaSense</h1>
          <p>Introducing a smart way to view weather</p>
          <Link
            href={"/dashboard/weather"}
            className="center h-12 max-w-xs hover:max-w-md w-full mt-12 px-4 bg-[var(--primary)] text-[var(--neutral-0)] rounded-full font-semibold border border-[var(--glass-border)]"
            aria-label="Get started with Denga Sense weather dashboard"
          >
            Get started
          </Link>
        </div>
        <div
          className="overlay backdrop-blur-[5px]! backdrop-saturate-150! backdrop-brightness-85 bg-black/30!"
          aria-hidden="true"
        ></div>
      </main>
    </>
  );
}
