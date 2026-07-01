const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const close = document.getElementById("close");
const form = document.getElementById("courseForm");
const table = document.getElementById("courseTable");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const toast = document.getElementById("toast");

let courses =
JSON.parse(localStorage.getItem("courses")) || [];

openModal.onclick = () =>{
    modal.style.display="block";
    form.reset();
    document.getElementById(
        "editIndex"
    ).value="";
}

close.onclick = ()=>{
    modal.style.display="none";
}

function showToast(msg){

    toast.innerHTML=msg;
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },2000);
}

function save(){
    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );
}

function display(data=courses){

    table.innerHTML="";

    data.forEach((c,index)=>{

        table.innerHTML += `
        <tr>
            <td>${c.code}</td>
            <td>${c.title}</td>
            <td>${c.lecturer}</td>
            <td>${c.credit}</td>
            <td>${c.semester}</td>

            <td>

            <button
            class="edit"
            onclick="editCourse(${index})">
            Edit
            </button>

            <button
            class="delete"
            onclick="deleteCourse(${index})">
            Delete
            </button>

            </td>
        </tr>`;
    });
}

form.addEventListener(
"submit",
function(e){

    e.preventDefault();

    const code =
    document.getElementById(
        "code").value.trim();

    const title =
    document.getElementById(
        "title").value.trim();

    const lecturer =
    document.getElementById(
        "lecturer").value.trim();

    const credit =
    document.getElementById(
        "credit").value;

    const semester =
    document.getElementById(
        "semester").value;

    if(
        !code ||
        !title ||
        !lecturer ||
        !credit ||
        !semester
    ){
        showToast(
            "Fill all fields"
        );
        return;
    }

    const course={
        code,
        title,
        lecturer,
        credit,
        semester
    };

    const edit =
    document.getElementById(
        "editIndex").value;

    if(edit===""){
        courses.push(course);
        showToast(
            "Course Added"
        );
    }
    else{
        courses[edit]=course;
        showToast(
            "Course Updated"
        );
    }

    save();
    display();

    modal.style.display="none";
    form.reset();
});

function editCourse(index){

    const c=courses[index];

    document.getElementById(
        "code").value=c.code;

    document.getElementById(
        "title").value=c.title;

    document.getElementById(
        "lecturer").value=
        c.lecturer;

    document.getElementById(
        "credit").value=
        c.credit;

    document.getElementById(
        "semester").value=
        c.semester;

    document.getElementById(
        "editIndex").value=
        index;

    modal.style.display=
        "block";
}

function deleteCourse(index){

    if(confirm(
        "Delete course?"
    )){

        courses.splice(
            index,1
        );

        save();
        display();

        showToast(
            "Course Deleted"
        );
    }
}

search.addEventListener(
"keyup",
function(){

    const text =
    this.value.toLowerCase();

    const result =
    courses.filter(c=>

        c.code
        .toLowerCase()
        .includes(text)

        ||

        c.title
        .toLowerCase()
        .includes(text)
    );

    display(result);
});

filter.addEventListener(
"change",
function(){

    if(this.value==="all"){
        display();
        return;
    }

    const result =
    courses.filter(c=>

        c.semester===
        this.value
    );

    display(result);
});

display();