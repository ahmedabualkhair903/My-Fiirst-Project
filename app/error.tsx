"use client"

import Link from "next/link"

interface IErrorPageProps {
    error: Error,
    reset: () => void,
}



const error = ({ error, reset }: IErrorPageProps) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 mt-10">
        <h1 className="text-red-700 text-2xl font-bold">Error</h1>
        <p>{ error?.message}</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white rounded-full px-4 py-2">Try Again</button>
        <Link href={"/"} className="bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-500 text-white">Back Home</Link>
      </div>
    </>
  )
}

export default error
