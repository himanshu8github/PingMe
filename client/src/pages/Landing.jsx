import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 mt-16">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Connect with the World, Safely 🌍
        </h2>
        <p className="text-lg text-gray-600 max-w-xl mb-6">
          Real-time messaging. Join PingMe today and chat without boundaries.
        </p>
        <Link
          to="/login"
          className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-semibold text-lg hover:bg-indigo-700 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} SafeChat. All rights reserved.
      </footer>
    </div>
  );
}
