import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute right-0 top-32 h-[450px] w-[450px] rounded-full bg-indigo-100/40 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="flex min-h-[calc(100vh-80px)] items-center py-20">
          {/* Hero Content */}
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600" />
              Welcome to MyProject
            </div>

            {/* Heading */}
            <h1 className="max-w-4xl text-4xl font-black leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl xl:text-7xl">
              Build.
              <br />

              <span className="text-blue-600">Explore.</span>{" "}
              Create.
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
              A modern web experience built with Next.js, React and Tailwind
              CSS. Discover useful content, explore posts and enjoy a clean
              interface designed for a better experience.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Link
                href="/posts"
                className="group inline-flex items-center justify-center rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-blue-600/30"
              >
                Explore Posts

                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid w-full max-w-lg grid-cols-3 border-t border-slate-200 pt-6">
              <div className="text-center">
                <p className="text-2xl font-black text-slate-950">100%</p>

                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  Responsive
                </p>
              </div>

              <div className="border-x border-slate-200 text-center">
                <p className="text-2xl font-black text-slate-950">Next.js</p>

                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  Framework
                </p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-black text-slate-950">Modern</p>

                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                  UI Design
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;