const db = require('../models/index.js');

// GET ALL SCHEDULES
exports.getAllCourses = async (req, res) => {
  try {
    const costs = await db.Cost.findAll({
      order: [['id', 'ASC']],
    });
    res.json(costs);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// CREATE
exports.createCourse = async (req, res) => {
  try {
    const newCourseFee = await db.Cost.create(req.body);
    res.json(newCourseFee);
  } catch (err) {
    res.status(500).json({ error: 'Tạo lịch thi thất bại' });
  }
};

// UPDATE
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db.Cost.update(req.body, {
      where: { id },
    });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Cập nhật thất bại' });
  }
};

// DELETE
exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Cost.destroy({ where: { id } });
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Xóa thất bại' });
  }
};
