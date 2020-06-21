const ObjectID =require("mongodb").ObjectID
const cartCollection=require('../db').db().collection('cart')
const User=require('../models/User')
const Cart=require('../models/Cart')
exports.mustBeLoggedIn=function(req,res,next){
if (req.visitorId!=0){
  next()
}
else{
    req.flash("errors","You must be logged in to carry out that operation")
    req.session.save(function(){
      res.redirect("/")
    })
  }
}
exports.login=function(req,res){
  res.render('login')
}
exports.userlogin = function(req,res){
  let user=new User(req.body)
  user.login().then(async function(result){
  req.session.user={username:user.data.username,_id:user.data._id,token:result}
  let cart= await cartCollection.findOne({userId:ObjectID(user.data._id)},{$project:{_id:0,items:1,userId:0,totalCost:1,totalItems:1}})
  req.session.cart= cart ? new Cart(cart) : {}
   req.session.save(function(){
        res.redirect('/')
      })
  }).catch(function(e){
    req.flash('errors',e)
    req.session.save(function(){
      res.redirect('/')
    })
  })
}

exports.logout = function(req,res){
  if (req.session.cart.totalItems!=0){
let cart=new Cart(req.session.cart?req.session.cart:{})
cart.userId=ObjectID(req.visitorId)
cartCollection.findOneAndDelete({userId:ObjectID(req.visitorId)})
cartCollection.insertOne(cart).then(()=>{
  req.session.destroy(function(){
    res.redirect('/')
  })
}).catch(()=>{

})
}
else{
  cartCollection.findOneAndDelete({userId:ObjectID(req.visitorId)})
  req.session.destroy(function(){
    res.redirect('/')
  })
}
}
exports.register = function(req,res){
  let user=new User(req.body)
  user.register().then(() => {
    req.session.user={username:user.data.username,_id:user.data._id}
    req.session.save(function(){
      res.redirect('/')
    })
  }).catch((regErrors) => {
    regErrors.forEach(function(e){
      req.flash('regErrors',e)
    })
    req.session.save(function(){
      res.redirect('/')
    })
  })
}

exports.profile=function(req,res){
  res.render("profile",{title:"Profile"})
}