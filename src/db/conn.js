const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch(() => {
    console.log("Error in connecting to database");
  });
