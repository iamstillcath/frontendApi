const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "./login.html";
}
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
      product: document.getElementById("product").value,
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
        document.getElementById("product").value = " ";
        document.getElementById("price").value = " ";
        document.getElementById("pickupLocation").value = " ";
        document.getElementById("currentLocation").value = " ";
        document.getElementById("destination").value = " ";
        document.getElementById("recipientName").value = " ";
        document.getElementById("recipientNumber").value = " ";
        window.location.href = "./user.html";
      } else {
        alert(data.message);
      }
    })
    .catch((error) => console.log("error occured", error));
};

document
  .getElementById("registration-form")
  .addEventListener("submit", theOrder);
