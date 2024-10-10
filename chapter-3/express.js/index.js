require("dotenv").config();
const express = require("express");
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./src/routes");
const {
  errorHandler,
  notFoundURLHandler,
} = require("./src/middlewares/errors");

/* Initialize the Express application */
const app = express();
const port = 3000;

/* Enable JSON parsing for incoming requests */
app.use(express.json());

app.use(
  fileUpload({
    limits: {
      filesize: 50 * 1024 * 1024,
    },
  })
);

/* Use the router to handle routes */
app.use("/", router);

/* Handle 404 URLs */
app.use("*", notFoundURLHandler);

/* Handle errors globally (this should always be the last middleware) */
app.use(errorHandler);

/* Start the Express.js application */
app.listen(port, () => {
  console.log(`The express.js app is running on port ${port}`);
});
