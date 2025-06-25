import express from 'express';
import homeController from '../controllers/homeController';
import {
  upload,
  handleCreateNewUser,
  handleDeleteUsers,
  handleExportUsersAvatars,
  getUsers,
  handleExportUsers,
} from '../controllers/userController';
import authMiddleware from '../middleware/auth.js';
// Import necessary modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models'); // Import all models
const SECRET_KEY = '123Acdefg'; // Replace with your actual secret key

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/about', homeController.getAboutPage);
  router.post('/api/register', upload, handleCreateNewUser);
  // API route to get users

  // Login route should not require authMiddleware
  router.get('/api/users', authMiddleware, getUsers);

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const admin = await models.Admin.findOne({ where: { username } });
      if (!admin) return res.status(401).json({ message: 'Sai tài khoản' });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu' });

      const token = jwt.sign({ id: admin.id, username }, SECRET_KEY, {
        expiresIn: '1d',
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.get('/api/users/export', authMiddleware, handleExportUsers);
  router.post(
    '/api/users/exportUsersAvatar',
    authMiddleware,
    handleExportUsersAvatars
  );
  router.post('/api/users/delete', authMiddleware, handleDeleteUsers);

  return app.use('/', router);
};

module.exports = initWebRoutes;
