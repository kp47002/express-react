const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
var cookieParser = require("cookie-parser");

var app = express();
//app.use(cors());

let whitelist = ["http://localhost:3000"];
let corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
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

app.get("/", function(req, res) {
  console.log("get");
  console.log("Cookies: ", req.cookies);
  connection.query("SELECT * FROM user", (err, data) => {
    err ? res.send(err) : res.json({ user: data });
  });
});

app.post("/data", function(req, res) {
  console.log("req.body");
  console.log(req.body);
  console.log("Cookies: ", req.cookies);
  var username = req.body.name;
  connection.query(
    "INSERT INTO `user` (username) VALUES (?)",
    username.toString(),
    function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    }
  );
  res.send(username);
});

app.post("/register", function(req, res) {
  console.log("req.body");
  console.log(req.body);
  console.log("Cookies: ", req.cookies);
  let response = { status: "", message: "" };

  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let mysqlquery =
    "INSERT INTO `user` (username, email, password) VALUES (" +
    mysql.escape(username) +
    ", " +
    mysql.escape(email) +
    ", " +
    mysql.escape(password) +
    ")";
  //console.log("query: " + mysqlquery);
  connection.query(mysqlquery, function(err, result) {
    if (err) {
      response.status = "error";
      response.message = err.message;
    } else {
      response.status = "ok";
      response.message = "User successfully registered";
      console.log("User successfully registered");
    }
    console.log("Response: " + response);
    res.send(response);
  });
});

app.post("/login", function(req, res) {
  console.log("req.body");
  console.log(req.body);
  console.log("Cookies: ", req.cookies);
  let response = { status: "", message: "" };

  let username = req.body.username;
  //let email = req.body.email;
  let password = req.body.password;
  let mysqlquery =
    "SELECT COUNT(*) AS count FROM `user` WHERE username = " +
    mysql.escape(username) +
    "AND password =  " +
    mysql.escape(password);
  console.log("query: " + mysqlquery);
  connection.query(mysqlquery, function(err, result) {
    console.log(result[0].count);
    if (err) {
      response.status = "error";
      response.message = err.message;
    } else if (result[0].count == 0) {
      response.status = "error";
      response.message = "Incorrect login";
      console.log("Incorrect login");
    } else {
      response.status = "ok";
      response.message = "User successfully registered";
      console.log("User successfully registered");
    }
    console.log("Response: " + response);
    res.send(response);
  });
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
    "UPDATE `user` SET username = " +
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
