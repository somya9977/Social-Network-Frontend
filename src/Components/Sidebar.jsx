import { useNavigate, useLocation } from "react-router-dom"
import { Home, User, MessageCircle, LogOut } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { clearUser } from "../Utils/User"
import { useDispatch } from "react-redux"

export default function Sidebar() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const dispatch = useDispatch()

  return (
    <aside className="group fixed left-0 top-14 z-50 h-[calc(100vh-56px)] w-16 hover:w-56 overflow-hidden bg-slate-950 border-r border-slate-800 flex flex-col transition-all duration-300">

      <div className="flex-1 p-3">

        {/* Menu */}
        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 text-xs font-semibold uppercase tracking-wider px-2 mt-3 mb-1 whitespace-nowrap">
          Menu
        </p>

        <button
          onClick={() => nav("/home")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition text-left ${
            pathname === "/home"
              ? "bg-blue-900/50 text-blue-400"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
        >
          <Home size={18} className="flex-shrink-0" />

          <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Home
          </span>
        </button>

        {/* You */}
        <p className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 text-xs font-semibold uppercase tracking-wider px-2 mt-5 mb-1 whitespace-nowrap">
          You
        </p>

        <button
          onClick={() => nav("/profile")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition text-left ${
            pathname === "/profile"
              ? "bg-blue-900/50 text-blue-400"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
        >
          <User size={18} className="flex-shrink-0" />

          <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Profile
          </span>
        </button>

        <button
          onClick={() => nav("/messages")}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition text-left ${
            pathname === "/messages"
              ? "bg-blue-900/50 text-blue-400"
              : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          }`}
        >
          <MessageCircle size={18} className="flex-shrink-0" />

          <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Messages
          </span>

          <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
            5
          </span>
        </button>

      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => {
            axios.post(BACKEND_URL + "/api/auth/logout", {}, { withCredentials: true })
            .then((res) => {
                if(res.status === 200)
                {
                    toast.success("Sucessful logout")
                    dispatch(clearUser())
                    nav("/login")
                }
            })
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition"
        >
          <LogOut size={18} className="flex-shrink-0" />

          <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Logout
          </span>
        </button>
      </div>

    </aside>
  )
}