const express = require("express");
const mongoose = require ("mongoose");

const app = express();

//Middleware
app.use("/", (req,res,next) => {
    res.send("It is working");
})

mongoose.connect("mongodb+srv://admin:XpXTg7Ug9g5wPdW9@ispm.5egix08.mongodb.net/")
.then(() => console.log("Connected to MongoDB"))
.then(() => {
    app.listen(5000);
})
.catch((err) => console.log((err)));

