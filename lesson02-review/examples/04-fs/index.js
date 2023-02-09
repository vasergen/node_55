const fs = require("node:fs/promises");
const { getMovies } = require("./db");

async function main() {
  const res = await getMovies();
  console.log("res:", res);
}
main();
