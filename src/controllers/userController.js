const { upload, createNewUser } = require('../services/CRUDservics');
const db = require('../models/index.js');
const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const exceljs = require('exceljs');

const getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.status(200).json({
      errCode: 0,
      message: 'Lấy danh sách người dùng thành công',
      users: users,
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

let handleCreateNewUser = async (req, res) => {
  try {
    let data = req.body;
    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;
    let response = await createNewUser(data, avatarPath);
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      errCode: 1,
      message: 'Error creating user',
      error: error.message,
    });
  }
};

const handleDeleteUsers = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
    }
    for (const id of ids) {
      const user = await db.User.findByPk(id);
      if (user && user.avatar) {
        const fileName = user.avatar.replace('/uploads/', '');
        const filePath = path.join(process.cwd(), 'uploads', fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
    const result = await db.User.destroy({
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

const handleExportUsersAvatars = async (req, res) => {
  const { ids } = req.body;
  try {
    const users = await db.User.findAll({ where: { id: ids } });
    const archive = archiver('zip', { zlib: { level: 9 } });

    res.attachment('avatars.zip');
    archive.pipe(res);

    users.forEach((user) => {
      if (!user.avatar) return;

      const filename = path.basename(user.avatar); // lấy "abc.jpg" từ "/uploads/abc.jpg"
      const filepath = path.join(__dirname, '../uploads', filename);

      if (fs.existsSync(filepath)) {
        archive.file(filepath, { name: filename });
      }
    });

    await archive.finalize();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating zip file' });
  }
};

const handleExportUsers = async (req, res) => {
  try {
    const users = await db.User.findAll();
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet('Users');
    sheet.columns = [
      { header: 'ID', key: 'id' },
      { header: 'Họ tên', key: 'fullName' },
      { header: 'Ngày sinh', key: 'dateBirth' },
      { header: 'CMND/CCCD', key: 'idNumber' },
      { header: 'Email', key: 'email' },
      { header: 'SĐT', key: 'phoneNumber' },
      { header: 'Giới tính', key: 'gender' },
      { header: 'Địa chỉ nhà', key: 'homeAddress' },
      { header: 'Nơi nhận KQ', key: 'receiverAddress' },
      { header: 'Trường', key: 'school' },
      { header: 'Kỳ thi', key: 'exam' },
      { header: 'Loại thi', key: 'typeExam' },
      { header: 'Ngày thi', key: 'dateExam' },
    ];
    users.forEach((user) => sheet.addRow(user));

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting users:', error);
    return res.status(500).json({ error: error });
  }
};

const handleConfirm = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
    }
    for (const id of ids) {
      const user = await db.User.findByPk(id);
      if (user) {
        let prePaid = user.Paid;
        let newPaid = !prePaid;
        let newUserPaid = { Paid: newPaid };
        const update = await db.User.update(newUserPaid, { where: { id } });
      }
    }

    res.status(200).json({
      message: `đã thay đổi trạng thái`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Lỗi khi thay đổi trạng thái thanh toán', error });
  }
};

module.exports = {
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUsers: handleDeleteUsers,
  upload: upload.single('avatar'),
  handleExportUsersAvatars: handleExportUsersAvatars,
  getUsers: getUsers,
  handleExportUsers: handleExportUsers,
  handleConfirm: handleConfirm,
};
