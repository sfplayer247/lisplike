import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

// Equals operator
test("1 == 1 should evaluate to equal", () => {
  expect(
    runNewEnvironment("(if (== i1 i1) (print 'equal') (print 'inequal'))")
  ).toBe("equal");
});

test("1 == 0 should evaluate to inequal", () => {
  expect(
    runNewEnvironment("(if (== i1 i0) (print 'equal') (print 'inequal'))")
  ).toBe("inequal");
});

test("0 == 1 should evaluate to inequal", () => {
  expect(
    runNewEnvironment("(if (== i0 i1) (print 'equal') (print 'inequal'))")
  ).toBe("inequal");
});

test("'apple' == 'apple' should evaluate to equal", () => {
  expect(
    runNewEnvironment(
      "(if (== 'apple' 'apple') (print 'equal') (print 'inequal'))"
    )
  ).toBe("equal");
});

test("'apple' == 'orange' should evaluate to inequal", () => {
  expect(
    runNewEnvironment(
      "(if (== 'apple' 'orange') (print 'equal') (print 'inequal'))"
    )
  ).toBe("inequal");
});

// Not equals operator

test("1 != 1 should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (!= i1 i1) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("1 != 0 should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (!= i1 i0) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("0 != 1 should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (!= i0 i1) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("'apple' != 'apple' should evaluate to false", () => {
  expect(
    runNewEnvironment(
      "(if (!= 'apple' 'apple') (print 'true') (print 'false'))"
    )
  ).toBe("false");
});

test("'apple' != 'orange' should evaluate to true", () => {
  expect(
    runNewEnvironment(
      "(if (!= 'apple' 'orange') (print 'true') (print 'false'))"
    )
  ).toBe("true");
});

test("'apple' != 1 should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (!= 'apple' i1) (print 'true') (print 'false'))")
  ).toBe("true");
});

// and operator

test("true and true should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (and true true) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("true and false should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (and true false) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("false and true should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (and false true) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("false and false should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (and false true) (print 'true') (print 'false'))")
  ).toBe("false");
});

// not operator

test("not false should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (not false) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("not true should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (not true) (print 'true') (print 'false'))")
  ).toBe("false");
});

// not operator

test("not false should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (not false) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("not true should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (not true) (print 'true') (print 'false'))")
  ).toBe("false");
});

// or operator

test("true or false should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (or true false) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("false or false should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (or false false) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("false or false or false or true should evaluate to true", () => {
  expect(
    runNewEnvironment(
      "(if (or false false false true) (print 'true') (print 'false'))"
    )
  ).toBe("true");
});

// greater than and less than operators

test("10 > 0 should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (> i10 i0) (print 'true') (print 'false'))")
  ).toBe("true");
});

test("-10 > 0 should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (> i-10 i0) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("10 < 0 should evaluate to false", () => {
  expect(
    runNewEnvironment("(if (< i10 i0) (print 'true') (print 'false'))")
  ).toBe("false");
});

test("-10 < 0 should evaluate to true", () => {
  expect(
    runNewEnvironment("(if (< i-10 i0) (print 'true') (print 'false'))")
  ).toBe("true");
});
