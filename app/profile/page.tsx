
"use client";

import {
  FaCheckCircle,
  FaEnvelope,
  FaSave,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import { updateCurrentUser } from "@/lib/auth";

const ProfilePage = () => {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  // =========================
  // Authentication + User Data
  // =========================

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
      return;
    }

    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    }
  }, [user, loading, router]);

  // =========================
  // Submit
  // =========================

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!user) {
      return;
    }

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    setSaving(true);

    const result = updateCurrentUser({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    });

    if (!result.success) {
      setError(result.message);
      setSaving(false);
      return;
    }

    refreshUser();

    setMessage("Profile updated successfully.");
    setSaving(false);
  };

  // =========================
  // Loading
  // =========================

  if (loading || !user) {
    return (
      <main className="min-h-[70vh] bg-gray-50 px-4 py-10">
        <div className="mx-auto flex min-h-[50vh] max-w-3xl items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900" />

            <h2 className="text-lg font-semibold text-gray-900">
              Loading Profile
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Please wait while we load your account.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
            <FaUserEdit size={12} />
            Account Settings
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Success Message */}
        {message && (
          <div
            role="status"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700"
          >
            <FaCheckCircle size={18} />

            <p className="text-sm font-medium">
              {message}
            </p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700"
          >
            <div className="h-2 w-2 shrink-0 rounded-full bg-red-500" />

            <p className="text-sm font-medium">
              {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile Card */}
          <aside className="h-fit overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gradient-to-br from-gray-900 to-gray-700 px-6 py-8 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-2xl font-bold text-gray-900 shadow-lg">
                {firstName.charAt(0).toUpperCase()}
                {lastName.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-4 text-xl font-bold text-white">
                {firstName} {lastName}
              </h2>

              <p className="mt-1 truncate text-sm text-gray-300">
                {email}
              </p>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <FaUser size={14} />
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-400">
                    Account
                  </p>

                  <p className="text-sm font-semibold text-gray-800">
                    Active User
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Form */}
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/70 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FaUserEdit size={17} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your profile information below.
                  </p>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8"
            >
              {/* First Name */}
              <div className="mb-5">
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  First Name
                </label>

                <div className="relative">
                  <FaUser
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />

                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="mb-5">
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Last Name
                </label>

                <div className="relative">
                  <FaUser
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />

                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="mb-7">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>

                <div className="relative">
                  <FaEnvelope
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={14}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                <FaSave size={14} />

                {saving ? "Saving Changes..." : "Save Changes"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;

