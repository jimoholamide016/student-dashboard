// ===
// Smart Student Dashboard Login
// ============

// Select Elements
const loginForm = document.getElementById("loginForm");
const studentID = document.getElementById("studentID");
const password = document.getElementById("password");

const remember = document.getElementById("remember");

const togglePassword = document.getElementById("togglePassword");

const loginBtn = document.getElementById("loginBtn");
const btnText = document.getElementById("btnText");
const spinner = document.getElementById("spinner");

const idError = document.getElementById("idError");
const passwordError = document.getElementById("passwordError");

const forgotPassword = document.getElementById("forgotPassword");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

// ========================================
// Demo Student Credentials
// ========================================

const demoStudent = {
    studentID: "STU001",
    password: "student123"

    
};

// ========================================
// Auto Fill Remembered Student ID
// ========================================

window.addEventListener("DOMContentLoaded", () => {

    const savedID = localStorage.getItem("rememberStudentID");

    if(savedID){
        studentID.value = savedID;
        remember.checked = true;
    }

});

// ========================================
// Show / Hide Password
// ========================================

togglePassword.addEventListener("click", () => {

    if(password.type === "password"){

        password.type = "text";

        togglePassword.classList.remove("fa-eye");
        togglePassword.classList.add("fa-eye-slash");

    }else{

        password.type = "password";

        togglePassword.classList.remove("fa-eye-slash");
        togglePassword.classList.add("fa-eye");

    }

});

// ========================================
// Forgot Password Modal
// ========================================

forgotPassword.addEventListener("click",(e)=>{

    e.preventDefault();

    modal.classList.add("active");

});

closeModal.addEventListener("click",()=>{

    modal.classList.remove("active");

});

window.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("active");

    }

});

// ========================================
// Validation
// ========================================

function validateForm(){

    let valid = true;

    idError.textContent = "";
    passwordError.textContent = "";

    studentID.value = studentID.value.trim();
    password.value = password.value.trim();

    if(studentID.value===""){

        idError.textContent="Student ID is required.";
        valid=false;

    }

    if(password.value===""){

        passwordError.textContent="Password is required.";
        valid=false;

    }else if(password.value.length<6){

        passwordError.textContent="Password must be at least 6 characters.";
        valid=false;

    }

    return valid;

}

// ========================================
// Login
// ========================================

loginForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(!validateForm()) return;

    btnText.style.display="none";
    spinner.style.display="block";

    loginBtn.disabled=true;

    setTimeout(()=>{

        if(

            studentID.value===demoStudent.studentID &&
            password.value===demoStudent.password

        ){

            if(remember.checked){

                localStorage.setItem(
                    "rememberStudentID",
                    studentID.value
                );

            }else{

                localStorage.removeItem("rememberStudentID");

            }

            localStorage.setItem("loggedIn","true");

            localStorage.setItem("studentName","Musa Abdulsamad");

            showToast(
                "Login Successful!",
                "success"
            );

            setTimeout(()=>{

                window.location.href="dashboard.html";

            },1500);

        }else{

            showToast(
                "Invalid Student ID or Password",
                "error"
            );

            btnText.style.display="inline";
            spinner.style.display="none";

            loginBtn.disabled=false;

        }

    },1500);

});