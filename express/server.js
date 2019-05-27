const express = require("express");
const PORT = process.env.PORT || 3001;
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");
var cookieParser = require("cookie-parser");

var app = express();
const useCorsOptions = true;
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
if (useCorsOptions) {
  app.use(cors(corsOptions));
} else {
  app.use(cors());
}

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

require("./routes/login")(app, connection);
require("./routes/register")(app, connection);
require("./routes/product")(app, connection);
require("./routes/profileSold")(app, connection);
require("./routes/profileBought")(app, connection);

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
