import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/ui";
import { useAuth } from "../context/AuthContext";

export default function SignupForm({ role = "client" }) {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const isClient = role === "client";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const heading = isClient ? "Become A Client" : "Become A Freelancer";
  const subtitle = isClient
    ? "Create Your Client Account"
    : "Create Your Freelancing Account";

  const handleSignup = async () => {
    setError("");
    setLoading(true);
    try {
      const user = await signup({ firstName, lastName, email, password, role });
      navigate(user.role === "freelancer" ? "/freelancer/dashboard" : "/client/dashboard");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container w-full h-full flex fixed top-0 bottom-0">
      {/* Left: Form Panel */}
      <div className="login-content flex flex-col justify-center items-center w-full h-screen px-16 bg-white">
        <div className="w-[420px] flex flex-col">
          <h1 className="font-pecita text-2xl mb-10">SajhaGig</h1>
          <h2 className="text-[36px] font-bold mb-1">{heading}</h2>
          <p className="text-gray-400 text-[15px] mb-8">{subtitle}</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-2 mb-4">
              {error}
            </div>
          )}

          <FormInput label="First Name" type="text" placeholder="firstname" icon="user" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <FormInput label="Last Name" type="text" placeholder="lastname" icon="user" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <FormInput label="Email" type="email" placeholder="name@gmail.com" icon="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <FormInput label="Password" type="password" placeholder="password" className="mb-8" value={password} onChange={(e) => setPassword(e.target.value)} />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="bg-blue-800 text-white w-full h-[44px] rounded-md hover:bg-blue-900 active:bg-blue-700 text-sm font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </div>
      </div>

      {/* Right: Image Panel */}
      <div className="image-container max-w-screen-sm h-screen bg-blue-800 flex items-center pt-16 pb-16 pr-8 pl-8">
        <div className="circle-image w-[500px] h-[500px] rounded-full overflow-hidden bg-white">
          <img
            src="images/signup.png"
            alt="Signup"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
