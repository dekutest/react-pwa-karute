const express = require('express');
const router = express.Router();
const { checkRole } = require('../middlewares/authMiddleware');

// 管理者専用エンドポイント
router.get('/admin', checkRole('admin'), (req, res) => {
    res.json({ message: '管理者のみアクセス可能です', user: req.user });
});

module.exports = router;
