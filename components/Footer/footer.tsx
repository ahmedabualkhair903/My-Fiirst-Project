import Link from "next/link";

const footer = () => {
  return (
    <footer className="bg-gray-100 rounded-lg shadow border border-gray-300 bottom-0 w-full">
      <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
              Footer
            </span>
          </a>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-600 sm:mb-0">
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline me-4 md:me-6">
                Licensing
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-300 sm:mx-auto lg:my-8" />

        <span className="block text-sm text-gray-600 sm:text-center">
          © 2023{" "}
          <a
            href="https://flowbite.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default footer;