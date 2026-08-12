import type { Metadata } from "next";
import Link from "next/link";
import {
FaCode,
FaLaptopCode,
FaMobileAlt,
FaRocket,
FaShieldAlt,
FaReact,
} from "react-icons/fa";

export const metadata: Metadata = {
title: "About",
description:
"Learn more about MyProject and this modern Front-End application.",
};

const features = [
{
icon: FaLaptopCode,
title: "Modern Design",
description:
"A clean and modern interface designed to provide a simple and enjoyable experience.",
},
{
icon: FaMobileAlt,
title: "Fully Responsive",
description:
"The interface adapts smoothly to mobile, tablet and desktop screens.",
},
{
icon: FaRocket,
title: "Fast Experience",
description:
"Built with modern technologies to provide a fast and smooth browsing experience.",
},
{
icon: FaShieldAlt,
title: "Reliable Structure",
description:
"A well-organized project structure that makes the application easier to maintain.",
},
];

const technologies = [
{
name: "Next.js",
description: "Modern React framework",
},
{
name: "React",
description: "Component-based UI",
},
{
name: "Tailwind CSS",
description: "Utility-first styling",
},
{
name: "TypeScript",
description: "Type-safe development",
},
];

const About = () => {
return ( <main className="relative overflow-hidden bg-slate-50">
{/* Background Decorations */} <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" /> <div className="pointer-events-none absolute -right-40 top-96 h-96 w-96 rounded-full bg-indigo-100/50 blur-3xl" />


  {/* Hero */}
  <section className="relative">
    <div className="container mx-auto px-4">
      <div className="flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">

        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
          <FaCode className="text-xs" />
          About MyProject
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          Building a
          <span className="text-blue-600"> Better Web Experience</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
          MyProject is a modern front-end application built to combine
          clean design, responsive layouts and a smooth user experience
          using modern web technologies.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/posts"
            className="rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-1 hover:bg-blue-700"
          >
            Explore Posts
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            Back Home
          </Link>
        </div>
      </div>
    </div>
  </section>

  {/* About Project */}
  <section className="relative bg-white py-20">
    <div className="container mx-auto px-4">
      <div className="grid items-center gap-12 lg:grid-cols-2">

        <div>
          <div className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            Our Project
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Designed with simplicity and quality in mind.
          </h2>

          <p className="mt-6 leading-8 text-slate-500">
            This project was created as a practical front-end application
            using modern development tools. The goal is to build an
            interface that feels professional, simple and easy to navigate.
          </p>

          <p className="mt-4 leading-8 text-slate-500">
            From the navigation and authentication pages to posts and
            search functionality, every part of the application is
            organized to provide a consistent experience.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-blue-100/50 blur-2xl" />

          <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-xl">
            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">100%</p>
                <p className="mt-2 text-sm text-slate-500">
                  Responsive
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">4+</p>
                <p className="mt-2 text-sm text-slate-500">
                  Main Pages
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">UI</p>
                <p className="mt-2 text-sm text-slate-500">
                  Modern Design
                </p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <p className="text-3xl font-bold text-blue-600">Fast</p>
                <p className="mt-2 text-sm text-slate-500">
                  Experience
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* Features */}
  <section className="relative py-20">
    <div className="container mx-auto px-4">

      <div className="mx-auto mb-12 max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
          What We Focus On
        </p>

        <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
          Built for a better experience
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          Every part of the interface is designed with usability,
          responsiveness and clean development in mind.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-transform duration-300 group-hover:scale-110">
                <Icon />
              </div>

              <h3 className="mt-6 text-lg font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* Technologies */}
  <section className="bg-white py-20">
    <div className="container mx-auto px-4">

      <div className="mx-auto mb-12 max-w-2xl text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FaReact className="text-xl" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
          Built with modern technologies
        </h2>

        <p className="mt-4 leading-7 text-slate-500">
          The project uses modern tools and technologies to create a
          scalable and maintainable front-end application.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {technologies.map((technology) => (
          <div
            key={technology.name}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/50"
          >
            <h3 className="font-bold text-slate-900">
              {technology.name}
            </h3>

            <p className="mt-2 text-xs text-slate-500">
              {technology.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>

  {/* CTA */}
  <section className="relative py-20">
    <div className="container mx-auto px-4">
      <div className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center shadow-2xl sm:px-12">

        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          Start Exploring
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Ready to discover MyProject?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
          Explore the posts, search for content or create an account and
          become part of the experience.
        </p>

        <Link
          href="/register"
          className="mt-8 inline-flex rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-1 hover:bg-blue-500"
        >
          Create Your Account
        </Link>

      </div>
    </div>
  </section>
</main>


);
};

export default About;
