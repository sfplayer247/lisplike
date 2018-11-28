import Enviroment from "../src/env.js";

var env = new Enviroment();

function runcode() {
  var code = document.getElementById("input").value;
  document.getElementById("input").value = "";
  env.output = "";
  document.getElementById("output").innerText =
    ">" +
    code +
    "\n" +
    env.run(code).output +
    document.getElementById("output").innerText;
}

function isEnter(e) {
  if (e.key == "Enter") {
    runcode();
  }
}

document.getElementById("submit").addEventListener("click", runcode);
document.getElementById("input").addEventListener("keydown", isEnter);
