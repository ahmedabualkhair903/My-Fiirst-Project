
"use client";

import { FaSearch } from "react-icons/fa";

type SearchPostInputProps = {
  value: string;
  onChange: (value: string) => void;
};

const SearchPostInput = ({
  value,
  onChange,
}: SearchPostInputProps) => {
  return (
    <div className="w-full">
      <label
        htmlFor="search"
        className="mb-3 block text-sm font-semibold text-slate-700"
      >
        Search Posts
      </label>

      <div className="relative">
        {/* Search Icon */}
        <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center justify-center text-slate-400">
          <FaSearch className="text-sm" />
        </div>

        {/* Input */}
        <input
          id="search"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title or content..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
};

export default SearchPostInput;

