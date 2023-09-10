const cartVisualContent=document.querySelector(".cartVisualContent")

function addBasketImages(item,place){
    cartString=JSON.parse(localStorage.getItem('cart'))
    cartVisualContent.innerHTML=""
    console.log(cartString)
    if(!cartString || cartString.length===0){
        cartString=[]
        place.innerHTML="Basket is empty"
    }else{
        for(let x = 0; x<cartString.length; x++){
            for(let i = 0; i<item.length;i++){
                if(cartString[x]===item[i].title){
                    place.innerHTML+=
                    `<div>
                        <a href="singleProductPage.html?id=${item[i].id}">    
                            <img src="${item[i].image}"
                        </a>
                    </div>`
                }
        }
    }
    }
}
loadApi(allMoviesUrl,addBasketImages,cartVisualContent);
updateCart()