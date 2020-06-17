const userControllers=require("./controllers/userControllers")
const bookControllers =require("./controllers/bookControllers")
const cartControllers=require("./controllers/cartControllers")
const router=require("express").Router()

router.get('/',bookControllers.home)
router.get('/profile',userControllers.mustBeLoggedIn,userControllers.profile)
router.get('/login',userControllers.login)
router.get('/logout',userControllers.logout)
router.post('/userlogin',userControllers.userlogin)
router.post('/register',userControllers.register)

//book routes

router.get('/books',bookControllers.listBooks)
router.get('/insert',userControllers.mustBeLoggedIn,bookControllers.insert)
router.get('/view/book/:id',bookControllers.viewBook)
router.get('/orders',userControllers.mustBeLoggedIn,bookControllers.orders)
router.get('/rentout',bookControllers.rentout)
router.get('/sell',userControllers.mustBeLoggedIn,bookControllers.sell)
router.get('/postad',bookControllers.postAd)

//Cart routes
router.post('/add/item',cartControllers.add)
router.post('/delete/item',cartControllers.delete)
router.get('/checkout',userControllers.mustBeLoggedIn,cartControllers.checkout)
module.exports =router
