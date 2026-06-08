import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const nav = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center px-6">
      <div className="max-w-4xl text-center text-white">
        <h1 className="text-6xl font-bold mb-6">
          Connect With Everyone
        </h1>

        <p className="text-xl text-gray-200 mb-10">
          Share your moments, discover new communities, and stay connected
          with friends around the world.
        </p>

        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">
            Login
          </button>

          <button onClick={() => nav("/signUp")} className="px-8 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
           SignUp
          </button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Connect</h3>
            <p className="text-gray-200">
              Build meaningful connections with people worldwide.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Share</h3>
            <p className="text-gray-200">
              Post photos, videos, and stories instantly.
            </p>
          </div>

          <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
            <h3 className="text-xl font-semibold mb-2">Discover</h3>
            <p className="text-gray-200">
              Explore trending content and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}