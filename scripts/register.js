const register = (e) => {
  e.preventDefault();

  fetch("/user/signup", {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*", "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: document.querySelector(".name").value,
      email: document.querySelector(".email").value,
      password: document.querySelector(".pass").value,
      password: document.querySelector(".compass").value,
      phoneNumber: document.querySelector(".phoneNumber").value,
      address: document.querySelector(".address").value,
    })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);
      

        const role = localStorage.getItem("role");
        if (role === "user") {
          alert("login succesful!");
          window.location.href = "./order.html";
        } else {
          window.location.href = "./admin.html";
        }
      } else {
        alert(data.message);
      }
    })
    .catch();
};


const passvalid=document.querySelector(".pass");
const compassvalid=document.querySelector(".compass");
const compasserr=document.querySelector(".errMsg");

compassvalid.addEventListener("mouseout",function(e) {
  e.preventDefault()
  

  if(compassvalid.value === passvalid.value){
    compasserr.innerHTML = "";
}
else{
    compasserr.innerHTML = "password does not match";
    compasserr.style.color = "red";
}
if(compassvalid.value === ""){
    compasserr.innerHTML = "";
}
})

// const errMsg=document.querySelector(".errMsg")
// const phone =document.querySelector(".phoneNumber");
// phone.addEventListener("change", function (e) {
//   e.preventDefault()
//   const pattern= /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/
//   if (phone.match(pattern)){
//     errMsg.innerHTML=""
//   }else {
//      errMsg.innerHTML = "invalid phone number";
//       errMsg.style.color = "red";
//   }
//   if(phone === ""){
//     errMsg.innerHTML = "";
// }
// });
document.querySelector(".signUp").addEventListener("click", register);
