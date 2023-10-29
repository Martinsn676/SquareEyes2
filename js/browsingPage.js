

//On page load or page change with delay
loadApi(addProducts,productDisplay,10,addUrllInfo());

//On search change, "1" is to always reset to page 1
searchInput.onkeyup = function (){
    getApi(addProducts,productDisplay,10,[event.target.value,1]);
}
bottomHeader.style.display="flex"

const sortByMenu=document.querySelector(".sortByMenu")
sortByMenu.innerHTML=`
    <button onclick="loadApi(addProducts, productDisplay, 10, ['', 1, '?orderby=title&order=asc'])">Ascending</button>
    <button onclick="loadApi(addProducts, productDisplay, 10, ['', 1, '?orderby=title&order=desc'])">Ascending</button>
    `
