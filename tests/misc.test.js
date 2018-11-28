import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

// Variables
test("Setting a variable to a string and getting the value", () => {
  expect(runNewEnvironment("(void (set 'test' 'test2') (print test))")).toBe(
    "test2"
  );
});

// Booleans & if statement

test("If true should evaluate its contents", () => {
  expect(runNewEnvironment("(if true (print 'success'))")).toBe("success");
});

test("If false should not evaluate its contents", () => {
  expect(runNewEnvironment("(if false (print 'failure'))")).toBe("");
});

// Booleans & if else statements
test("If false else statement should evaluate its contents", () => {
  expect(
    runNewEnvironment("(if false (print 'failure') (print 'success'))")
  ).toBe("success");
});

test("If true else statement should not evaluate its contents", () => {
  expect(
    runNewEnvironment("(if true (print 'success') (print 'failure'))")
  ).toBe("success");
});

// While loops
test("Count to ten using while loop", () => {
  expect(
    runNewEnvironment(
      "(void (set 'x' i0) (while (< x i10) (void (+= x i1) (print x) ) ) )"
    )
  ).toBe(`1
2
3
4
5
6
7
8
9
10`);
});
