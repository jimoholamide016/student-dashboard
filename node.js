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

    if (currentDate) {

        currentDate.textContent =
            now.toLocaleDateString("en-US", options);

    }

    if (currentTime) {

        currentTime.textContent =
            now.toLocaleTimeString();

    }

}

setInterval(updateDateTime, 1000);

updateDateTime();

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(function () {

            loader.style.display = "none";

        }, 1000);

    }

});

function showToast(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}

const modal = document.getElementById("profileModal");

const editBtn = document.getElementById("editProfileBtn");

const closeBtn = document.querySelector(".close-modal");


if (editBtn) {

    editBtn.onclick = function () {

        modal.style.display = "flex";

    }

}

if (closeBtn) {

    closeBtn.onclick = function () {

        modal.style.display = "none";

    }

}

window.onclick = function (event) {

    if (event.target == modal) {

        modal.style.display = "none";

    }

}

const searchCourse = document.getElementById("searchCourse");

if (searchCourse) {

    searchCourse.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const rows = document.querySelectorAll("#courseTable tr");

        rows.forEach(function (row) {

            const text = row.textContent.toLowerCase();

            if (text.includes(value)) {

                row.style.display = "";

            } else {

                row.style.display = "none";

            }

        });

    });

}

function updateStatistics() {

    const courseRows =
        document.querySelectorAll("#courseTable tr");

    const assignmentRows =
        document.querySelectorAll(".assignment-item");

    const completedAssignments =
        document.querySelectorAll(".priority.low");

    const pendingAssignments =
        assignmentRows.length - completedAssignments.length;


    document.getElementById("courseCount").textContent =
        courseRows.length;

    document.getElementById("assignmentCount").textContent =
        assignmentRows.length;

    document.getElementById("completedCount").textContent =
        completedAssignments.length;

    document.getElementById("pendingCount").textContent =
        pendingAssignments;

}

updateStatistics()

const semesterSelect =
    document.getElementById("semesterSelect");

if (semesterSelect) {

    semesterSelect.addEventListener("change", function () {

        showToast(
            "Showing " + this.value
        );

    });

}

const badge =
    document.querySelector(".badge");

if (badge) {

    badge.innerHTML =
        document.querySelectorAll("#notificationList li").length;

}

const assignmentList =
    document.getElementById("assignmentList");

const addButton =
    document.querySelector(".add-btn");

function loadAssignments() {

    const assignments =
        JSON.parse(localStorage.getItem("assignments")) || [];

    if (assignments.length === 0) return;

    assignmentList.innerHTML = "";

    assignments.forEach(function (item) {

        createAssignment(
            item.title,
            item.date,
            item.priority,
            false
        );

    });

}

function saveAssignments() {

    const assignments = [];

    document.querySelectorAll(".assignment-item")
        .forEach(function (item) {

            assignments.push({

                title:
                    item.querySelector("h4").textContent,

                date:
                    item.querySelector("small").textContent,

                priority:
                    item.querySelector(".priority").textContent

            });

        });

    localStorage.setItem(
        "assignments",
        JSON.stringify(assignments)
    );

}

function createAssignment(
    title,
    date,
    priority,
    save = true
) {

    const div =
        document.createElement("div");

    div.className = "assignment-item";

    div.innerHTML = `

        <div>

            <h4>${title}</h4>

            <small>${date}</small>

        </div>

        <span class="priority ${priority.toLowerCase()}">

            ${priority}

        </span>

    `;

    div.addEventListener("dblclick", function () {

        if (confirm("Delete this assignment?")) {

            div.remove();

            saveAssignments();

            updateStatistics();

            showToast("Assignment Deleted");

        }

    });

    assignmentList.appendChild(div);

    updateStatistics();

    if (save) {

        saveAssignments();

    }

}

if (addButton) {

    addButton.addEventListener("click", function () {

        const title =
            prompt("Assignment Title");

        if (!title) return;

        const due =
            prompt("Due Date");

        if (!due) return;

        const priority =
            prompt(
                "Priority (High, Medium, Low)"
            );

        if (!priority) return;

        createAssignment(
            title,
            due,
            priority
        );

        showToast(
            "Assignment Added Successfully"
        );

    });

}

loadAssignments();

const darkModeBtn = document.getElementById("darkModeBtn");

if(darkModeBtn){

    // Load saved mode
    if(localStorage.getItem("darkMode") === "enabled"){

        document.body.classList.add("dark");

    }

    darkModeBtn.addEventListener("click",function(){

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            localStorage.setItem("darkMode","enabled");

            showToast("Dark Mode Enabled");

        }else{

            localStorage.setItem("darkMode","disabled");

            showToast("Light Mode Enabled");

        }

    });

}

const logoutLink =
document.querySelector('a[href="login.html"]');

if(logoutLink){

    logoutLink.addEventListener("click",function(e){

        const answer =
        confirm("Are you sure you want to logout?");

        if(!answer){

            e.preventDefault();

        }

    });

}

const resetBtn =
document.getElementById("resetDashboard");

if(resetBtn){

    resetBtn.addEventListener("click",function(){

        const answer = confirm(
            "This will erase all saved data. Continue?"
        );

        if(answer){

            localStorage.removeItem("studentProfile");

            localStorage.removeItem("assignments");

            location.reload();

        }

    });

}

function welcomeMessage(){

    const hour = new Date().getHours();

    let greeting = "";

    if(hour < 12){

        greeting = "Good Morning";

    }

    else if(hour < 18){

        greeting = "Good Afternoon";

    }

    else{

        greeting = "Good Evening";

    }

    const welcomeName =
    document.getElementById("welcomeName");

    if(welcomeName){

        console.log(greeting);

    }

}

welcomeMessage();

window.addEventListener("DOMContentLoaded",function(){

    updateDateTime();

    loadProfile();

    loadAssignments();

    updateStatistics();

});