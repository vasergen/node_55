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

async function verifyEmail(req, res) {
  const { token } = req.params;

  const user = await User.findOneAndUpdate(
    {
      verifyToken: token,
    },
    {
      verified: true,
      verifyToken: null,
    }
  );

  if (!user) {
    return res.send("User is not found!");
  }

  return res.send("Your email is verified");
}

module.exports = {
  createMovie,
  getMovies,
  me,
  verifyEmail,
};
