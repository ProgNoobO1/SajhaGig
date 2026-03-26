import React from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/ui";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    const role = localStorage.getItem("sajhagig_role") || "client";
    navigate(role === "freelancer" ? "/freelancer/dashboard" : "/client/dashboard");
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

          <FormInput label="Email" type="email" placeholder="name@gmail.com" icon="email" />
          <FormInput label="Password" type="password" placeholder="password" className="mb-8" />

          <button
            onClick={handleLogin}
            className="bg-blue-800 text-white w-full h-[44px] rounded-md hover:bg-blue-900 active:bg-blue-700 text-sm font-semibold"
          >
            Log In
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
