const db = require('../models/index.js');
let getHomePage = (req, res) => {
  return res.send('hello world from homeController');
};
const createFeedBack = async (req, res) => {
  let data = req.body;
  console.log('Received feedback data:', data);
  try {
    await db.Feedback.create(data);
    res.status(200).json({ message: 'Success', data });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
  getHomePage: getHomePage,
  createFeedBack: createFeedBack,
};
