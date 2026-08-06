"use client"

type TPost = {
    userId: number,
    id: number,
    title: string,
    body: string,
}

import Pagination from "@/components/pagination/pagination";
import PostItems from "@/components/PostItems/PostItems";
import SearchPostInput from "@/components/SearchPostInput/SearchPostInput";
import axios from "axios";
import { useEffect, useState } from "react";


const PostsPage = () => {

  const [posts, setPosts] = useState<TPost[]>([]);

const getPosts = async () => {
  try {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
  setPosts(res.data);
  } catch (error) {
   console.log(error)
  }
};

useEffect(() => {
  getPosts();
}, []);

  return (
    <>
    <div className="container m-auto px-4">
    <SearchPostInput />
      <div className="flex items-center justify-center flex-wrap gap-2">
       {posts?.slice(0, 21).map((post) => (
        <PostItems key={post.id} post={post}/>
       ))}
      </div>
      <Pagination/>
    </div>
    </>
  )
}

export default PostsPage
