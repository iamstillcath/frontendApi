const url = "https://backfiles.herokuapp.com";
const register = (e) => {
  e.preventDefault();

  fetch(`${url}/user/signup`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
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
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("role", res.role);

        function parseJwt(token) {
          try {
            // Get Token Header
            const base64HeaderUrl = token.split('.')[0];
            const base64Header = base64HeaderUrl.replace('-', '+').replace('_', '/');
            const headerData = JSON.parse(window.atob(base64Header));
        
            // Get Token payload and date's
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const dataJWT = JSON.parse(window.atob(base64));
            dataJWT.header = headerData;
        
        // TODO: add expiration at check ...
        
            return dataJWT;
          } catch (err) {
            return false;
          }
        }
        
        const jwtDecoded = parseJwt('YOUR_TOKEN') ;
        if(jwtDecoded)
        {
            console.log(jwtDecoded)
        }


        // const role = localStorage.getItem("role");
        if (role === "user") {
          alert("login succesful!");
          window.location.href = "./order.html";
        } else {
          window.location.href = "./admin.html";
        }
      } else {
        alert(res.message);
      }
    })
    .catch();

  document.querySelector(".name").value = "";
  document.querySelector('.name').addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value = e.target.value.trim()
})
  document.querySelector(".email").value = "";
  document.querySelector('.email').addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value = e.target.value.trim()
})
  document.querySelector(".pass").value = "";
  document.querySelector(".compass").value = "";
  document.querySelector(".phoneNumber").value = "";
  document.querySelector(".address").value = "";
  document.querySelector('.address').addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value = e.target.value.trim()
})
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
const phone = document.querySelector(".phoneNumber");
const errorMsg = document.querySelector(".errMsg");
const text = document.querySelector(".text");
function phonevalid() {
  const phone = document.querySelector(".phoneNumber").value;
  const errorMsg = document.querySelector(".errMsg");
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
}
phone.addEventListener("change", function () {
  phonevalid();
  text.innerHTML = "";
});
phone.addEventListener("click", () => {
  text.innerHTML = "phone number must include a country code";
  text.style.color = "red";
});
document.querySelector(".signUp").addEventListener("click", register);
