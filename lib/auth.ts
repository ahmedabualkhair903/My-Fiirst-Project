import { TUser } from "@/types/user";

const USERS_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

// =========================
// Default Admin
// =========================

const DEFAULT_ADMIN: TUser = {
  id: 999999999,
  firstName: "Admin",
  lastName: "User",
  email: "admin@myproject.com",
  password: "admin123",
  role: "admin",
};

// =========================
// Get All Users
// =========================

export const getUsers = (): TUser[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
      return [];
    }

    const parsedUsers = JSON.parse(users);

    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers as TUser[];
  } catch (error) {
    console.error("Failed to load users:", error);
    return [];
  }
};

// =========================
// Save Users
// =========================

const saveUsers = (users: TUser[]): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Failed to save users:", error);
  }
};

// =========================
// Initialize Default Admin
// =========================

export const initializeAdmin = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  const users = getUsers();

  const adminExists = users.some(
    (user) =>
      user.email.trim().toLowerCase() ===
      DEFAULT_ADMIN.email.toLowerCase()
  );

  if (adminExists) {
    return;
  }

  saveUsers([...users, DEFAULT_ADMIN]);
};

// =========================
// Register User
// =========================

export const registerUser = (
  user: Omit<TUser, "id" | "role">
): {
  success: boolean;
  message: string;
} => {
  if (typeof window === "undefined") {
    return {
      success: false,
      message: "Registration is not available on the server.",
    };
  }

  initializeAdmin();

  const users = getUsers();

  const normalizedEmail = user.email.trim().toLowerCase();

  const existingUser = users.find(
    (item) =>
      item.email.trim().toLowerCase() === normalizedEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "Email is already registered.",
    };
  }

  const newUser: TUser = {
    ...user,
    firstName: user.firstName.trim(),
    lastName: user.lastName.trim(),
    email: normalizedEmail,
    id: Date.now(),
    role: "user",
  };

  saveUsers([...users, newUser]);

  return {
    success: true,
    message: "Registration successful.",
  };
};

// =========================
// Login User
// =========================

export const loginUser = (
  email: string,
  password: string
): {
  success: boolean;
  message: string;
} => {
  if (typeof window === "undefined") {
    return {
      success: false,
      message: "Login is not available on the server.",
    };
  }

  initializeAdmin();

  const users = getUsers();

  const normalizedEmail = email.trim().toLowerCase();

  const user = users.find(
    (item) =>
      item.email.trim().toLowerCase() === normalizedEmail &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(user)
  );

  return {
    success: true,
    message: "Login successful.",
  };
};

// =========================
// Get Current User
// =========================

export const getCurrentUser = (): TUser | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem(
      CURRENT_USER_KEY
    );

    if (!storedUser) {
      return null;
    }

    const parsedUser = JSON.parse(storedUser);

    if (
      !parsedUser ||
      typeof parsedUser !== "object"
    ) {
      return null;
    }

    return parsedUser as TUser;
  } catch (error) {
    console.error(
      "Failed to load current user:",
      error
    );

    return null;
  }
};

// =========================
// Check Admin
// =========================

export const isAdmin = (): boolean => {
  const currentUser = getCurrentUser();

  return currentUser?.role === "admin";
};

// =========================
// Update Current User
// =========================

export const updateCurrentUser = (
  updates: Partial<Omit<TUser, "id" | "role">>
): {
  success: boolean;
  message: string;
} => {
  if (typeof window === "undefined") {
    return {
      success: false,
      message:
        "This action is not available on the server.",
    };
  }

  const currentUser = getCurrentUser();

  if (!currentUser) {
    return {
      success: false,
      message: "No user is currently logged in.",
    };
  }

  const users = getUsers();

  const normalizedUpdates = {
    ...updates,

    ...(updates.email !== undefined && {
      email: updates.email.trim().toLowerCase(),
    }),

    ...(updates.firstName !== undefined && {
      firstName: updates.firstName.trim(),
    }),

    ...(updates.lastName !== undefined && {
      lastName: updates.lastName.trim(),
    }),
  };

  const updatedUser: TUser = {
    ...currentUser,
    ...normalizedUpdates,
  };

  const updatedUsers = users.map((user) =>
    user.id === currentUser.id
      ? updatedUser
      : user
  );

  saveUsers(updatedUsers);

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(updatedUser)
  );

  return {
    success: true,
    message: "User updated successfully.",
  };
};

// =========================
// Logout
// =========================

export const logoutUser = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(CURRENT_USER_KEY);
};

// =========================
// Check Login
// =========================

export const isLoggedIn = (): boolean => {
  return getCurrentUser() !== null;
};