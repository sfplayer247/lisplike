import Enviroment from "../src/env.js";

function runcode() {
  var code = document.getElementById("input").value;
  console.log(new Enviroment().parse(code));
  document.getElementById("output").innerText = new Enviroment().run(
    code
  ).output;
}
document.getElementById("input").value = localStorage.getItem("tryitView");
document.getElementById("runcode").addEventListener("click", runcode);
