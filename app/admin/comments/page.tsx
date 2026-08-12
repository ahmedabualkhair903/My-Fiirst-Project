"use client";

import { isAdmin } from "@/lib/auth";
import { TComment } from "@/types/comment";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  FaArrowLeft,
  FaComments,
  FaSearch,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";

const COMMENTS_PER_PAGE = 10;

const AdminCommentsPage = () => {
  const router = useRouter();

  const [comments, setComments] = useState<TComment[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // Get Comments
  // =========================

  const getComments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<TComment[]>(
        "https://jsonplaceholder.typicode.com/comments"
      );

      setComments(response.data);
    } catch (error) {
      console.error(error);

      setError("Failed to load comments.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Authentication
  // =========================

  useEffect(() => {
    const admin = isAdmin();

    if (!admin) {
      router.replace("/login");
      return;
    }

    setCheckingAuth(false);

    getComments();
  }, [router]);

  // =========================
  // Search
  // =========================

  const filteredComments = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return comments;
    }

    return comments.filter(
      (comment) =>
        comment.name.toLowerCase().includes(value) ||
        comment.email.toLowerCase().includes(value) ||
        comment.body.toLowerCase().includes(value)
    );
  }, [comments, search]);

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    filteredComments.length / COMMENTS_PER_PAGE
  );

  const currentComments = useMemo(() => {
    const start = (currentPage - 1) * COMMENTS_PER_PAGE;

    return filteredComments.slice(
      start,
      start + COMMENTS_PER_PAGE
    );
  }, [filteredComments, currentPage]);

  // Reset pagination after search
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Keep page valid after delete/search
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================
  // Delete
  // =========================

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    setComments((prev) =>
      prev.filter((comment) => comment.id !== id)
    );
  };

  // =========================
  // Checking Authentication
  // =========================

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

            <h2 className="text-lg font-semibold text-gray-900">
              Checking access...
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Please wait while we verify your admin access.
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Loading
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

            <h2 className="text-lg font-semibold text-gray-900">
              Loading Comments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Please wait while we load the comments.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-600">
                <FaComments size={12} />
                Comments Management
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Manage Comments
              </h1>

              <p className="mt-2 text-gray-500">
                View, search and manage comments from your users.
              </p>
            </div>

            <Link
              href="/admin"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow"
            >
              <FaArrowLeft size={13} />
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Search + Stats */}

        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xl">
              <FaSearch
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={15}
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email or comment..."
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-50"
              />
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-50 px-4 py-3">
                <p className="text-xs font-medium text-purple-500">
                  Showing
                </p>

                <p className="mt-0.5 text-lg font-bold text-purple-700">
                  {filteredComments.length}
                </p>
              </div>

              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium text-gray-500">
                  Total
                </p>

                <p className="mt-0.5 text-lg font-bold text-gray-800">
                  {comments.length}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Error */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-red-800">
                  Something went wrong
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={getComments}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700"
              >
                <FaRedo size={13} />
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Empty */}

        {!error && filteredComments.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
              <FaComments size={22} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No Comments Found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              {search
                ? "No comments match your search. Try another search term."
                : "There are currently no comments available."}
            </p>

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-purple-700"
              >
                Clear Search
              </button>
            )}
          </div>
        )}

        {/* Comments Table */}

        {!error && currentComments.length > 0 && (
          <section>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left">
                  <thead className="border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        ID
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Post
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        User
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Email
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Comment
                      </th>

                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {currentComments.map((comment) => (
                      <tr
                        key={comment.id}
                        className="transition-colors duration-200 hover:bg-gray-50/70"
                      >
                        {/* ID */}

                        <td className="px-6 py-5">
                          <span className="text-sm font-medium text-gray-500">
                            #{comment.id}
                          </span>
                        </td>

                        {/* Post ID */}

                        <td className="px-6 py-5">
                          <span className="inline-flex rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
                            Post #{comment.postId}
                          </span>
                        </td>

                        {/* Name */}

                        <td className="max-w-[180px] px-6 py-5">
                          <p className="line-clamp-2 font-semibold capitalize text-gray-900">
                            {comment.name}
                          </p>
                        </td>

                        {/* Email */}

                        <td className="px-6 py-5">
                          <p className="text-sm text-gray-500">
                            {comment.email}
                          </p>
                        </td>

                        {/* Comment */}

                        <td className="max-w-[400px] px-6 py-5">
                          <p className="line-clamp-3 text-sm leading-6 text-gray-500">
                            {comment.body}
                          </p>
                        </td>

                        {/* Action */}

                        <td className="px-6 py-5">
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(comment.id)
                            }
                            aria-label={`Delete comment ${comment.id}`}
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                          >
                            <FaTrash size={13} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}

            {totalPages > 1 && (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-500">
                  Page{" "}
                  <span className="font-semibold text-gray-900">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-900">
                    {totalPages}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => page - 1)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <FaChevronLeft size={11} />
                    Previous
                  </button>

                  <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-purple-600 px-3 text-sm font-bold text-white">
                    {currentPage}
                  </div>

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => page + 1)
                    }
                    className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                    <FaChevronRight size={11} />
                  </button>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminCommentsPage;