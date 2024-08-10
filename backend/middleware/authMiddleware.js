import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//auth middlware will have 2 funcs protect for protected routes
//admin for admin routes

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  //read the token from cookie

  if (token) {
    //verify the token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //decoded is now an object in which you have userId as a field
      req.user = await User.findById(decoded.userId).select('-password');
      next();
      //appending user obj to req obj so user obj will on the req obj of all the routes
      //user=await... ==> req.user
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Token failed not authorized');
    }
  } else {
    res.status(401);
    throw new Error('No Token not authorized');
  }
});

const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401);
      throw new Error('Not authorized as admin');
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

const checkAuth = (req, res) => {
  const token = req.cookies.jwt;
};
export { protect, admin };
