"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaShieldAlt } from "react-icons/fa";

import { useAuth } from "@/context/AuthContext";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";

type AdminLayoutProps = {
  children: ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="text-center">
          <div
            className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-blue-500"
            aria-hidden="true"
          />

          <h2 className="text-xl font-bold text-white">
            Checking access
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            Please wait while we verify your account.
          </p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <FaShieldAlt className="text-2xl" />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-white">
            Redirecting to login...
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-400">
            You need to be logged in to access the admin panel.
          </p>
        </div>
      </main>
    );
  }

  if (user.role !== "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-slate-900 p-10 text-center shadow-2xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
            <FaShieldAlt className="text-2xl" />
          </div>

          <h2 className="mt-6 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Access Denied
          </h2>

          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-400">
            You don&apos;t have permission to access the admin panel.
          </p>

          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-100"
          >
            Back to Home
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-indigo-200/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-slate-100/90 backdrop-blur-xl">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                  Admin Dashboard
                </p>

                <h1 className="mt-1 truncate text-xl font-black tracking-tight text-slate-950 sm:text-2xl">
                  Welcome back,{" "}
                  <span className="text-blue-600">
                    {user.firstName}
                  </span>
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold text-slate-900">
                    {user.firstName} {user.lastName}
                  </p>

                  <p className="text-xs font-medium text-slate-500">
                    Administrator
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-lg shadow-blue-600/20">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </header>

          <div className="flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="mx-auto w-full max-w-[1400px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminLayout;