import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main
      className="relative min-h-screen bg-[var(--bg-primary)] bg-center bg-cover bg-no-repeat object-cover w-ful center gap-20 z-1 px-4"
      style={{
        backgroundImage: "var(--main-bg)",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="center glass inset max-w-screen-sm w-full  rounded-3xl! flex-col! px-4 py-8 text-center">
        <figure className="">
          <Image
            src={"/images/logo-dark.webp"}
            alt="DengaSense's logo"
            width={150}
            height={150}
            className="glass w-[50%] rounded-full! inset mx-auto"
          />
        </figure>
        <h1 className="text-4xl mt-4">DengaSense</h1>
        <p>Introducing a smart way to view weather</p>
        <Link
          href={"/dashboard/weather"}
          className="center h-12 max-w-lg w-full mt-12 px-4 bg-[var(--primary)] text-[var(--neutral-0)] rounded-full font-semibold border border-transparent hover:border-[var(--primary)] hover:bg-transparent hover:text-[var(--text-primary)]"
        >
          Get started
        </Link>
      </div>
      <div className="overlay backdrop-blur-[5px]! backdrop-saturate-150! backdrop-brightness-85 bg-black/30!"></div>
    </main>
  );
}
