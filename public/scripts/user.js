const url = "https://backfiles.herokuapp.com";
const userId = localStorage.getItem("userId");


fetch(`${url}/parcels/user`, {
  method: "GET",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const orderTable = document.querySelector(".allParcels");
    if (!data.length) {
      document.querySelector("#error-msg").innerHTML =
        "You do not have any Order yet";
    } else {
      data.sort((adm, us) => adm._id - us._id);
      renderTableData(data, orderTable);

      document.getElementById("orders").innerHTML = `${data.length}`;

      const createdOrders = data.filter(
        (stat) => stat.status === "created"
      ).length;
      document.getElementById("created").innerHTML = `${createdOrders}`;

      const Intransit = data.filter(
        (stat) => stat.status === "in-transit"
      ).length;
      document.getElementById("in-transit").innerHTML = `${Intransit}`;

      const Delivered = data.filter(
        (stat) => stat.status === "delivered"
      ).length;
      document.getElementById("delivered").innerHTML = `${Delivered}`;
    }
  });

const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "./login.html";
});

const renderTableData = (data, orderTable) => {
  data.forEach((output) => {
    let parcelRow = document.createElement("tr");
    parcelRow.innerHTML = `<th scope="row">${output._id}</th>
                          <td>${output.itemDescription}</td>
                          <td>${"₦" + output.price + ":00"}</td>
                          <td>${output.pickupLocation}</td>
                          <td class="remove-second">${output.destination}</td>
                          <td>${output.currentLocation}</td>
                          <td>${output.recipientName}</td>
                          <td>${output.recipientNumber}</td>
                          <td>${output.status}</td>
                           `;
    orderTable.append(parcelRow);

    const dest = document.createElement("h2");
    dest.innerHTML = `<i class="fas fa-edit"></i>`;
    parcelRow.append(dest);

    const cancel = document.createElement("h2");
    cancel.innerHTML = `<a href="./delete.html"> <i class="fas fa-times"></i></a>`;
    parcelRow.append(cancel);

    dest.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "destinatnEdit.html";
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
    });

    cancel.addEventListener("click", function (e) {
      e.preventDefault();
      const trIid = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trIid);
      const id = localStorage.getItem("orderId");
      console.log("this is trid delete", trIid);
      const url = "https://backfiles.herokuapp.com";
      const deleted = confirm("do u want to delete");
      if (deleted) {
        fetch(`${url}/parcels/${id}/delete`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            orderId: id,
          }),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.message === "Order Deleted") {
              window.location.href = "user.html";
              alert("Order successfully Deleted!");
              window.location.href = "user.html";
            } else {
              alert(res.error);
            }
          })
          .catch();
      }
      const trId = e.target.closest("tr").children[0].innerHTML;
      localStorage.setItem("orderId", trId);
    });
  });
};
