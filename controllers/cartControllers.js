const Cart = require("../models/Cart");
const Book = require("../models/Book");
exports.add = function (req, res) {
  data = {
    name: req.body.nameAuthor,
    price: req.body.price,
    ownerId: req.body.ownerId,
  };
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.addItem(req.body.id, data);
  req.session.cart = cart;
  req.session.save();
  res.send("success");
};

exports.delete = function (req, res) {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  let returnedItem = cart.removeItem(req.body.itemId);
  req.session.cart = cart;
  req.session.save();
  res.send(returnedItem);
};
exports.checkout = function (req, res, next) {
  res.render("checkout", { title: "CheckOut" });
};

exports.rent = function (req, res) {
  let cart = new Cart(req.session.cart ? req.session.cart : {});
  console.log(req.body)
  cart
    .rent(req.session.user._id,req.body)
    .then((data) => {
      cart=new Cart({})
      req.session.cart=cart;
      req.session.save()
      req.flash("success", "Order successfully Placed");
      req.session.save(function () {
        res.redirect("/");
      });
    })
    .catch((err) => {
      req.flash("errors", "Some Error occured.Try again later");
      req.session.save(function () {
        res.redirect("/");
      });
    });
};
