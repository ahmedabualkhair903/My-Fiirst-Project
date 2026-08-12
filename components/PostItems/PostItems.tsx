
"use client";

import { TPost } from "@/types/post";
import Link from "next/link";
import {
  FaArrowRight,
  FaRegFileAlt,
} from "react-icons/fa";

type PostItemsProps = {
  post: TPost;
};

const PostItems = ({ post }: PostItemsProps) => {
  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-[1.75rem]
        border border-slate-200/80
        bg-white
        shadow-sm
        transition-all duration-300 ease-out
        hover:-translate-y-1.5
        hover:border-blue-200
        hover:shadow-xl
        hover:shadow-slate-900/[0.08]
      "
    >
      {/* Top Accent */}
      <div
        className="
          absolute left-0 top-0 h-1 w-full
          origin-left scale-x-0
          bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600
          transition-transform duration-300
          group-hover:scale-x-100
        "
      />

      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-6 pt-7">
        {/* Article Info */}
        <div className="flex items-center gap-3">
          {/* Icon */}
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-2xl
              bg-blue-50
              text-blue-600
              transition-all duration-300
              group-hover:bg-blue-600
              group-hover:text-white
              group-hover:shadow-lg
              group-hover:shadow-blue-600/20
            "
          >
            <FaRegFileAlt className="text-sm" />
          </div>

          {/* Text */}
          <div>
            <p
              className="
                text-[10px]
                font-extrabold
                uppercase
                tracking-[0.16em]
                text-slate-400
              "
            >
              Article
            </p>

            <p className="mt-0.5 text-xs font-medium text-slate-400">
              MyProject
            </p>
          </div>
        </div>

        {/* Post ID */}
        <span
          className="
            rounded-full
            border border-slate-100
            bg-slate-50
            px-3 py-1.5
            text-[10px]
            font-bold
            tracking-wide
            text-slate-400
            transition-all duration-300
            group-hover:border-blue-100
            group-hover:bg-blue-50
            group-hover:text-blue-600
          "
        >
          #{post.id}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
        {/* Title */}
        <h2
          className="
            line-clamp-2
            min-h-[4rem]
            text-lg
            font-extrabold
            capitalize
            leading-8
            tracking-tight
            text-slate-900
            transition-colors duration-300
            group-hover:text-blue-600
            sm:text-xl
          "
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className="
            mt-4
            line-clamp-4
            flex-1
            text-sm
            leading-7
            text-slate-500
          "
        >
          {post.body}
        </p>

        {/* ================= FOOTER ================= */}
        <div className="mt-7 border-t border-slate-100 pt-5">
          <Link
            href={`/posts/${post.id}`}
            className="
              group/link
              flex items-center justify-between
              rounded-xl
              border border-slate-100
              bg-slate-50
              px-4 py-3
              text-sm
              font-bold
              text-slate-700
              transition-all duration-300
              hover:border-blue-600
              hover:bg-blue-600
              hover:text-white
              hover:shadow-lg
              hover:shadow-blue-600/20
            "
          >
            <span>Read Article</span>

            <span
              className="
                flex h-8 w-8 items-center justify-center
                rounded-lg
                bg-white
                text-slate-500
                shadow-sm
                transition-all duration-300
                group-hover/link:translate-x-1
                group-hover/link:bg-blue-500
                group-hover/link:text-white
              "
            >
              <FaArrowRight className="text-xs" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostItems;

