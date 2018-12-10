/*
<div>
        <h4 id="examplesimplemath">Simple Math:</h4>
        <p class="code">
          (void<br />
          &nbsp(print '2 times 2 equals: ' (* 2 2))<br />
          &nbsp(print '2 plus 2 equals: ' (+ 2 2))<br />
          &nbsp(print '2 minus 1 equals: ' (- 2 1))<br />
          &nbsp(print '8 divided by 2 equals: ' (/ 8 2))<br />
          &nbsp(print '2 to the power of 4 equals: ' (** 2 4))<br />
          )<br />
        </p>
        <button
          onclick="viewInTryIt(`(void
 (print '2 times 2 equals: ' (* 2 2))
 (print '2 plus 2 equals: ' (+ 2 2))
 (print '2 minus 1 equals: ' (- 2 1))
 (print '8 divided by 2 equals: ' (/ 8 2))
 (print '2 to the power of 4 equals: ' (** 2 4))
)`)"
        >
          Try it >
        </button>
      </div>
*/

function showInTryIt(code) {
  localStorage.setItem("tryitView", code);
  window.location.pathname += "tryit.html";
}

export default function addFunctionToHTML(linkname, title, code) {
  let html = document.createElement("div");
  html.innerHTML = `
  <h4 id="example${linkname}">${title}</h4>
  <p class="code"></p>
  <button class="showInTryIt">Try it ></button>`;
  html.querySelector(".code").innerText = code;
  html
    .querySelector(".showInTryIt")
    .addEventListener("click", () => showInTryIt(code));

  document.querySelector("#examplesautogen").appendChild(html);
  document
    .querySelector("#tableofcontentsexamples")
    .insertAdjacentHTML(
      "beforeend",
      `<li><a href="#example${linkname}">${title}</a></li>`
    );
}
