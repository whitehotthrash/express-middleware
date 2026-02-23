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

module.exports = {
    exampleMiddleware,
    otherExample,
    middlewareThatEndsEarly
}