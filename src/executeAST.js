export default function execute(ast, env) {
  return runAST(ast, env);
}

function runAST(token, env) {
  if (token.type == "expression") {
    var args = [];
    // Evaluate if statements
    if (token.value[0].ref == "if") {
      // Run the condition and decide whether to run the code
      if (runAST(token.value[1], env).value == "true") {
        runAST(token.value[2], env);
      }
      // Check if there is an else statement
      else if (token.value.length == 4) {
        runAST(token.value[3], env);
      }
    }
    // Evaluate function definitions
    else if (token.value[0].ref == "func") {
      // Add the function into the lookup table
      env.symLUT[token.value[1].ref] = args => {
        env.symLUT.args = { type: "array", value: args };
        return runAST(token.value[2], env);
      };
    }
    // Evaluate while loops
    else if (token.value[0].ref == "while") {
      // Safehold put it place so you don't accidentally freeze the page
      var iterations = 0;
      while (
        runAST(token.value[1], env).value != "false" &&
        iterations < 10000
      ) {
        runAST(token.value[2], env);
        iterations++;
      }
    } else {
      for (var i = 1; i < token.value.length; i++) {
        args.push(runAST(token.value[i], env));
      }
      // If the first element is a function, run it with the arguments
      if (token.value[0].type == "symbol") {
        // We do not need to test for error here because it will return it either way
        return runAST(token.value[0], env)(args, env);
      }
    }
  } else if (token.type == "number") {
    return token;
  } else if (token.type == "string") {
    return token;
  } else if (token.type == "boolean") {
    return token;
  } else if (token.type == "symbol") {
    // Check if the symbol has a value in the lookup table
    if (token.ref in env.symLUT) {
      return env.symLUT[token.ref];
    } else return token;
  }
}
