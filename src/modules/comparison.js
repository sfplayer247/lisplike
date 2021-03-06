export default {
  "doc==": {
    parameters: "a:any|b:any",
    returns: "bool",
    desc: "Takes two arguments and checks if their value is equal."
  },
  "=="(args) {
    return {
      type: "boolean",
      value: args[0].value == args[1].value ? "true" : "false"
    };
  },
  "doc!=": {
    parameters: "a:any|b:any",
    returns: "bool",
    desc: "Takes two arguments and checks if their value is not equal."
  },
  "!="(args) {
    return {
      type: "boolean",
      value: args[0].value != args[1].value ? "true" : "false"
    };
  },
  docnot: {
    parameters: "a:bool",
    returns: "bool",
    desc: "Inverts a boolean."
  },
  not(args) {
    return {
      type: "boolean",
      value: args[0].value == "true" ? "false" : "true"
    };
  },
  docand: {
    parameters: "a:bool|b:bool",
    returns: "bool",
    desc: "Takes two arguments and checks if they are both true."
  },
  and(args) {
    return {
      type: "boolean",
      value:
        args[0].value == "true" && args[1].value == "true" ? "true" : "false"
    };
  },
  docor: {
    parameters: "a:bool|b:bool|...",
    returns: "bool",
    desc: "Returns true if any of the supplied arguments are true."
  },
  or(args) {
    let out = "false";

    for (let i = 0; i < args.length; i++) {
      if (args[i].value == "true") {
        out = "true";
      }
    }
    return {
      type: "boolean",
      value: out
    };
  },
  "doc>": {
    parameters: "a:num|b:num",
    returns: "bool",
    desc: "Returns true if a is greater than b."
  },
  ">"(args, env) {
    let types = env.checkTypes(args, ["number", "number"]);
    if (types.valid) {
      return {
        type: "boolean",
        value: args[0].value > args[1].value ? "true" : "false"
      };
    } else {
      env.error(
        1,
        `Incorrect type, expected ${types.expected} but got ${
          types.invalidType
        } instead`
      );
    }
  },
  "doc<": {
    parameters: "a:num|b:num",
    returns: "bool",
    desc: "Returns true if a is less than b."
  },
  "<"(args, env) {
    let types = env.checkTypes(args, ["number", "number"]);
    if (types.valid) {
      return {
        type: "boolean",
        value: args[0].value < args[1].value ? "true" : "false"
      };
    } else {
      env.error(
        1,
        `Incorrect type, expected ${types.expected} but got ${
          types.invalidType
        } instead`
      );
    }
  },
  "doc>=": {
    parameters: "a:num|b:num",
    returns: "bool",
    desc: "Returns true if a is greater than or equal to b."
  },
  ">="(args, env) {
    let types = env.checkTypes(args, ["number", "number"]);
    if (types.valid) {
      return {
        type: "boolean",
        value: args[0].value >= args[1].value ? "true" : "false"
      };
    } else {
      env.error(
        1,
        `Incorrect type, expected ${types.expected} but got ${
          types.invalidType
        } instead`
      );
    }
  },
  "doc<=": {
    parameters: "a:num|b:num",
    returns: "bool",
    desc: "Returns true if a is less than or equal to b."
  },
  "<="(args, env) {
    let types = env.checkTypes(args, ["number", "number"]);
    if (types.valid) {
      return {
        type: "boolean",
        value: args[0].value <= args[1].value ? "true" : "false"
      };
    } else {
      env.error(
        1,
        `Incorrect type, expected ${types.expected} but got ${
          types.invalidType
        } instead`
      );
    }
  }
};
