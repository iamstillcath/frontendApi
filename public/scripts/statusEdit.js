const token = localStorage.getItem("token");
const id = localStorage.getItem("orderId");

if (!token) {
  window.location.href = "./login.html";
}

const url = "https://backfiles.herokuapp.com";
const changeStatus = (e) => {
  e.preventDefault();
  fetch(`${url}/parcels/${id}/status`, {
    method: "PUT",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      orderId: id,
      status: document.getElementById("status").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 1) {
        alert("Status changed successfully!");
        window.location.href = "./admin.html";
      } else {
        alert(res.error);
      }
    })
    .catch();
};

document.getElementById("status-form").addEventListener("submit", changeStatus);
