const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", require("./routes"))

app.listen(process.env.PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.PORT);
})
  