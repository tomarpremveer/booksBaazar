const express = require('express')
const jwt=require('jsonwebtoken')
const Cart=require('./models/Cart')
const session = require("express-session")
const mongoStore=require("connect-mongo")(session)
const flash =require("connect-flash")
const markdown=require("marked")
const sanitizeHtml=require("sanitize-html")
const router =require('./router')
const cookieParser=require('cookie-parser');
const app=express()
let sessionOptions=session({
  secret: "Javascript is so cool",
  store:new mongoStore({client:require('./db')}),
  resave : false,
  saveUninitialized: false,
  cookie : {maxAge: 1000*60*60*24 ,httpOnly: true}
})
app.use(sessionOptions)
app.use(flash())
app.use(cookieParser())

app.use(function(req,res,next){
//   //make our markdown function available from ejs template

//   res.locals.filterUserHtml=function(content){
//     return sanitizeHtml(markdown(content),{allowedTags:['h1','h2'],allowedAtt
//   :{}})
//   }
if (req.session.cart){
  cart=new Cart(req.session.cart)
  res.locals.countItems=req.session.cart.totalItems;
}
else{
  cart=new Cart({})
  res.locals.countItems=0
}
  res.locals.errors=req.flash("errors")
  res.locals.success=req.flash("sucess")
  if(req.session.user){
   req.visitorId=req.session.user._id
   req.token=req.session.user.token
  }
  else{
    req.visitorId =0
  }
  //make user session data availabel from within the template
  res.locals.user=req.session.user
  next()
})
// app.use(function(req,res,next){
//   jwt.verify(req.token,'aprivatekey',(err,token)=>{
//     if(err)
//       req.flash("errors","You aren't allowed to access this url")
//   else
//   next()
// })
//  console.log("req"+req.originalUrl)
// next()
// })
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'))
app.set('views','views')
app.set('view engine','ejs')

app.use('/',router)
module.exports=app
