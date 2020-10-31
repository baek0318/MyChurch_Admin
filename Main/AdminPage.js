const button = document.querySelector("i");
const sidebar = document.querySelector("#nav");

function sidebarClickEvent(event) {
   sidebar.classList.toggle('active');
}

button.addEventListener("click", sidebarClickEvent);