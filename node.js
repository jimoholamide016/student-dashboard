function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const currentDate = document.getElementById("currentDate");
    const currentTime = document.getElementById("currentTime");

    if(currentDate){

        currentDate.textContent =
            now.toLocaleDateString("en-US", options);

    }

    if(currentTime){

        currentTime.textContent =
            now.toLocaleTimeString();

    }

}

setInterval(updateDateTime,1000);

updateDateTime();



// ===============================
// LOADER
// ===============================

window.addEventListener("load",function(){

    const loader = document.getElementById("loader");

    if(loader){

        setTimeout(function(){

            loader.style.display = "none";

        },1000);

    }

});



// ===============================
// TOAST NOTIFICATION
// ===============================

function showToast(message){

    const toast = document.getElementById("toast");

    if(!toast) return;

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(function(){

        toast.classList.remove("show");

    },3000);

}



// ===============================
// PROFILE MODAL
// ===============================

const modal = document.getElementById("profileModal");

const editBtn = document.getElementById("editProfileBtn");

const closeBtn = document.querySelector(".close-modal");


if(editBtn){

    editBtn.onclick = function(){

        modal.style.display = "flex";

    }

}

if(closeBtn){

    closeBtn.onclick = function(){

        modal.style.display = "none";

    }

}

window.onclick = function(event){

    if(event.target == modal){

        modal.style.display = "none";

    }

}