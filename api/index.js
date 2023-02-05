// Express for backend side
const express = require("express");
// Mongo for database
const mongoose = require("mongoose");
// DotEnv for hiding sensitive data
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("DB connection is successful"))
    .catch((err) => console.log(err));

app.listen(8800, () => {
    console.log("Backend server is running!");
});