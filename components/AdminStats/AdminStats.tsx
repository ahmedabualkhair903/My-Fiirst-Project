"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FaComments,
  FaFileAlt,
  FaUsers,
} from "react-icons/fa";

import { getUsers } from "@/lib/auth";
import { getLocalPosts } from "@/lib/posts";
import { TComment } from "@/types/comment";
import { TPost } from "@/types/post";

const AdminStats = () => {
  const [posts, setPosts] = useState(0);
  const [comments, setComments] = useState(0);
  const [users, setUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);

        const [postsResponse, commentsResponse] =
          await Promise.all([
            axios.get<TPost[]>(
              "https://jsonplaceholder.typicode.com/posts"
            ),
            axios.get<TComment[]>(
              "https://jsonplaceholder.typicode.com/comments"
            ),
          ]);

        const localPosts = getLocalPosts();
        const storedUsers = getUsers();

        setPosts(
          postsResponse.data.length +
            localPosts.length
        );

        setComments(commentsResponse.data.length);
        setUsers(storedUsers.length);
      } catch (error) {
        console.error(
          "Failed to load admin statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const stats = [
    {
      title: "Total Posts",
      value: posts,
      description: "Published content",
      icon: <FaFileAlt size={20} />,
      iconWrapper:
        "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
      valueColor: "text-blue-600",
    },
    {
      title: "Total Comments",
      value: comments,
      description: "User feedback",
      icon: <FaComments size={20} />,
      iconWrapper:
        "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
      valueColor: "text-purple-600",
    },
    {
      title: "Total Users",
      value: users,
      description: "Registered accounts",
      icon: <FaUsers size={20} />,
      iconWrapper:
        "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
      valueColor: "text-emerald-600",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
          >
            <div className="animate-pulse">
              <div className="h-12 w-12 rounded-xl bg-gray-100" />

              <div className="mt-5 h-4 w-28 rounded bg-gray-100" />

              <div className="mt-3 h-9 w-20 rounded bg-gray-100" />

              <div className="mt-3 h-3 w-32 rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gray-50 transition-transform duration-500 group-hover:scale-150" />

          <div className="relative">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-105 ${stat.iconWrapper}`}
            >
              {stat.icon}
            </div>

            <div className="mt-5">
              <p className="text-sm font-medium text-gray-500">
                {stat.title}
              </p>

              <p
                className={`mt-2 text-3xl font-bold tracking-tight ${stat.valueColor}`}
              >
                {stat.value}
              </p>

              <p className="mt-2 text-xs font-medium text-gray-400">
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;