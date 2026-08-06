"use client"


import { useState } from 'react'

const AdminPostForm = () => {
  const [title, settitle] = useState("")
  const [description, setdescription] = useState("")

    const handleSubmit =(e: React.FormEvent) =>{
    e.preventDefault()
    if( title === "") return alert("Title is required")
    if( description === "") return alert("Description is required")
    };

  return (
       <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <p className="text-sm text-gray-500">
          Add Post Details:
          </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label 
           htmlFor="title"
          className="flex flex-col text-sm text-gray-700">
            <span className="mb-1">Title</span>
          <input
           type="test"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => settitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
            </label>
          <label
           htmlFor="description"
           className="flex flex-col text-sm text-gray-700">
            <span className="mb-1">Description</span>
            <textarea
           id="description"
           placeholder="description"
                       value={description}
            onChange={(e) => setdescription(e.target.value)}
           className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"/>
           </label>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
         Add post
        </button>
       </form>
  )
}

export default AdminPostForm
