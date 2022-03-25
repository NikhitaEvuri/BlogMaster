const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const staticRoutes = require("./routes/staticRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose
  .connect(process.env.MDB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected !"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT} !`));

app.use("/", userRoutes);
app.use("/", staticRoutes);
app.use("/blogs", blogRoutes);
