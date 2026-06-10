import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import toast from "react-hot-toast"
import axios from "axios"

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  return (
    <div className="min-h-screen bg-slate-950 flex relative overflow-hidden">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 items-center justify-center px-16 relative z-10">
        <div>
          <h1 className="text-6xl font-bold text-white leading-tight">
            Welcome
            <span className="text-blue-500"> Back</span>
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-lg">
            Login to continue connecting with friends, sharing moments,
            and discovering amazing communities.
          </p>

          <div className="mt-10">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
              alt="community"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto">
              <span className="text-2xl font-bold text-white">S</span>
            </div>

            <h1 className="text-4xl font-bold text-white mt-5">
              Login
            </h1>

            <p className="text-slate-400 mt-2">
              Sign in to your account
            </p>
          </div>

          {/* Email */}
          <div className="relative mb-4">
            <Mail
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-4 py-3 text-white placeholder-slate-400 outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          <div className="relative mb-4">
            <Lock
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-11 pr-12 py-3 text-white placeholder-slate-400 outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end mb-6">
            <button className="text-blue-500 hover:text-blue-400 text-sm">
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={() => {
                
                if(!password)
                {
                  return toast.error("Password require")
                }

                axios.post(BACKEND_URL + "/api/auth/login", {email : email, username : email, password}, { withCredentials: true })
                .then((res) => {
                  if(res.status === 200)
                  {
                    const user = res.data.user
                    
                    if(user.isCompleted)
                    {
                      nav("/home")
                    }
                    else
                    {
                      nav("/complete-profile")
                    }
                  }
                })
                .catch(() => {
                  toast.error("Invalid credentials")
                })
              
              
            }}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold"
          >
            Login
          </button>

         

          {/* Signup Link */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?
            <span
              onClick={() => nav("/signup")}
              className="text-blue-500 ml-2 cursor-pointer hover:text-blue-400"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}