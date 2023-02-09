require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

mongoose.set("debug", true);

const schema = mongoose.Schema({
  price: { type: Number },
  color: { type: String },
  brand: { type: String },
});
const Fridge = mongoose.model("fridge", schema);

app.use(morgan("dev"), cors());
app.get("/api/fridges", async (req, res) => {
  const { priceMin, priceMax, color } = req.query;
  const query = {};

  if (color) {
    query.color = color;
  }

  if (priceMin || priceMax) {
    query.price = {
      $gte: Number(priceMin) || 0,
      $lte: Number(priceMax) || Infinity,
    };
  }

  const fridges = await Fridge.find(query);
  return res.json({
    data: {
      fridges,
    },
  });
});

mongoose.connect(process.env.DB_URI).then(() => {
  console.log("connected to db");
  app.listen(3001, () => {
    console.log("listening on port 3001");
  });
});
