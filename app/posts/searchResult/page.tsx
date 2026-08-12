"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaFileAlt, FaArrowRight } from "react-icons/fa";
import { TPost } from "@/types/post";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [results, setResults] = useState<TPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }

        const posts: TPost[] = await response.json();

        const filteredPosts = search.trim()
          ? posts.filter(
              (post) =>
                post.title
                  .toLowerCase()
                  .includes(search.toLowerCase()) ||
                post.body
                  .toLowerCase()
                  .includes(search.toLowerCase())
            )
          : [];

        setResults(filteredPosts);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [search]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="mt-5 text-sm font-medium text-slate-500">
              Searching posts...
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/search"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <FaArrowRight className="rotate-180 text-xs" />
            Back to Search
          </Link>

          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-600">
            Search Results
          </p>

          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Results for{" "}
            <span className="text-blue-600">
              &quot;{search}&quot;
            </span>
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            {results.length}{" "}
            {results.length === 1 ? "post" : "posts"} found.
          </p>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <FaFileAlt className="text-xl" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              No Results Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
              We couldn&apos;t find any posts matching{" "}
              <span className="font-semibold text-slate-700">
                &quot;{search}&quot;
              </span>
              .
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Try searching with a different keyword.
            </p>

            <Link
              href="/search"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20"
            >
              Search Again
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="group block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <FaFileAlt className="text-sm" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h2 className="line-clamp-2 text-lg font-bold capitalize text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                      {post.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-500">
                      {post.body}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Read Post
                      <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  <span className="hidden shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 sm:inline-flex">
                    #{post.id}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function LoadingFallback() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

          <p className="mt-5 text-sm font-medium text-slate-500">
            Loading search results...
          </p>
        </div>
      </div>
    </main>
  );
}

export default function SearchResultPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SearchResultsContent />
    </Suspense>
  );
}