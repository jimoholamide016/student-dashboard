const modal =
document.getElementById("modal");

const openModal =
document.getElementById("openModal");

const close =
document.getElementById("close");

const form =
document.getElementById(
"assignmentForm");

const table =
document.getElementById(
"assignmentTable");

const search =
document.getElementById(
"search");

const filter =
document.getElementById(
"filter");

const toast =
document.getElementById(
"toast");

let assignments =
JSON.parse(
localStorage.getItem(
"assignments"
)) || [];

openModal.onclick=()=>{
    modal.style.display="block";
    form.reset();
    document.getElementById(
        "editIndex"
    ).value="";
};

close.onclick=()=>{
    modal.style.display="none";
};

function showToast(msg){

    toast.innerHTML=msg;
    toast.style.display="block";

    setTimeout(()=>{
        toast.style.display="none";
    },2000);
}

function save(){
    localStorage.setItem(
        "assignments",
        JSON.stringify(
            assignments
        )
    );
}

function display(
data=assignments
){

    table.innerHTML="";

    data.forEach(
    (a,index)=>{

        let cls="";

        if(a.priority==="High")
            cls="high";

        if(a.priority==="Medium")
            cls="medium";

        if(a.priority==="Low")
            cls="low";

        table.innerHTML+=`
        <tr>

        <td>
        ${a.course}
        </td>

        <td>
        ${a.title}
        </td>

        <td>
        ${a.date}
        </td>

        <td class="${cls}">
        ${a.priority}
        </td>

        <td>
        ${a.status}
        </td>

        <td>

        <button
        class="complete"
        onclick="completeTask(${index})">
        ✓
        </button>

        <button
        class="edit"
        onclick="editTask(${index})">
        Edit
        </button>

        <button
        class="delete"
        onclick="deleteTask(${index})">
        Delete
        </button>

        </td>

        </tr>
        `;
    });
}

form.addEventListener(
"submit",
function(e){

e.preventDefault();

const assignment={

course:
document.getElementById(
"course").value,

title:
document.getElementById(
"title").value,

date:
document.getElementById(
"date").value,

priority:
document.getElementById(
"priority").value,

status:"Pending"
};

if(
!assignment.course||
!assignment.title||
!assignment.date||
!assignment.priority
){
showToast(
"Fill all fields"
);
return;
}

const edit=
document.getElementById(
"editIndex").value;

if(edit===""){
assignments.push(
assignment
);
showToast(
"Assignment Added"
);
}
else{
assignment.status=
assignments[
edit
].status;

assignments[
edit
]=assignment;

showToast(
"Assignment Updated"
);
}

save();
display();

modal.style.display=
"none";

form.reset();
});

function editTask(i){

const a=
assignments[i];

document.getElementById(
"course").value=
a.course;

document.getElementById(
"title").value=
a.title;

document.getElementById(
"date").value=
a.date;

document.getElementById(
"priority").value=
a.priority;

document.getElementById(
"editIndex").value=i;

modal.style.display=
"block";
}

function deleteTask(i){

if(confirm(
"Delete Assignment?"
)){

assignments.splice(
i,1
);

save();
display();

showToast(
"Deleted"
);
}
}

function completeTask(i){

assignments[i]
.status=
"Completed";

save();
display();

showToast(
"Completed"
);
}

search.addEventListener(
"keyup",
function(){

const value=
this.value
.toLowerCase();

const result=
assignments.filter(
a=>

a.title
.toLowerCase()
.includes(value)

||

a.course
.toLowerCase()
.includes(value)
);

display(result);
});

filter.addEventListener(
"change",
function(){

if(
this.value==="all"
){
display();
return;
}

const result=
assignments.filter(
a=>

a.status===
this.value
);

display(result);
});

display();