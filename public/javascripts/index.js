function cartMani(e){
    let parentE=e.parentElement.parentElement.parentElement;
       let pelements=parentE.querySelectorAll("p")
        let idele=pelements[0].innerText
        let nameAuthor=pelements[1].innerText
        let price=parentE.querySelector("#price").innerText
        let data={
            id:idele,
            nameAuthor:nameAuthor,
            price:Number(price.split(' ')[1])
        }
        axios.post('/add/item',data).then((success)=>{
            alert("added")
        }).catch((err)=>{
            console.log(err)
    })
}


// const config={
//     method:'POST',
//     headers:{
//         'Content-type':'application/json'
//     },
//     body:JSON.stringify(data)
// }
// fetch('/add',config).then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// })