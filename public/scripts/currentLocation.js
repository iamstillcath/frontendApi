const token = localStorage.getItem('token');
const id=localStorage.getItem('orderId');
if(!token){
  window.location.href = './login.html';
}

const url="https://backfiles.herokuapp.com"
const currentLocation = e => {
  e.preventDefault();

  fetch(`${url}/parcels/${id}/currentLocation`, {
    method: "PUT",
    headers: {
      "Content-type": "application/x-www-form-urlencoded",
      Authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      orderId: id,
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

