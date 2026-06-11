import { useState, useEffect } from "react"

import { MapPin, Calendar, Edit, MoreHorizontal, Heart, MessageCircle, Camera } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Profile() {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [posts, setPosts] = useState([])
  const [user, setUser] = useState()
  const [loadingPosts, setLoadingPosts] = useState(true)
  const nav = useNavigate()
  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "ME"



   
useEffect(() => {
    
    axios.get(BACKEND_URL + "/api/profile/me", { withCredentials: true })
        .then((res) => {
        setUser(res.data)
        setPosts(res.data.posts || [])
        })
        .catch(() => toast.error("Profile load nahi hui")) 
        .finally(() => setLoadingPosts(false)) 
}, [])


  return (
    <div className="min-h-screen bg-slate-950 pb-10">

      {/* Cover Photo */}
      <div className="h-44 bg-gradient-to-br from-blue-900 to-slate-800 relative">
        <button className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-black/50 border border-slate-600 text-slate-300 text-xs px-3 py-1.5 rounded-lg hover:bg-black/70 transition">
          <Camera size={13} />
          Edit cover
        </button>
      </div>

      {/* Avatar + Action Buttons */}
      <div className="px-6 relative">
        {/* Avatar */}
        <div className="absolute -top-12 left-6 w-24 h-24 rounded-full border-4 border-slate-950 bg-blue-900 text-blue-300 flex items-center justify-center text-2xl font-bold overflow-hidden">
          {user?.displayPicture
            ? <img src={user.displayPicture} alt="avatar" className="w-full h-full object-cover" />
            : initials}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 pt-3 mb-14">
          <button onClick={() => {nav("/complete-profile")}} className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl hover:bg-slate-700 transition font-medium">
            <Edit size={14} />
            Edit Profile
          </button>
          <button className="w-9 h-9 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-700 transition">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-6 mb-5">
        <h1 className="text-white text-xl font-bold">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">@{user?.username}</p>

        {user?.bio && (
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-lg">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-4 mt-3">
          {user?.location && (
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <MapPin size={14} />
              {user.location}
            </div>
          )}
          {user?.dateOfBirth && (
            <div className="flex items-center gap-1.5 text-slate-500 text-sm">
              <Calendar size={14} />
              Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-8 px-6 py-4 border-y border-slate-800 mb-5">
        <div className="text-center">
          <p className="text-white font-bold text-lg">{posts.length}</p>
          <p className="text-slate-500 text-xs">Posts</p>
        </div>
        <div className="text-center cursor-pointer hover:opacity-80 transition">
          <p className="text-white font-bold text-lg">
            {user?.followers?.length >= 1000
              ? `${(user.followers.length / 1000).toFixed(1)}k`
              : user?.followers?.length ?? 0}
          </p>
          <p className="text-slate-500 text-xs">Followers</p>
        </div>
        <div className="text-center cursor-pointer hover:opacity-80 transition">
          <p className="text-white font-bold text-lg">{user?.following?.length ?? 0}</p>
          <p className="text-slate-500 text-xs">Following</p>
        </div>
      </div>

      

      {/* Posts Grid */}
      <div className="px-6">
        {loadingPosts ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <Camera size={36} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">Abhi tak koi post nahi</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PostCard({ post }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative aspect-square bg-slate-800 cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Post Image ya placeholder */}
      {post.image ? (
        <img src={post.image} alt="post" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-slate-600">
          <Camera size={28} />
        </div>
      )}

      {/* Hover Overlay */}
      {hovered && (
        <div className="absolute inset-0 bg-black/55 flex items-center justify-center gap-5">
          <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
            <Heart size={17} className="fill-white" />
            {post.likes?.length ?? 0}
          </div>
          <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
            <MessageCircle size={17} className="fill-white" />
            {post.comments?.length ?? 0}
          </div>
        </div>
      )}
    </div>
  )
}