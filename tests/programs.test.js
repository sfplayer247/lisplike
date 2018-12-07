import Environment from "../src/env.js";

function runNewEnvironment(code) {
  return new Environment().run(code).output.trim();
}

test("Count to ten using function recursion", () => {
  expect(
    runNewEnvironment(`(void
    (set x 0)
    (func test (
      void
      (if (< x 10) (void 
      (print x)
      (set x (+ x 1))
      (test)
      ))
    ))
(test)
)`)
  ).toBe(`0
1
2
3
4
5
6
7
8
9`);
});
