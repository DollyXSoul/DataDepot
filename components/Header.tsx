import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="flex items-center justify-between m-2">
      <Link href="/" className="flex items-center space-x-2">
        <div>
          <Image src="/logo.png" alt="data-depot" height={55} width={55} />
        </div>
        <h1 className="font-bold text-2xl">DataDepot</h1>
      </Link>

      <div className="flex space-x-3 px-4">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton mode="modal" signUpFallbackRedirectUrl="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="border-primary border-2"
            >
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
