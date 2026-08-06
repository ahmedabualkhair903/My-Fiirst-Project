"use client"

import { useState } from "react";
import AdminSitbar from "./AdminSitbar"
import { IoIosMenu } from "react-icons/io";

interface IAdminLayoutProps{
    children: React.ReactNode;
}


const AdminLayout = ({children}: IAdminLayoutProps) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen bg-slate-50">
     <AdminSitbar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
     <main className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
            { /* Icon Toggle Sidebar */}
            <div className="flex items-center justify-between mb-8 ">
                <div>
                    <h2 className="text-3xl font-bold text-slate-900">Dashboard</h2>
                    <p className="text-slate-600 mt-2">Welcome to your Admin panel</p>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-slate-300 hover:border-slate-100 transition-colors">
                    <IoIosMenu className="w-6 h-6"/>
                </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
                {children}
            </div>
        </div>
     </main>
    </div>
  )
}

export default AdminLayout
