const mysql = require("mysql");

module.exports = function(app, connection) {
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

  //other routes..
};
