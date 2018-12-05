

export default {
  "docreqget": {
    parameters: "url:str",
    returns: "string",
    desc: "Requests the url and returns the response."
  },
  "reqget": args => {
    var request = new XMLHttpRequest();
    request.open('GET', args[0].value, false);  // `false` makes the request synchronous
    request.send(null);
    return { type: "string", value: request.responseText };
  }
}