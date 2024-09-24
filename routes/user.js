const express = require('express');
const User = require('../models/user');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, (req, res) => {
    User.getAll((err, users) => {
        if (err) return res.status(500).json({ message: 'Error retrieving users' });
        res.json(users);
    });
});

router.patch('/block', auth, (req, res) => {
    const { userIds } = req.body;
    User.updateStatus(userIds, 'blocked', (err) => {
        if (err) return res.status(500).json({ message: 'Error blocking users' });
        res.json({ message: 'Users blocked' });
    });
});

router.patch('/unblock', auth, (req, res) => {
    const { userIds } = req.body;
    User.updateStatus(userIds, 'active', (err) => {
        if (err) return res.status(500).json({ message: 'Error unblocking users' });
        res.json({ message: 'Users unblocked' });
    });
});

router.delete('/', auth, (req, res) => {
    const { userIds } = req.body;
    User.delete(userIds, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting users' });
        res.json({ message: 'Users deleted' });
    });
});

module.exports = router;
