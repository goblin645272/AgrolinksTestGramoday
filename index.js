const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { PORT } = require("./config/env");
const { MONGODB_URL } = require("./config/db");
const reportRoute = require("./routes/report");
const app = express();
app.use(
  express.json({
    limit: "30mb",
    extended: true,
  })
);

app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());

mongoose.connect(
  MONGODB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);

app.use("/api", reportRoute);

app.listen(PORT || 5000, () => console.log(`Server running on PORT ${PORT}`));
