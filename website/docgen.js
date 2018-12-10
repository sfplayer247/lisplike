/*
  getDocsFromModule(module)
  description: Gets all of the documentation objects from a module.

  param module
    type: object
    description: a lisplike js module
  returns object
*/

function getDocsFromModule(module) {
  let docs = {};
  let keys = Object.keys(module);
  for (let key of keys) {
    if (key.startsWith("doc")) {
      // The first 3 letters are removed to remove the 'doc' prefix from every doc entry
      docs[key.slice(3)] = module[key];
    }
  }

  return docs;
}

/*
  createHTMLFromDoc(name, doc)
  description: Generates html for a documentation entry.

  param name
    type: string
    description: name of the function
  param doc
    type: object
    description: a documentation entry
  returns string
*/
function createHTMLFromDoc(name, doc, container) {
  return `<h4 id="docs${container + name}">${name}</h4>
  ${getParameters(name, doc.parameters)}
  <h5>returns ${doc.returns}</h5>
  <p>${doc.desc}</p>`;
}

/*
  getParameters(name, parameters)
  description: Generates html to represent a functions parameters

  param name
    type: string
    description: name of the function
  param parameters
    type: object
    description: the parameters for a documentation entry
  returns string
*/

function getParameters(name, parameters) {
  if (typeof parameters == "string") {
    return "<h5>( " + name + " <em>" + parameters + "</em> )<br /></h5>";
  } else {
    let out = "<h5>";
    for (let parameter of parameters) {
      out += "( " + name + " <em>" + parameter + "</em> )<br />";
    }
    return out;
  }
}

/*
  createHTMLFromDocs(doc)
  description: Generates html for a modules documentation entrys.

  param docs
    type: object
    description: an object containing all of the documentation for a module
  returns string
*/
function createHTMLFromDocs(docs, name) {
  let html = "";
  for (let i = 0; i < Object.keys(docs).length; i++) {
    html += createHTMLFromDoc(
      Object.keys(docs)[i],
      docs[Object.keys(docs)[i]],
      name
    );
  }
  return html;
}

function generateTableOfContents(docs, name) {
  let keys = Object.keys(docs);
  let html = `<li><a href="#docs${name}">${name}</a><ol>`;
  for (let i = 0; i < keys.length; i++) {
    html += `<li><a href="#docs${name + keys[i]}">${keys[i]}</a></li>`;
  }
  return html + "</ol ></li>";
}

/*
  addDocsToPage(name, module)
  description: Automatically adds docs for a module

  param name
    type: string
    description: name of the module
  param module
    type: object
    description: a module
  returns void
*/
export default async function addDocsToPage(name, module) {
  let docs = getDocsFromModule(module);
  document.getElementById(
    "tableofcontents"
  ).innerHTML += generateTableOfContents(docs, name);
  document.getElementById("autogen").innerHTML +=
    `<h3 id="docs${name}">${name}</h3>` + createHTMLFromDocs(docs, name);
}
