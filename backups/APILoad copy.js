const allMoviesUrl="https://api.noroff.dev/api/v1/square-eyes"
const productDisplay=document.querySelector(".product-display")

async function loadApi(url,doFunction,place,prevCount,prevSearch){

    try{
        const result = await fetch(url)
        const json = await result.json()
        const data = await json;
        doFunction(data,place,prevCount,prevSearch)
    }catch(err){
        console.log(err)
    }
}

function loadProductInfo(item,place){
    place.innerHTML=
    `<img src="${item.image}" class="imageReduce grid1" alt="Cover of ${item.title}"> 
    <div class="grid2 flexColumn alignColumn">
        <a href="#" class="greyCta">Play movie</a>
        <button id="buy-button" class="cta hoverCta">Buy movie</button>
        <a href="#" class="cta hoverCta">See trailer</a>
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
    const buyButton = document.querySelector("#buy-button");
    buyButton.addEventListener("click",()=>addToCart(id))
}

function addProducts(item,place,prevCount,prevSearch){
   
    let searching = false
    let hideNext = false
    let repeatText=""
    let count=0;
    let repeatCount=Math.floor(prevCount/12)+1
    const moviesPerPage=8
    const moviesTotal=36
    
    let totalSearched=prevCount
    console.log(prevCount)
    if(prevSearch.trim().length>0){
        searching=true;
        
    }
    console.log("new load")
    place.innerHTML=""
    for(let i = prevCount; i<moviesTotal; i++){
        
        if(i>11){
            i-=12*Math.floor(i/11)
            repeatCount++
            repeatText=" "+repeatCount
        }
        if(count>moviesPerPage-1){
            break;
        }
        if(repeatCount>3){
            hideNext=true
            break;
        }
        if(prevCount+count===moviesTotal){
            hideNext=true
            break;
        }

        
        if(item[i].title.toLowerCase().startsWith(prevSearch.trim().toLowerCase())){
            count++
            place.innerHTML+=
            `<div>
                <a href="singleProductPage.html?id=${item[i].id}">
                    <image src="${item[i].image}"> 
                    <h3>${item[i].title+repeatText}</h3>
                </a>
            </div>`
        }
        totalSearched++ 
        console.log(totalSearched)       
    }
    if(searching){
        resultText=`Showing search results ${prevCount+1}-${prevCount+count} for "${prevSearch}" `
       
    }else{
        resultText=`Showing ${prevCount+1}-${prevCount+count} movies of ${moviesTotal} `
    }
    if(prevCount-count<0){
        lowCount=0    
    }else{
        lowCount=prevCount-moviesPerPage
    }
    movieCountHook.innerHTML=
        `
        <a id="prevButton" href="browsingPage.html?count=${lowCount}&s=${prevSearch}&sn=${prevCount-totalSearched}">prev</a>
        <div>${resultText}</div>
        <a id="nextButton" href="browsingPage.html?count=${count+prevCount}&s=${prevSearch}&sn=${totalSearched}">next</a>
        `;
    if(hideNext){
        document.querySelector("#nextButton").style.display = 'none';
    }
    if(prevCount===0){
        document.querySelector("#prevButton").style.display = 'none';
    }
    
}

function addToCart(id){
    localStorage.setItem("cartItems",id)
}