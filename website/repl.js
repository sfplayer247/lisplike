import Enviroment from "../src/env.js";

var env = new Enviroment();

function runcode() {
  var code = document.getElementById("input").value;
  // Clear the value of the input
  document.getElementById("input").value = "";
  // Clear the enviroment output so it we don't repeat outputs
  env.output = "";

  // Log the AST to console
  if (document.getElementById('parseCheckbox').checked) {
    console.dir(new Enviroment().parse(code))
  }

  // Display the output
  document.getElementById("output").innerText =
    ">" +
    code +
    "\n" +
    env.run(code).output +
    document.getElementById("output").innerText;
}

// Used run code when ever enter is pressed
function isEnter(e) {
  if (e.key == "Enter") {
    runcode();
  }
}

document.getElementById("submit").addEventListener("click", runcode);
document.getElementById("input").addEventListener("keydown", isEnter);
