import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-handwritten mb-4 text-gray-800">SajhaGig</h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with talented freelancers or find your next project
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/signup"
            className="px-8 py-3 bg-blue-700 text-white rounded-lg font-medium hover:bg-blue-800 transition-all duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-white text-blue-700 border-2 border-blue-700 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
