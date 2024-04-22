import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-3 p-4">
      <section className="flex flex-col gap-4 px-3 lg:px-6 py-24 lg:py-36 ">
        <h1 className="text-5xl font-bold font-poppins">
          Welcome To DataDepot -
          <br />
          <span className="text-orange-600 font-poppins">
            Simplify Your File Management
          </span>
        </h1>
        <h3 className="text-2xl text-muted-foreground">
          {" "}
          Edit, Rename, and Delete Your Files Hassle-Free
        </h3>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg">
            Get Started
          </Button>
        </Link>
      </section>
      <div className="hidden lg:flex lg:flex-col items-center">
        <Image src="/hero.svg" alt="hero" width={500} height={500} />
      </div>
    </main>
  );
}
