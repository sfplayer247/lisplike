export default {
  docreqget: {
    parameters: "url:str",
    returns: "string",
    desc: "Sends a GET request to the url and returns the response."
  },
  reqget(args) {
    let request = new XMLHttpRequest();
    request.open("GET", args[0].value, false); // `false` makes the request synchronous
    request.send(null);
    return { type: "string", value: request.responseText };
  },
  docreqpost: {
    parameters: "url:str|content:str|headers:plist",
    returns: "string",
    desc:
      "Sends a POST request to the url and returns the response. Headers can be changed by supplying a property list."
  },
  reqpost(args) {
    let request = new XMLHttpRequest();
    request.open("POST", args[0].value, false); // `false` makes the request synchronous
    if (args.length == 3) {
      let keys = Object.keys(args[2].value);
      for (let i = 0; i < keys.length; i++) {
        request.setRequestHeader(keys[i], args[2].value[keys[i]].value);
      }
    }
    request.setRequestHeader("Content-Type", "application/json");
    request.send(args[1].value);
    return { type: "string", value: request.responseText };
  }
};
