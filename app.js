const express = require('express')
const session = require("express-session")
const mongoStore=require("connect-mongo")(session)
const flash =require("connect-flash")
const markdown=require("marked")
const sanitizeHtml=require("sanitize-html")
const router =require('./router')
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
app.use(function(req,res,next){
//   //make our markdown function available from ejs template

//   res.locals.filterUserHtml=function(content){
//     return sanitizeHtml(markdown(content),{allowedTags:['h1','h2'],allowedAtt
//   :{}})
//   }
//   res.locals.errors=req.flash("errors")
//   res.locals.success=req.flash("sucess")
  if(req.session.user){
   req.visitorId=req.session.user._id
  }
  else{
    req.visitorId =0
  }
  //make user session data availabel from within the template
  res.locals.user=req.session.user
  next()
})
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'))
app.set('views','views')
app.set('view engine','ejs')

app.use('/',router)
module.exports=app
