const bookCollection=require('../db').db().collection('books')
const orderCollection=require('../db').db().collection('orders')
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
Cart.prototype.rent=  function(borrowerId,borrowerAddress){
    return new Promise( async(resolve,reject)=>{
    let bookArray=[];
    for(let [key,value] of Object.entries(cart.items)){
        bookArray.push({
            bookId:ObjectID(key),
            ownerId:ObjectID(value.ownerId),
            borrowerId:ObjectID(borrowerId),
            bookName:value.name,
            status:borrowerAddress.rent,
            borrowerAddress:borrowerAddress
        })
    }
    orderCollection.insertMany(bookArray).then((data)=>{
        resolve(data);
    }).catch((err)=>{
        reject(err);
    });
}) 
}
module.exports=Cart