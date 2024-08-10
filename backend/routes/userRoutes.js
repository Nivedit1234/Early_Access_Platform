import express from 'express';
import {
  loginUser,
  registerUser,
  deletetUser,
  getUserById,
  getUserProfile,
  updateUserByAdmin,
  updateUserProfile,
  logoutUser,
  getUsers,
} from '../controller/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', loginUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route('/:id', protect)
  .delete(protect, admin, deletetUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserByAdmin);

export default router;
