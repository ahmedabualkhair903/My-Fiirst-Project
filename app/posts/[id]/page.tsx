
"use client";

import { getLocalPosts } from "@/lib/posts";
import { TComment } from "@/types/comment";
import { TPost } from "@/types/post";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCommentAlt,
  FaRegClock,
  FaTrash,
} from "react-icons/fa";

const PostDetails = () => {
  const params = useParams();

  const id = Number(params.id);

  const [post, setPost] = useState<TPost | null>(null);
  const [comments, setComments] = useState<TComment[]>([]);

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const [submitting, setSubmitting] = useState(false);

  // =========================
  // Get Post
  // =========================

  const getPost = async () => {
    try {
      setLoadingPost(true);
      setError("");

      const localPosts = getLocalPosts();

      const localPost = localPosts.find(
        (post) => post.id === id
      );

      if (localPost) {
        setPost(localPost);
        return;
      }

      const response = await axios.get<TPost>(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );

      setPost(response.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load post.");
    } finally {
      setLoadingPost(false);
    }
  };

  // =========================
  // Get Comments
  // =========================

  const getComments = async () => {
    try {
      setLoadingComments(true);

      const response = await axios.get<TComment[]>(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );

      const savedComments = localStorage.getItem(
        `comments-${id}`
      );

      const localComments: TComment[] = savedComments
        ? JSON.parse(savedComments)
        : [];

      setComments([
        ...localComments,
        ...response.data,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    if (!id) return;

    getPost();
    getComments();
  }, [id]);

  // =========================
  // Add Comment
  // =========================

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !email.trim() ||
      !body.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    setSubmitting(true);

    const newComment: TComment = {
      postId: id,
      id: Date.now(),
      name: name.trim(),
      email: email.trim(),
      body: body.trim(),
    };

    const savedComments = localStorage.getItem(
      `comments-${id}`
    );

    const localComments: TComment[] = savedComments
      ? JSON.parse(savedComments)
      : [];

    const updatedComments = [
      newComment,
      ...localComments,
    ];

    localStorage.setItem(
      `comments-${id}`,
      JSON.stringify(updatedComments)
    );

    setComments((prev) => [
      newComment,
      ...prev,
    ]);

    setName("");
    setEmail("");
    setBody("");

    setSubmitting(false);
  };

  // =========================
  // Delete Comment
  // =========================

  const handleDelete = (commentId: number) => {
    const savedComments = localStorage.getItem(
      `comments-${id}`
    );

    const localComments: TComment[] = savedComments
      ? JSON.parse(savedComments)
      : [];

    const updatedComments = localComments.filter(
      (comment) => comment.id !== commentId
    );

    localStorage.setItem(
      `comments-${id}`,
      JSON.stringify(updatedComments)
    );

    setComments((prev) =>
      prev.filter(
        (comment) => comment.id !== commentId
      )
    );
  };

  // =========================
  // Loading
  // =========================

  if (loadingPost) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-4xl animate-pulse">
          {/* Back Button Skeleton */}
          <div className="mb-8 h-10 w-32 rounded-xl bg-slate-200" />

          {/* Article Skeleton */}
          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-7 sm:p-10 lg:p-12">
              <div className="h-7 w-24 rounded-full bg-slate-200" />

              <div className="mt-7 h-10 w-4/5 rounded-xl bg-slate-200 sm:h-12" />

              <div className="mt-3 h-10 w-3/5 rounded-xl bg-slate-200 sm:h-12" />

              <div className="mt-8 flex gap-5">
                <div className="h-4 w-24 rounded bg-slate-100" />
                <div className="h-4 w-20 rounded bg-slate-100" />
              </div>
            </div>

            <div className="p-7 sm:p-10 lg:p-12">
              <div className="space-y-4">
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-full rounded bg-slate-100" />
                <div className="h-4 w-11/12 rounded bg-slate-100" />
                <div className="h-4 w-4/5 rounded bg-slate-100" />
              </div>

              <div className="mt-10 h-24 rounded-2xl bg-slate-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================
  // Error
  // =========================

  if (error || !post) {
    return (
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-4 py-20">
        {/* Background */}
        <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

        <div className="relative mx-auto w-full max-w-xl rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-900/[0.06] sm:p-10">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-xl font-black text-red-500">
            !
          </div>

          <h1 className="mt-6 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Post Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
            {error ||
              "We couldn't find the post you're looking for."}
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={getPost}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 active:translate-y-0"
            >
              Try Again
            </button>

            <Link
              href="/posts"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <FaArrowLeft className="text-xs" />
              Back to Posts
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 pb-24 pt-8 sm:pt-12">
      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-80 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-[650px] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-100/30 blur-3xl" />

      <div className="container relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* ================= BACK BUTTON ================= */}

        <Link
          href="/posts"
          className="group mb-7 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-bold text-slate-500 transition-all duration-200 hover:bg-white hover:text-blue-600 hover:shadow-sm"
        >
          <FaArrowLeft className="transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Posts
        </Link>

        {/* ================= ARTICLE ================= */}

        <article className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white shadow-xl shadow-slate-900/[0.06]">
          {/* ================= ARTICLE HEADER ================= */}

          <header className="relative border-b border-slate-100 p-7 sm:p-10 lg:p-12">
            {/* Top Accent */}
            <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600" />

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                Article
              </span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span className="text-xs font-semibold text-slate-400">
                Post #{post.id}
              </span>
            </div>

            {/* Title */}
            <h1 className="mt-7 max-w-3xl text-3xl font-black capitalize leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>

            {/* Article Meta */}
            <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-medium text-slate-400 sm:text-sm">
              <div className="flex items-center gap-2">
                <FaRegClock className="text-blue-500" />
                <span>5 min read</span>
              </div>

              <span className="hidden h-4 w-px bg-slate-200 sm:block" />

              <div className="flex items-center gap-2">
                <FaCommentAlt className="text-blue-500" />

                <span>
                  {comments.length}{" "}
                  {comments.length === 1
                    ? "comment"
                    : "comments"}
                </span>
              </div>
            </div>
          </header>

          {/* ================= ARTICLE BODY ================= */}

          <div className="p-7 sm:p-10 lg:p-12">
            {/* Body */}
            <div className="max-w-3xl">
              <p className="text-base leading-9 text-slate-600 sm:text-lg sm:leading-10">
                {post.body}
              </p>
            </div>

            {/* Reading Footer */}
            <div className="mt-10 overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-extrabold text-slate-900">
                    Enjoyed this article?
                  </p>

                  <p className="mt-1 text-xs leading-6 text-slate-500">
                    Share your thoughts with the community below.
                  </p>
                </div>

                <Link
                  href="#comments"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-blue-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  Join the discussion

                  <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* ================= ADD COMMENT ================= */}

        <section
          id="comments"
          className="mt-14 scroll-mt-24 sm:mt-16"
        >
          {/* Section Header */}
          <div className="mb-7">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FaCommentAlt />
              </div>

              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                  Community
                </p>

                <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                  Join the Conversation
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Share your thoughts about this post.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-xl shadow-slate-900/[0.05] sm:p-9"
          >
            {/* Name + Email */}
            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            {/* Comment */}
            <div className="mt-5">
              <label
                htmlFor="body"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Comment
              </label>

              <textarea
                id="body"
                value={body}
                onChange={(e) =>
                  setBody(e.target.value)
                }
                placeholder="Write your comment..."
                rows={6}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm leading-7 text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* Submit */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {submitting
                  ? "Adding..."
                  : "Add Comment"}

                {!submitting && (
                  <FaArrowRight className="text-xs transition-transform duration-200 group-hover:translate-x-1" />
                )}
              </button>
            </div>
          </form>
        </section>

        {/* ================= COMMENTS ================= */}

        <section className="mt-14 sm:mt-16">
          {/* Comments Header */}
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-600">
                Community
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                Comments
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {comments.length}{" "}
                {comments.length === 1
                  ? "comment"
                  : "comments"}{" "}
                on this post
              </p>
            </div>
          </div>

          {/* Loading Comments */}
          {loadingComments && (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6"
                  >
                    <div className="flex gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-full bg-slate-200" />

                      <div className="flex-1">
                        <div className="h-4 w-32 rounded bg-slate-200" />

                        <div className="mt-3 space-y-2">
                          <div className="h-3 w-full rounded bg-slate-100" />
                          <div className="h-3 w-4/5 rounded bg-slate-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {/* Empty */}
          {!loadingComments &&
            comments.length === 0 && (
              <div className="rounded-[2rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FaCommentAlt />
                </div>

                <h3 className="mt-5 font-bold text-slate-900">
                  No comments yet
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Be the first person to share your thoughts.
                </p>
              </div>
            )}

          {/* Comments List */}
          {!loadingComments &&
            comments.length > 0 && (
              <div className="space-y-4">
                {comments.map((comment) => {
                  const isLocalComment =
                    comment.id > 1000000000000;

                  const avatarLetter =
                    comment.name
                      .charAt(0)
                      .toUpperCase();

                  return (
                    <article
                      key={comment.id}
                      className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-lg hover:shadow-slate-900/[0.05] sm:p-6"
                    >
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 font-black text-blue-600 sm:h-12 sm:w-12">
                          {avatarLetter}
                        </div>

                        <div className="min-w-0 flex-1">
                          {/* User Info */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-slate-900">
                                {comment.name}
                              </h3>

                              <p className="mt-1 truncate text-xs text-slate-400">
                                {comment.email}
                              </p>
                            </div>

                            {/* Delete Local Comment */}
                            {isLocalComment && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDelete(
                                    comment.id
                                  )
                                }
                                aria-label={`Delete comment by ${comment.name}`}
                                className="flex shrink-0 items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-bold text-red-500 transition-all duration-200 hover:bg-red-50 sm:opacity-0 sm:group-hover:opacity-100"
                              >
                                <FaTrash />
                                <span className="hidden sm:inline">
                                  Delete
                                </span>
                              </button>
                            )}
                          </div>

                          {/* Comment Body */}
                          <p className="mt-4 text-sm leading-7 text-slate-600">
                            {comment.body}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
        </section>

        {/* ================= BACK TO POSTS ================= */}

        <div className="mt-14 flex justify-center">
          <Link
            href="/posts"
            className="group inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-600 hover:shadow-md"
          >
            <FaArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
            Back to All Posts
          </Link>
        </div>
      </div>
    </main>
  );
};

export default PostDetails;

