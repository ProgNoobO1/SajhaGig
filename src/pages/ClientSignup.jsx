import React, { useState } from 'react';

export default function ClientSignup() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signup-container w-full h-full flex fixed top-0 bottom-0">

      {/* ── LEFT SIDE: White Form Panel ── */}
      <div className="login-content flex flex-col justify-center items-center w-full h-screen px-16 bg-white">

        {/* This wrapper fixes everything to 420px width — all items align perfectly */}
        <div className="w-[420px] flex flex-col">

          {/* Logo */}
          <h1 className="font-pecita text-2xl mb-10">SajhaGig</h1>

          {/* Heading */}
          <h2 className="text-[36px] font-bold mb-1">Become A Client</h2>
          <p className="text-gray-400 text-[15px] mb-8">Create Your Client Account</p>

          {/* ── First Name ── */}
          <div className="flex flex-col mb-4">
            <label className="text-[13px] text-gray-700 mb-1">First Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="firstname"
                className="border border-gray-300 w-full h-[44px] rounded-md px-3 text-sm text-gray-500 focus:outline-none focus:border-blue-800 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* ── Last Name ── */}
          <div className="flex flex-col mb-4">
            <label className="text-[13px] text-gray-700 mb-1">Last Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="lastname"
                className="border border-gray-300 w-full h-[44px] rounded-md px-3 text-sm text-gray-500 focus:outline-none focus:border-blue-800 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* ── Email ── */}
          <div className="flex flex-col mb-4">
            <label className="text-[13px] text-gray-700 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="name@gmail.com"
                className="border border-gray-300 w-full h-[44px] rounded-md px-3 text-sm text-gray-500 focus:outline-none focus:border-blue-800 pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
            </div>
          </div>

          {/* ── Password ── */}
          <div className="flex flex-col mb-8">
            <label className="text-[13px] text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="password"
                className="border border-gray-300 w-full h-[44px] rounded-md px-3 text-sm text-gray-500 focus:outline-none focus:border-blue-800 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* ── Create Account Button — now w-full inside the 420px wrapper so it's perfectly full width ── */}
          <button
            className="bg-blue-800 text-white w-full h-[44px] rounded-md hover:bg-blue-900 active:bg-blue-700 text-sm font-semibold"
          >
            Create Account
          </button>

        </div>{/* end of 420px wrapper */}
      </div>

      {/* ── RIGHT SIDE: Blue Panel ── */}
      <div className="image-container max-w-screen-sm h-screen bg-blue-800 flex items-center pt-16 pb-16 pr-8 pl-8">
        <div className="circle-image w-[500px] h-[500px] rounded-full overflow-hidden bg-white">
          <img
            src="images/signup.png"
            alt="Login Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}