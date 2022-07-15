const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const courtRoute = require("./routes/courts");
const userRoute = require("./routes/users");
const freeCourtRoute = require("./routes/freecourts");
const cors = require("cors");
const app = express();
dotenv.config();
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => console.log(err));
app.use(cors());
app.use("/courts", courtRoute);
app.use("/users", userRoute);
app.use("/freecourt", freeCourtRoute);

app.listen(8080, () => {
  console.log("server running on Port 8080");
});
