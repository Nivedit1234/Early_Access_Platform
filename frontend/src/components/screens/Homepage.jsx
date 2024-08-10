// src/components/Home.jsx
import React from 'react';

const Homepage = () => {
  return (
    <div className="relative h-screen">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay loop muted>
        <source src="/cod2.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-50">
        <h1 className="text-orange-600 text-5xl font-bold">Welcome to the Game Platform</h1>
      </div>
    </div>
  );
};

export default Homepage;
