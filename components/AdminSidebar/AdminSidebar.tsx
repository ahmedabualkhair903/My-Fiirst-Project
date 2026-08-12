"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  FaBars,
  FaChartPie,
  FaChevronRight,
  FaComments,
  FaFileAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const links = [
    {
      name: "Dashboard",
      description: "Overview",
      href: "/admin",
      icon: FaChartPie,
    },
    {
      name: "Posts",
      description: "Manage content",
      href: "/admin/posts",
      icon: FaFileAlt,
    },
    {
      name: "Comments",
      description: "Manage feedback",
      href: "/admin/comments",
      icon: FaComments,
    },
    {
      name: "Profile",
      description: "Account settings",
      href: "/profile",
      icon: FaUser,
    },
  ];

  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col bg-slate-950 text-white transition-all duration-300 ${
        isOpen ? "w-[260px]" : "w-[76px]"
      }`}
    >
      {/* Header */}

      <div
        className={`flex h-20 shrink-0 items-center border-b border-white/10 ${
          isOpen ? "justify-between px-5" : "justify-center px-3"
        }`}
      >
        {isOpen && (
          <Link
            href="/admin"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
              <FaChartPie size={16} />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold">
                Admin Panel
              </h2>

              <p className="mt-0.5 truncate text-[10px] text-slate-400">
                Manage your website
              </p>
            </div>
          </Link>
        )}

        {!isOpen && (
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
            <FaChartPie size={16} />
          </div>
        )}

        <button
          type="button"
          aria-label={
            isOpen ? "Collapse sidebar" : "Expand sidebar"
          }
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-blue-600 hover:text-white"
        >
          {isOpen ? (
            <FaTimes size={12} />
          ) : (
            <FaBars size={12} />
          )}
        </button>
      </div>

      {/* Navigation */}

      <nav
        aria-label="Admin navigation"
        className="flex-1 overflow-y-auto px-3 py-6"
      >
        {isOpen && (
          <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
            Navigation
          </p>
        )}

        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;

            const isActive =
              pathname === link.href ||
              (link.href !== "/admin" &&
                pathname.startsWith(`${link.href}/`));

            return (
              <Link
                key={link.href}
                href={link.href}
                title={!isOpen ? link.name : undefined}
                className={`group relative flex h-12 items-center rounded-xl transition-all duration-200 ${
                  isOpen
                    ? "gap-3 px-3"
                    : "justify-center px-2"
                } ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 h-8 w-1 rounded-r-full bg-white" />
                )}

                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-white/15"
                      : "bg-white/5 group-hover:bg-white/10"
                  }`}
                >
                  <Icon size={15} />
                </span>

                {isOpen && (
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">
                      {link.name}
                    </span>

                    <span
                      className={`mt-0.5 block truncate text-[10px] ${
                        isActive
                          ? "text-blue-100"
                          : "text-slate-500"
                      }`}
                    >
                      {link.description}
                    </span>
                  </div>
                )}

                {isOpen && (
                  <FaChevronRight
                    size={9}
                    className={`shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-slate-600 group-hover:text-slate-300"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Account */}

      <div className="shrink-0 border-t border-white/10 p-3">
        <div
          className={`rounded-xl bg-white/5 ${
            isOpen ? "p-3" : "p-2"
          }`}
        >
          <div
            className={`flex items-center ${
              isOpen ? "gap-3" : "justify-center"
            }`}
          >
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />

              <FaUser size={13} />
            </div>

            {isOpen && (
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-white">
                  Admin Account
                </p>

                <p className="mt-0.5 text-[10px] text-emerald-400">
                  Online
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;