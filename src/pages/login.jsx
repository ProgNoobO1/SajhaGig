import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "freelancer" ? "/freelancer/dashboard" : "/client/dashboard");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container w-full h-full flex fixed top-0 bottom-0">
      {/* Left: Blue Panel with image */}
      <div className="image-container max-w-screen-sm h-screen bg-blue-800 flex items-center pt-16 pb-16 pr-8 pl-8">
        <div className="circle-image w-[500px] h-[500px] rounded-full overflow-hidden">
          <img
            src="images/login.png"
            alt="Login"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Right: Form Panel */}
      <div className="login-content flex flex-col justify-center items-center w-full h-screen bg-gray-100">
        <div className="w-[420px] flex flex-col">
          <h1 className="font-pecita text-2xl text-center mb-2">SajhaGig</h1>
          <h2 className="text-[36px] font-bold text-center mb-1">WELCOME BACK</h2>
          <p className="text-gray-400 text-[14px] text-center mb-8">
            Log In Back To Your Account
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-2 mb-4">
              {error}
            </div>
          )}

          <FormInput label="Email" type="email" placeholder="name@gmail.com" icon="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label="Password" type="password" placeholder="password" className="mb-8" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-800 text-white w-full h-[44px] rounded-md hover:bg-blue-900 active:bg-blue-700 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-800 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
