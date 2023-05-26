const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute =require("./routes/Movies")
const listRoute =require("./routes/List")

dotenv.config();
const port = process.env.PORT || 2000;
mongoose.set("strictQuery", true);


//to connect to mongoose
mongoose
  .connect(process.env.MONGO_URl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.use("/server/auth", authRoute);
app.use("/server/users", userRoute);
app.use("/server/movie", movieRoute);
app.use("/server/lists", listRoute);

if(port){
  app.listen(port,() => {
    console.log(`Listening to port ....${port}`);
  });
}

module.exports=app;