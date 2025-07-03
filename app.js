const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const initWebRoutes = require('./src/route/web');
let app = express(); // <-- Move this to the top
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);

let port = process.env.PORT || 6969;
app.listen(port, '0.0.0.0', () => {
  //callback
  console.log('Backend Nodejs is runing on the port : ' + port);
});
