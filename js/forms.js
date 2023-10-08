const emailContainer = document.querySelector("#emailFieldContainer")
const emailInput = emailContainer.querySelector("input")
const nameContainer = document.querySelector("#nameContainer")
const nameInput = nameContainer.querySelector("input")
const messageContainer = document.querySelector("#messageContainer")
const messageInput = document.querySelector("textarea")

const submitButton = document.querySelector("#submitButton")


function showMessage (field,message){
    messageBox = field.querySelector(".message")
    messageBox.innerHTML=message
    messageBox.classList.add("error-message") 

    
}
function checkEmail(field){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(field.value))
    {
        showMessage(emailContainer,"")
        return (true)
    }
        showMessage(emailContainer,"Please check e-mail")
        return (false)
}
function checkForNameInput(target){
    if(target.value.length>2){
        showMessage(nameContainer,"")
        return (true)
    }
        showMessage(nameContainer,"Please fill in")
        return (false)
}
function checkForMessageInput(target){
    if(target.value.length>9){
        showMessage(messageContainer,"")
        return (true)
    }
        showMessage(messageContainer,"Please fill in (minimum 10 letters)")
        return (false)
}
submitButton.addEventListener("click",()=>{
    
    if(!checkEmail(emailInput)||!checkForNameInput(nameInput)||(!checkForMessageInput(messageInput))){
        emailInput.addEventListener("keyup",()=>checkEmail(emailInput))
        nameInput.addEventListener("keyup",()=>checkForInput(nameInput))
        messageInput.addEventListener("keyup",()=>checkForMessageInput(messageInput))
    }else{
        submitButton.textContent="Successfully sent!" 
        submitButton.disabled=true;
        nameInput.disabled=true;
        emailInput.disabled=true;
        messageInput.disabled=true;
    }

})
