export default {
  docdecode: {
    parameters: "json:string",
    returns: "array",
    desc: "Decodes a JSON string into an array."
  },
  decode(args) {
    let o = JSON.parse(args[0].value);
    function convert(token) {
      if (typeof token == "string") {
        return { type: "string", value: token };
      } else if (typeof token == "number") {
        return { type: "number", value: token };
      } else if (typeof token == "boolean") {
        return { type: "boolean", value: token };
      } else if (token instanceof Array) {
        let elements = [];
        for (let i = 0; i < token.length; i++) {
          elements.push(convert(token[i]));
        }
        return { type: "array", value: elements };
      } else if (typeof token == "object") {
        let object = {};
        let keys = Object.keys(token);
        for (let i = 0; i < keys.length; i++) {
          object[keys[i]] = convert(token[keys[i]]);
        }
        return { type: "plist", value: object };
      }
    }
    return convert(o);
  }
};
