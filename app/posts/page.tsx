
"use client";

import Pagination from "@/components/pagination/pagination";
import PostItems from "@/components/PostItems/PostItems";
import SearchPostInput from "@/components/SearchPostInput/SearchPostInput";
import { getLocalPosts } from "@/lib/posts";
import { TPost } from "@/types/post";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const POSTS_PER_PAGE = 9;

const PostsPage = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const localPosts = getLocalPosts();

      setPosts([...localPosts, ...response.data]);
    } catch (error) {
      console.error(error);
      setError("Something went wrong while loading posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  // Search
  const filteredPosts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    if (!searchValue) {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchValue) ||
        post.body.toLowerCase().includes(searchValue)
    );
  }, [posts, search]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;

    return filteredPosts.slice(
      startIndex,
      startIndex + POSTS_PER_PAGE
    );
  }, [filteredPosts, currentPage]);

  // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Fix invalid page
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 pb-20 pt-10 sm:pt-14">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-[500px] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= HERO ================= */}
        <section className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 shadow-sm sm:text-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
            Discover Content
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Posts
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8 lg:text-lg">
            Discover interesting content, explore new ideas and find
            the posts that matter to you.
          </p>
        </section>

        {/* ================= SEARCH SECTION ================= */}
        <section className="mx-auto mt-9 max-w-3xl">
          <div className="rounded-[28px] border border-slate-200/80 bg-white p-2 shadow-xl shadow-slate-900/[0.06] transition-shadow duration-300 hover:shadow-2xl hover:shadow-slate-900/[0.08]">
            <SearchPostInput
              value={search}
              onChange={setSearch}
            />
          </div>

          {/* Search Information */}
          {!loading && !error && (
            <div className="mt-4 flex min-h-8 items-center justify-between gap-4 px-2">
              <p className="text-sm text-slate-500">
                <span className="font-bold text-slate-900">
                  {filteredPosts.length}
                </span>{" "}
                {filteredPosts.length === 1 ? "post" : "posts"} found
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="shrink-0 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </section>

        {/* ================= CONTENT ================= */}
        <section className="mt-10 sm:mt-12">
          {/* Loading */}
          {loading && (
            <div
              className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
              aria-label="Loading posts"
            >
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="animate-pulse">
                    {/* Top */}
                    <div className="flex items-center justify-between">
                      <div className="h-11 w-11 rounded-2xl bg-slate-200" />

                      <div className="h-3 w-20 rounded-full bg-slate-100" />
                    </div>

                    {/* Title */}
                    <div className="mt-6 h-5 w-4/5 rounded-lg bg-slate-200" />

                    {/* Body */}
                    <div className="mt-5 space-y-3">
                      <div className="h-3 w-full rounded-full bg-slate-100" />
                      <div className="h-3 w-11/12 rounded-full bg-slate-100" />
                      <div className="h-3 w-3/4 rounded-full bg-slate-100" />
                    </div>

                    {/* Button */}
                    <div className="mt-7 h-10 w-28 rounded-xl bg-slate-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.05] sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-2xl font-black text-red-500">
                !
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                Something went wrong
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {error}
              </p>

              <button
                type="button"
                onClick={getPosts}
                className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 active:translate-y-0"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredPosts.length === 0 && (
            <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.05] sm:p-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                🔎
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 sm:text-2xl">
                No Posts Found
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-500">
                We couldn&apos;t find any posts matching your search.
                Try another keyword or browse all posts.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-7 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 active:translate-y-0"
              >
                Show All Posts
              </button>
            </div>
          )}

          {/* Posts */}
          {!loading && !error && currentPosts.length > 0 && (
            <>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {currentPosts.map((post) => (
                  <PostItems
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center sm:mt-14">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-lg shadow-slate-900/[0.05]">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
};

export default PostsPage;

