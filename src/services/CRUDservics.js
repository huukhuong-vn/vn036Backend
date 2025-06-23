import db from '../models/index.js';
import multer from 'multer';
import path from 'path';

const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); // thư mục lưu file (relative to project)
  },
  filename: function (req, file, cb) {
    const hoTen = req.body.fullName || 'unknown';
    const ngaySinh = req.body.dateBirth || 'unknown';
    const extension = path.extname(file.originalname);

    // Chuyển họ tên thành dạng không dấu + lowercase + bỏ khoảng trắng
    // và thêm ngày sinh vào tên file để đảm bảo tính duy nhất
    // Chỉ sử dụng họ tên để tạo tên file duy nhất
    // Nếu có ngày sinh, có thể thêm vào tên file nếu cần
    // Ví dụ: "Nguyen Van A_1990-01-01.jpg"
    const cleanBirth = ngaySinh
      .normalize('NFD')
      .replace('-', '') // thay dấu gạch ngang bằng khoảng trắng
      .replace('-', '') // thay dấu gạch ngang bằng khoảng trắng
      .replace('/', '') // thay dấu gạch chéo bằng khoảng trắng
      .replace('/', ''); // thay dấu gạch chéo bằng khoảng trắng

    const cleanName = hoTen
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
      .replace(/\s+/g, '_') // thay space bằng _
      .toLowerCase(); // lowercase
    const uniqueSuffix = Date.now();
    cb(null, `${cleanName}_${cleanBirth}_${uniqueSuffix}${extension}`);
  },
});

const upload = multer({ storage });

// Pass avatarPath as a parameter from your controller/route
let createNewUser = async (data, avatarPath = null) => {
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

export { upload, createNewUser };
