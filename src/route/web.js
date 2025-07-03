const express = require('express');
const {
  getHomePage,
  createFeedBack,
} = require('../controllers/homeController');
const {
  upload,
  handleCreateNewUser,
  handleDeleteUsers,
  handleExportUsersAvatars,
  getUsers,
  handleExportUsers,
  handleConfirm,
} = require('../controllers/userController');
const {
  getFeedbacks,
  handleExportFeedbacks,
  handleDeleteFeedbacks,
} = require('../controllers/feedbackController.js');
const scheduleController = require('../controllers/scheduleController.js');
const courseController = require('../controllers/courseController.js');
const bannerController = require('../controllers/bannerController.js');
const authMiddleware = require('../middleware/auth.js');
// Import necessary modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const models = require('../models'); // Import all models
const SECRET_KEY = '123Acdefg'; // Replace with your actual secret key

let router = express.Router();

let initWebRoutes = (app) => {
  router.get('/', getHomePage);
  router.post('/api/feedback', createFeedBack);

  router.post('/api/register', upload, handleCreateNewUser);
  // API route to get users

  // Login route should not require authMiddleware
  router.post('/api/users', authMiddleware, getUsers);

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
  router.post('/api/users/export', authMiddleware, handleExportUsers);
  router.post(
    '/api/users/exportUsersAvatar',
    authMiddleware,
    handleExportUsersAvatars
  );
  router.post('/api/users/confirm', authMiddleware, handleConfirm);
  router.post('/api/users/delete', authMiddleware, handleDeleteUsers);
  // feedback
  router.post('/api/getFeedback', authMiddleware, getFeedbacks);
  router.post('/api/feedbacks/export', authMiddleware, handleExportFeedbacks);
  router.post('/api/feedbacks/delete', authMiddleware, handleDeleteFeedbacks);

  // route for schedule
  router.get('/api/schedules', scheduleController.getAllSchedules);
  router.get('/api/schedules/filter', scheduleController.getFilteredSchedule);
  router.post('/api/createSchedule', scheduleController.createSchedule);
  router.put('/api/schedules/:id', scheduleController.updateSchedule);
  router.delete('/api/schedules/:id', scheduleController.deleteSchedule);

  // route for course fee
  router.get('/api/courses', courseController.getAllCourses);
  router.post(
    '/api/courses/create',
    authMiddleware,
    courseController.createCourse
  );
  router.put('/api/courses/:id', authMiddleware, courseController.updateCourse);
  router.delete(
    '/api/courses/:id',
    authMiddleware,
    courseController.deleteCourse
  );

  //banner route
  router.get('/api/banners', bannerController.getBanners);
  router.post(
    '/api/banners/create',
    bannerController.uploadbanner.single('image'),
    bannerController.createBanner
  );
  router.delete('/api/banners/:id', bannerController.handleDeleteBanners);

  return app.use('/', router);
};

module.exports = initWebRoutes;
