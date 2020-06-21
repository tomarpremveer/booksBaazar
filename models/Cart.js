const bookCollection=require('../db').db().collection('books')
const ObjectID =require("mongodb").ObjectID

let Cart=function(cart){
    this.items= cart.items || {}
    this.totalItems=cart.totalItems || 0
    this.totalCost=cart.totalCost || 0
}

Cart.prototype.addItem=function(id,item){
    this.items[id]=item
    this.totalItems+=1
    this.totalCost+=item.price
}

Cart.prototype.getItem=function(){
    return this.items ? this.items: {}
}

Cart.prototype.removeItem=function(id){
    let cost=this.items[id].price
    let temp=this.items[id]
    delete this.items[id]
    this.totalItems-=1
    this.totalCost-=cost
    return temp
}

module.exports=Cart