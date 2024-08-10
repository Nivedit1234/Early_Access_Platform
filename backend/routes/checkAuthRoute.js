import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect, (req, res) => {
  res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
});
export default router;
