const multer = require('multer');
const path = require('path');
const db = require('../models/index.js');

const storage = multer.diskStorage({
  destination: '.../../uploads/banners/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

exports.uploadbanner = multer({ storage });

exports.createBanner = async (req, res) => {
  try {
    let imageUrl = '';
    let type = '';

    if (req.file) {
      imageUrl = '/uploads/banners/' + req.file.filename;
      type = 'upload';
    } else if (req.body.link) {
      imageUrl = req.body.link;
      type = 'link';
    }

    const newBanner = await db.Banner.create({ imageUrl, type });
    res.json(newBanner);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi khi lưu banner' });
  }
};

exports.getBanners = async (req, res) => {
  const banners = await db.Banner.findAll({ order: [['createdAt', 'DESC']] });
  res.json(banners);
};
exports.handleDeleteBanners = async (req, res) => {
  try {
    const banner = await db.Banner.findByPk(req.params.id);
    if (!banner)
      return res.status(404).json({ error: 'Không tìm thấy banner' });

    // Nếu là ảnh upload thì xóa khỏi thư mục
    if (banner.type === 'upload') {
      const fs = require('fs');
      const filePath = path.join(__dirname, banner.imageUrl);
      fs.existsSync(filePath) && fs.unlinkSync(filePath);
    }

    await banner.destroy();
    res.json({ message: 'Xóa banner thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi xóa banner' });
  }
};
