
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
                <a href="#" class="showMobile"><img src="icons/hamburgerIcon.png" alt="">Menu</a>

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


const searchInput = document.querySelector("input")
const infoTextHook = document.querySelector(".infoText")
const loadingTextHook = document.querySelector(".loadingText")
const productDisplay=document.querySelector(".product-display")
const basketCountHook=document.querySelector("#basketCount")
const paginationHook=document.querySelector(".pagination")
const leggTilfilm=document.querySelector(".leggTilfilm")

function updateCart(){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(cartString){
    basketCount.innerHTML=cartString.length
    }
    
}
updateCart()

    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:3678613,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
