import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {  Search, User } from "lucide-react"

export default function Navbar() {
  const nav = useNavigate()
  const user = useSelector((state) => state.user)
  const [search, setSearch] = useState("")
  
  
  const currentUser = user?.data || user?.user || user
  
 

  return (
    <nav className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 gap-4 sticky top-0 z-50">

      {/* Logo */}
      <div
        className="flex items-center gap-2.5 mr-auto cursor-pointer"
        onClick={() => nav("/home")}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-base">S</span>
        </div>
        <span className="text-white font-bold text-lg">Socials</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 w-56">
        <Search size={15} className="text-slate-500 flex-shrink-0" />
        <input
          type="text"
          placeholder="Search people, posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent text-slate-300 text-sm outline-none placeholder-slate-500 w-full"
        />
      </div>

      {/* Icons */}
     <div className="flex items-center gap-2 text-white">

  {/* Avatar */}
<div
  onClick={() => nav("/profile")}
  className="w-8 h-8 rounded-full overflow-hidden bg-blue-900 text-blue-300 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition"
>
  {currentUser?.displayPicture || currentUser?.dp ? (
    <img
      src={currentUser.displayPicture || currentUser.dp}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <User size={18} />
  )}
</div>

  <span className="text-sm font-medium">
    {user?.data?.firstName || user?.user?.username ||user.firstName||"Guest"}
  </span>

</div>
    </nav>
  )
}