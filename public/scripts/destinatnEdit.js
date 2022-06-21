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
    .then(res => {
      if (res.token) {
        alert("Destination changed successfully!");
        window.location.href = "./user.html";
      } else if (res) {
        alert(res.error)
      }
    })
    .catch();
};

document
  .getElementById("edit-form")
  .addEventListener("submit", changeDestination);

