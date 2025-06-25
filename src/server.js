import express from 'express';
const mysql = require('mysql2');
// const exceljs = require('exceljs');
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
// import authMiddleware from './middleware/auth.js'; // Import the adminAuth middleware

import 'dotenv/config'; // Import dotenv to use environment variables

const path = require('path');
import cors from 'cors';
let app = express(); // <-- Move this to the top
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);
// Kết nối MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vn036',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected');
});

// API: Xuất Excel danh sách người dùng
// app.get('/api/users/export', authMiddleware, (req, res) => {
//   const sql = 'SELECT * FROM users';
//   db.query(sql, async (err, users) => {
//     if (err) return res.status(500).json(err);

//     const workbook = new exceljs.Workbook();
//     const sheet = workbook.addWorksheet('Users');

//     sheet.columns = [
//       { header: 'ID', key: 'id' },
//       { header: 'Họ tên', key: 'fullName' },
//       { header: 'Ngày sinh', key: 'dateBirth' },
//       { header: 'CMND/CCCD', key: 'idNumber' },
//       { header: 'Email', key: 'email' },
//       { header: 'SĐT', key: 'phoneNumber' },
//       { header: 'Giới tính', key: 'gender' },
//       { header: 'Địa chỉ nhà', key: 'homeAddress' },
//       { header: 'Nơi nhận KQ', key: 'receiverAddress' },
//       { header: 'Trường', key: 'school' },
//       { header: 'Kỳ thi', key: 'exam' },
//       { header: 'Loại thi', key: 'typeExam' },
//       { header: 'Ngày thi', key: 'dateExam' },
//     ];

//     users.forEach((user) => sheet.addRow(user));

//     res.setHeader(
//       'Content-Type',
//       'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//     );
//     res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

//     await workbook.xlsx.write(res);
//     res.end();
//   });
// });

let port = process.env.PORT || 6969;
//Port === undefined => port = 6969

app.listen(port, '0.0.0.0', () => {
  //callback
  console.log('Backend Nodejs is runing on the port : ' + port);
});
