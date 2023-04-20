import React from 'react';
import { Link } from 'react-router-dom';

function DefaultHome() {
  return ( 
    <div className="flex flex-col justify-center items-center h-screen">
      <h2 className="text-4xl mb-4 font-bold">Welcome to the website</h2>
      <p className="text-xl mb-8">Please log in or create an account to access your personalized content.</p>
      <div className="flex">
        <Link to="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DefaultHome;
