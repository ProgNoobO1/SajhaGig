import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-logo mb-4 text-gray-900">SajhaGig</h1>
        <p className="text-xl text-gray-700 mb-8">
          Connect with talented freelancers or find your next project
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-[#1e40af] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-primary-blue border-2 border-primary-blue rounded-lg font-medium hover:bg-blue-50 transition-all duration-300"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
