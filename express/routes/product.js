const mysql = require("mysql");

module.exports = function(app, connection) {
  app.post("/product/create", function(req, res) {
    console.log("req.body");
    console.log(req.body);
    console.log("Cookies: ", req.cookies);
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let fk_user = req.body.fk_user;

    fk_user = 1;

    let mysqlquery =
      "INSERT INTO `product` (name, description, price, fk_user) VALUES (" +
      mysql.escape(name) +
      ", " +
      mysql.escape(description) +
      ", " +
      mysql.escape(price) +
      ", " +
      mysql.escape(fk_user) +
      ")";
    connection.query(mysqlquery, function(err, result) {
      err ? res.send(err) : res.json({ products: data });
    });
  });

  app.get("/product/:productId?", function(req, res) {
    //console.log(req);
    console.log(req.params.productId);
    console.log("product req");
    let mysqlquery =
      "SELECT p.name, p.description, p.price, u.username FROM `product` p INNER JOIN  `user` u ON p.fk_user = u.id";
    if (req.params.productId) {
      let where = " WHERE p.id_product = " + req.params.productId;
      mysqlquery += where;
      console.log("mysqlquery: " + mysqlquery);
    }
    connection.query(mysqlquery, (err, data) => {
      console.log("data: " + data);
      err ? res.send(err) : res.json({ products: data });
    });
  });
};
