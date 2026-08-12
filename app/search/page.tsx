
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight, FaSearch } from "react-icons/fa";

export default function SearchPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const value = search.trim();

    if (!value) return;

    router.push(`/posts?search=${encodeURIComponent(value)}`);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 py-16">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="container relative mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
            <FaSearch className="text-xs" />
            Search
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Find What
            <span className="text-blue-600"> You Need</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Search through our posts and quickly find the content
            you're looking for.
          </p>
        </div>

        {/* Search Box */}
        <div className="mx-auto mt-12 max-w-3xl">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5"
          >
            <div className="flex flex-col gap-3 sm:flex-row">
              {/* Input */}
              <div className="relative flex-1">
                <FaSearch className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search posts by title or content..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={!search.trim()}
                className="group flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                Search
                <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg shadow-slate-900/5 sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600">
              <FaSearch />
            </div>

            <h2 className="mt-6 text-xl font-bold text-slate-900 sm:text-2xl">
              Search Our Posts
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
              Enter a keyword above and we'll take you directly to
              the matching posts.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                Articles
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                Topics
              </span>

              <span className="rounded-full bg-slate-100 px-4 py-2 text-xs font-medium text-slate-500">
                Content
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

