import { FcGoogle } from 'react-icons/fc';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] text-white px-4">
      <div
        className="w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-2xl 
      border border-purple-500/20 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-400">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Join us and get started today.
        </p>

        {/* Google Signup Button */}
        <button
          className="w-full py-2 rounded-lg flex items-center justify-center gap-3 
          border border-purple-400 bg-black/20 
          hover:border-cyan-400 transition-all shadow-sm hover:shadow-cyan-500/20"
        >
          <FcGoogle size={22} />
          <span className="font-medium">Sign up with Google</span>
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-purple-500/20"></div>
          <span className="px-3 text-sm text-gray-400">OR</span>
          <div className="flex-1 h-px bg-purple-500/20"></div>
        </div>

        <form className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm mb-2 text-purple-300">
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg bg-black/20 
              border border-purple-500/40 
              focus:border-purple-400 focus:ring-1 focus:ring-purple-400 
              outline-none transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-purple-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg bg-black/20 
              border border-purple-500/40 
              focus:border-purple-400 focus:ring-1 focus:ring-purple-400 
              outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-purple-300">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-black/20 
              border border-purple-500/40 
              focus:border-purple-400 focus:ring-1 focus:ring-purple-400 
              outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-2 text-purple-300">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg bg-black/20 
              border border-purple-500/40 
              focus:border-purple-400 focus:ring-1 focus:ring-purple-400 
              outline-none transition"
            />
          </div>

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold 
            bg-purple-600 hover:bg-purple-500 
            hover:border-cyan-400 border border-purple-400
            transition-all shadow-md hover:shadow-cyan-500/20"
          >
            Sign Up
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <a
            href="/auth/login"
            className="text-purple-300 hover:text-cyan-400 transition"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
