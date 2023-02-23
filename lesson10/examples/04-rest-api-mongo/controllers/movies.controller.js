const { HttpError } = require("../helpers/index.js");
const { Movie } = require("../models/movie");
const fs = require("fs/promises");
const path = require("path");

async function getMovies(req, res) {
  const { limit = 5, page = 1 } = req.query;
  const skip = (page - 1) * limit;

  const movies = await Movie.find({}).skip(skip).limit(limit);
  return res.json(movies);
}

async function getMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);

  if (!movie) {
    return next(HttpError(404, "Movie not found"));
  }
  return res.json(movie);
}

async function createMovie(req, res, next) {
  const { title } = req.body;
  const newMovie = await Movie.create({
    title,
  });
  return res.status(201).json({
    data: {
      movie: newMovie,
    },
  });
}

async function deleteMovie(req, res, next) {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  if (!movie) {
    return next(HttpError(404, "No movie"));
  }
  await Movie.findByIdAndRemove(id);
  return res.status(200).json(movie);
}

async function uploadImage(req, res, next) {
  console.log("req.file", req.file);
  const { file, params } = req;

  // move to images
  const oldPath = file.path;
  const newPath = path.resolve(__dirname, "../images", file.filename);
  await fs.rename(oldPath, newPath); // move

  // save path to db
  const imagePath = `/images/${file.filename}`;
  await Movie.findByIdAndUpdate(params.id, {
    image: imagePath,
  });

  return res.status(200).json({
    data: {
      image: imagePath,
    },
  });
}

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  deleteMovie,
  uploadImage,
};
