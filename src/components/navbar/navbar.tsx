import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex sticky top-0 z-50 p-4 bg-white/25 dark:bg-black/25 backdrop-blur-md shadow-sm">
      <div className="flex items-center justify-between max-w-4xl w-full mx-auto">
        <Link href="/" className="font-bold text-lg">
          PiggyAI
        </Link>
        <div className="flex items-center space-x-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
