import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {  Search, User, Users } from "lucide-react"
import axios from "axios"

export default function Navbar() {
  const nav = useNavigate()
  const user = useSelector((state) => state.user)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  
  
  const currentUser = user?.data || user?.user || user
  
  

  useEffect(() => {

    if(!search.trim())
    {
      setUsers([])
      return
    }

    const timer = setTimeout(async () => {
      const res = axios.get(BACKEND_URL + `/api/profile/search?query=${search}`, {withCredentials : true})
      setUsers((await res).data.data)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])
 

  return (
    <nav className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6 sticky top-0 z-50">

  {/* Left */}
  <div
    className="flex items-center gap-2.5 flex-1 cursor-pointer"
    onClick={() => nav("/home")}
  >
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold text-base">S</span>
    </div>
    <span className="text-white font-bold text-lg">Socials</span>
  </div>

  {/* Center */}
  <div className="flex justify-center flex-1 relative">
    <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 w-80 ">
      <Search size={15} className="text-slate-500 flex-shrink-0" />

      <input
        type="text"
        placeholder="Search people, posts..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-transparent text-slate-300 text-sm outline-none placeholder-slate-500 w-full"
      />
{users.length > 0 && (
  <div
    className="absolute top-14 left-0 w-full bg-slate-900 border border-white/10 rounded-xl shadow-lg overflow-y-auto z-50 max-h-[330px] no-scrollbar"
  >
    {users.map((item) => {
      return (
        <div
          key={item._id}
          onClick={() => {
            setSearch("")
            setUsers([])
            nav(`/profile/${item._id}`)
          }}
          className="flex items-center gap-3 p-3 hover:bg-white/10 cursor-pointer"
        >
          <img
            src={
              item.dp ||
              "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
            }
            alt=""
            className="w-10 h-10 rounded-full object-cover shrink-0"
          />

          <div className="flex flex-col min-w-0">
            <span className="text-white text-sm font-medium truncate">
              {item.firstName} {item.lastName}
            </span>
            <span className="text-gray-400 text-xs truncate">
              @{item.username}
            </span>
          </div>
        </div>
      )
    })}
  </div>
)}
    </div>
  </div>

  {/* Right */}
  <div className="flex items-center justify-end gap-2 flex-1 text-white">
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
      {user?.data?.firstName ||
        user?.user?.username ||
        user.firstName ||
        "Guest"}
    </span>
  </div>

</nav>
  )
}