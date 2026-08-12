
"use client";

import { getUsers } from "@/lib/auth";
import Link from "next/link";
import { FormEvent, useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );

      return;
    }

    const users = getUsers();

    const user = users.find(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase()
    );

    if (!user) {
      setError(
        "No account found with this email."
      );

      return;
    }

    localStorage.setItem(
      "resetPasswordEmail",
      user.email
    );

    setMessage(
      "Account found. You can now reset your password."
    );
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold mb-2">
          Forgot Password
        </h1>

        <p className="text-gray-500 mb-8">
          Enter your email to reset your password.
        </p>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-lg mb-5">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-50 text-green-600 border border-green-200 p-4 rounded-lg mb-5">
            {message}

            <div className="mt-3">
              <Link
                href="/reset-password"
                className="font-medium underline"
              >
                Reset Password
              </Link>
            </div>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="border rounded-xl p-6"
        >

          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="example@gmail.com"
            className="w-full border rounded-lg px-4 py-3 mb-6"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Continue
          </button>

        </form>

      </div>

    </main>
  );
};

export default ForgotPasswordPage;
