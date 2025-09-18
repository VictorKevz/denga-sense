import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] w-ful flex items-center justify-center gap-20">
      <figure className="center glass min-h-[70vh] max-w-sm w-full px-4 py-8">
        <Image
          src={"/images/logo-dark.webp"}
          alt="DengaSense's logo"
          width={200}
          height={200}
        />
      </figure>
      <div className="center flex-col!">
        <figure className="">
          <Image
            src={"/images/logo-dark.webp"}
            alt="DengaSense's logo"
            width={100}
            height={100}
          />
        </figure>
        <h1 className="text-4xl ">DengaSense</h1>
        <p>AI-powered Weather App</p>
        <Link
          href={"/dashboard/home"}
          className="center h-12 w-full mt-12 px-4 bg-[var(--primary)] rounded-xl font-semibold border border-transparent hover:border-[var(--primary)] hover:bg-transparent"
        >
          Get started
        </Link>
      </div>
    </main>
  );
}
