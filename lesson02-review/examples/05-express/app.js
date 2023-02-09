const express = require("express");

const app = express();

const { PORT = 3000 } = process.env;

const m2 = (req, res, next) => {
  console.log("middleware 2", req.a);
  next();
};

app.use(express.json()); // enable req.body
app.use((req, res, next) => {
  console.log("new req", req.path, req.method);
  req.a = 1;

  next();
});

app.get("/hello", m2, (req, res, next) => {
  return res.json({
    message: "Hello",
  });
});

app.get("/hello2", (req, res, next) => {
  return res.json("Hello");
});

app.post("/post", (req, res, next) => {
  console.log("req.body", req.body);
  return res.json(req.body);
});

app.use((req, res) => {
  return res.status(404).json({ message: "NOT Found" });
});

app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`server is listening on port ${PORT}`);
});
