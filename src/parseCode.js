export default function parse(x) {
  var start = window.performance.now();
  var x = tokenizeString(x);
  var end = window.performance.now();
  console.log("tokenize: " + (end - start));
  start = window.performance.now();
  x = buildAST(x);
  end = window.performance.now();
  console.log("buildast: " + (end - start));
  return x;
}

/*
  tokenizeString(string s)
  description: splits the string by parenthesis

  param s
    type: string
    description: string to be converted to array
  returns array
*/
function tokenizeString(s) {
  var lines = s.split("\n");
  var s = "";
  for (var i = 0; i < lines.length; i++) {
    s += ` ${lines[i].trim()} `;
  }
  var splitInput = [];
  while (s.indexOf(" ") != -1) {
    var token = s.slice(0, s.indexOf(" "));
    if (token.startsWith("'")) {
      splitInput.push(s.slice(0, s.indexOf("'", 1) + 1));
      s = s.slice(s.indexOf("'", 1) + 1);
    } else if (token != "") {
      splitInput.push(token.trim());
      s = s.slice(s.indexOf(" ") + 1);
    } else {
      s = s.slice(s.indexOf(" ") + 1);
    }
  }
  // Add the last section to the array
  splitInput.push(s.slice(0));

  s = splitInput;
  for (var i = 0; i < s.length; i++) {
    if (!s[i].startsWith("'") && !s[i].endsWith("'")) {
      while (s[i].indexOf(":") != -1 && !s[i].startsWith(":")) {
        s.splice(i + 1, 0, s[i].slice(s[i].indexOf(":")));
        s[i] = s[i].slice(0, s[i].indexOf(":"));
      }
      while (
        (s[i].startsWith("(") && s[i] != "(") ||
        (s[i].startsWith("[") && s[i] != "[")
      ) {
        s[i] = s[i].slice(1);
        s.splice(i, 0, "(");
      }
      while (
        (s[i].endsWith(")") && s[i] != ")") ||
        (s[i].endsWith("]") && s[i] != "]")
      ) {
        s[i] = s[i].slice(0, -1);
        s.splice(i + 1, 0, ")");
      }
    }
  }
  // Remove empty strings
  s = s.map(x => {
    return x.trim();
  });
  console.log(s);
  s = s.filter(Boolean);
  return s;
}

/*
  buildAST(tokens:array)
  description: Takes an array from tokenizeString and classifys each of the elements into a AST

  param tokens
    type: array
    description: Generated from tokenizeString
  returns object
    description: the parsed AST
*/
function buildAST(tokens) {
  var token = tokens.shift();
  //
  // Expressions using ()
  //
  if (token == "(") {
    var ast = [];
    // Parse tokens until the expression ends
    while (tokens[0] != ")") {
      var tok = buildAST(tokens);
      if (tok != null) ast.push(tok);
    }
    // Remove ending parenthesis
    tokens.shift();
    // Check if we are trying to access a property
    if (tokens[0] == undefined || tokens[0][0] != ":") {
      return { type: "expression", value: ast };
    } else {
      return {
        type: "expression",
        value: ast,
        // Remove the colon from the property name
        property: tokens.shift().slice(1)
      };
    }
  }
  //
  // Expressions using []
  //
  if (token == "[") {
    var ast = [];
    // Parse tokens until the expression ends
    while (tokens[0] != "]") {
      var tok = buildAST(tokens);
      if (tok != null) ast.push(tok);
    }
    // Remove ending parenthesis
    tokens.shift();
    // Check if we are trying to access a property
    if (tokens[0] == undefined || tokens[0][0] != ":") {
      return { type: "expression", value: ast };
    } else {
      return {
        type: "expression",
        value: ast,
        // Remove the colon from the property name
        property: tokens.shift().slice(1)
      };
    }
  }
  //
  // Numbers
  //
  else if (!isNaN(token)) {
    return { type: "number", value: parseFloat(token) };
  }
  //
  // Strings
  //
  else if (token[0] == "'") {
    return { type: "string", value: token.slice(1, -1) };
  }
  //
  // Comments
  //
  else if (token[0] == ";") {
    while (!token.endsWith(";")) {
      token = tokens.shift();
    }
  }
  //
  // Booleans
  //
  else if (token == "true" || token == "false") {
    return { type: "boolean", value: token };
  }
  //
  // Symbols
  //
  else {
    // Check if a property is being accessed
    if (!tokens[0].startsWith(":")) {
      return { type: "symbol", value: "", ref: token };
    } else {
      // Split the symbol into the name and property
      var split = tokens
        .shift()
        .split(":")
        .slice(1);
      return { type: "symbol", value: "", ref: token, property: split };
    }
  }
}
