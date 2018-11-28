import parse from "./parseCode.js";
import execute from "./executeAST.js";

// import default modules
import operators from "./modules/operators.js";
import comparison from "./modules/comparison.js";
import misc from "./modules/misc.js";
import strings from "./modules/strings.js";

export default class Enviroment {
  constructor() {
    this.parse = parse;
    this.execute = execute;
    this.output = "";
    // Symbol Look Up Table
    this.symLUT = {};

    // Import all base modules into the lookup table
    this.importModule(misc);
    this.importModule(operators);
    this.importModule(comparison);
    this.importModule(strings);
  }

  // Used for importing javascript modules into the lookup table
  importModule(object) {
    this.symLUT = Object.assign(this.symLUT, object);
  }

  run(code) {
    try {
      this.execute(this.parse(code), this);
      return this;
    } catch (e) {
      return this;
    }
  }

  checkTypes(args, parameters) {
    for (var i = 0; i < args.length; i++) {
      if (args[i].type != parameters[i]) {
        return {
          valid: false,
          invalidType: args[i].type,
          expected: parameters[i]
        };
      }
    }
    return { valid: true };
  }

  error(number, message) {
    this.output += `[error][lle:${number}] ${message}\n`;
    throw { type: "error", value: message, index: 2 };
  }
}
