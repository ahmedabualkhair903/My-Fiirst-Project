import { TPost } from "@/types/post";

const LOCAL_POSTS_KEY = "localPosts";

/**
 * Get all locally stored posts.
 */
export const getLocalPosts = (): TPost[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedPosts = localStorage.getItem(LOCAL_POSTS_KEY);

    if (!storedPosts) {
      return [];
    }

    const parsedPosts = JSON.parse(storedPosts);

    return Array.isArray(parsedPosts) ? parsedPosts : [];
  } catch (error) {
    console.error("Failed to load local posts:", error);

    return [];
  }
};

/**
 * Get a single local post by ID.
 */
export const getLocalPostById = (
  id: number
): TPost | null => {
  const posts = getLocalPosts();

  return (
    posts.find((post) => post.id === id) ?? null
  );
};

/**
 * Save all local posts.
 */
export const saveLocalPosts = (
  posts: TPost[]
): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(
      LOCAL_POSTS_KEY,
      JSON.stringify(posts)
    );
  } catch (error) {
    console.error("Failed to save local posts:", error);
  }
};

/**
 * Add a new local post.
 */
export const addLocalPost = (
  title: string,
  body: string
): TPost => {
  const posts = getLocalPosts();

  const newPost: TPost = {
    userId: 1,
    id: Date.now(),
    title: title.trim(),
    body: body.trim(),
  };

  saveLocalPosts([newPost, ...posts]);

  return newPost;
};

/**
 * Update an existing local post.
 */
export const updateLocalPost = (
  id: number,
  title: string,
  body: string
): TPost | null => {
  const posts = getLocalPosts();

  const postExists = posts.some(
    (post) => post.id === id
  );

  if (!postExists) {
    return null;
  }

  const updatedPost: TPost = {
    userId: 1,
    id,
    title: title.trim(),
    body: body.trim(),
  };

  const updatedPosts = posts.map((post) =>
    post.id === id ? updatedPost : post
  );

  saveLocalPosts(updatedPosts);

  return updatedPost;
};

/**
 * Delete a local post.
 */
export const deleteLocalPost = (
  id: number
): boolean => {
  const posts = getLocalPosts();

  const updatedPosts = posts.filter(
    (post) => post.id !== id
  );

  if (updatedPosts.length === posts.length) {
    return false;
  }

  saveLocalPosts(updatedPosts);

  return true;
};

/**
 * Delete all local posts.
 */
export const clearLocalPosts = (): void => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(LOCAL_POSTS_KEY);
  } catch (error) {
    console.error("Failed to clear local posts:", error);
  }
};