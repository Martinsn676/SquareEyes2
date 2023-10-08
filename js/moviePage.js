const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const singleMovieUrl = allMoviesUrl+"/"+id

const singleProductHook = document.querySelector(".singleProduct")
const similarMoviesSectionHook = document.querySelector(".similarMoviesSection")

function loadProductInfo(item,place){
    place.innerHTML=
    `<img src="${item.image}" class="imageReduce grid1" alt="Cover of ${item.title}"> 
    <div class="grid2 flexColumn alignColumn">
        <button id="play-button" class="greyCta" disabled="true">Play movie</button>
        <button id="buy-button" class="cta hoverCta">Buy movie</button>
        <button id="trailer-button" class="cta hoverCta">See trailer</button>
    </div>               
    <section class="grid4 noMarginGroup textLines">
        <h6> Title </h6><h4>${item.title}</h4>
        <h6> Genre </h6><h4>${item.genre}</h4>
        <h6> Released </h6><h4>${item.released}</h4>
        </section>
    <section class="grid5">
        <h1>${item.title} - Description</h1>
        <p class=" grid5">${item.description}</p> 
    </section>
    </section>
    `
    
    const buyButton = document.querySelector("#buy-button")
    document.querySelector("#play-button").addEventListener("click",()=>console.log("play movie"))
    
    document.querySelector("#trailer-button").addEventListener("click",()=>console.log("play trailer"))
    function updateAddToCart(){
        if(inCart(item.title)){
            buyButton.disabled=true
            buyButton.innerHTML="In cart"
            buyButton.classList.add("greyCta")
        }else{
            buyButton.addEventListener("click",function (){
                addToCart(item.title);
                updateAddToCart();
            })
        }
    }
    updateAddToCart()
}

loadApi(allMoviesUrl,addProducts,similarMoviesSectionHook,4,["",7]);
loadApi(singleMovieUrl,loadProductInfo,singleProductHook)