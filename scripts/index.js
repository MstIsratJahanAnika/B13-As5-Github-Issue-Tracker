// log-in page
const form = document.getElementById("login-form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const userName = document.getElementById("userName").value;
    const userPass = document.getElementById("userPassword").value;

    if(userName === "admin" && userPass === "admin123"){
        window.location.href = "main.html";
    }
    else{
        alert("Wrong UserName or Password");
    }
});