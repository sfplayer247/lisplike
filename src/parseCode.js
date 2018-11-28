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
    .split(" ");

  // Remove empty strings
  s = s.map(x => {
    return x.trim();
  });
  s = s.filter(Boolean);
  return s;
}

function buildAST(tokens) {
  var token = tokens.shift();
  // Expressions
  if (token == "(") {
    var ast = [];
    // Parse tokens until the expression ends
    while (tokens[0] != ")") {
      ast.push(buildAST(tokens));
    }
    // Remove ending parenthesis
    tokens.shift();
    return { type: "expression", value: ast };
  }
  // Numbers
  else if (token[0] == "i" && token[1] != "f") {
    return { type: "number", value: parseInt(token.slice(1)) };
  }
  // Strings
  else if (token[0] == "'") {
    var string = token;
    while (!string.endsWith("'")) {
      string += " " + tokens.shift();
    }
    return { type: "string", value: string.slice(1, -1) };
  }
  // Booleans
  else if (token == "true" || token == "false") {
    return { type: "boolean", value: token };
  }
  // Symbols
  else {
    return { type: "symbol", value: "", ref: token };
  }
}
