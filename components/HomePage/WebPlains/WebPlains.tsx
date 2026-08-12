
import Link from "next/link";
import {
  FaBolt,
  FaCheck,
  FaSearch,
  FaNewspaper,
  FaShieldAlt,
  FaMobileAlt,
  FaTools,
} from "react-icons/fa";

const features = [
  {
    title: "Explore Posts",
    description:
      "Discover useful content and explore posts through a clean and organized interface.",
    icon: FaNewspaper,
    href: "/posts",
  },
  {
    title: "Smart Search",
    description:
      "Find the content you need quickly with a simple and focused search experience.",
    icon: FaSearch,
    href: "/search",
  },
  {
    title: "Modern UI",
    description:
      "Enjoy a clean, modern interface built with React, Next.js and Tailwind CSS.",
    icon: FaBolt,
    href: "/about",
  },
  {
    title: "Admin Dashboard",
    description:
      "Manage your platform through a dedicated admin area with a simple experience.",
    icon: FaTools,
    href: "/admin",
  },
  {
    title: "Authentication",
    description:
      "Create an account and access the platform through a straightforward authentication flow.",
    icon: FaShieldAlt,
    href: "/register",
  },
  {
    title: "Fully Responsive",
    description:
      "A responsive experience designed to work smoothly across phones, tablets and desktops.",
    icon: FaMobileAlt,
    href: "/",
  },
];

const WebPlains = () => {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-indigo-100/40 blur-3xl" />

      <div className="container relative mx-auto px-4">

        {/* Section Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
            <FaBolt className="text-xs" />
            Everything You Need
          </div>

          <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">
            Built for a
            <span className="text-blue-600"> Better Experience</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-500 sm:text-lg">
            Explore the features that make MyProject simple, modern and easy
            to use.
          </p>

        </div>

        {/* Features */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <Link
                key={feature.title}
                href={feature.href}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
              >

                {/* Number */}
                <span className="absolute right-6 top-5 text-4xl font-black text-slate-100 transition-colors duration-300 group-hover:text-blue-50">
                  0{index + 1}
                </span>

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20">
                  <Icon className="text-xl" />
                </div>

                {/* Content */}
                <div className="relative mt-6">

                  <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {feature.description}
                  </p>

                </div>

                {/* Bottom Link */}
                <div className="relative mt-6 flex items-center text-sm font-bold text-blue-600">
                  Explore

                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>

              </Link>
            );
          })}

        </div>

        {/* Bottom CTA */}
        <div className="relative mt-16 overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-center shadow-2xl sm:px-10">

          {/* CTA Decoration */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-48 w-48 rounded-full bg-blue-600/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-indigo-600/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">

            {/* Small Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white shadow-lg shadow-blue-600/20">
              <FaCheck />
            </div>

            <h3 className="mt-6 text-2xl font-black text-white sm:text-3xl">
              Ready to explore?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Discover posts, search for content and explore everything
              MyProject has to offer.
            </p>

            <Link
              href="/posts"
              className="mt-7 inline-flex items-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-500 hover:shadow-xl"
            >
              Explore Posts

              <span className="ml-2 transition-transform duration-300 hover:translate-x-1">
                →
              </span>
            </Link>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WebPlains;

