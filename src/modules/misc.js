export default {
  docprint: {
    parameters: "a:any|...",
    returns: "void",
    desc: "Takes 1+ arguments of any type and appends them to the output."
  },
  print: (args, env) => {
    for (var i = 0; i < args.length; i++) {
      env.output += args[i].value + "\n";
    }
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
    parameters: "varname:string|value:any",
    returns: "null",
    desc: "Sets the value of a variable."
  },
  set: (args, env) => {
    env.symLUT[args[0].value] = args[1];
    env.symLUT[args[0].value].ref = args[0].value;
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
