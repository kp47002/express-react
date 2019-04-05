const mysql = require("mysql");

module.exports = function(app, connection) {
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
};
