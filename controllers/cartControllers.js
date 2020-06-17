const Cart=require('../models/Cart')
const Book=require('../models/Book')
exports.add=function(req,res){
    data={
      name:req.body.nameAuthor,
      price:req.body.price,
      id:req.body.id
    }
    let cart=new Cart(req.session.cart?req.session.cart:{})
    cart.addItem(data)
    req.session.cart=cart
    req.session.save()
}

exports.delete = function(req,res){
  delete req.session.cart.items[id]
}
exports.checkout=function(req,res){
    res.render("checkout",{title:"CheckOut",cart:new Cart(req.session.cart)})
  }

