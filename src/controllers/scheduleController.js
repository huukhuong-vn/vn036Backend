const db = require('../models/index.js');
const { Op } = require('sequelize');

// GET ALL SCHEDULES
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await db.Schedule.findAll({
      order: [['date', 'ASC']],
    });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server' });
  }
};

// GET BY EXAM TYPE
exports.getFilteredSchedule = async (req, res) => {
  const { examType, typeExam } = req.query;

  const allowedExamTypes = [
    'Starters',
    'Movers',
    'Flyers',
    'KET',
    'PET',
    'FCE',
    'KETfS',
    'PETfS',
    'FCEfS',
  ];
  const allowedTypeExams = ['PaperBase', 'Digital'];

  if (
    !allowedExamTypes.includes(examType) ||
    !allowedTypeExams.includes(typeExam)
  ) {
    return res
      .status(400)
      .json({ error: 'Loại kỳ thi hoặc hình thức thi không hợp lệ' });
  }

  try {
    const results = await db.Schedule.findAll({
      where: {
        typeExam: typeExam,
        [examType]: 1, // Cột động
      },
      attributes: ['date'],
      order: [['date', 'ASC']],
    });

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'LỖI MẸ RỒI' });
  }
};

// CREATE
exports.createSchedule = async (req, res) => {
  try {
    const newSchedule = await db.Schedule.create(req.body);
    res.json(newSchedule);
  } catch (err) {
    res.status(500).json({ error: 'Tạo lịch thi thất bại' });
  }
};

// UPDATE
exports.updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await db.Schedule.update(req.body, {
      where: { id },
    });
    res.json({ message: 'Cập nhật thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Cập nhật thất bại' });
  }
};

// DELETE
exports.deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await db.Schedule.destroy({ where: { id } });
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: 'Xóa thất bại' });
  }
};
