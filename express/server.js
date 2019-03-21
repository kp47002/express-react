const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "storedb"
});

connection.connect(err => {
  err ? console.log(err) : console.log(connection);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

app.post("/data", function(req, res) {
  console.log(req.body);
  var username = req.body.name;
  connection.query(
    "INSERT INTO `user` (name) VALUES (?)",
    username.toString(),
    function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
  res.send(username);
});

app.post("/delete", function(req, res) {
  console.log(req.body.id);
  var id = req.body.id;

  connection.query("DELETE FROM `user` WHERE id = (?);", id, function(
    err,
    result
  ) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  res.send("id");
});

app.post("/edit", function(req, res) {
  console.log(req.body.id);
  var id = req.body.id;
  var username = req.body.name;
  connection.query(
    "UPDATE `user` SET name = " +
      mysql.escape(username) +
      " WHERE id = " +
      mysql.escape(id) +
      ";",

    function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
  res.send("id");
});
