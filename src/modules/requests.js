

export default {
  "doc+": {
    parameters: "a:number b:number",
    returns: "number",
    desc: "Adds one number to another."
  },
  "reqget": args => {
    var request = new XMLHttpRequest();
    request.open('GET', args[0].value, false);  // `false` makes the request synchronous
    request.send(null);
    return { type: "string", value: request.responseText };
  }
}