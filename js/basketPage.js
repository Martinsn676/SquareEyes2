const cartVisualContent=document.querySelector(".cartVisualContent")
const cartTextContent=document.querySelector(".cartContent")

function cartEdit(item){
    removeFromCart(item)
    loadApi(allMoviesUrl,addBasketImages,cartVisualContent);
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
                if(cartString[x]===item[i].title){
                    cartVisualContent.innerHTML+=`
                    <div>
                        <a href="movie.html?id=${item[i].id}">    
                            <img src="${item[i].image}"
                        </a>
                    </div>`
                    cartTextContent.innerHTML+=`
                        <div class="cartTextLine flexRow">
                            <div class="textLine">${item[i].title}</div>
                            <div class="noWrap">${item[i].price} kr</div>
                            <button class="delete-button" onclick="cartEdit('${item[i].title}')"></button>
                        </div>`
                    totalCost+=item[i].price
                }
            }
        }
        cartTextContent.innerHTML+=`
            <div class="flexRow totalLine">
                <div class="textLine">Total cost</div>
                <div class="noWrap">${totalCost.toFixed(2)} kr</div>
            </div>`
    }
}

loadApi(allMoviesUrl,addBasketImages,addBasketImages);