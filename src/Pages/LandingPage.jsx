import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageCircle,
  Heart,
  Bell,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          SocialHub
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => nav("/login")}
            className="px-5 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            Login
          </button>

          <button
            onClick={() => nav("/signup")}
            className="px-5 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-24 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left */}
        <div className="flex-1">
          <span className="bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm">
            🚀 Join Thousands of Users
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
            Connect With
            <span className="text-blue-500"> People </span>
            Around The World
          </h1>

          <p className="text-slate-400 text-lg mt-6 max-w-xl">
            Share your thoughts, discover amazing communities,
            chat with friends, and build meaningful connections
            in one place.
          </p>

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => nav("/signup")}
              className="bg-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
            >
              Get Started
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => nav("/login")}
              className="border border-slate-700 px-8 py-4 rounded-xl hover:bg-slate-900 transition"
            >
              Login
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="https://i.pravatar.cc/100?img=1"
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h3 className="font-semibold">Alex Johnson</h3>
                <p className="text-slate-400 text-sm">
                  Posted 2 mins ago
                </p>
              </div>
            </div>

            <p className="text-slate-300 mb-4">
              Just launched my new project 🚀
              Excited to share it with everyone!
            </p>

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
              alt=""
              className="rounded-xl mb-4"
            />

            <div className="flex justify-between text-slate-400">
              <div className="flex gap-2 items-center">
                <Heart size={18} />
                1.2k
              </div>

              <div className="flex gap-2 items-center">
                <MessageCircle size={18} />
                324
              </div>

              <div className="flex gap-2 items-center">
                <Bell size={18} />
                87
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose SocialHub?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
            <Users className="text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">
              Connect
            </h3>
            <p className="text-slate-400">
              Find friends, join communities and grow your network.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
            <MessageCircle
              className="text-blue-500 mb-4"
              size={40}
            />
            <h3 className="text-xl font-semibold mb-3">
              Chat Instantly
            </h3>
            <p className="text-slate-400">
              Real-time messaging with seamless communication.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-blue-500 transition">
            <Heart className="text-blue-500 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">
              Share Moments
            </h3>
            <p className="text-slate-400">
              Post photos, videos and stories effortlessly.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-5xl font-bold text-blue-500">
              10K+
            </h3>
            <p className="text-slate-400 mt-2">Users</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">
              50K+
            </h3>
            <p className="text-slate-400 mt-2">Posts</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">
              100+
            </h3>
            <p className="text-slate-400 mt-2">Communities</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold text-blue-500">
              99%
            </h3>
            <p className="text-slate-400 mt-2">Satisfaction</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 px-8">
        <h2 className="text-5xl font-bold">
          Ready To Join?
        </h2>

        <p className="text-slate-400 mt-4 text-lg">
          Create your account and start connecting today.
        </p>

        <button
          onClick={() => nav("/signup")}
          className="mt-8 bg-blue-600 px-10 py-4 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Create Free Account
        </button>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-slate-500">
        © 2026 SocialHub. All Rights Reserved.
      </footer>
    </div>
  );
}