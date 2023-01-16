const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.uwg2uxr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connection with db successful");
  })
  .catch((err) => console.log(err));
