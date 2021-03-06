export default {
  docthrow: {
    parameters: "msg:string",
    returns: "void",
    desc:
      "Throws an error with the provided message. Will always use error 3 because that means a user defined exception."
  },
  throw(args, env) {
    env.error(3, args[0].value);
  },
  doctoNum: {
    parameters: "s:string",
    returns: "num",
    desc: "Converts a string into a number"
  },
  toNum(args, env) {
    return { type: "number", value: parseFloat(args[0].value) };
  },
  doctoStr: {
    parameters: "n:num",
    returns: "string",
    desc: "Converts a number into a string"
  },
  toStr(args, env) {
    return { type: "string", value: `${args[0].value}` };
  },
  docprompt: {
    parameters: "msg:string",
    returns: "string",
    desc:
      "Shows a prompt where the user can input text. Returns the string that the user enters."
  },
  prompt(args, env) {
    let response = prompt(args[0].value);
    if (response != null) {
      return { type: "string", value: response };
    } else {
      return { type: "string", value: "" };
    }
  },
  docprint: {
    parameters: "a:any|...",
    returns: "void",
    desc: "Takes 1+ arguments of any type and appends them to the output."
  },
  print(args, env) {
    for (let i = 0; i < args.length; i++) {
      env.output += args[i].value;
    }
    env.output += "\n";
  },
  docarr: {
    parameters: "element:any|...",
    returns: "array",
    desc: "Returns an array element that contains the arguments."
  },
  arr(args) {
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
  void(args) {
    return null;
  },
  docset: {
    parameters: "letname:symbol|value:any",
    returns: "null",
    desc: "Sets the value of a letiable."
  },
  set(args, env) {
    env.symLUT[args[0].ref] = {};
    env.symLUT[args[0].ref].value = args[1].value;
    env.symLUT[args[0].ref].type = args[1].type;
    env.symLUT[args[0].ref].ref = args[0].ref;
  },
  docgarr: {
    parameters: "array:arrar|index:num",
    returns: "Gets the element at location <span class='code'>index</span>.",
    desc: "Sets the value of a letiable."
  },
  garr(args) {
    return args[0].value[args[1].value];
  }
};
