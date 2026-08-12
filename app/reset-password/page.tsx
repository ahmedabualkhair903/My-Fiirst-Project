
"use client";

import { getUsers } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {
    const resetEmail =
      localStorage.getItem(
        "resetPasswordEmail"
      );

    if (!resetEmail) {
      router.replace("/forgot-password");

      return;
    }

    setEmail(resetEmail);
  }, [router]);

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (
      !password ||
      !confirmPassword
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );

      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );

      return;
    }

    const users = getUsers();

    const updatedUsers = users.map(
      (user) =>
        user.email.toLowerCase() ===
        email.toLowerCase()
          ? {
              ...user,
              password,
            }
          : user
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    localStorage.removeItem(
      "resetPasswordEmail"
    );

    setSuccess(true);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Reset Password
        </h1>

        <p className="text-gray-500 mb-8">
          Create a new password.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        {success ? (
          <div className="border rounded-xl p-6">

            <div className="bg-green-50 text-green-600 border border-green-200 p-4 rounded-lg mb-5">
              Password changed successfully.
            </div>

            <Link
              href="/login"
              className="block text-center bg-black text-white py-3 rounded-lg"
            >
              Go to Login
            </Link>

          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border rounded-xl p-6"
          >

            <div className="mb-5">

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full border rounded-lg px-4 py-3 bg-gray-100"
              />

            </div>

            <div className="mb-5">

              <label className="block mb-2 font-medium">
                New Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <div className="mb-6">

              <label className="block mb-2 font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full border rounded-lg px-4 py-3"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg"
            >
              Reset Password
            </button>

          </form>
        )}

      </div>

    </main>
  );
};

export default ResetPasswordPage;
