// import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="antialiased mb-4 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        evanmarshall.
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-orange-500 from-indigo-500">
          dev
        </span>
      </h1>
      {/* <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        /> */}
    </main>
  );
}
