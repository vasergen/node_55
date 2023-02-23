const { sum } = require("./sum");

describe("sum", () => {
  beforeAll(() => {
    console.log("boeforeAll");
  });

  afterAll(() => {
    console.log("afterAll");
  });

  beforeEach(() => {
    console.log("beforeEach");
  });

  afterEach(() => {
    console.log("afterEach");
  });

  it("1 + 2 should return 3", () => {
    expect(sum(1, 2)).toEqual(3);
  });

  it('1 + "2" should return 3', () => {
    expect(sum(1, "2")).toEqual(3);
  });
});
