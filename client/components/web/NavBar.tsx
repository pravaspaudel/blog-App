"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { ThemeToogle } from "./Theme-toogle";
import { useAuth } from "@/context/AuthContextProvider";

export function NavBar() {
  const { user } = useAuth();

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next let<span className="text-blue-500">GO</span>
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link className={buttonVariants({ variant: "ghost" })} href="/">
          Home
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/blogs">
          Blogs
        </Link>
        <Link className={buttonVariants({ variant: "ghost" })} href="/create">
          Create
        </Link>
      </div>

      <div className="flex items-center gap-2">
        {!user ? (
          <div>
            <Link className={buttonVariants()} href="/auth/register">
              Sign up
            </Link>{" "}
            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/auth/login"
            >
              Login
            </Link>
          </div>
        ) : (
          <div>{user.email}</div>
        )}

        <ThemeToogle />
      </div>
    </nav>
  );
}
