const userId = localStorage.getItem("userId");


const url = "https://backfiles.herokuapp.com";
const theOrder = (e) => {
  e.preventDefault();
  fetch(`${url}/parcels`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      user_Id: localStorage.getItem("userId"),
      itemDescription: document.getElementById("itemDescription").value,
      price: document.getElementById("price").value,
      pickupLocation: document.getElementById("pickupLocation").value,
      currentLocation: document.getElementById("currentLocation").value,
      destination: document.getElementById("destination").value,
      recipientName: document.getElementById("recipientName").value,
      recipientNumber: document.getElementById("recipientNumber").value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert("parcel created successfully!");
        document.getElementById("itemDescription").value = " ";
        document.getElementById("price").value = " ";
        document.getElementById("pickupLocation").value = " ";
        document.getElementById("currentLocation").value = " ";
        document.getElementById("destination").value = " ";
        document.getElementById("recipientName").value = " ";
        document.getElementById("recipientNumber").value = " ";
        window.location.href = "./user.html";
      } else {
        alert(data.message.recipientNumber);
      }
    })
    .catch((error) => console.log("error occured", error));
};

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./login.html";
});

const weight=document.querySelector("#Weight");
weight.addEventListener("mouseout",function(e){
const weight=document.querySelector("#Weight").value;
const price=document.querySelector("#price")
  e.preventDefault()  
   if(weight){
    price.value = weight * 330;
    }
    else{
    price.value = "";
    }
})

const phone = document.querySelector('#recipientNumber');
function phonevalid() {
  const phone = document.querySelector('#recipientNumber').value;
  const errormsg = document.querySelector('.errorMsg');
  const pattern = /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/;
   
  if(phone.match(pattern)){
      errormsg.innerHTML = "";
  }
  else{
      errormsg.innerHTML = "invalid recepient number";
      errormsg.style.color = "red";
  }
  if(phone === ""){
      errormsg.innerHTML = "";
  }

}

phone.addEventListener('change', phonevalid);

document
  .getElementById("registration-form")
  .addEventListener("submit", theOrder);
