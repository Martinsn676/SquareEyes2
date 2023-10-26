function updateCart(){
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(cartString.length>0){
        basketCount.innerHTML=cartString.length
    }else{
        basketCount.innerHTML=""
    }
    
}
function inCart(name){
    cartString=JSON.parse(localStorage.getItem('cart'))
    let length=cartString.length
    
        for(let i = 0; i<length;i++){
        console.log(i)
            if(cartString[i]===name){
                return true
            }
            
        }
        return false
}
function removeFromCart(){
    cartString=JSON.parse(localStorage.getItem('cart'))
}
function addToCart(id,button){
    
    console.log("add to caret")
    cartString=JSON.parse(localStorage.getItem('cart'))
    if(!cartString){
        cartString=[]
        cartString.push(id)
    }else{
        console.log(inCart(id))
        if(inCart(id)===false){
            cartString.push(id)  
        }
    }
    localStorage.setItem('cart', JSON.stringify(cartString));
    updateCart()
    
}
updateCart()
