import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Image, X, ArrowLeft } from "lucide-react"
import axios from "axios"
import toast from "react-hot-toast"

export default function CreatePost() {
  const nav = useNavigate()
  const user = useSelector((state) => state.user)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [caption, setCaption] = useState("")
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  const initials = user?.firstName
    ? `${user.firstName[0]}${user.lastName?.[0] ?? ""}`.toUpperCase()
    : "ME"

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      return toast.error("Sirf image files allowed hain")
    }

    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
  }

  const handleSubmit = async () => {
    if (!image) {
      return toast.error("Post image is required")
    }

    try {
      setLoading(true)

      // Step 1 — Cloudinary pe image upload karo
      const cloudFormData = new FormData()
      cloudFormData.append("file", image)
      cloudFormData.append("upload_preset", "social")

      const cloudRes = await axios.post(
        "https://api.cloudinary.com/v1_1/duy7jeoyu/image/upload",
        cloudFormData
      )
      const uploadedImageUrl = cloudRes.data.secure_url // ✅ secure_url, "url" nahi

      // Step 2 — uploaded URL backend ko bhejo (JSON, multipart nahi)
      await axios.post(
        BACKEND_URL + "/api/post/create-post",
        { image: uploadedImageUrl, caption },
        { withCredentials: true }
      )

      toast.success("Post created successfully!")
      nav("/profile")
    } catch (err) {
      toast.error(err.response?.data?.err || "Post create nahi hua")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-start justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => nav("/home")}
            className="w-9 h-9 rounded-xl border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-800 transition"
          >
            <ArrowLeft size={17} />
          </button>
          <h1 className="text-white font-bold text-lg">Create Post</h1>
        </div>

        {/* Card */}
        <div className="bg-[#0a0f1e] border border-slate-800 rounded-2xl p-6">

          {/* User row */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-blue-900 text-blue-300 flex items-center justify-center text-xs font-semibold flex-shrink-0 overflow-hidden">
              {user?.displayPicture
                ? <img src={user.displayPicture} alt="dp" className="w-full h-full object-cover" />
                : initials}
            </div>
            <div>
              <p className="text-slate-200 text-sm font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-slate-500 text-xs">@{user?.username}</p>
            </div>
          </div>

          {/* Caption */}
          <div className="relative mb-4">
            <textarea
              placeholder="Caption likho..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={3}
              maxLength={100}
              className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 transition resize-none"
            />
            <p className="text-slate-600 text-xs text-right mt-1">
              {caption.length}/100
            </p>
          </div>

          {/* Image Upload Area */}
          {!preview ? (
            <label
              htmlFor="postImage"
              className="flex flex-col items-center justify-center gap-3 w-full h-56 border-2 border-dashed border-slate-700 rounded-xl cursor-pointer hover:border-blue-500 transition bg-slate-800/30"
            >
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
                <Image size={24} className="text-slate-500" />
              </div>
              <div className="text-center">
                <p className="text-slate-300 text-sm font-medium">Click to upload image</p>
                <p className="text-slate-500 text-xs mt-1">PNG, JPG up to 5MB</p>
              </div>
            </label>
          ) : (
            <div className="relative w-full rounded-xl overflow-hidden">
              <img src={preview} alt="preview" className="w-full max-h-96 object-cover" />
              <button
                onClick={removeImage}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition"
              >
                <X size={16} />
              </button>
            </div>
          )}

          <input
            type="file"
            id="postImage"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => nav("/home")}
              className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-400 text-sm hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
            >
              {loading ? "Posting..." : "Share Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}