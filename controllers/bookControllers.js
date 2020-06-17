const Book=require('../models/Book')
exports.home = function(req,res){
  Book.listAll().then((items)=>{
   res.render("index",{title:"BooksBaZaar",items:items})
  }).catch((err)=>{
    res.render("index",{title:"BooksBaZaar"})
  })
}
exports.listBooks =function(req,res){
  Book.listAll().then((items)=>{
   res.render("bookList",{title:"List Books",items:items})
  }).catch((err)=>{
    res.render("bookList",{title:"List Books"})
  })
}

exports.rentout=function(req,res){
  res.render("rentout",{title:"Rented out books"})
}

exports.orders=function(req,res){
  res.render("orders",{title:"Orders"})
}

exports.sell=function(req,res){
  res.render("sell",{title:"Sell"})
}



exports.viewBook=function(req,res){
  Book.viewbook(req.params.id,req.visitorId).then((book)=>{
    res.render("viewbook",{title:"View Book",item:book})
  }).catch((err)=>{
    req.flash("errors",err)
    req.session.save(function(){
      res.redirect('/')
    })
  })
}

exports.insert=function(req,res){
  data={
    name:"Php professional",
    price:"750",
    author:"Rick",
    imageUrl:"images/1.webp",
    postedDate:new Date()
  }
let book=new Book(data,req.visitorId)
book.insert().then((id)=>{
  res.redirect(`/view/book/${id}`)
}).catch((err)=>{
console.log(err)
})
}

exports.postAd=function(req,res){
  res.render("postAd",{title:"Post an Ad"})
}  