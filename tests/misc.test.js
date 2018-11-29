import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

// Exception handling

test("Throwing and Catching and exception using string 'this is a test error'", () => {
  expect(
    runNewEnvironment("(try (throw 'this is a test error') (print error))")
  ).toBe("this is a test error");
});

test("Throwing and Catching and exception using string 'lisplike'", () => {
  expect(runNewEnvironment("(try (throw 'lisplike') (print error))")).toBe(
    "lisplike"
  );
});

test("Try statement with no error", () => {
  expect(
    runNewEnvironment("(try (print 'no error') (print 'somehow error?'))")
  ).toBe("no error");
});

// Variables
test("Setting a variable to a string and getting the value", () => {
  expect(runNewEnvironment("(void (set test 'test2') (print test))")).toBe(
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
      "(void (set x 0) (while (< x 10) (void (+= x 1) (print x) ) ) )"
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

// Objects
test("Accessing a property of an property list returned by a function", () => {
  expect(
    runNewEnvironment(
      "(void (func test(plist(arr 'a' 1)(arr 'b' 2)))(print(test):b))"
    )
  ).toBe("2");
});

test("Basic property list creation and getting a property.", () => {
  expect(runNewEnvironment("(print (plist(arr 'a' 1)(arr 'b' 2)):a)")).toBe(
    "1"
  );
});
