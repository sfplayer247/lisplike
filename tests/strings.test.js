import Environment from "../src/env.js";

function runNewEnvironment(code) {
  return new Environment().run(code).output.trim();
}

// Starts with
test("hello world starts with hello", () => {
  expect(runNewEnvironment("(print (startswith 'hello world' 'hello'))")).toBe(
    "true"
  );
});

test("goodbye does not start with hello", () => {
  expect(
    runNewEnvironment("(print (startswith 'hello world' 'goodbye'))")
  ).toBe("false");
});

// Slice
test("Slice with one argument", () => {
  expect(runNewEnvironment("(print (slice 'hello world' 6))")).toBe("world");
});

test("Slice with two arguments", () => {
  expect(runNewEnvironment("(print (slice 'hello world' 0 5))")).toBe("hello");
});
