
"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };

  reset: () => void;
};

const ErrorPage = ({
  error,
  reset,
}: ErrorPageProps) => {

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">

      <div className="text-center max-w-lg">

        <p className="text-6xl font-bold text-red-500 mb-4">
          Error
        </p>

        <h1 className="text-3xl font-bold mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-500 mb-8">
          An unexpected error occurred.
          Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
        >
          Try Again
        </button>

      </div>

    </main>
  );
};

export default ErrorPage;

