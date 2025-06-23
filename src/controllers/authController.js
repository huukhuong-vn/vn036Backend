// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Admin } = require('../models');
const SECRET = 'your-secret-key';

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ where: { username } });
  if (!admin) return res.status(401).json({ message: 'Sai tài khoản' });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: 'Sai mật khẩu' });

  const token = jwt.sign({ id: admin.id }, SECRET, { expiresIn: '1d' });
  res.json({ token });
});

module.exports = router;
