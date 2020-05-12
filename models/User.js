const userCollection=require('../db').db().collection('users')
const bcrypt=require("bcryptjs")
let User =function(data){
  this.data=data
  this.errors=[]
}

User.prototype.cleanUp=function(){
  if(typeof(this.data.username) !="string"){ this.data.username=""}
  if(typeof(this.data.email) !="string"){ this.data.email=""}
  if(typeof(this.data.password) !="string"){ this.data.password=""}
  this.data={
    username:this.data.username.trim().toLowerCase(),
    email:this.data.email.trim().toLowerCase(),
    password:this.data.password
  }
}
User.prototype.validate=function(){
  return new Promise(async (resolve,reject )=> {
  if(this.data.username==""){this.errors.push("You must provide a username")}
  if(!validator.isEmail(this.data.email)){this.errors.push("You must provide a email")}
  if(this.data.password==""){this.errors.push("You must provide a password")}
  if(this.data.password.length > 0 && this.data.password.length <12 ){this.errors.push("Password should be atleaset 12 characters long")}

  // only if username is valid then
  if(this.data.username.length > 2 && this.data.username.length < 31 && validator.isAlphanumeric(this.data.username)){
    let usernameExists = await userCollection.findOne({username:this.data.username})
    if(usernameExists) {(this.errors.push("This username exists")) }
  }
  // only if email is valid then
  if(validator.isEmail(this.data.email)){
    let emailExists = await userCollection.findOne({email:this.data.email})
    if(emailExists) {(this.errors.push("This email exists")) }
  }
  resolve()
})
}
User.prototype.login=function(){
  return new Promise((resolve,reject)=> {
    this.cleanUp()
    userCollection.findOne({username:this.data.username}).then((attemptedUser) => {
      if(attemptedUser && bcrypt.compareSync(this.data.password,attemptedUser.password)) {       this.data=attemptedUser
        resolve("Congrats")
      }
      else{
        reject("Invalid username and password")
      }
    }).catch(()=> reject("Error occured"))
  })
  }
  User.prototype.register= function (){
    return new Promise(async (resolve,reject) => {
  
      this.cleanUp()
    await this.validate()
  
    if(!this.errors.length){
      let salt=bcrypt.genSaltSync(10)
      this.data.password=bcrypt.hashSync(this.data.password,salt)
      userCollection.insertOne(this.data)
      resolve()
    }
    else{
      reject(this.errors)
    }
    })
  }
  

module.exports =User
