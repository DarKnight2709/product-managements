const mongoose = require('mongoose');

exports.connect = async () => {
  try {
    const result = await mongoose.connect(process.env.MONGO_URL);
    console.log("connected successfully");

    
    
  } catch (error) {
    console.error(error.message());
  }
}
