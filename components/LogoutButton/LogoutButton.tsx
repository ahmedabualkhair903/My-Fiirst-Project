
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const { logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();

    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;

