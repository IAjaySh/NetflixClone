const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/Movies");
const listRoute = require("./routes/List");

dotenv.config();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 2000;
mongoose.set("strictQuery", true);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Test route
app.get('/',(req,res)=>{
  res.send("<h1>This is Netflix backend.</h1>")
})
app.use("/server/auth", authRoute);
app.use("/server/users", userRoute);
app.use("/server/movie", movieRoute);
app.use("/server/lists", listRoute);

if (port) {
  app.listen(port, () => {
    console.log(`Listening to port ....${port}`);
  });
}


