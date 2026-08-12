"use client";

import {
  addLocalPost,
  deleteLocalPost,
  getLocalPosts,
  updateLocalPost,
} from "@/lib/posts";
import { isAdmin } from "@/lib/auth";
import { TPost } from "@/types/post";

import axios from "axios";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  FaArrowLeft,
  FaEdit,
  FaFileAlt,
  FaPlus,
  FaSave,
  FaTrash,
  FaTimes,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaRedo,
} from "react-icons/fa";

const POSTS_PER_PAGE = 10;

const AdminPostsPage = () => {
  const router = useRouter();

  const [posts, setPosts] = useState<TPost[]>([]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

    loadPosts();
  }, [router]);

  // =========================
  // Get Posts
  // =========================

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get<TPost[]>(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const localPosts = getLocalPosts();

      setPosts([...localPosts, ...response.data]);
    } catch (error) {
      console.error("Failed to load posts:", error);

      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Search
  // =========================

  const filteredPosts = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return posts;
    }

    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(value) ||
        post.body.toLowerCase().includes(value)
    );
  }, [posts, search]);

  // =========================
  // Pagination
  // =========================

  const totalPages = Math.ceil(
    filteredPosts.length / POSTS_PER_PAGE
  );

  const currentPosts = useMemo(() => {
    const start =
      (currentPage - 1) * POSTS_PER_PAGE;

    return filteredPosts.slice(
      start,
      start + POSTS_PER_PAGE
    );
  }, [filteredPosts, currentPage]);

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  // Keep page valid after delete/search
  useEffect(() => {
    if (
      totalPages > 0 &&
      currentPage > totalPages
    ) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // =========================
  // Add / Edit Post
  // =========================

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    const trimmedTitle = title.trim();
    const trimmedBody = body.trim();

    if (!trimmedTitle || !trimmedBody) {
      setError(
        "Please enter both post title and body."
      );
      return;
    }

    // =========================
    // Edit
    // =========================

    if (editingId !== null) {
      updateLocalPost(
        editingId,
        trimmedTitle,
        trimmedBody
      );

      setPosts((prev) =>
        prev.map((post) =>
          post.id === editingId
            ? {
                ...post,
                title: trimmedTitle,
                body: trimmedBody,
              }
            : post
        )
      );

      setEditingId(null);
    }

    // =========================
    // Add
    // =========================

    else {
      const newPost = addLocalPost(
        trimmedTitle,
        trimmedBody
      );

      setPosts((prev) => [
        newPost,
        ...prev,
      ]);
    }

    setTitle("");
    setBody("");
    setCurrentPage(1);
  };

  // =========================
  // Edit
  // =========================

  const handleEdit = (post: TPost) => {
    setEditingId(post.id);

    setTitle(post.title);
    setBody(post.body);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // Delete
  // =========================

  const handleDelete = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    deleteLocalPost(id);

    setPosts((prev) =>
      prev.filter(
        (post) => post.id !== id
      )
    );
  };

  // =========================
  // Cancel Edit
  // =========================

  const cancelEdit = () => {
    setEditingId(null);

    setTitle("");
    setBody("");

    setError("");
  };

  // =========================
  // Checking Authentication
  // =========================

  if (checkingAuth) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

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
  // Loading Posts
  // =========================

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

            <h2 className="text-lg font-semibold text-gray-900">
              Loading Posts
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Please wait while we load your posts.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =========================
            Header
        ========================= */}

        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                <FaFileAlt size={12} />

                Posts Management
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Manage Posts
              </h1>

              <p className="mt-2 text-gray-500">
                Create, edit and manage your website posts.
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

        {/* =========================
            Error
        ========================= */}

        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5">
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
                onClick={loadPosts}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-red-700"
              >
                <FaRedo size={13} />

                Try Again
              </button>
            </div>
          </div>
        )}

        {/* =========================
            Add / Edit Form
        ========================= */}

        <section className="mb-10 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                {editingId !== null ? (
                  <FaEdit size={17} />
                ) : (
                  <FaPlus size={17} />
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingId !== null
                    ? "Edit Post"
                    : "Add New Post"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {editingId !== null
                    ? "Update the information of your post."
                    : "Create a new post and publish it to your website."}
                </p>
              </div>

            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8"
          >

            {/* Title */}

            <div className="mb-6">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Post Title
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                placeholder="Enter post title..."
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* Body */}

            <div className="mb-6">
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Post Body
              </label>

              <textarea
                id="body"
                name="body"
                rows={7}
                value={body}
                onChange={(e) =>
                  setBody(e.target.value)
                }
                placeholder="Write your post content here..."
                className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>

            {/* Buttons */}

            <div className="flex flex-wrap gap-3">

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-[0.98]"
              >
                {editingId !== null ? (
                  <>
                    <FaSave size={14} />

                    Update Post
                  </>
                ) : (
                  <>
                    <FaPlus size={14} />

                    Add Post
                  </>
                )}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98]"
                >
                  <FaTimes size={13} />

                  Cancel
                </button>
              )}

            </div>
          </form>
        </section>

        {/* =========================
            Posts Header + Search
        ========================= */}

        <section>

          <div className="mb-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All Posts
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage posts created by you and posts loaded from the API.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

              {/* Search */}

              <div className="relative w-full sm:w-80">
                <FaSearch
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={14}
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search posts..."
                  className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>

              {/* Count */}

              <div className="inline-flex w-fit items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-600">
                {filteredPosts.length}{" "}
                {filteredPosts.length === 1
                  ? "Post"
                  : "Posts"}
              </div>

            </div>
          </div>

          {/* =========================
              Empty State
          ========================= */}

          {filteredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                <FaFileAlt size={22} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-gray-900">
                No Posts Found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                {search
                  ? "No posts match your search. Try another search term."
                  : "You don't have any posts yet. Add your first post using the form above."}
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-5 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Clear Search
                </button>
              )}

            </div>
          ) : (
            <>
              {/* =========================
                  Posts Table
              ========================= */}

              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[900px] text-left">

                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          ID
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Title
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Body
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Type
                        </th>

                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Actions
                        </th>

                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                      {currentPosts.map((post) => {

                        const isLocalPost =
                          post.id > 1000000000000;

                        return (
                          <tr
                            key={post.id}
                            className="transition-colors duration-200 hover:bg-gray-50/70"
                          >

                            {/* ID */}

                            <td className="px-6 py-5">
                              <span className="text-sm font-medium text-gray-500">
                                #{post.id}
                              </span>
                            </td>

                            {/* Title */}

                            <td className="max-w-[260px] px-6 py-5">
                              <p className="line-clamp-2 font-semibold capitalize text-gray-900">
                                {post.title}
                              </p>
                            </td>

                            {/* Body */}

                            <td className="max-w-[380px] px-6 py-5">
                              <p className="line-clamp-2 text-sm leading-6 text-gray-500">
                                {post.body}
                              </p>
                            </td>

                            {/* Type */}

                            <td className="px-6 py-5">

                              {isLocalPost ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                                  My Post
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-600">
                                  API Post
                                </span>
                              )}

                            </td>

                            {/* Actions */}

                            <td className="px-6 py-5">

                              {isLocalPost ? (
                                <div className="flex items-center gap-2">

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleEdit(post)
                                    }
                                    aria-label={`Edit ${post.title}`}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-all duration-200 hover:bg-blue-600 hover:text-white"
                                  >
                                    <FaEdit size={14} />
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleDelete(post.id)
                                    }
                                    aria-label={`Delete ${post.title}`}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition-all duration-200 hover:bg-red-600 hover:text-white"
                                  >
                                    <FaTrash size={13} />
                                  </button>

                                </div>
                              ) : (
                                <span className="text-sm font-medium text-gray-400">
                                  View Only
                                </span>
                              )}

                            </td>

                          </tr>
                        );
                      })}

                    </tbody>
                  </table>

                </div>
              </div>

              {/* =========================
                  Pagination
              ========================= */}

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
                        setCurrentPage(
                          (page) => page - 1
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <FaChevronLeft size={11} />

                      Previous
                    </button>

                    <div className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-blue-600 px-3 text-sm font-bold text-white">
                      {currentPage}
                    </div>

                    <button
                      type="button"
                      disabled={
                        currentPage === totalPages
                      }
                      onClick={() =>
                        setCurrentPage(
                          (page) => page + 1
                        )
                      }
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next

                      <FaChevronRight size={11} />
                    </button>

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

export default AdminPostsPage;