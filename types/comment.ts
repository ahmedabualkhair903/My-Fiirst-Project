// =========================
// Comment
// =========================

export type TComment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

// =========================
// Comment Form Data
// Used for Create / Update
// =========================

export type TCommentFormData = {
  name: string;
  email: string;
  body: string;
};