// src/components/shared/Navbar.tsx

"use client"; // Required for interactivity (e.g., hamburger menu)

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="w-full bg-white dark:bg-black shadow-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo or Brand */}
          <Link href="/" className="text-xl font-semibold text-primary">
            MediMeet
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          </nav>

          {/* Mobile Hamburger Icon */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-200 hover:text-blue-500"
            >
              Contact
            </Link>
            <Link
              href="/login"
              className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
