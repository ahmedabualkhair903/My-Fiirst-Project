"use client"

import Link from "next/link"
import { useState } from "react"
import { IoIosMenu } from "react-icons/io"
import { IoClose } from "react-icons/io5"
import Navbar from "../navbar/navbar"



const Header = () => {
    const [ isOpen , setisOpen] = useState(false);
  return (
    <>
    <header className="fixed top-0 bg-white/95 w-full backdrop-blur-sm shadow-sm z-50">
    <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
         <Link href={"/"}>
         <span className="text-2xl font-bold text-gray-600">AHMED SALEM</span>
         </Link>
         <Navbar />
         <button className="md:hidden"
         onClick={() => setisOpen((prev) => !prev)}
         >
            {isOpen ? (
                <IoClose className="w-6 h-6"/>
            ) : (
                
                <IoIosMenu className="w-6 h-6"/>
            )}
         </button>
         <div className="hidden md:flex items-center space-x-8">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                <Link href={"/login"}>Login</Link>
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-800 text-white rounded-md">
                <Link href={"/register"}>Register</Link>
            </button>
         </div>
        </div>
            {isOpen && (
            <nav className="md:hidden flex items-center flex-col space-y-3 mt-4 pb-4">
            <Link className="text-gray-700 hover:text-blue-600 transition-colors capitalize" href={"/about"}>About</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-colors capitalize" href={"/posts"}>Posts</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-colors capitalize" href={"/search"}>Search</Link>
            <Link className="text-gray-700 hover:text-blue-600 transition-colors capitalize" href={"/admin"}>Admin</Link>
         </nav>
         )}
    </div>
    </header>
    </>
  )
}

export default Header
