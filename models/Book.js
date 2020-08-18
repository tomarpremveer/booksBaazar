const bookCollection = require("../db").db().collection("books");
const ObjectID = require("mongodb").ObjectID;
let Book = function (data, ownerId) {
  this.data = data;
  this.hit = 0;
  this.ownerId = ownerId;
  this.errors = [];
};
Book.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") {
    this.data.username = "";
  }
  this.data = {
    name: this.data.name.trim().toLowerCase(),
    price: this.data.price,
    author: this.data.author,
    imageUrl: this.data.imageUrl,
    postedDate: this.data.postedDate,
    hit: this.hit,
    type: this.data.type,
    ownerId: ObjectID(this.ownerId),
  };
};

Book.prototype.insert = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp();
    bookCollection
      .insertOne(this.data)
      .then((info) => {
        resolve(info.ops[0]._id);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
Book.listAll = function (userId) {
  return new Promise(async (resolve, reject) => {
    if (userId == 0) {
      let items = await bookCollection.find().sort({ hit: -1 }).toArray();
      if (items.length > 0) resolve(items);
      else resolve([]);
    } else {
      let items = await bookCollection
        .find({ ownerId: ObjectID(userId) })
        .sort({ hit: -1 })
        .toArray();
      if (items.length > 0) resolve(items);
      else resolve([]);
    }
  });
};
Book.orders=function(userId){
return new Promise(async (resolve,reject)=>{
  let items = await bookCollection.find({ownerId:userId}).sort().toArray();
  if (items.length > 0) resolve(items);
  else resolve([]); 
})
}
Book.viewbook = function (id, visitorId) {
  return new Promise(async (resolve, reject) => {
    let book = await bookCollection.findOne({ _id: ObjectID(id) });
    if (book == null) reject("No such book exists");
    else {
      if (book.ownerId != visitorId) {
        await bookCollection.findOneAndUpdate(
          { _id: ObjectID(id) },
          { $inc: { hit: 1 } }
        );
      }
      resolve(book);
    }
  });
};
Book.filteredBooks = function (filterText) {
  return new Promise(async (resolve, reject) => {
    if (filterText === "all") {
      console.log("this block called");
      Book.listAll(0)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    }
    let books = await bookCollection.find({ type: `${filterText}` }).toArray();
    //console.log(books)
    if (books.length < 1 ) {
      reject("No books by this filter.Try differnt filter");
    } else {
      resolve(books);
    }
  });
};

module.exports = Book;
