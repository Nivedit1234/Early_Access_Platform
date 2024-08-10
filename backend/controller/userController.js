import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  //res.json('hello2');
  // since we have added match password method onto user schema you can use on the user obj above
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401); //unauthorized 401
    throw new Error('Invalid email or password');
  }
});

//@desc Register user
//@route POST /api/users/
//@access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400); //client side problem 400
    throw new Error('User already exists');
  }

  const user = await User.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }
});

//@desc Logout user / clear cookie
//@route POST /api/users/logout
//@access Private

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out succesfully' });
});

// @desc Get user profile
// @route POST /api/users/profile
//no need to pass id to because a user can only get his profile and his
//will be encoded in the token we pass along
// @access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc update user profile
// @route POST /api/users/updateProfile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc get Users
// @route GET /api/users
// @access Private/admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get Users');
});

// @desc get Users by id by admin
// @route GET /api/users/:id
// @access Private/admin

const getUserById = asyncHandler(async (req, res) => {
  res.send('get Users by id');
});

// @desc update user by admin
// @route  PUT /api/users/:id
// @access Private/admin

const updateUserByAdmin = asyncHandler(async (req, res) => {
  res.send('update User by admin');
});

// @desc delete Users
// @route DELETE /api/users
// @access Private/admin
const deletetUser = asyncHandler(async (req, res) => {
  res.send('delete User by admin');
});

export {
  loginUser,
  registerUser,
  deletetUser,
  getUserProfile,
  getUserById,
  updateUserByAdmin,
  updateUserProfile,
  logoutUser,
  getUsers,
};
