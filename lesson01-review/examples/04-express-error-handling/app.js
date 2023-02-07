const express = require("express");
const { Unauthorized, NotFound } = require("http-errors");

const app = express();

const { PORT = 3000 } = process.env;

app.get("/api/error", (req, res, next) => {
  throw new Error("SOme eror!");
});

app.get("/api/error2", async (req, res, next) => {
  try {
    // await User.find({})
    throw new Error("SOme eror2!");
  } catch (error) {
    next(error);
  }
});

// not 500 status
app.get("/api/error3", async (req, res, next) => {
  try {
    // await User.find({})
    // const err = new Error("SOme eror3 with no 500 status!");
    // err.status = 401;
    // throw err;

    throw new NotFound("page not found!");
  } catch (error) {
    next(error);
  }
});

app.get("/api/error4", async (req, res, next) => {
  try {
    // await User.find({})
    // const err = new Error("SOme eror3 with no 500 status!");
    // err.status = 401;
    // throw err;

    throw new NotFound("page not found!");
  } catch (error) {
    return res.status(500).json({
      message: "handled error in controller!!",
    });
  }
});

// handing errors
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json({
      message: error.message,
    });
  }

  res.status(500).json({
    message: error.message,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`server is listening on port ${PORT}`);
});
