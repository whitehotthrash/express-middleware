// this file is configuring the express server
// any routes, middleware, settings belong here

const express = require("express");
const { middlewareThatEndsEarly, exampleMiddleware, otherExample } = require("./middleware/exampleMiddleware");
const app = express();

// GET http://localhost:3000/
app.get("/", (request, response) => {
  let result = exampleFunction();
  response.json({
    message: "Success",
    result: result,
  });
});

function exampleFunction() {
  return 9 + 18;
}

// route handler
// app.verb(path, function)
/*
  app.verb(
    path,
    function,
      next()
    function,
      next()
    function,
      response.json(some early exit of the route handler)
    function
      response.json but we never reach here, because the previous function responds instead
  )
*/


app.get(
  "/middlewareExample", (request, response, next) => {
    console.log("middleware activated!"),
    next();
  },
  exampleMiddleware,
  otherExample,
  middlewareThatEndsEarly,

  (request, response) => {
    response.json({
      message: "Middleware route has completed!"
    })
  }
)


// THIS IS ONE METHOD
// app.get(
//   "/middlewareExample",
//   // This is a middleware function!
//   // It is middleware because it can call next()
//   (request, response, next) => {
//     console.log("middleware activated!");
//     next();
//   },
//   // This is the final callback in the chain,
//   // because it does NOT have the ability to call next().
//   (request, response) => {
//     response.json({
//       message: "Middleware route has completed!",
//     });
//   },
// );

/*
app.verb(
"/login", 
checkUsername(), 
checkPassword(), 
generateJwt(), 
emailUser(),
(request, response) => {
    response.json({
      jwt: request.customDataResult.jwt  
    })
  }
);
*/

module.exports = {
  app,
};
