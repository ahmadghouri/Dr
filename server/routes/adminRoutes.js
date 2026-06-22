const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
router.get('/users', protect, admin, async (req, res, next) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        next(error);
    }
});

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
router.delete('/users/:id', protect, admin, async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.isAdmin) {
                return res.status(400).json({ message: 'Cannot delete admin user' });
            }
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
