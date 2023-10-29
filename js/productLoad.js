console.log("productLoad.js loaded")

const allMoviesUrl="https://prototype.meeplegalaxy.com/wp-json/wc/store/products"
let standardOrder="?orderby=title&order=asc"

async function getApi(doFunction,place,moviesPerPage,urlData){
    console.log(urlData)
    if(!urlData){
        urlData=["","",""]
    }
console.log(urlData)
    try{
        const result = await fetch(allMoviesUrl+urlData[2])
        const json = await result.json()
        const data = await json;
        doFunction(data,place,moviesPerPage,urlData)
        
    }catch(err){
        place.innerHTML="We are sorry, we couldn't connect with server"
        console.log("getApi error "+err)
    }
}

function loadApi(doFunction,place,moviesPerPage,urlData){
    /*
    for(let i = 0; i<13; i++){         
            place.innerHTML+=
            `<div class="place-holder-card"></div>`
    } 
    */
    getApi(doFunction,place,moviesPerPage,urlData);    
}

const addUrllInfo = function inputSearch(){
    const queryString = document.location.search;
    const params = new URLSearchParams(queryString);
   
    let prevSearch = (params.get("s"));
    let pageCount = Number(params.get("page"));
    let orderby= (params.get("orderby"));
    let order= (params.get("order"));

    //Not operator didn't work for some reason
    if(prevSearch===null){
        prevSearch=""
    }
    orderUrl=orderby+order
    if(orderby===null){
        orderUrl=standardOrder
    }
    if(!pageCount>0){
        pageCount=1
    }
    
    if(searchInput){
        searchInput.value=prevSearch
    }
    
    const urlData = [prevSearch,pageCount,orderUrl]
    console.log(urlData)
    return urlData 
    
}

function addProducts(item,place,moviesPerPage,urlData){
    console.log(urlData)
    let movieInput=""
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


    for(let i = 0; i<item.length; i++){
        if(item[i].name.toLowerCase().startsWith(search.trim().toLowerCase()) ||
            item[i].name.toLowerCase().startsWith(ignoreThe+search.trim().toLowerCase())){
            searchHits++
            
            if(searchHits>startCount && count<moviesPerPage){
                count++
                rangeCount=searchHits
                movieInput+=
                `<div>
                    <a href="movie.html?id=${item[i].id}">
                        <image src="${item[i].images[0].src}">
                        <h4>${item[i].name}</h4>
                    </a>
                </div>`
            }
        }
    }
    place.innerHTML=movieInput    
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
            resultText=`Showing ${rangeCount-count+1}-${rangeCount} movies of ${searchHits} `
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
    


