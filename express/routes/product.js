const mysql = require("mysql");

module.exports = function(app, connection) {
  app.post("/product/create", function(req, res) {
    console.log("/product/create body");
    console.log(req.body);
    console.log("Cookies: ", req.cookies);
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let username = req.body.username;

    let mysqlquery =
      "INSERT INTO `product` (name, description, price, fk_user) VALUES (" +
      mysql.escape(name) +
      ", " +
      mysql.escape(description) +
      ", " +
      mysql.escape(price) +
      ", " +
      "(SELECT id FROM `user` WHERE username = " +
      mysql.escape(username) +
      ") )";
    console.log(mysqlquery);
    connection.query(mysqlquery, function(err, result) {
      err ? res.send(err) : res.json({ status: "ok" });
    });
  });

  app.post("/product/buy", function(req, res) {
    console.log("/product/create body");
    console.log(req.body);
    console.log("Cookies: ", req.cookies);
    let id_product = req.body.id_product;

    let username = req.body.username;

    let mysqlquery =
      "UPDATE  `product` SET fk_user =  (SELECT id FROM `user` WHERE username = " +
      mysql.escape(username) +
      ") WHERE id_product = " +
      mysql.escape(id_product) +
      ";";
    console.log(mysqlquery);
    connection.query(mysqlquery, function(err, result) {
      err ? res.send(err) : res.json({ status: "ok" });
    });
  });

  app.get("/product/:productId?", function(req, res) {
    //console.log(req);
    console.log(req.params.productId);
    console.log("product req");
    let mysqlquery =
      "SELECT p.id_product, p.name, p.description, p.price, u.username, u2.username AS buyer FROM `product` p INNER JOIN  `user` u ON p.fk_user = u.id LEFT JOIN  `user` u2 ON p.fk_buyer = u2.id";
    console.log("mysqlquery: " + mysqlquery);
    if (req.params.productId) {
      let where = " WHERE p.id_product = " + req.params.productId;
      mysqlquery += where;
    }
    connection.query(mysqlquery, (err, data) => {
      console.log("data: " + data);
      err ? res.send(err) : res.json({ products: data });
    });
  });
};
