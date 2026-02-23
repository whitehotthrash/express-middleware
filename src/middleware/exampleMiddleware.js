// THIS IS ANOTHER MIDDLEWARE METHOD

function exampleMiddleware(request, response, next) {
  console.log("middleware activated!");
  next();
}

const otherExample = (request, response, next) => {
  console.log("arrow function middleware");
  next();
}

function middlewareThatEndsEarly(request, response, next) {
  response.json({
    message: "Middleware has interrupted the usual route flow"
  })
}

function doCrazyMath(request, response, next) {
  let result = 1 + 1;
  // custom naming convention
  request.customData.crazyMathResult = result;
  
}

// data is shared via request and response variables
// all middleware functions are given those vars automatically
// so any data assigned to one is available in the next middleware in the chain
function doCrazierMath(request, response, next) {
  if (!request.customData) {
    request.customData = {}
  }
  let result = request.customData.crazyMathResult * 1000
  request.customData.crazierMathResult = result;
  next();
}

module.exports = {
    exampleMiddleware,
    otherExample,
    middlewareThatEndsEarly,
    doCrazyMath,
    doCrazierMath
}