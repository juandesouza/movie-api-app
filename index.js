const express = require("express");
const app = express();
const request = require("request");

app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/results", (req, res) => {
  const query = req.query.search;

  request(
    `http://www.omdbapi.com/?s=${query}&apikey=thewdb`,
    (err, response, body) => {
      if (!err && response.statusCode == 200) {
        const data = JSON.parse(body);
        res.render("results", { data: data });
      }
    }
  );
});

app.get("/", (req, res) => {
  res.render("search");
});

const port = process.env.PORT || 5000;

app.listen(port, process.env.IP, () => {
  console.log("Server started");
});
