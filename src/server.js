// this file is configuring the express server
// any routes, middleware, settings belong here

const express = require("express");
const app = express();

// GET http://localhost:3000/
app.get("/", (request, response) => {
  response.json({
    message: "Success"
  })
})

module.exports = {
  app
}