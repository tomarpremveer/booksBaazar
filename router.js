const userControllers=require("./controllers/userControllers")
const bookControllers =require("./controllers/bookControllers")
const router=require("express").Router()

router.get('/',userControllers.home)
router.get('/login',userControllers.login)
router.get('/logout',userControllers.logout)
router.post('/userlogin',userControllers.userlogin)
router.post('/register',userControllers.register)

//book routes

router.get('/books',bookControllers.listBooks)

module.exports =router
