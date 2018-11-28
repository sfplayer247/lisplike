import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

// Addition
test("Adding 1 + 1 equals 2", () => {
  expect(runNewEnvironment("(print (+ i1 i1))")).toBe("2");
});

// Subtraction
test("Subtracting 4 from 2 equals -2", () => {
  expect(runNewEnvironment("(print (- i2 i4))")).toBe("-2");
});

test("Subtracting -4 from 2 equals 6", () => {
  expect(runNewEnvironment("(print (- i2 i-4))")).toBe("6");
});

// Multiplication
test("Multiplying 2 by 2 equals 4", () => {
  expect(runNewEnvironment("(print (* i2 i2))")).toBe("4");
});

test("Multiplying 2 by -3 equals -6", () => {
  expect(runNewEnvironment("(print (* i2 i-3))")).toBe("-6");
});

// Power operator
test("2 to the power of 2 yields 4", () => {
  expect(runNewEnvironment("(print (** i2))")).toBe("4");
});

test("2 to the power of 2 yields 4", () => {
  expect(runNewEnvironment("(print (** i2 i2))")).toBe("4");
});

test("2 to the power of 1 yields 2", () => {
  expect(runNewEnvironment("(print (** i2 i1))")).toBe("2");
});
