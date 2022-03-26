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

module.exports = app