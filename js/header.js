
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
                <a href="index.html" class="showMobile"><img src="icons/homeIcon.png" alt="">Home</a>
                <a href="basketPage.html" class="hoverCta"><img src="icons/basketIcon.png" alt="">Basket<div id="basketCount"></div></a>
                <a href="index.html" class=""><img src="icons/libraryIcon.png" alt="">Library</a>
                <a href="index.html" class="hideMobile"><img src="icons/profileIcon.png" alt="">Profile</a>
                <span class="showMobile"><img id="hamburgerMenu" src="icons/hamburgerIcon.png"></span>

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
        <div id="mobileMenu" class="hideThis">
            <nav class="flexColumn">
                <a href="browsingPage.html">My Profile</a>
                <a href="browsingPage.html">My Library</a>
                <a href="browsingPage.html">Browse</a>
                
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

hamburgerMenu.addEventListener("click",()=>mobileMenu.classList.toggle("hideThis"))
bottomHeader.style.display="none"

function updateCart(){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(cartString.length>0){
        basketCount.innerHTML=cartString.length
    }else{
        basketCount.innerHTML=""
    }
    
}
function addToCart(id,button){
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
            button.disabled=true
            button.innerHTML="In cart"
            button.classList.add("greyCta")
  
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartString));
    updateCart()
    
}
updateCart()

