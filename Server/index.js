const express = require("express");
const cors = require("cors");
const PORT = 9000;

require("dotenv").config();
require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Application is live");
});

const userRoute = require("./Routes/User");
const adminRoute = require("./Routes/Admin");

app.use("/user", userRoute);
app.use("/admin", adminRoute);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
