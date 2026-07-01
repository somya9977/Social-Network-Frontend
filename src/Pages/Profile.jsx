import { useEffect, useState } from "react"
import { MapPin, Calendar, Edit, MoreHorizontal, Heart, MessageCircle, Camera, UserPlus, UserCheck } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import PostModal from "./PostModal"
import { useDispatch } from "react-redux"
import { updatePost } from "../Utils/User"
import axios from "axios"

export default function Profile() {

  const nav = useNavigate()
  const { id } = useParams()
  const myData = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const isOwnProfile = !id

  const [viewedUser, setViewedUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const [followLoading, setFollowLoading] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    if (!id) {
      setViewedUser(null)
      return
    }

    async function fetchUser() {
      try {
        setLoading(true)
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/profile/${id}`,
          { withCredentials: true }
        )
        setViewedUser(res.data.data)
        setIsFollowing(res.data.data.isFollowing)
      } catch (error) {
        console.log(error)
        setViewedUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  const handleUpdatePost = (postId, updatedFields) => {
  if (isOwnProfile) {
    // Redux update — apni profile ke liye
    dispatch(updatePost({ postId, updatedFields }))
  } else {
    // local state update — kisi dusre ka profile dekhte waqt
    setViewedUser((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p._id === postId ? { ...p, ...updatedFields } : p
      ),
    }))
  }
}

  const handleFollowToggle = async () => {
    try {
      setFollowLoading(true)
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/profile/follow-unfollow/${id}`,
        {},
        { withCredentials: true }
      )

      setIsFollowing(res.data.isFollowing)

      setViewedUser((prev) => ({
        ...prev,
        followers: res.data.isFollowing
          ? [...(prev.followers || []), "temp"]
          : (prev.followers || []).slice(0, -1)
      }))
    } catch (error) {
      console.log(error)
    } finally {
      setFollowLoading(false)
    }
  }

  const user = isOwnProfile ? myData : viewedUser
  const posts = user?.posts

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "ME"

  if (!isOwnProfile && loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading profile...</p>
      </div>
    )
  }

  if (!isOwnProfile && !user && !loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">User not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 pb-20">

      {/* Cover Photo */}
      <div className="h-32 sm:h-44 bg-gradient-to-br from-blue-900 to-slate-800 relative">
        {isOwnProfile && (
          <button className="absolute bottom-3 right-3 sm:right-4 flex items-center gap-1.5 bg-black/50 border border-slate-600 text-slate-300 text-xs px-2.5 sm:px-3 py-1.5 rounded-lg hover:bg-black/70 transition">
            <Camera size={13} />
            <span className="hidden sm:inline">Edit cover</span>
          </button>
        )}
      </div>

      {/* Avatar + Action Buttons */}
      <div className="px-4 sm:px-6 relative">
        <div className="absolute -top-10 sm:-top-12 left-4 sm:left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-slate-950 bg-blue-900 text-blue-300 flex items-center justify-center text-xl sm:text-2xl font-bold overflow-hidden">
          {user?.dp || user?.displayPicture
            ? <img src={user.dp || user.displayPicture} alt="avatar" className="w-full h-full object-cover" />
            : initials}
        </div>

        <div className="flex justify-end gap-2 pt-3 mb-12 sm:mb-14">
          {isOwnProfile ? (
            <>
              <button onClick={() => {nav("/edit")}} className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-200 text-xs sm:text-sm rounded-xl hover:bg-slate-700 transition font-medium">
                <Edit size={14} />
                <span className="hidden xs:inline sm:inline">Edit Profile</span>
              </button>
              <button className="w-9 h-9 bg-slate-800 border border-slate-700 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-700 transition shrink-0">
                <MoreHorizontal size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-xl transition font-medium disabled:opacity-50 ${
                isFollowing
                  ? "bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isFollowing ? <UserCheck size={14} /> : <UserPlus size={14} />}
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 mb-5">
        <h1 className="text-white text-lg sm:text-xl font-bold break-words">
          {user?.firstName} {user?.lastName}
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">@{user?.username}</p>

        {user?.bio && (
          <p className="text-slate-400 text-sm mt-3 leading-relaxed max-w-lg break-words">
            {user.bio}
          </p>
        )}

        <div className="flex flex-wrap gap-3 sm:gap-4 mt-3">
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
      <div className="flex gap-4 sm:gap-8 px-4 sm:px-6 py-4 border-y border-slate-800 mb-5 overflow-x-auto">
        <div className="text-center shrink-0">
          <p className="text-white font-bold text-base sm:text-lg">{posts?.length ?? 0}</p>
          <p className="text-slate-500 text-xs">Posts</p>
        </div>
        <div className="text-center cursor-pointer hover:opacity-80 transition shrink-0">
          <p className="text-white font-bold text-base sm:text-lg">
            {user?.followers?.length >= 1000
              ? `${(user.followers.length / 1000).toFixed(1)}k`
              : user?.followers?.length ?? 0}
          </p>
          <p className="text-slate-500 text-xs">Followers</p>
        </div>
        <div className="text-center cursor-pointer hover:opacity-80 transition shrink-0">
          <p className="text-white font-bold text-base sm:text-lg">{user?.following?.length ?? 0}</p>
          <p className="text-slate-500 text-xs">Following</p>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="px-2 sm:px-6">
        {!posts || posts.length === 0 ? (
          <div className="text-center py-16">
            <Camera size={36} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-500 text-sm">
              Abhi tak koi post nahi
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1 sm:gap-0.5">
            {posts?.map((post) => (
              <PostCard key={post._id} post={post} onClick={() => setSelectedPost(post)} />
            ))}
          </div>
        )}
      </div>
      {selectedPost && (
    <PostModal
      post={selectedPost}
      onClose={() => setSelectedPost(null)}
      onUpdatePost={handleUpdatePost}
    />
  )}
    </div>
  )
}


function PostCard({ post, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      className="bg-[#0a0f1e] border border-slate-800 rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-colors hover:border-slate-700"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-square bg-slate-800">
        {post.image ? (
          <img src={post.image} alt="post" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600">
            <Camera size={28} />
          </div>
        )}

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

      <div className="p-2 sm:p-2.5">
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