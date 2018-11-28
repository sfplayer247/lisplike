import Enviroment from "../src/env.js";

function runNewEnvironment(code) {
  return new Enviroment().run(code).output.trim();
}

test("Count to ten using function recursion", () => {
  expect(
    runNewEnvironment(`(void
    (set 'x' i0)
    (func test (
      void
      (if (< x i10) (void 
      (print x)
      (set 'x' (+ x i1))
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
