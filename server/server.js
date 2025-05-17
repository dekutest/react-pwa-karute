const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { checkRole } = require('./middlewares/authMiddleware');

// 環境変数の読み込み
dotenv.config({ path: './.env.server' });

const app = express();
const PORT = process.env.PORT || 5050;

// CORS対応
app.use(cors());
app.use(express.json());  // ★これがないとPOSTリクエストが受け取れない

// ヘルスチェック
app.get('/api/health', (req, res) => {
  console.log("✅ Health check endpoint accessed");
  res.json({ status: 'OK', message: 'サーバーは正常に稼働中です' });
});

// ログイントークン発行エンドポイント
app.post('/api/login', (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) {
    return res.status(400).json({ error: 'メールアドレスと役割が必要です' });
  }

  // JWTトークンを発行
  const token = jwt.sign({ email, role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  console.log(`✅ トークン発行成功: ${token}`);
  res.json({ token, message: 'ログイントークン発行成功' });
});

// 管理者専用エンドポイント
app.get('/api/admin', checkRole('admin'), (req, res) => {
  res.json({ message: '管理者のみアクセス可能です', user: req.user });
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
