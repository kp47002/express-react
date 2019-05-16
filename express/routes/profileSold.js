const mysql = require("mysql");

module.exports = function(app, connection) {
  app.get("/profile/sales/:username", function(req, res) {
    console.log("get");
    console.log("Cookies: ", req.cookies);
    let username = req.params.username;
    let mysqlquery =
      "SELECT p.id_product, p.name, p.description, p.price, u.username, u2.username AS buyer FROM `product` p INNER JOIN  `user` u ON p.fk_user = u.id LEFT JOIN  `user` u2 ON p.fk_buyer = u2.id WHERE fk_user =   (SELECT id FROM `user` WHERE username = " +
      mysql.escape(username) +
      ")";
    console.log(username);
    connection.query(mysqlquery, (err, data) => {
      err ? res.send(err) : res.json({ sales: data });
    });
  });
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
