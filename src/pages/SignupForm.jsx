import React from "react";
import { useNavigate } from "react-router-dom";
import { FormInput } from "../components/ui";

export default function SignupForm({ role = "client" }) {
  const navigate = useNavigate();
  const isClient = role === "client";

  const heading = isClient ? "Become A Client" : "Become A Freelancer";
  const subtitle = isClient
    ? "Create Your Client Account"
    : "Create Your Freelancing Account";

  return (
    <div className="signup-container w-full h-full flex fixed top-0 bottom-0">
      {/* Left: Form Panel */}
      <div className="login-content flex flex-col justify-center items-center w-full h-screen px-16 bg-white">
        <div className="w-[420px] flex flex-col">
          <h1 className="font-pecita text-2xl mb-10">SajhaGig</h1>
          <h2 className="text-[36px] font-bold mb-1">{heading}</h2>
          <p className="text-gray-400 text-[15px] mb-8">{subtitle}</p>

          <FormInput label="First Name" type="text" placeholder="firstname" icon="user" />
          <FormInput label="Last Name" type="text" placeholder="lastname" icon="user" />
          <FormInput label="Email" type="email" placeholder="name@gmail.com" icon="email" />
          <FormInput label="Password" type="password" placeholder="password" className="mb-8" />

          <button
            onClick={() => {
              localStorage.setItem("sajhagig_role", role);
              navigate(isClient ? "/client/dashboard" : "/freelancer/dashboard");
            }}
            className="bg-blue-800 text-white w-full h-[44px] rounded-md hover:bg-blue-900 active:bg-blue-700 text-sm font-semibold"
          >
            Create Account
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
