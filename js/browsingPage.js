//On page load or page change with delay
loadApi(allMoviesUrl,addProducts,productDisplay,10,addUrllInfo());

//On search change, "1" is to always reset to page 1
searchInput.onkeyup = function (){
    getApi(allMoviesUrl,addProducts,productDisplay,10,[event.target.value,1]);
}






  

