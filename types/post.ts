// =========================
// Post
// =========================

export type TPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

// =========================
// Post Form Data
// Used for Create / Update
// =========================

export type TPostFormData = {
  title: string;
  body: string;
};