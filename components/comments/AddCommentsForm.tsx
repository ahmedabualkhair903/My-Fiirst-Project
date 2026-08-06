"use client"


import { useState } from 'react'

const AddCommentsForm = () => {
  const [comment, setComment] = useState("")


    const handleSubmit =(e: React.FormEvent) =>{
    e.preventDefault()
    if( comment === "") return alert("Comment is required")
     console.log({ comment })
    };

  return (
       <form onSubmit={handleSubmit} className="my-4 mx-auto w-full md:w-2/3">
          <input
           type="text"
            placeholder="Add a comment.."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300 mb-6"/>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300">
         Add Comment
        </button>
       </form>
  )
}

export default AddCommentsForm
