const token = localStorage.getItem('token');
const id=localStorage.getItem('orderId');


if(!token){
  window.location.href = './login.html';
}

const url="https://backfiles.herokuapp.com"
const changeDestination = e => {
  e.preventDefault();

  fetch(`${url}/parcels/${id}/destination`, {
    method: "PUT",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      destination: document.getElementById("destination").value,
    
    })
  })
    .then(res => res.json())
    .then(res => {
      if (res.message) {
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

