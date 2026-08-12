"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

import Navbar from "../Navbar/Navbar";

const header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const mobileLinks = [
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Posts",
      href: "/posts",
    },
    {
      name: "Admin",
      href: "/admin",
    },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className="group flex items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-blue-600/30">
              A
            </div>

            <div className="hidden sm:block">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                AHMED
                <span className="text-blue-600"> SALEM</span>
              </span>

              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
                Front-End Developer
              </p>
            </div>

            <span className="text-lg font-extrabold tracking-tight text-slate-900 sm:hidden">
              A<span className="text-blue-600">S</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-5 md:flex">
            <Navbar />

            {/* Divider */}
            <div className="h-7 w-px bg-slate-200" />

            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              className={`group flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                isActive("/search")
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <FaSearch className="text-sm transition-transform duration-200 group-hover:scale-110" />
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                Login
              </Link>

                <Link
                href="/register"
                className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold !text-white shadow-md shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:translate-y-0"
                >
                Register
             </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search"
              onClick={closeMenu}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                isActive("/search")
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <FaSearch className="text-sm" />
            </Link>

            {/* Menu Button */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-200 ${
                isOpen
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {isOpen ? (
                <IoClose className="h-6 w-6" />
              ) : (
                <IoIosMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            isOpen
              ? "max-h-[500px] border-t border-slate-100 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4">
            {/* Navigation Links */}
            <div className="space-y-1">
              {mobileLinks.map((link) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                      active
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <span>{link.name}</span>

                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Auth */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                onClick={closeMenu}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={closeMenu}
                className="rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default header;