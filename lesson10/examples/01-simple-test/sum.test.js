const { sum } = require("./sum");

// 1
// const res1 = sum(1, 2);
// if (res1 !== 3) {
//   throw new Error(`expect 3, got ${res1}`);
// } else {
//   console.log("OK");
// }

// 2
// const res2 = sum(1, "2");
// if (res2 !== 3) {
//   throw new Error(`expect 3, got ${res2}`);
// } else {
//   console.log("OK");
// }

describe("sum", () => {
  test("1 + 2 should return 3", () => {
    expect(sum(1, 2)).toEqual(3);
  });

  test('1 + "2" should return 3', () => {
    expect(sum(1, "2")).toEqual(3);
  });
});

// ----------------------
function describe(title, cb) {
  console.log(title);
  cb();
}

function test(title, cb) {
  console.log("  " + title);
  cb();
}

function expect(actual) {
  return {
    toEqual(expected) {
      if (actual !== expected) {
        const str = `ERROR: expect ${expected}, got ${actual}`;
        console.error(str);
      } else {
        console.log("OK");
      }
    },
  };
}
