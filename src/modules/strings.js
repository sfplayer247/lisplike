export default {
  docstartswith: {
    parameters: "source:string|s:string",
    returns: "bool",
    desc: "Checks if the source string starts with <span class='code'>s</span>."
  },
  startswith: args => {
    return {
      type: "boolean",
      value: args[0].value.startsWith(args[1].value) ? "true" : "false"
    };
  },
  docslice: {
    parameters: ["source:string|start:num", "source:string|start:num|end:num"],
    returns: "string",
    desc: "Returns a section of a string."
  },
  slice: (args, env) => {
    if (env.checkTypes(args, ["string", "number", "number"]).valid) {
      if (args.length == 3 && args[2].value <= args[0].value.length) {
        var sliced = args[0].value.slice(args[1].value, args[2].value);
      }
      // Out of bounds exception because end is greater than length
      else if (args.length == 3 && args[2].value > args[0].value.length) {
        env.error(
          2,
          "Out of bounds exception, end of slice cannot be greater than string length."
        );
        return {
          type: "error",
          value:
            "Out of bounds exception, end of slice cannot be greater than string length.",
          index: 2
        };
      } else {
        var sliced = args[0].value.slice(args[1].value);
      }
      return {
        type: "string",
        value: sliced
      };
    }
    // Invalid type exception
    else {
      var e = env.checkTypes(args, ["string", "number", "number"]);
      var eMessage = `Incorrect type, expected ${e.expected} but got ${
        e.invalidType
      } instead`;
      env.error(1, eMessage);
      return { type: "error", value: eMessage, index: 1 };
    }
  }
};
