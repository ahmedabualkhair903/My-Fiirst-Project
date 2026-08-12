import Link from "next/link";
import {
  FaArrowUp,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-lg font-extrabold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-blue-600/30">
                A
              </div>

              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900">
                  AHMED
                  <span className="text-blue-600"> SALEM</span>
                </span>

                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
                  Front-End Developer
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-slate-500">
              A modern front-end application built with Next.js, React
              and Tailwind CSS. Designed with a focus on clean UI,
              responsive layouts and a smooth user experience.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-2">
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
              >
                <FaGithub size={16} />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaLinkedinIn size={15} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaTwitter size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/posts"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Posts
                </Link>
              </li>

              <li>
                <Link
                  href="/search"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-slate-900">
              Account
            </h3>

            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/login"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/admin"
                  className="inline-flex text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-blue-600"
                >
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-5 border-t border-slate-200 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            © {currentYear}{" "}
            <span className="font-semibold text-slate-700">
              Ahmed Salem
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <Link
              href="/about"
              className="text-slate-500 transition-colors hover:text-blue-600"
            >
              About
            </Link>

            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-blue-600"
            >
              Privacy
            </Link>

            <Link
              href="/"
              className="text-slate-500 transition-colors hover:text-blue-600"
            >
              Contact
            </Link>

            <Link
              href="#"
              aria-label="Back to top"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <FaArrowUp size={12} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;