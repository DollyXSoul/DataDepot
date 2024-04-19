import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2">
        <div>
          <Image
            src=""
            alt="data-depot"
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-2xl">DataDepot</h1>
      </Link>

      <div className="flex space-x-3 px-4">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
