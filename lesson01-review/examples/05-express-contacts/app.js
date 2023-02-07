const express = require("express");
const { Unauthorized, NotFound } = require("http-errors");
const fs = require("fs/promises");

const app = express();

const { PORT = 3000 } = process.env;

app.get("/api/contacts", async (req, res, next) => {
  const response = {
    data: {
      movies: [
        {
          id: 2,
          title: "Inveption",
        },
      ],
      someField: "someField!",
    },
  };

  const { movies } = response.data;
  res.json(movies);

  // const moviesRaw = await fs.readFile("./movies.json", {
  //   encoding: "utf-8",
  // });
  // const movies = JSON.parse(moviesRaw);

  // return res.status(200).json({
  //   data: {
  //     movies: movies.slice(1, 2),
  //     someField: "someField!",
  //   },
  // });
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
