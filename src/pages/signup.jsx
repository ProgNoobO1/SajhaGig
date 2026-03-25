import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Logo */}
      <div className="px-8 py-6">
        <h1 className="text-4xl font-logo text-gray-900 text-left">SajhaGig</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 pb-20">
        {/* Heading */}
        <h2 className="text-[32px] md:text-[36px] font-sans text-gray-900 mb-20 text-center max-w-2xl leading-tight">
          Join SajhaGig as a client or freelancer
        </h2>

        {/* Role Selection Cards */}
        <div className="flex flex-col md:flex-row gap-8 mb-14">
          {/* Client Card */}
          <button
            onClick={() => handleRoleSelect('client')}
            className={`w-[280px] h-[160px] rounded-3xl border-2 transition-all duration-300 flex flex-col items-start justify-center px-8 py-6 ${selectedRole === 'client'
                ? 'border-primary-blue bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
          >
            <div className="mb-4">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={selectedRole === 'client' ? 'text-primary-blue' : 'text-gray-700'}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <line x1="23" y1="11" x2="17" y2="11" />
                <line x1="20" y1="8" x2="20" y2="14" />
              </svg>
            </div>
            <div className={`text-left ${selectedRole === 'client' ? 'text-primary-blue' : 'text-gray-800'}`}>
              <p className="text-[15px] font-normal leading-relaxed">I'm a Client,</p>
              <p className="text-[15px] font-normal leading-relaxed">hiring freelancers.</p>
            </div>
          </button>

          {/* Freelancer Card */}
          <button
            onClick={() => handleRoleSelect('freelancer')}
            className={`w-[280px] h-[160px] rounded-3xl border-2 transition-all duration-300 flex flex-col items-start justify-center px-8 py-6 ${selectedRole === 'freelancer'
                ? 'border-primary-blue bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
              }`}
          >
            <div className="mb-4">
              <svg
                width="44"
                height="44"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={selectedRole === 'freelancer' ? 'text-primary-blue' : 'text-gray-700'}
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <circle cx="18" cy="10" r="2" />
              </svg>
            </div>
            <div className={`text-left ${selectedRole === 'freelancer' ? 'text-primary-blue' : 'text-gray-800'}`}>
              <p className="text-[15px] font-normal leading-relaxed">I'm a Freelancer,</p>
              <p className="text-[15px] font-normal leading-relaxed">looking for work.</p>
            </div>
          </button>
        </div>

       {/* Action Button */}
<button
  disabled={!selectedRole}
  onClick={() => {
    // When clicked, go to the correct page based on role
    if (selectedRole === 'freelancer') {
      navigate('/freelancersignup'); // goes to your Add component
    } else if (selectedRole === 'client') {
      navigate('/clientsignup'); // goes to client signup if you have one
    }
  }}
  className={`px-12 py-3.5 rounded-lg font-medium text-[15px] transition-all duration-300 mb-8 shadow-sm ${selectedRole
      ? 'bg-primary-blue text-white hover:bg-[#1e40af] shadow-md'
      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
    }`}
>
  {selectedRole === 'client'
    ? 'Join As Client'
    : selectedRole === 'freelancer'
      ? 'Join As Freelancer'
      : 'Create Account'}
</button>

        {/* Login Link */}
        <p className="text-gray-800 text-[15px]">
          already have an account?{' '}
          <a href="/login" className="text-primary-blue hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
