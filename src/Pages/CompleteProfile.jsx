import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { User,  Camera, Pencil, Check, Calendar } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

export default function CompleteProfile() {
  const nav = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob : "",
    gender: "",
    bio: "",
  })
  console.log(form)
  const [dp, setDp] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(null)
  const [loading] = useState(false)


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAvatar = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setDp(file)
    setAvatarPreview(URL.createObjectURL(file))
  }



 

  return (
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center px-16 relative z-10">
        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Complete Your
            <span className="text-blue-500"> Profile</span>
          </h1>
          <p className="text-slate-400 text-lg mt-6 max-w-lg">
            Just a few more details so your community knows who you are.
            You can always update this later.
          </p>

          {/* Steps */}
          <div className="mt-10 flex flex-col gap-4">
            {[
              { label: "Account created", done: true },
              { label: "Email verified", done: true },
              { label: "Complete your profile", done: false },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0
                  ${step.done
                    ? "bg-blue-500/30 border-blue-500"
                    : "bg-blue-500/10 border-blue-500/40"}`}>
                  {step.done
                    ? <Check size={16} className="text-blue-400" />
                    : <User size={16} className="text-blue-400" />}
                </div>
                <span className={step.done ? "text-slate-400" : "text-white"}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — Form Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-white">S</span>
            </div>
            <h2 className="text-3xl font-bold text-white mt-4">Your Profile</h2>
            <p className="text-slate-400 mt-1 text-sm">Tell us a bit about yourself</p>
          </div>

          

          {/* Avatar Upload */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative cursor-pointer" onClick={() => document.getElementById("avatarInput").click()}>
              <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 hover:border-blue-500 transition flex items-center justify-content-center overflow-hidden">
                {avatarPreview
                  ? <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                  : <Camera size={28} className="text-slate-500 m-auto" />}
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <Pencil size={12} className="text-white" />
              </div>
            </div>
            <input
              type="file"
              id="avatarInput"
              accept="image/*"
              className="hidden"
              onChange={handleAvatar}
            />
            <span className="text-xs text-slate-500 mt-2">Upload profile photo</span>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="relative">
              <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="relative">
            <Calendar size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500"
            />
            </div>

    

          {/* Gender */}
          <div className="relative mb-3">
            <User size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-blue-500 appearance-none cursor-pointer text-white"
            >
              <option value="" disabled>Gender</option>
              <option>male</option>
              <option>female</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </div>

          {/* Bio */}
          <div className="relative mb-4">
            <Pencil size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
            <textarea
              name="bio"
              placeholder="Bio — tell people who you are..."
              value={form.bio}
              onChange={handleChange}
              rows={3}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 text-sm outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={() => {
                if(!form.firstName || !form.lastName || !form.dob || !form.gender)
                {
                    return toast.error("First name, last name, date of birth and gender are required")
                }

                axios.put(BACKEND_URL + "/api/profile/complete", 
                    {
                    firstName :form.firstName, 
                    lastName :form.lastName, 
                    dob : form.dob, 
                    gender : form.gender, 
                    bio : form.bio, 
                    dp : avatarPreview 
                    }, 
                    {
                    withCredentials: true,
                    })
                .then((res) => {
                    if(res.status === 200)
                    {
                        toast.success("profile completed")
                        nav("/home")
                    }
                })
                .catch((err) => {
                    toast.error(
                        err.response?.data?.err || "Something went wrong"
                    );
                })
            }}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>

          {/* Skip */}
          <p
            onClick={() => nav("/home")}
            className="text-center text-slate-500 text-sm mt-4 cursor-pointer hover:text-slate-400 transition"
          >
            Skip for now →
          </p>
        </div>
      </div>
    </div>
  )
}