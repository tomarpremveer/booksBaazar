const Book = require("../models/Book");
exports.home = function (req, res) {
  Book.listAll(0)
    .then((items) => {
      res.render("index", { title: "BooksBaZaar", items: items });
    })
    .catch((err) => {
      res.render("index", { title: "BooksBaZaar" });
    });
};
exports.listBooks = function (req, res) {
  Book.listAll(0)
    .then((items) => {
      res.render("bookList", { title: "List Books", items: items });
    })
    .catch((err) => {
      res.render("bookList", { title: "List Books" });
    });
};
exports.filteredBooks = function (req, res) {
  Book.filteredBooks(req.params.filter)
    .then((books) => {
      console.log("books are " + books);
      // res.render("index", {
      //   title: `${req.params.filter} books`,
      //   items:[]
      // });
      res.redirect('/');
    })
    .catch((err) => {
      console.log(err);
      req.flash("errors", err);
      req.session.save(function () {
        res.redirect("/books");
      });
    });
};
exports.rentout = function (req, res) {
  res.render("rentout", { title: "Rented out books" });
};

exports.orders = function (req, res) {
  Book.orders(req.session.user._id).then((books)=>{
    res.render("orders", { title: "Orders" ,items:books})
  }).catch((err)=>{
    console.log(err);
  })
  ;
};

exports.sell = function (req, res) {
  Book.listAll(req.visitorId)
    .then((items) => {
      res.render("sell", { title: "Sell", items: items });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewBook = function (req, res) {
  Book.viewbook(req.params.id, req.visitorId)
    .then((book) => {
      res.render("viewbook", { title: "View Book", item: book });
    })
    .catch((err) => {
      req.flash("errors", err);
      req.session.save(function () {
        res.redirect("/");
      });
    });
};

exports.insert = function (req, res) {
  data = {
    name: req.body.bookName,
    price: req.body.price,
    author: req.body.authorName,
    imageUrl: req.body.imageName,
    type: req.body.bookType,
    postedDate: new Date(),
  };
  let book = new Book(data, req.visitorId);
  book
    .insert()
    .then((id) => {
      req.flash("success", "Book inserted successfully");
      req.session.save(function () {
        res.redirect(`/view/book/${id}`);
      });
    })
    .catch((err) => {
      consol;
    });
};

exports.postAd = function (req, res) {
  res.render("postAd", { title: "Post an Ad" });
};
