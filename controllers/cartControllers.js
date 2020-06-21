const Cart=require('../models/Cart')
const Book=require('../models/Book')
exports.add=function(req,res){
    data={
      name:req.body.nameAuthor,
      price:req.body.price,
    }
    let cart=new Cart(req.session.cart?req.session.cart:{})
    cart.addItem(req.body.id,data)
    req.session.cart=cart
    req.session.save()
    res.send("success")
}

exports.delete = function(req,res){
  let cart=new Cart(req.session.cart?req.session.cart:{})
  let returnedItem=cart.removeItem(req.body.itemId)
  req.session.cart=cart
  req.session.save()
  res.send(returnedItem)
}
exports.checkout=function(req,res,next){
   res.render("checkout",{title:"CheckOut"})
  }

