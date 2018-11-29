export default {
  dockv: {
    parameters: "needs docs",
    returns: "void",
    desc: "Takes 1+ arguments of any type and appends them to the output."
  },
  plist: (args, env) => {
    var pl = {};
    for (var i = 0; i < args.length; i++) {
      pl[args[i].value[0].value] = args[i].value[1];
    }
    return { type: "plist", value: pl };
  }
};
