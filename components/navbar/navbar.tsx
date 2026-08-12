"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const links = [
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

  return (
    <nav aria-label="Main navigation">
      <div className="hidden items-center gap-1 md:flex">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {link.name}

              {/* Active indicator */}
              <span
                className={`absolute bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-200 ${
                  isActive ? "w-5 opacity-100" : "w-0 opacity-0"
                }`}
              />

              {/* Hover indicator */}
              {!isActive && (
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-full bg-blue-600 transition-all duration-200 group-hover:w-4" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;