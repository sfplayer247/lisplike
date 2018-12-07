export default function parse(x) {
  return buildAST(tokenizeString(x));
}

/*
  tokenizeString(string s)
  description: turns strings into tokens

  param s
    type: string
    description: string to be converted to array
  returns array
*/
function tokenizeString(s) {
  // Make the program one line and pad each line
  s = s.split("\n").reduce((acc, cur) => acc + ` ${cur.trim()} `);

  // Split on spaces and isolate strings
  let splitInput = [];
  let token;
  while (s.indexOf(" ") != -1) {
    token = s.slice(0, s.indexOf(" "));
    // Capture charcters within strings
    if (token.startsWith("'")) {
      splitInput.push(s.slice(0, s.indexOf("'", 1) + 1));
      s = s.slice(s.indexOf("'", 1) + 1);
    }
    // Capture symbols
    else if (token != "") {
      splitInput.push(token);
      s = s.slice(s.indexOf(" ") + 1);
    }
    // Cut out extra space
    else {
      s = s.trim();
    }
  }
  // Add the last section to the array
  splitInput.push(s);

  s = splitInput;
  for (let i = 0; i < s.length; i++) {
    // Split properties
    while (
      s[i].includes(":") &&
      !s[i].startsWith(":") &&
      !s[i].startsWith("'")
    ) {
      s.splice(i + 1, 0, s[i].slice(s[i].indexOf(":")));
      s[i] = s[i].slice(0, s[i].indexOf(":"));
    }
    // Split opening parens
    while (
      (s[i].startsWith("(") && s[i] != "(") ||
      (s[i].startsWith("[") && s[i] != "[")
    ) {
      s[i] = s[i].slice(1);
      s.splice(i, 0, "(");
    }
    // Split closing parens
    while (
      (s[i].endsWith(")") && s[i] != ")") ||
      (s[i].endsWith("]") && s[i] != "]")
    ) {
      s[i] = s[i].slice(0, -1);
      s.splice(i + 1, 0, ")");
    }
  }
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
  let token = tokens.shift();
  //
  // Expressions using ()
  //
  if (token == "(") {
    return generateExpression(tokens, token, ")");
  }
  //
  // Expressions using []
  //
  if (token == "[") {
    return generateExpression(tokens, token, "]");
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
      let split = tokens
        .shift()
        .split(":")
        .slice(1);
      return { type: "symbol", value: "", ref: token, property: split };
    }
  }
}

function generateExpression(tokens, token, closingParen) {
  let ast = [];
  // Parse tokens until the expression ends
  while (tokens[0] != closingParen) {
    let tok = buildAST(tokens);
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
      property: tokens
        .shift()
        .split(":")
        .slice(1)
    };
  }
}
