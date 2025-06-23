import { upload, createNewUser } from '../services/CRUDservics';
import db from '../models/index.js';
import fs from 'fs';

import path from 'path';

let handleCreateNewUser = async (req, res) => {
  try {
    // Lấy dữ liệu từ request body
    let data = req.body;

    // Xử lý upload file avatar nếu có

    const avatarPath = req.file ? `/uploads/${req.file.filename}` : null;
    // Gọi hàm tạo người dùng mới
    let response = await createNewUser(data, avatarPath);

    // Trả về kết quả
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
    const { ids, avatars } = req.body;
    // mảng các ID

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' });
    }
    avatars.forEach((avatar) => {
      const filePath = path.join(__dirname, '../uploads', avatar);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    const result = await db.User.destroy({
      where: {
        id: ids,
      },
    });

    res.status(200).json({
      message: `${result} người dùng đã được xóa`,
      deletedCount: result,
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa nhiều người dùng', error });
  }
};
module.exports = {
  handleCreateNewUser: handleCreateNewUser,
  handleDeleteUsers: handleDeleteUsers,
  upload: upload.single('avatar'), // Đảm bảo rằng 'avatar' là tên của trường trong form
};
