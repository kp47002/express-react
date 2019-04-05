const mysql = require("mysql");

module.exports = function(app, connection) {
  /*app.get("/", function(req, res) {
  console.log("get");
  console.log("Cookies: ", req.cookies);
  connection.query("SELECT * FROM user", (err, data) => {
    err ? res.send(err) : res.json({ user: data });
  });
});*/
  /*
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
});*/
};
