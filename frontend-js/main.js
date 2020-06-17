let cartButtons=document.querySelectorAll("#cart-button")
for (let i=0;i<cartButtons.length;i++){
cartButtons[i].addEventListener('click',function(e){
        let divElement=document.getElementById("parentDiv")
       let pelements=divElement.querySelectorAll("p")
        let idele=pelements[0].innerHTML
        let nameAuthor=pelements[1].innerHTML
        let price=document.getElementById("price").innerHTML
        let data={
            id:idele,
            nameAuthor:nameAuthor,
            price:price
        }
        axios.post('/add',data).then((success)=>{
            console.log(success)
        }).catch((err)=>{
            console.log(errr)
        })
    })
}