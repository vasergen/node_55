const { User } = require("../models/user");

async function createMovie(req, res, next) {
  const { user } = req;
  const { id: movieId } = req.body;

  user.movies.push({ _id: movieId });
  await User.findByIdAndUpdate(user._id, user);

  return res.status(201).json({
    data: {
      movies: user.movies,
    },
  });
}

async function getMovies(req, res, next) {
  const { user } = req;
  const userWithMovies = await User.findById(user._id).populate("movies", { title: 1, year: 1, _id: 1 });

  return res.status(200).json({
    data: {
      movies: userWithMovies.movies,
    },
  });
}

async function me(req, res, next) {
  const { user } = req;
  const { email, _id: id } = user;

  return res.status(200).json({
    data: {
      user: {
        email,
        id,
      },
    },
  });
}

module.exports = {
  createMovie,
  getMovies,
  me,
};
