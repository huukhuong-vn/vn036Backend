const db = require('../models/index.js');
const multer = require('multer');
const path = require('path');

// Dùng __dirname mặc định, KHÔNG cần tự khai báo lại
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Đảm bảo lưu file vào server/uploads (không phải src/uploads)
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: function (req, file, cb) {
    const hoTen = req.body.fullName || 'unknown';
    const ngaySinh = req.body.dateBirth || 'unknown';
    const extension = path.extname(file.originalname);

    const cleanBirth = ngaySinh.normalize('NFD').replace(/[-/]/g, '');

    const cleanName = hoTen
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase();
    const uniqueSuffix = Date.now();
    cb(null, `${cleanName}_${cleanBirth}_${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

const createNewUser = async (data, avatarPath = null) => {
  return new Promise(async (resolve, reject) => {
    let dataUser = { ...data, avatar: avatarPath };
    try {
      await db.User.create(dataUser);
      resolve({
        errCode: 0,
        message: 'Create user success',
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = { upload, createNewUser };
