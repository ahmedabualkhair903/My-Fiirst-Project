// =========================
// User Role
// =========================

export type TUserRole = "user" | "admin";

// =========================
// User
// =========================

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: TUserRole;
};

// =========================
// User Data
// Used for Register / Profile
// =========================

export type TUserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

// =========================
// Stored User
// =========================

export type TStoredUser = TUser;