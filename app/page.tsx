import Image from "next/image";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen w-full">
      <div className="flex gap-4 items-center flex-col">
        <Image
          className=""
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl">Welcome to your Nextjs Project</h1>
        <p>Get started quickly with Typescript and Tailwind CSS</p>
      </div>
    </main>
  );
}
