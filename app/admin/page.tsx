"use client";

import AdminStats from "@/components/AdminStats/AdminStats";
import Link from "next/link";
import {
  FaArrowRight,
  FaComments,
  FaFileAlt,
  FaPlus,
  FaUser,
  FaChartLine,
  FaCog,
} from "react-icons/fa";

const AdminPage = () => {
  return (
    <div className="space-y-8">
      {/* =========================
          Welcome Header
      ========================= */}

      <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-7 shadow-xl sm:p-9">
        {/* Background */}

        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
          <div>
            {/* Badge */}

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
              Admin Dashboard
            </div>

            {/* Heading */}

            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
              Dashboard
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              Manage your website, monitor your content and quickly access
              your most important administration tools.
            </p>
          </div>

          {/* Create Post */}

          <Link
            href="/admin/posts"
            className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30"
          >
            <FaPlus
              size={13}
              className="transition-transform duration-300 group-hover:rotate-90"
            />

            Create New Post

            <FaArrowRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>

      {/* =========================
          Statistics
      ========================= */}

      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <FaChartLine className="text-blue-600" />

              <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                Overview
              </h2>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              A quick overview of your website statistics.
            </p>
          </div>
        </div>

        <AdminStats />
      </section>

      {/* =========================
          Quick Actions
      ========================= */}

      <section>
        <div className="mb-5">
          <h2 className="text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Quickly access the most important admin tools.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {/* Posts */}

          <Link
            href="/admin/posts"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20">
                <FaFileAlt size={19} />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-blue-50 group-hover:text-blue-600">
                <FaArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-blue-600">
                Manage Posts
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                Add, edit, view and delete posts from your website.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-600">
              <FaFileAlt size={11} />
              Open Posts
            </div>
          </Link>

          {/* Comments */}

          <Link
            href="/admin/comments"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600 transition-all duration-300 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-600/20">
                <FaComments size={19} />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-purple-50 group-hover:text-purple-600">
                <FaArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-purple-600">
                Manage Comments
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                View, search and manage comments from your users.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-purple-600">
              <FaComments size={11} />
              Open Comments
            </div>
          </Link>

          {/* Profile */}

          <Link
            href="/profile"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/20">
                <FaUser size={18} />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-600">
                <FaArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
                My Profile
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                Update your personal information and account details.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-emerald-600">
              <FaUser size={11} />
              Open Profile
            </div>
          </Link>

          {/* Settings */}

          <Link
            href="/profile"
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-orange-900/5"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-orange-500/20">
                <FaCog size={19} />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-orange-50 group-hover:text-orange-600">
                <FaArrowRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-bold text-slate-900 transition-colors duration-200 group-hover:text-orange-600">
                Account Settings
              </h3>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                Manage your account information and profile settings.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-orange-600">
              <FaCog size={11} />
              Open Settings
            </div>
          </Link>
        </div>
      </section>

      {/* =========================
          Bottom CTA
      ========================= */}

      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 p-7 shadow-xl shadow-blue-900/10 sm:p-9">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-950/20 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white sm:text-3xl">
              Ready to manage your content?
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Keep your posts organized and your website up to date from
              the admin dashboard.
            </p>
          </div>

          <Link
            href="/admin/posts"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-xl"
          >
            Manage Posts

            <FaArrowRight
              size={11}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;