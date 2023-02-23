const { lottery } = require("./lottery");

const mockGenerateNumber = jest.fn();
jest.mock("./generateNumber", () => {
  return {
    generateNumber: () => mockGenerateNumber(),
  };
});

describe("lottery", () => {
  it("should win", () => {
    mockGenerateNumber.mockImplementation(() => 2);

    const number = 2;
    const result = lottery(number);
    expect(result).toEqual("You won!");
  });

  it("should lose", () => {
    mockGenerateNumber.mockImplementation(() => 1);

    const number = 2;
    const result = lottery(number);
    expect(result).toEqual(`You lost!, generated number is 1`);
  });
});
