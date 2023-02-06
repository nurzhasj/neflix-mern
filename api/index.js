// Express for backend side
const express = require("express");
// Mongo for database
const mongoose = require("mongoose");
// DotEnv for hiding sensitive data
const dotenv = require("dotenv");
// Authentication Router
const authRoute = require("./routes/auth");
// User Router
const userRoute = require("./routes/users");
// Movie Router
const movieRoute = require("./routes/movies");

const app = express();

// Configuring Dot Env before using it
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connection is successful"))
    .catch((err) => console.log(err));

// Express server cannot accept json files by default, so we have to handle that
app.use(express.json());

app.use("/api/auth", authRoute);

app.use("/api/users", userRoute);

app.use("/api/movies", movieRoute);

app.listen(8800, () => {
    console.log("Backend server is running!");
});