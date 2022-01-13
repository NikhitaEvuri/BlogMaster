const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MDB_CONNECT, {useNewUrlParser : true, useUnifiedTopology : true})
    .then(() => console.log("Database Connected !"))
    .catch((err) => console.log(err))

app.listen(PORT, () => console.log(`Server is listening on Port ${PORT} !`));