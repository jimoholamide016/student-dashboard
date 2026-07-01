function showToast(message,type="success"){

    const toast=document.getElementById("toast");

    toast.textContent=message;

    toast.className="";

    toast.classList.add(type);

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}