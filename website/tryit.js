import Enviroment from "../src/env.js";

function runcode() {
  var code = document.getElementById("input").value;

  var env = new Enviroment();

  var start = window.performance.now();
  var ast = env.parse(code);
  var end = window.performance.now();

  var parseTime = end - start;
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
