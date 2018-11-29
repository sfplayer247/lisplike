import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

// Addition
test("Adding 1 + 1 equals 2", () => {
  expect(runNewEnvironment("(print (+ 1 1))")).toBe("2");
});

// Subtraction
test("Subtracting 4 from 2 equals -2", () => {
  expect(runNewEnvironment("(print (- 2 4))")).toBe("-2");
});

test("Subtracting -4 from 2 equals 6", () => {
  expect(runNewEnvironment("(print (- 2 -4))")).toBe("6");
});

// Multiplication
test("Multiplying 2 by 2 equals 4", () => {
  expect(runNewEnvironment("(print (* 2 2))")).toBe("4");
});

test("Multiplying 2 by -3 equals -6", () => {
  expect(runNewEnvironment("(print (* 2 -3))")).toBe("-6");
});

// Power operator
test("2 to the power of 2 yields 4", () => {
  expect(runNewEnvironment("(print (** 2))")).toBe("4");
});

test("2 to the power of 2 yields 4", () => {
  expect(runNewEnvironment("(print (** 2 2))")).toBe("4");
});

test("2 to the power of 1 yields 2", () => {
  expect(runNewEnvironment("(print (** 2 1))")).toBe("2");
});

// += Operator

test("x=1, x+= 1, x == 2", () => {
  expect(
    runNewEnvironment(
      "(void (set x 1) (+= x 1) (if (== x 2) (print 2) (print 'fail')))"
    )
  ).toBe("2");
});

test("x=3, x+= -1, x == 2", () => {
  expect(
    runNewEnvironment(
      "(void (set x 3) (+= x -1) (if (== x 2) (print 2) (print 'fail')))"
    )
  ).toBe("2");
});
