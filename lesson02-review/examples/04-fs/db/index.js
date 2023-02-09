const fs = require("node:fs/promises");
const path = require("node:path");

async function getMovies() {
  const filePath = path.resolve(__dirname, "movies.json");
  const moviesRaw = await fs.readFile(filePath, "utf-8");
  const movies = JSON.parse(moviesRaw);
  return movies;
}

module.exports = {
  getMovies,
};
