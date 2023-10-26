console.log("header.js loaded")
const headerHook = document.querySelector("header")
const footerHook = document.querySelector("footer")

headerHook.innerHTML=`    
    
        <div class="topHeader flexRow">
            <div class="flexRow">
                <a href="index.html"><img src="other/logo.png" id="headerLogo" class="hideMobile"  alt="Square Space logo"></a>
            </div>
            <nav class="headerLinks flexRow alignRow hideMobile cleanCtaGroup">
                <a href="index.html">Home</a>
                <a href="browsingPage.html">Browse</a>
                <a href="browsingPage.html">Discover</a>
                <a href="#">Friends</a>
            </nav>
            <nav class="headerIcons flexRow alignBotttom cleanCtaGroup">     
                <a href="index.html" class="showMobile"><img src="icons/homeIcon.png" alt=""><span class="menuText">Home</span></a>
                <a href="basketPage.html" class="hoverCta"><img src="icons/basketIcon.png" alt=""><span class="menuText">Basket</span><div id="basketCount"></div></a>
                <a href="index.html" class=""><img src="icons/libraryIcon.png" alt=""><span class="menuText">Library</span></a>
                <a href="index.html" class="hideMobile"><img src="icons/profileIcon.png" alt="">Profile</a>
                <div class="showMobile"><img id="hamburgerMenu" src="icons/hamburgerIcon.png"></div>

            </nav>
        </div>
        <div>
            <nav class="bottomHeader flexRow alignRow">
                <a href="#" onclick="history.back()" class="cleanCta backButton hideMobile"><img src="Other/arrowLeft.png" id="arrowLeft" alt="">Back</a>
                <a href="#" class="cleanCta editFilterButton">Edit Filter</a>
                <section>
                    <input class="searchInput" type="search" id="site-search" name="q" />
                    <button class="searchBackground searchButton"><img src="Other/searchIcon.png" id="searchIcon" alt=""></button>            
                </section>
            </nav>
        </div>
        <div id="mobileMenu" class="menuText">
            <nav class="flexColumn">
                <a href="browsingPage.html">My Profile</a>
                <a href="browsingPage.html">My Library</a>
                <a href="browsingPage.html">Browse</a>
                <a href="contactUsPage.html">Contact Us</a>
                <a href="aboutUsPage.html">About Us</a>
            </nav>
        </div>
    
    `
footerHook.innerHTML=
        `
        <div class="footerClass">
            <nav class="cleanCtaGroup">
                <a href="#" class="hoverCta">Privacy</a>
                <a href="#" class="hoverCta">Terms of Service</a>
                <a href="#" class="hoverCta">Refunds</a>
                <a href="#" class="hoverCta hideMobile">Questions and Answers</a>
            </nav>
            <nav class="lineOver cleanCtaGroup">
                <a href="contactUsPage.html" class="hoverCta">Contact us</a>
                <a href="aboutUsPage.html" class="hoverCta">About us</a>
            </nav>
        </div>
    `
const hamburgerMenu = document.querySelector("#hamburgerMenu")
const mobileMenu = document.querySelector("#mobileMenu")
const searchInput = document.querySelector(".searchInput")
const infoTextHook = document.querySelector(".infoText")
const loadingTextHook = document.querySelector(".loadingText")
const productDisplay=document.querySelector(".product-display")
const basketCountHook=document.querySelector("#basketCount")
const paginationHook=document.querySelector(".pagination")
const headLine=document.querySelector("h1")
const bottomHeader=document.querySelector(".bottomHeader")
const helperText=document.querySelectorAll("span")
hamburgerMenu.addEventListener("click",function(){
    mobileMenu.classList.toggle("menuText")
    helperText.forEach((element) => {
        element.classList.toggle("menuText")
    });
})
bottomHeader.style.display="none"


function inCart(name){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(cartString){
        for(let i = 0; i<cartString.length;i++){
            if(cartString[i]===name){
                return true
            }
            
        }
        return false
    }

}
function addToCart(name,button){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(!cartString){
        cartString=[]  
    }
    cartString.push(name) 
    localStorage.setItem('cart', JSON.stringify(cartString));
    updateCart()
}
function updateCart(){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(cartString){
        basketCount.innerHTML=cartString.length
    }else{
        basketCount.innerHTML=""
    }
    
}
function removeFromCart(name){
    cartString=JSON.parse(localStorage.getItem('cart'))
    console.log(name)
    if(cartString){
        for(let i = 0; i<cartString.length;i++){
            if(cartString[i]===name){
                cartString.splice(i,1)
                localStorage.setItem('cart', JSON.stringify(cartString));
                updateCart()
                break;
            } 
        }
    }
}
updateCart()