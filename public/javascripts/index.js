function addItem(e){
    let parentE=e.parentElement.parentElement.parentElement;
       let pelements=parentE.querySelectorAll("p")
        let idele=pelements[0].innerText
        let nameAuthor=pelements[1].innerText
        let ownerId=pelements[2].innerText
        let price=parentE.querySelector("#price").innerText
        let data={
            id:idele,
            nameAuthor:nameAuthor,
            ownerId:ownerId,
            price:Number(price.split(' ')[1])
        }
        const config={
    method:'POST',
    headers:{
        'Content-type':'application/json'
    },
    body:JSON.stringify(data)
}
fetch('/add/item',config).then((result)=>{
    let countBadgeHeader=document.getElementById("countBadgeHeader")
    countBadgeHeader.innerHTML=Number(countBadgeHeader.innerHTML)+1
}).catch((err)=>{
    console.log(err)
})
}


function deleteItem(e){
    let itemId=e.getAttribute('data-id');
    console.log(itemId);
    data={ 
        itemId:itemId
    }
    const config={
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }
    fetch('/delete/item',config).then((result)=>{
        let countBadgeHeader=document.getElementById("countBadgeHeader")
        let aboveCartCountBadge=document.getElementById("aboveCartCountBadge")
        let totalCost=document.getElementById("totalCost")
        countBadgeHeader.innerHTML-=1
        aboveCartCountBadge.innerHTML-=1
        let parentElement=e.parentElement
        let itemPrice=parentElement.querySelector("#itemPrice").innerHTML.split(' ')[1]
       totalCost.innerHTML=Number(totalCost.innerHTML)-itemPrice
       parentElement.remove()

    }).catch((err)=>{
        console.log(err)
    })
}
function insertBook(e){
    let bookName=document.getElementById("bookName")
    let authorName=document.getElementById("authorName")
    let imageName=document.getElementById("imageName")
    let price=document.getElementById("price")
    alert("this function called")
}

function placeOrder(e){
    let firstName=document.getElementById("firstName").value
    let lastName=document.getElementById("lastName").value
    let address=document.getElementById("address").value
    let selectCountry=document.getElementById("country")
    let country = selectCountry.options[selectCountry.selectedIndex].value;
    let selectState=document.getElementById("state")
    let state = selectState.options[selectState.selectedIndex].value;
    let rent=document.getElementById("rent").checked
    data={
        firstName,
        lastName,
        address,
        country,
        state,
        rent
    }
    const config={
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:JSON.stringify(data)
    }
    fetch('/carryCheckout',config).then((result)=>{
        console.log(result)
    }).catch((err)=>{
        console.log(err)
    })
}