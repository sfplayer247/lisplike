export default {
  docthrow: {
    parameters: "msg:string",
    returns: "void",
    desc:
      "Throws an error with the provided message. Will always use error 3 because that means a user defined exception."
  },
  throw: (args, env) => {
    env.error(3, args[0].value);
  },
  doctoNum: {
    parameters: "s:string",
    returns: "num",
    desc:
      "Converts a string into a number"
  },
  toNum: (args, env) => {
    return {type: "number", value: parseFloat(args[0].value)}
  },
  docprompt: {
    parameters: "msg:string",
    returns: "string",
    desc:
      "Shows a prompt where the user can input text. Returns the string that the user enters."
  },
  prompt: (args, env) => {
    var response = prompt(args[0].value)
    if (response != null) {
      return {type: 'string', value: response}
    }
    else {
      return {type: 'string', value: ""}
    }
  },
  docprint: {
    parameters: "a:any|...",
    returns: "void",
    desc: "Takes 1+ arguments of any type and appends them to the output."
  },
  print: (args, env) => {
    for (var i = 0; i < args.length; i++) {
      env.output += args[i].value;
    }
    env.output += "\n";
  },
  docarr: {
    parameters: "element:any|...",
    returns: "array",
    desc: "Returns an array element that contains the arguments."
  },
  arr: args => {
    return {
      type: "array",
      value: args
    };
  },
  docvoid: {
    parameters: "element:expression|...",
    returns: "void",
    desc:
      "Runs the expressions after it, returns nothing. This is useful when you want to run several expressions in a row."
  },
  void: args => {
    return null;
  },
  docset: {
    parameters: "varname:symbol|value:any",
    returns: "null",
    desc: "Sets the value of a variable."
  },
  set: (args, env) => {
    env.symLUT[args[0].ref] = args[1];
    env.symLUT[args[0].ref].ref = args[0].ref;
  },
  docgarr: {
    parameters: "array:arrar|index:num",
    returns: "Gets the element at location <span class='code'>index</span>.",
    desc: "Sets the value of a variable."
  },
  garr: args => {
    return args[0].value[args[1].value];
  }
};
