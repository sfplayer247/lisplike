/* This file is used solely to generate documentation for functions that are built
  into the parser directly like while loops, functions and if statements */

export default {
  docfunc: {
    parameters: "name:symbol|code:expression`",
    returns: "void",
    desc:
      "Creates a function and automatically puts it in the look up table. Currently arguments are put in a variable called args, and there is no scoping. In a later version this will be changed."
  },
  docif: {
    parameters: "condition:expression|code:expression`",
    returns: "void",
    desc:
      "Runs the <span class='code'>code</span> if the condition evaluates to true."
  },
  docwhile: {
    parameters: "condition:expression|code:expression`",
    returns: "void",
    desc:
      "Runs the <span class='code'>code</span> until the condition evaluates to false."
  },
  doctry: {
    parameters: "try:expression|except:expression`",
    returns: "void",
    desc:
      "Runs the <span class='code'>try</span> expression and if it throws an expression it runs the second argument. The error can be accessed through the <span class='code'>error</span> variable."
  }
};
