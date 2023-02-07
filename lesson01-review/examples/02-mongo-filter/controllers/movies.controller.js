const { HttpError } = require("../helpers/index.js");
const { Movie } = require("../models/movie");

// select fileds
async function getMovies(req, res) {
  console.log("filter exaample");

  // 1
  // const movies = await Movie.find({}, { title: 1, _id: 0 });
  // const movies = await Movie.find({}, "title");
  const movies = await Movie.find().select({ title: 1, _id: 0 });

  return res.json(movies);
}

// filter
// async function getMovies(req, res) {
//   console.log("filter exaample");

//   // const { limit = 5, page = 1 } = req.query;
//   // const skip = (page - 1) * limit;

//   const movies = await Movie.find({}); // -> returns all
//   // const movie = await Movie.findOne({ title: "Inception" }); // -> max 1 result

//   return res.json(movies);
// }

// async function getMovies(req, res) {
//   console.log('filter')

//   const { limit = 5, page = 1 } = req.query;
//   const skip = (page - 1) * limit;

//   const movies = await Movie.find({}).skip(skip).limit(limit);
//   return res.json(movies);
// }

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

module.exports = {
  getMovie,
  getMovies,
  createMovie,
  deleteMovie,
};
