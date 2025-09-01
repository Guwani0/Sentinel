const express = require("express");
const mongoose = require ("mongoose");

const app = express();

//Middleware
app.use("/", (req,res,next) => {
    res.send("It is working");
})

mongoose.connect("mongodb://localhost:27017/Sentinel")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));