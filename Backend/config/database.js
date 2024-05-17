const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  // MongoDB connection options 
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose.connect(process.env.MONGODB_URL, options)
    .then(() => {
      console.log("DB Connected Successfully");
    })
    .catch((error) => {
      console.error("DB Connection Failed");
      console.error(error);
      process.exit(1); // Exit the process with failure
    });
};
