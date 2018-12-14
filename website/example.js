/*
  showInTryIt(code)
  description: Open the lisp interpreter and autofill it with the code string.

  param code
    type: string
    description: The code to be autofilled in the intrepreter
  returns void
*/
function showInTryIt(code) {
  localStorage.setItem("tryitView", code);
  window.location.pathname += "tryit.html";
}

/*
  addFunctionToHTML(linkname, title, code)
  description: Creates an example section on the page

  param linkname
    type: string
    description: The name ot be used for the link to the example

  param title
    type: string
    description: The title of the example
  
  param code
    type: string
    description: The code to be autofilled in the intrepreter
  returns void
*/
export default function addFunctionToHTML(linkname, title, code) {
  let html = document.createElement("div");
  html.innerHTML = `
  <h4 id="example${linkname}">${title}</h4>
  <p class="code"></p>
  <button class="showInTryIt">Try it ></button>`;

  html.querySelector(".code").innerText = code;
  // Make the button redirect the user to the interpreter
  html
    .querySelector(".showInTryIt")
    .addEventListener("click", () => showInTryIt(code));

  // Add the example section to the page
  document.querySelector("#examplesautogen").appendChild(html);
  // Create a link in the table of contents to the example section
  document
    .querySelector("#tableofcontentsexamples")
    .insertAdjacentHTML(
      "beforeend",
      `<li><a href="#example${linkname}">${title}</a></li>`
    );
}
