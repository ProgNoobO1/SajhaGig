import React, { useState } from 'react';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Logo */}
      <div className="p-8">
        <h1 className="text-2xl font-handwritten">SajhaGig</h1>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-20">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-normal text-gray-800 mb-16 text-center">
          Join SajhaGig as a client or freelancer
        </h2>

        {/* Role Selection Cards */}
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          {/* Client Card */}
          <button
            onClick={() => handleRoleSelect('client')}
            className={`w-64 h-40 rounded-2xl border-2 transition-all duration-200 flex flex-col items-start justify-center p-6 ${
              selectedRole === 'client'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="mb-3">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={selectedRole === 'client' ? 'text-blue-600' : 'text-gray-700'}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
                <path d="M22 8.5V14" />
                <path d="M19 11.5h6" />
              </svg>
            </div>
            <div className={`text-left ${selectedRole === 'client' ? 'text-blue-600' : 'text-gray-800'}`}>
              <p className="text-base font-normal">I'm a Client,</p>
              <p className="text-base font-normal">hiring freelancers.</p>
            </div>
          </button>

          {/* Freelancer Card */}
          <button
            onClick={() => handleRoleSelect('freelancer')}
            className={`w-64 h-40 rounded-2xl border-2 transition-all duration-200 flex flex-col items-start justify-center p-6 ${
              selectedRole === 'freelancer'
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 bg-white hover:border-gray-400'
            }`}
          >
            <div className="mb-3">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className={selectedRole === 'freelancer' ? 'text-blue-600' : 'text-gray-700'}
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                <circle cx="18" cy="10" r="2" />
              </svg>
            </div>
            <div className={`text-left ${selectedRole === 'freelancer' ? 'text-blue-600' : 'text-gray-800'}`}>
              <p className="text-base font-normal">I'm a Freelancer,</p>
              <p className="text-base font-normal">looking for work.</p>
            </div>
          </button>
        </div>

        {/* Action Button */}
        <button
          disabled={!selectedRole}
          className={`px-10 py-3 rounded-lg font-medium transition-all duration-200 mb-6 ${
            selectedRole
              ? 'bg-blue-700 text-white hover:bg-blue-800'
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
        <p className="text-gray-700">
          already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
