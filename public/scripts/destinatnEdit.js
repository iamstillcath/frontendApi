const token = localStorage.getItem('token');


if(!token){
  window.location.href = './login.html';
}


const changeDestination = e => {
  e.preventDefault();

  fetch("parcels/destination", {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      ordersId: document.getElementById("ordersId").value,
      destination: document.getElementById("destination").value,
    
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data) {
        alert("Destination changed successfully!");
        window.location.href = "./user.html";
      } else if (res.msg) {
        alert(data.message)
      }
    })
    .catch();
};

document
  .getElementById("edit-form")
  .addEventListener("submit", changeDestination);

