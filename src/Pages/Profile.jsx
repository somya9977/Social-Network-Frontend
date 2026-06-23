import { useState} from "react"
import { MapPin, Calendar, Edit, MoreHorizontal, Heart, MessageCircle, Camera } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Profile() {
  
  const nav = useNavigate()
  const user = useSelector((state) => state.user)
  const posts = user?.posts
  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "ME"
  console.log(user)

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
            {user?.dp
              ? <img src={user.dp} alt="avatar" className="w-full h-full object-cover" />
              : initials}
          </div>
  
          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-3 mb-14">
            <button onClick={() => {nav("/edit")}} className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl hover:bg-slate-700 transition font-medium">
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
            <p className="text-white font-bold text-lg">{posts?.length}</p>
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
          {posts?.length === 0 ? (
            <div className="text-center py-16">
              <Camera size={36} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">
                Abhi tak koi post nahi
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-0.5">
              {posts?.map((post) => (
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
      className="bg-[#0a0f1e] border border-slate-800 rounded-2xl overflow-hidden cursor-pointer transition-colors hover:border-slate-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-square bg-slate-800">
        {post.image ? (
          <img src={post.image} alt="post" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <Camera size={28} />
          </div>
        )}
 
        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-black/55 flex items-center justify-center gap-4 transition-opacity duration-200
          ${hovered ? "opacity-100" : "opacity-0"}`}>
          <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
            <Heart size={16} className="fill-white" />
            {post.likes?.length ?? 0}
          </div>
          <div className="flex items-center gap-1.5 text-white text-sm font-semibold">
            <MessageCircle size={16} className="fill-white" />
            {post.comments?.length ?? 0}
          </div>
        </div>
      </div>
 
      {/* Caption + stats — hamesha visible */}
      <div className="p-2.5">
        {post.caption ? (
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">
            {post.caption}
          </p>
        ) : (
          <p className="text-slate-600 text-xs italic">No caption</p>
        )}
 
        <div className="flex items-center gap-3 mt-1.5">
          <span className="flex items-center gap-1 text-slate-500 text-xs">
            <Heart size={13} />
            {post.likes?.length ?? 0}
          </span>
          <span className="flex items-center gap-1 text-slate-500 text-xs">
            <MessageCircle size={13} />
            {post.comments?.length ?? 0}
          </span>
        </div>
      </div>
    </div>
  )
}





