console.log("Server start file is running!");

// import app from server.js file
// because all server config happens in that file

const { app } = require("./server.js");

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
