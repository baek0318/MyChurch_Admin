const id = document.getElementById('id').value;

const pwd = document.querySelector("#pwd");

const login = document.querySelector("#login");

function handleLoginEvent(){
    console.log(id);
    if(id === "baek"){
        console.log("일치합니다");
    }
    else{
        console.log("틀렸습니다");
    }
}

login.addEventListener("click", handleLoginEvent);


