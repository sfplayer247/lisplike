export default {
  "doc-": {
    parameters: "a:number b:number",
    returns: "number",
    desc: "Subtracts a number from b."
  },
  "-": (args, env) => {
    if (args[0].type == "number" && args[1].type == "number") {
      return { type: "number", value: args[0].value - args[1].value };
    } else {
      var eMessage =
        "Incorrect type provided, expected number but got " +
        (args[0].type == "number" ? args[1].type : args[0].type) +
        " instead.";
      env.error(1, eMessage);
      return { type: "error", value: { index: 1, message: eMessage } };
    }
  },
  "doc+": {
    parameters: "a:number b:number",
    returns: "number",
    desc: "Adds one number to another."
  },
  "+": args => {
    return { type: "number", value: args[0].value + args[1].value };
  },
  "doc+=": {
    parameters: "a:symbol b:number",
    returns: "number",
    desc:
      "Increments the value of variable <span class='code'>a</span> by <span class='code'>b</span>."
  },
  "+=": (args, env) => {
    env.symLUT[args[0].ref].value += args[1].value;
  },
  "doc*": {
    parameters: "a:number b:number",
    returns: "number",
    desc: "Multiplies a by b."
  },
  "*": args => {
    return { type: "number", value: args[0].value * args[1].value };
  },
  "doc/": {
    parameters: "a:number b:number",
    returns: "number",
    desc: "Divides a by b."
  },
  "/": args => {
    return { type: "number", value: args[0].value / args[1].value };
  },
  "doc**": {
    parameters: ["base:number power:number", "base:number"],
    returns: "number",
    desc:
      "Returns the base to the power of <span class='code'>power</span>. If the <span class='code'>power</span> is not given then it defaults to 2."
  },
  "**": args => {
    return {
      type: "number",
      value: Math.pow(args[0].value, args.length == 2 ? args[1].value : 2)
    };
  }
};
