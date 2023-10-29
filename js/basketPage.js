const cartVisualContent=document.querySelector(".cartVisualContent")
const cartTextContent=document.querySelector(".cartContent")

function cartEdit(item){
    removeFromCart(item)
    loadApi(addBasketImages,cartVisualContent);
}

function addBasketImages(item){
    cartTextContent.innerHTML=""
    cartVisualContent.innerHTML=""
    cartString=JSON.parse(localStorage.getItem('cart'))
    cartVisualContent.innerHTML=""
    if(!cartString || cartString.length===0){
        cartString=[]
        cartVisualContent.innerHTML="Basket is empty"
        cartTextContent.innerHTML=""
    }else{
        let totalCost = 0
        for(let x = 0; x<cartString.length; x++){
            for(let i = 0; i<item.length;i++){
                if(cartString[x]===item[i].name){
                    cartVisualContent.innerHTML+=`
                    <div>
                        <a href="movie.html?id=${item[i].id}">    
                            <img src="${item[i].images[0].src}"
                        </a>
                    </div>`
                    cartTextContent.innerHTML+=`
                        <div class="cartTextLine flexRow">
                            <div class="textLine">${item[i].name}</div>
                            <div class="noWrap">${item[i].prices.price} kr</div>
                            <button class="delete-button" onclick="cartEdit('${item[i].name}')"></button>
                        </div>`
                    totalCost+=Number(item[i].prices.price)
                    
                    
                }
            }
        }
        cartTextContent.innerHTML+=`
            <div class="flexRow totalLine">
                <div class="textLine">Total cost</div>
                <div class="noWrap">${totalCost} kr</div>
            </div>`
    }
}

loadApi(addBasketImages,addBasketImages);