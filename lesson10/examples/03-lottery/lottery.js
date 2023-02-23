const { generateNumber } = require("./generateNumber");

function lottery(number) {
  const generatedNumber = generateNumber();
  if (number !== generatedNumber) {
    return `You lost!, generated number is ${generatedNumber}`;
  }

  return "You won!";
}

module.exports = {
  lottery,
};
