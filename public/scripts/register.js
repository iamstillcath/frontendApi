 const url="https://backfiles.herokuapp.com"
const register = (e) => {
  e.preventDefault();

  fetch(`${url}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json/x-www-form-urlencoded",
    },
    body: JSON.stringify({
      name: document.querySelector(".name").value,
      email: document.querySelector(".email").value,
      password: document.querySelector(".pass").value,
      confirmPassword: document.querySelector(".compass").value,
      phoneNumber: document.querySelector(".phoneNumber").value,
      address: document.querySelector(".address").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);

        const role = localStorage.getItem("role");
        if (role === "user") {
          alert("login succesful!");
          window.location.href = "./order.html";
        } else {
          window.location.href = "./admin.html";
        }
      } else {
        alert("invalid field input");
      }
    })
    .catch();

  document.querySelector(".name").value = "";
  document.querySelector(".email").value = "";
  document.querySelector(".pass").value = "";
  document.querySelector(".compass").value = "";
  document.querySelector(".phoneNumber").value = "";
  document.querySelector(".address").value = "";
};

const passvalid = document.querySelector(".pass");
const compassvalid = document.querySelector(".compass");
const compasserr = document.querySelector(".passMsg");

compassvalid.addEventListener("mouseout", function (e) {
  e.preventDefault();

  if (compassvalid.value === passvalid.value) {
    compasserr.innerHTML = "";
  } else {
    compasserr.innerHTML = "password does not match";
    compasserr.style.color = "red";
  }
  if (compassvalid.value === "") {
    compasserr.innerHTML = "";
  }
});

function phonevalid() {
  const phone = document.querySelector(".phoneNumber").value;
  const errorMsg = document.querySelector(".errMsg");
  const text = document.querySelector(".text");
  const pattern = /^(\+|00)[0-9]{1,3}[0-9]{4,14}(?:x.+)?$/;

  if (phone.match(pattern)) {
    errorMsg.innerHTML = "";
  } else {
    errorMsg.innerHTML = "invalid phone number";
    errorMsg.style.color = "red";
  }
  if (phone === "") {
    errorMsg.innerHTML = "";
  }

  phone.addEventListener("change", () => {
    phonevalid();
    text.innerHTML = "";
  });
}
document.querySelector(".signUp").addEventListener("click", register);
