import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Search, User } from "lucide-react"
import axios from "axios"

export default function Navbar() {
  const nav = useNavigate()
  const user = useSelector((state) => state.user)
  const [search, setSearch] = useState("")
  const [users, setUsers] = useState([])
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const dataref = useRef("")
  const invisibleDiv = useRef(null)
  const [skip, setSkip] = useState(0)
  const scrollRef = useRef(null)
  const [hasMore, setHasMore] = useState(true)

  const currentUser = user?.data || user?.user || user

  useEffect(() => {
    const handleClick = (e) => {
      if (dataref.current && !dataref.current.contains(e.target)) {
        setUsers([])
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  useEffect(() => {
    setSkip(0)
    setHasMore(true)
  }, [search])

  useEffect(() => {
    if (!search.trim()) {
      setUsers([])
      return
    }

    const timer = setTimeout(async () => {
      const res = await axios.get(BACKEND_URL + `/api/profile/search?query=${search}&skip=${skip}`, { withCredentials: true })
      const newData = res.data.data

      if (newData.length === 0) {
        setHasMore(false)
        return
      }

      if (skip === 0) {
        setUsers(newData)
      } else {
        setUsers((prev) => [...prev, ...newData])
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [search, skip])

  useEffect(() => {
    if (!scrollRef.current || !invisibleDiv.current) return

    const observ = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && users.length > 0 && hasMore) {
        setSkip((prev) => prev + 5)
      }
    }, {
      root: scrollRef.current,
      threshold: 0
    })

    observ.observe(invisibleDiv.current)
    return () => observ.disconnect()
  }, [users])

  return (
    <nav className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-3 sm:px-6 sticky top-0 z-50 gap-2">

      {/* Left */}
      <div
        className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0"
        onClick={() => nav("/home")}
      >
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-base">S</span>
        </div>
        <span className="hidden sm:inline text-white font-bold text-lg">Socials</span>
      </div>

      {/* Center */}
      <div ref={dataref} className="flex-1 flex justify-center relative min-w-0">
        <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-xl px-3 py-1.5 w-full max-w-[150px] sm:max-w-xs md:w-80">
          <Search size={15} className="text-slate-500 flex-shrink-0" />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-slate-300 text-sm outline-none placeholder-slate-500 w-full min-w-0"
          />

          {users.length > 0 && (
            <div ref={scrollRef}
              className="absolute top-14 left-0 w-full sm:w-[280px] bg-slate-900 border border-white/10 rounded-xl shadow-lg overflow-y-auto z-50 max-h-[330px] no-scrollbar"
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
              <div ref={invisibleDiv} className="h-[10px]"></div>
            </div>
          )}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-white shrink-0">
        <div
          onClick={() => nav("/profile")}
          className="w-8 h-8 rounded-full overflow-hidden bg-blue-900 text-blue-300 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 transition shrink-0"
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

        <span className="hidden sm:inline text-sm font-medium truncate max-w-[100px]">
          {user?.data?.firstName ||
            user?.user?.username ||
            user.firstName ||
            "Guest"}
        </span>
      </div>

    </nav>
  )
}