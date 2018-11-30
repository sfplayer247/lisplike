export default function parse(x) {
  return buildAST(tokenizeString(x));
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
  // Split by parenthesis
  var s = s
    .replace(/\(/gi, " ( ")
    .replace(/\)/gi, " ) ")
    .replace(/\[/gi, " [ ")
    .replace(/\]/gi, " ] ")
    .split(" ");

  // Remove empty strings
  s = s.map(x => {
    return x.trim();
  });
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
    var string = token;
    while (!string.endsWith("'")) {
      string += " " + tokens.shift();
    }
    return { type: "string", value: string.slice(1, -1) };
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
    if (token.indexOf(":") == -1) {
      return { type: "symbol", value: "", ref: token };
    } else {
      // Split the symbol into the name and property
      var split = token.split(":");
      return { type: "symbol", value: "", ref: split[0], property: split[1] };
    }
  }
}
