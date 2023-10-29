console.log("moviePage.js loaded")

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const singleMovieUrl = allMoviesUrl+"/"+id

const singleProductHook = document.querySelector(".singleProduct")
const similarMoviesSectionHook = document.querySelector(".similarMoviesSection")

function loadProductInfo(item,place){
    if(!item.images[1]){
        item.images[1]=""
    }
    place.innerHTML=
    `<img class="grid7" src="${item.images[1].src}" alt="${item.images[1].alt}">
    <img src="${item.images[0].src}" class="imageReduce grid1" alt="${item.images[0].alt}"> 
    <div class="grid2 flexColumn alignColumn">
        <button id="play-button" class="greyCta" disabled="true">Play movie</button>
        <button id="buy-button" class="cta hoverCta">Buy movie</button>
        <button id="trailer-button" class="cta hoverCta">See trailer</button>
    </div>               
    <section class="grid4 noMarginGroup textLines">
        <h6> Title </h6><h4>${item.name}</h4>
        <h6> Genre </h6><h4>${item.genre}</h4>
        <h6> Released </h6><h4>${item.released}</h4>
        </section>
    <section class="grid5">
        <h1>${item.name}</h1>
        <p class=" grid5">${item.description}</p> 
    </section>
    </section>
    `
    
    const buyButton = document.querySelector("#buy-button")
    document.querySelector("#play-button").addEventListener("click",()=>console.log("play movie"))
    
    document.querySelector("#trailer-button").addEventListener("click",()=>console.log("play trailer"))
    function updateAddToCart(){
        if(inCart(item.name)){
            buyButton.disabled=true
            buyButton.innerHTML="In cart"
            buyButton.classList.add("greyCta")
        }else{
            buyButton.addEventListener("click",function (){
                addToCart(item.name);
                updateAddToCart();
            })
        }
    }
    updateAddToCart()
}

//loadApi(allMoviesUrl,addProducts,productDisplay,10,addUrllInfo());
loadApi(addProducts,productDisplay,4,addUrllInfo());
loadApi(loadProductInfo,singleProductHook,0,[ "", 1,"/"+id])