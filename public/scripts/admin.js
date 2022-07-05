const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "./login.html";
}

const logout = document.getElementById("logout");

logout.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./login.html";
});
const url = "https://backfiles.herokuapp.com";
const userId = localStorage.getItem("userId");
fetch(`${url}/parcels`, {
  method: "GET",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const ordersTable = document.querySelector(".parcelDetails");
    if (!data.length) {
      document.querySelector("#error-msg").innerHTML =
        "You do not have any Parcel Delivery Order yet";
    } else {
      data.sort((a, b) => a.id - b.id);
      renderTableData(data, ordersTable);
    }
  });

const renderTableData = (data, ordersTable) => {
  data.forEach((output) => {
    let outputRow = document.createElement("tr");
    outputRow.innerHTML = `<th scope="row">${output._id}</th>
                        <td>${output.itemDescription}</td>
                        <td>${"₦" + output.price + ":00"}</td>
                        <td>${output.pickupLocation}</td>
                        <td class="remove-second">${output.destination}</td>
                        <td>${output.currentLocation}</td>
                        <td>${output.recipientName}</td>
                        <td>${output.recipientNumber}</td>
                        <td>${output.status}</td>
                           `;
    ordersTable.append(outputRow);

    const dest = document.createElement("h2");
    dest.innerHTML = `<i class="fas fa-edit"></i>`;
    dest.className = "locat";
    outputRow.append(dest);

    const status = document.createElement("h2");
    status.className = "destinationh";
    status.innerHTML = `<a href="/status.html"><i class="far fa-compass"></i>`;
    outputRow.append(status);

    dest.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "/currentLocation.html";
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
    });

    status.addEventListener("click", function (e) {
      e.preventDefault();
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
      window.location.href = "/status.html";
    });
  });
};
