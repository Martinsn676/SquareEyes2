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
        <button id="play-button" class="greyCta">Play movie</button>
        <button id="buy-button" class="darkCta hoverCta">Buy movie</button>
        <button id="trailer-button" class="darkCta hoverCta">See trailer</button>
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
    

    document.querySelector("#play-button").addEventListener("click",()=>console.log("play movie"))
    document.querySelector("#buy-button").addEventListener("click", function(){
        addToCart(item.title);
    });
    document.querySelector("#trailer-button").addEventListener("click",()=>console.log("play trailer"))
}

loadApi(allMoviesUrl,addProducts,similarMoviesSectionHook,5,["",7]);
loadApi(singleMovieUrl,loadProductInfo,singleProductHook)