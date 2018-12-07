import Environment from "../src/env.js";

function runcode() {
  let code = document.getElementById("input").value;

  let env = new Environment();

  let start = window.performance.now();
  let ast = env.parse(code);
  let end = window.performance.now();

  let parseTime = end - start;
  if (document.getElementById("parseCheckbox").checked) {
    console.dir(ast);
  }

  start = window.performance.now();
  env.execute(ast, env);
  end = window.performance.now();

  document.getElementById("output").innerText = env.output;
  document.getElementById("time").innerText = `
  Time to parse: ${parseTime}ms
  Time to execute: ${end - start}ms
  Time to parse & execute: ${parseTime + end - start}ms`;
}

// Load any example code
document.getElementById("input").value = localStorage.getItem("tryitView");
document.getElementById("runcode").addEventListener("click", runcode);
