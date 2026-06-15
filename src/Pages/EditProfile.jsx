import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { User, Pencil, ArrowLeft, Camera } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"
import { userReducer } from "../Utils/User"

export default function EditProfile() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [form, setForm] = useState({
    firstName: user?.firstName ?? "",
    lastName:  user?.lastName  ?? "",
    bio:       user?.bio       ?? "",
  })
  const [avatar, setAvatar] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.dp ?? null)
  const [loading, setLoading] = useState(false)
  const [dp, setDp] = useState(null)
  const [imageUrl, setImageUrl] = useState("")

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setAvatar(file)
    setDp(file)
    setAvatarPreview(URL.createObjectURL(file))
  }

  useEffect(() => {
    const formData = new FormData()
    formData.append("file", dp)
    formData.append("upload_preset", "social")

    axios.post("https://api.cloudinary.com/v1_1/duy7jeoyu/image/upload", formData)
    .then((res) => {
        setImageUrl(res.data.secure_url)
    })


  }, [avatarPreview, dp])


  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "ME"

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => nav("/profile")}
            className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-800 transition"
          >
            <ArrowLeft size={17} />
          </button>
          <h1 className="text-white font-bold text-lg">Edit Profile</h1>
        </div>

        {/* Card */}
        <div className="bg-[#0a0f1e] border border-slate-800 rounded-2xl p-6">

          {/* Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div
              className="relative cursor-pointer group"
              onClick={() => document.getElementById("dpInput").click()}
            >
              <div className="p-[3px] rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-violet-500">
                <div className="w-20 h-20 rounded-full border-[3px] border-[#0a0f1e] bg-blue-900 text-blue-300 flex items-center justify-center text-xl font-bold overflow-hidden">
                  {avatarPreview
                    ? <img src={avatarPreview} alt="dp" className="w-full h-full object-cover" />
                    : initials}
                </div>
              </div>
              {/* edit overlay */}
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <Camera size={20} className="text-white" />
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center border-2 border-[#0a0f1e]">
                <Pencil size={11} className="text-white" />
              </div>
            </div>
            <input
              type="file"
              id="dpInput"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
            <p className="text-slate-500 text-xs mt-2">Profile photo change karo</p>
          </div>

          {/* First + Last name */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 transition"
              />
            </div>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="relative mb-6">
            <Pencil size={16} className="absolute left-3.5 top-3.5 text-slate-500" />
            <textarea
              name="bio"
              placeholder="Bio — apne baare mein kuch likho..."
              value={form.bio}
              onChange={handleChange}
              rows={4}
              maxLength={300}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 transition resize-none"
            />
            <p className="text-slate-600 text-xs text-right mt-1">
              {form.bio.length}/300
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => nav("/profile")}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                 setLoading(true)
                if(!form.firstName || !form.lastName || !form.bio)
                {
                    return toast.error("FirstName, lastName, bio require")
                }
                axios.put(BACKEND_URL + "/api/profile/edit",
                {
                    firstName : form.firstName,
                    lastName : form.lastName,
                    dp : imageUrl,
                    bio : form.bio
                }, 
                {withCredentials : true})
                .then((res) => {
                    if(res.status === 200)
                    {
                        dispatch(userReducer(res.data.user))
                        toast.success("profile Updated")
                        nav("/profile")
                    }
                })
                .catch((err) => {
                    toast.error(
                        err.response?.data?.err || "Something went wrong"
                    );
                })
                 .finally(() => {
                    setLoading(false)
                 })
                    
                    



              }}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}