const db = require('../models/index.js');

const exceljs = require('exceljs');

const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await db.Feedback.findAll();
    res.status(200).json({
      errCode: 0,
      message: 'Lấy danh sách người dùng thành công',
      feedbacks: feedbacks,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Lỗi khi lấy danh sách người dùng',
      error: error.message,
    });
  }
};

const handleDeleteFeedbacks = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
    }
    const result = await db.Feedback.destroy({
      where: { id: ids },
    });
    if (result === 0) {
      return res
        .status(404)
        .json({ message: 'Không tìm thấy người dùng để xóa' });
    }
    res.status(200).json({
      message: `${result} người dùng đã được xóa`,
      deletedCount: result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa nhiều người dùng', error });
  }
};

const handleExportFeedbacks = async (req, res) => {
  try {
    const feedbacks = await db.Feedback.findAll();
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet('Feedbacks');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Họ tên', key: 'name' },
      { header: 'email', key: 'email' },
      { header: 'Số điện thoại', key: 'phone' },
      { header: 'Nội dung', key: 'message' },
    ];
    feedbacks.forEach((feedback) => sheet.addRow(feedback));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Feedbacks.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting users:', error);
    return res.status(500).json({ error: error });
  }
};

module.exports = {
  getFeedbacks: getFeedbacks,
  handleExportFeedbacks: handleExportFeedbacks,
  handleDeleteFeedbacks: handleDeleteFeedbacks,
};
