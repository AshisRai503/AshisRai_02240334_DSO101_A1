const { isValidTaskTitle } = require("../utils/validateTask");

test("valid task title should return true", () => {
  expect(isValidTaskTitle("Complete DSO101 Assignment")).toBe(true);
});

test("empty task title should return false", () => {
  expect(isValidTaskTitle("")).toBe(false);
});

test("spaces only task title should return false", () => {
  expect(isValidTaskTitle("   ")).toBe(false);
});

