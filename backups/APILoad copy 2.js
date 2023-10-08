const allMoviesUrl="https://api.noroff.dev/api/v1/square-eyes"
const productDisplay=document.querySelector(".product-display")

async function loadApi(url,doFunction,place,moviesPerPage,urlData){

    try{
        const result = await fetch(url)
        const json = await result.json()
        const data = await json;
        doFunction(data,place,moviesPerPage,urlData)
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

function addProducts(item,place,moviesPerPage,urlData){
    console.log("new load")

    place.innerHTML=""
    const moviesTotal=36
    const ignoreThe="the "
    let movieToAdd=""
    let moviesToAdd=[]
    let prevSearch=urlData[1]
    let prevSearchCount=urlData[2]
    let pageCount=urlData[3]
    let prevCount=pageCount*moviesPerPage-moviesPerPage
    console.log("prevCount: "+prevCount+", prevSearch: "+prevSearch+", prevSearchCount: "+prevSearchCount)
    let searching = false
    let hideNext = false
    let repeatText=""
    let count=0;
    let repeatCount=1
    console.log("repeatCount"+repeatCount)

    if(prevSearch.trim().length>0){
        searching=true;
        prevCount=prevSearchCount
    }
    
   
    console.log(movieToAdd.length)
    for(let i = prevCount; i<moviesTotal; i++){
        if(i>11){
            repeatCount+=Math.floor(i/12)
            i-=12*Math.floor(i/12)
            repeatText=" "+repeatCount
            
        }
        if(count>moviesPerPage-1){
            console.log("if(count>moviesPerPage-1){")
            break;
        }
        if(prevCount+count===moviesTotal || repeatCount>3){
            hideNext=true
            console.log("prevCount+count===moviesTotal || repeatCount>3")
            break;
        }
        if(item[i].title.toLowerCase().startsWith(prevSearch.trim().toLowerCase()) ||
            item[i].title.toLowerCase().startsWith(ignoreThe+prevSearch.trim().toLowerCase())){
            count++
            movieToAdd=`<div><a href="singleProductPage.html?id=${item[i].id}"><image src="${item[i].image}"><h3>${item[i].title+repeatText}</h3></a></div>`
            if(searching){    
                 productDisplay.innerHTML+=movieToAdd
            }else{
                moviesToAdd.push(movieToAdd)
            }
        }
        prevSearchCount++       
    } 
    if(searching){
        resultText=`Showing search results ${prevCount+1}-${prevCount+count} for "${prevSearch}" `
        backSearchUrl=`&s=${searchInput.value}&sn=${prevSearchCount-urlData[2]*pageCount}`
        nextSearchUrl=`&s=${searchInput.value}&sn=${prevSearchCount}`
    }else{
        let i = 0;
        const slowAdd=setInterval(() => {
            productDisplay.innerHTML+=moviesToAdd[i]   
            i++;
            if (i > count-1) {          
                clearInterval(slowAdd)
            }
        }, 10);
        backSearchUrl=""
        nextSearchUrl=""
        resultText=`Showing ${prevCount+1}-${prevCount+count} movies of ${moviesTotal} `
    }
    if(prevCount-count<0){
        lowCount=0    
    }else{
        lowCount=prevCount-moviesPerPage
    }

    movieCountHook.innerHTML=
        `
        <a id="prevButton" href="browsingPage.html?c=${lowCount}${backSearchUrl}&page=${pageCount-1}">prev</a>
        <div>${resultText}</div>
        <a id="nextButton" href="browsingPage.html?c=${count+prevCount}${nextSearchUrl}&page=${pageCount+1}">next</a>
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