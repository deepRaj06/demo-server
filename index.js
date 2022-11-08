
const express = require("express");
const {connection} = require("./config/db.js")
const {userController} = require("./routes/user.routes.js");
// const {bmiController} = require("./routes/bmi.routes.js");
const {authentication} = require("./middleware/authentication.js");
const cors = require("cors");

const PORT  = process.env.PORT;

const app = express();

app.use(express.json());

app.get( "/", (req, res) => {
    res.send("Welcome to bmi page");
})

app.use(cors());

app.use("/user", userController);
app.use(authentication)
app.use("/bmi", (req, res) => {
    res.send("Profile details")
})

app.listen( PORT, async() => {
    try {
        await connection
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connected to db");
        console.log(err);
    }
    console.log(`Listening to port ${PORT}`);
})
