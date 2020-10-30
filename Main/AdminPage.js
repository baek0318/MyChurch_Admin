const button = document.querySelector("i");
const sidebar = document.querySelector("#container");

function sidebarClickEvent(event) {
   sidebar.classList.toggle('active');
}

button.addEventListener("click", sidebarClickEvent);