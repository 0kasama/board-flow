require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.APP_PORT ;
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

module.exports = app;
