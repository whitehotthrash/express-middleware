// this file is configuring the express server
// any routes, middleware, settings belong here

const express = require("express");
const {
  middlewareThatEndsEarly,
  exampleMiddleware,
  otherExample,
  doCrazierMath,
  doCrazyMath,
} = require("./middleware/exampleMiddleware");
const { body, validationResult } = require("express-validator");
const app = express();

// app.use is syntax for middleware
//"on every route, do this"
app.use(express.json());

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
  "/middlewareExample",
  (request, response, next) => {
    (console.log("middleware activated!"), next());
  },
  exampleMiddleware,
  otherExample,
  //middlewareThatEndsEarly,
  //doCrazyMath,
  doCrazierMath,

  (request, response) => {
    response.json({
      message: "Middleware route has completed!",
    });
  },
);

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

// POST http://localhost:3000/users/register
// body data = {email, password}
// do not save username and password as query strings
app.post(
  "/users/register",
  // validate incoming email address
  // use packages for this
  body('email').isEmail().normalizeEmail(),
  // validate incoming password
  // create user in DB
  // create JWTs
  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()){
      console.log(errors);
      return next(new Error(JSON.stringify(errors)));
    }

    console.log(request.body.email)
    response.json({
      message: "Successful user registration happened here! Believe us!",
      data: request.user,
    });
  },
);

app.use((error, request, response, next) => {
  // check request.body.errors for any errors
  
  if (request.body.errors || error.toString()){
    console.log("Errors occurred!")
  }
  // send the errors to your company's logging/analytics platform
  // send a request to a fallback server to warm it up

  // send request.body.errors as a response
  response.json({
    errors: request.body.errors || error.message
  })
});

module.exports = {
  app,
};
