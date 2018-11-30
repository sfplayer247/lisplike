import Enviroment from "../src/env.js";

function runcode() {
  var code = document.getElementById("input").value;
  if (document.getElementById('parseCheckbox').checked) {
    console.dir(new Enviroment().parse(code))
  }
  document.getElementById("output").innerText = new Enviroment().run(
    code
  ).output;
}

// Load any example code
document.getElementById("input").value = localStorage.getItem("tryitView");
document.getElementById("runcode").addEventListener("click", runcode);
