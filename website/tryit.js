import Enviroment from "./env.js";

function runcode() {
  var code = document.getElementById("input").value;
  document.getElementById("output").innerText = new Enviroment().run(
    code
  ).output;
}
document.getElementById("runcode").addEventListener("click", runcode);
