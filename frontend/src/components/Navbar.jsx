// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full z-20 bg-transparent">
//       <div className="container mx-auto p-4 flex justify-between items-center">
//         <div className="text-white text-xl font-bold">
//           <Link to="/">
//             <img className="h-8" src="/Microsoft_logo.png" alt="Logo" />
//           </Link>
//         </div>
//         <div className="space-x-4">
//           <Link to="/" className="text-white hover:text-gray-300">
//             Home
//           </Link>
//           <Link to="/about" className="text-white hover:text-gray-300">
//             About
//           </Link>
//           <button
//             onClick={handleLoginClick}
//             className="text-white hover:text-gray-300 focus:outline-none"
//           >
//             Login
//           </button>
//           <Link to="/contact" className="text-white hover:text-gray-300">
//             Contact
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from './screens/axiosConfig';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post('/logout');
      setIsAuthenticated(false);
      localStorage.removeItem('user'); // Clear localStorage on logout
      localStorage.removeItem('isAuthenticated')
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="p-4 bg-gradient-to-r from-black to-black">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Game Platform</div>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-white">Home</Link>
          {!isAuthenticated ? (
            <Link to="/login" className="text-white hover:text-white">Sign In</Link>
          ) : (
            <>
              <Link to="/game-content" className="text-white hover:text-white">Game Content</Link>
              <button onClick={handleLogout} className="text-white hover:text-white">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

