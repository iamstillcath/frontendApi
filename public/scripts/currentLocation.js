const token = localStorage.getItem('token');


if(!token){
  window.location.href = './login.html';
}


const currentLocation = e => {
  e.preventDefault();

  fetch("parcels/currentLocation", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      statusId: document.getElementById("ordersId").value,
      currentLocation: document.getElementById("destination").value,
    
    })
  })
    .then(res => res.json())
    .then(res => {
      console.log("this is res",res)
      if (res.message) {
        alert("Current Location changed successfully!");
        window.location.href = "./admin.html";
      } else {
      alert(res.error)}
    })
    .catch();
};

document
  .getElementById("edit-form")
  .addEventListener("submit", currentLocation);

