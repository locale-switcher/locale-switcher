const path = require("path");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", function (req, res) {
  res.render("pages/index", {
    acceptLanguage: req.headers["accept-language"] || "Not specified",
  });
});

app.listen(8080, function () {
  console.log("Server listening on port 8080...");
});
