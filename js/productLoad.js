const allMoviesUrl="https://api.noroff.dev/api/v1/square-eyes"

async function getApi(url,doFunction,place,moviesPerPage,urlData){
    
    try{
        const result = await fetch(url)
        const json = await result.json()
        const data = await json;
        
        doFunction(data,place,moviesPerPage,urlData)
        
    }catch(err){
        place.innerHTML="We are sorry, we couldn't connect with server"
        console.log(err)
    }
}

function loadApi(url,doFunction,place,moviesPerPage,urlData){
    let i = 1
    const loadingText=["Loading","Loading.","Loading..","Loading..."]
    place.innerHTML=loadingText[0]
    if(place){
        place.innerHTML=loadingText[0]
        loadingLoop=setInterval(() => {
            place.innerHTML=`<div class="ignoreEntry">${loadingText[i]}</div>`                  
            i++;
            if (i > 3) {          
                i=0; 
            }
        }, 200);
    }
    setTimeout(()=> {
        getApi(url,doFunction,place,moviesPerPage,urlData);
        clearInterval(loadingLoop)
    },2000)
    
}


const addUrllInfo = function inputSearch(){
    
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
   
    let prevSearch = (params.get("s"));
    let pageCount = Number(params.get("page"));
    
    //Not operator didn't work for some reason
    if(prevSearch===null){
        prevSearch=""
    }
    if(!pageCount>0){
        pageCount=1
    }
    
    if(searchInput){
        searchInput.value=prevSearch
    }
    const urlData = [prevSearch,pageCount]
    return urlData 
    
}

function addProducts(item,place,moviesPerPage,urlData){
    place.innerHTML=""
    const ignoreThe="the "
    
    let search=""
    let pageCount=1
    let searchHits=0
    let count=0;
    let rangeCount=0;
    hideNext=false
    hidePrev=false
    if(typeof urlData==="object"){
        search=urlData[0]
        pageCount=urlData[1]
        startCount=pageCount*moviesPerPage-moviesPerPage
    }
    
    
    let repeatText=""
    let repeatCount=1
    let maxRepeat=3
    
    for(let i = 0; i<1000; i++){
        if(i>11){
            repeatCount+=Math.floor(i/12)
            i-=12*Math.floor(i/12)
            repeatText=" "+repeatCount
        }
        if(!item[i].title || repeatCount>maxRepeat){
            break;
        }
        if(item[i].title.toLowerCase().startsWith(search.trim().toLowerCase()) ||
            item[i].title.toLowerCase().startsWith(ignoreThe+search.trim().toLowerCase())){
            searchHits++
            if(searchHits>startCount && count<moviesPerPage){
                count++
                rangeCount=searchHits
                place.innerHTML+=
                `<div>
                    <a href="singleProductPage.html?id=${item[i].id}">
                        
                            <image src="${item[i].image}">
                        
                        <h4>${item[i].title+repeatText}</h4>
                    </a>
                </div>`
            }
        }
        
    }
    
    if(count===0){
        infoTextHook.innerHTML=`We are sorry, we couln\'t find any results for "${search}"`
    }else{
        if(search.trim().length>0){
            resultText=`Showing search results ${rangeCount-count+1}-${rangeCount} of ${searchHits} for "${search}" `
            backSearchUrl=`s=${searchInput.value}`
            nextSearchUrl=`s=${searchInput.value}`
        }else{
            backSearchUrl=""
            nextSearchUrl=""
            resultText=`Showing ${rangeCount-count+1}-${rangeCount} movies of ${searchHits-1} `
        }
        
        if(infoTextHook){
            infoTextHook.innerHTML=
                `
                <div>
                    <a id="prevButton" href="browsingPage.html?${backSearchUrl}&page=${pageCount-1}">prev</a>
                </div>
                <div>
                    ${resultText}
                </div>
                <div>
                    <a id="nextButton" href="browsingPage.html?${nextSearchUrl}&page=${pageCount+1}">next</a>
                </div>
                `;
            }
    }
        let pagesTotal=searchHits/8
        if(paginationHook){
            paginationHook.innerHTML=
            `<div>
                <a id="prevButtonB" href="browsingPage.html?${backSearchUrl}&page=${pageCount-1}">prev</a>
            </div>`
            if(pagesTotal>1){
                for(let i = 0; i<pagesTotal; i++){
                    if(i===pageCount-1){
                    paginationHook.innerHTML+=
                        `<div id="currentPage">
                            ${i+1}
                        </div>`
                    }else{
                    paginationHook.innerHTML+=
                    `<div>
                        <a href="browsingPage.html?&page=${i+1}">${i+1}</a>
                    </div>`
                    }
                };
            }
            paginationHook.innerHTML+=
            `<div>
                <a id="nextButtonB" href="browsingPage.html?${nextSearchUrl}&page=${pageCount+1}">next</a>
            </div>`
                
            
        }
        if(paginationHook || infoTextHook){
            if(rangeCount===searchHits){
                document.querySelector("#nextButton").style.display = 'none';
                document.querySelector("#nextButtonB").style.display = 'none';

            }
            if(startCount===0){
                document.querySelector("#prevButton").style.display = 'none';
                document.querySelector("#prevButtonB").style.display = 'none';

            }
        }
    }
    


function addToCart(id){
    let deleted=false
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(!cartString){
        cartString=[]
        cartString.push(id)
    }else{
       let length=cartString.length
        for(let i = 0; i<length;i++){
            if(cartString[i]===id){
                cartString.splice(i,1)
                deleted=true
            }
            
        }
        if(deleted===false){
                  cartString.push(id)
  
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartString));
    updateCart()
    
}