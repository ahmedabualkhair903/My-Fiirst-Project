
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4">

      <div className="text-center max-w-lg">

        {/* Error Code */}

        <p className="text-8xl font-bold text-gray-200">
          404
        </p>

        {/* Title */}

        <h1 className="text-3xl font-bold mt-4 mb-3">
          Page Not Found
        </h1>

        {/* Description */}

        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for
          does not exist or has been moved.
        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-3">

          <Link
            href="/"
            className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-80 transition"
          >
            Go Home
          </Link>

          <Link
            href="/posts"
            className="border px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            View Posts
          </Link>

        </div>

      </div>

    </main>
  );
};

export default NotFound;

