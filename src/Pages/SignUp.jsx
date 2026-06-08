import { useState } from "react"
import toast from "react-hot-toast"
import validator from "validator"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Signup() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [otpSent, setOtpSent] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [Email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-blue-400/20 rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-3xl shadow-lg shadow-blue-500/30">
            🌐
          </div>

          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mt-4">
            Sign Up
          </h1>

          <p className="text-gray-300 mt-2">
            Join our social community
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-200 mb-2">
            Email Address
          </label>

          <input
            onChange={(e) => {setEmail(e.target.value)}}
            type="email"
            placeholder="Enter your email"
            className="w-full bg-white/10 border border-blue-400/20 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
          />
        </div>

        {/* Send OTP */}
        <button
            onClick={() =>{
                        if(!validator.isEmail(Email))
                        {
                            return toast.error("Pls enter Valid email")
                        }
                        

                        axios.post(BACKEND_URL + "/api/auth/send-otp", {email : Email})
                        .then((response) => {
                          console.log("ok")
                            toast.success(response.data.message)
                            if(response.status === 201)
                            {
                                setOtpSent(true)
                            }
                        
                        })
                        .catch((error) => {
                          const message = error.response?.data?.message;

                          if (message === "User already exists") {
                            toast.error("Account already exists. Please login.");
                            nav("/login");
                          } else {
                            toast.error(message || "Failed to send OTP");
                          }
                        })
                    
            } }                   
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition mb-6"
        >
          Send OTP
        </button>

        {otpSent && (
          <>
            {/* OTP */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">
                OTP
              </label>

              <input
                onChange={(e) => {setOtp(e.target.value)}}
                type="number"
                placeholder="Enter OTP"
                className="w-full bg-white/10 border border-blue-400/20 text-white placeholder-gray-400 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />

              <button
                    onClick={() => {
                            if (otp.toString().length !== 6) {
                                return toast.error("Pls enter Valid otp")
                            }
                            axios.post(BACKEND_URL + "/api/auth/varify-mail", {email : Email, otp})
                            .then((res) => {
                                if(res.status === 200)
                                {
                                    toast.success("Email is Varify")
                                    setOtpVerified(true)
                                }
                                
                            })
                            .catch((error) => {
                                console.log(error.response?.data)
                                toast.error("Wrong Otp")
                            })
                            
                    }}
                className="w-full py-3 mt-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02] transition"
              >
                Verify OTP
              </button>
            </div>

            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-200 mb-2">
                Username
              </label>

              <input
                onChange={(e) => {setUsername(e.target.value)}}
                type="text"
                placeholder="Choose a username"
                disabled={!otpVerified}
                className={`w-full rounded-xl px-4 py-3 outline-none ${
                  otpVerified
                    ? "bg-white/10 border border-blue-400/20 text-white placeholder-gray-400 focus:border-cyan-400"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-200 mb-2">
                Password
              </label>

              <input
                onChange={(e) => {setPassword(e.target.value)}}
                type="password"
                placeholder="Create password"
                disabled={!otpVerified}
                className={`w-full rounded-xl px-4 py-3 outline-none ${
                  otpVerified
                    ? "bg-white/10 border border-blue-400/20 text-white placeholder-gray-400 focus:border-cyan-400"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                }`}
              />
            </div>

            {/* Create Account */}
            <button
                onClick={() => {
                    if(!username || !password)
                    {
                        return toast.error("Plas enter all feild")
                    }
                    if(!validator.isStrongPassword(password))
                    {
                        return toast.error("Pls Enter a strong Password")
                    }
                    if (username.length < 2 || username.length > 10)
                    {
                        return toast.error("Please enter a username between 2 and 10 characters")
                    }

                    axios.post(BACKEND_URL + "/api/auth/signup", {email : Email, username, password})
                    .then((res) => {
                        if(res.status === 200)
                        {
                            toast.success("User created")
                            nav("/login")
                        }
                    })
                    .catch(() =>{
                        toast.error("signUp faild")
                    })
                }}
              disabled={!otpVerified}
              className={`w-full py-3 rounded-xl font-semibold transition ${
                otpVerified
                  ? "text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02]"
                  : "bg-gray-600 text-gray-300 cursor-not-allowed"
              }`}
            >
              Create Account
            </button>
          </>
        )}

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <span onClick={() => {nav("/login")}} className="text-cyan-400 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;