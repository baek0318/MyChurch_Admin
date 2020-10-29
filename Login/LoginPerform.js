const id = document.getElementById("id");
const pwd = document.getElementById("pwd");
const login = document.querySelector("#login");

function handleLoginEvent(event){
    
    if(id.value === "baek" && pwd.value == "0318"){
        window.location.replace("Main/AdminPage.html")
    }
    else{
        window.alert("일치하지 않습니다");
    }

}

login.addEventListener("click", handleLoginEvent);
