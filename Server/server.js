const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express')
const configswagger = require('./swaggerconfig')


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use("/", require("./routes"))
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(configswagger))

app.listen(process.env.PORT, function (err) {
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", process.env.PORT);
})
  