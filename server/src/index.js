const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const middlewares = require("./middlwares");

const app = express();
// middleware
app.use(morgan("common"));
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// route
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// the middleware is being imported from middleware.js
app.use(middlewares.notFound);

// error handling middleware is being imported from middleware.js
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
