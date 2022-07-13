const register = (e) => {
  e.preventDefault();

  const url = "https://backfiles.herokuapp.com";
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
      console.log("this is res",res)
      if (res.token) {
        localStorage.setItem("token", res.token);
        const token = localStorage.getItem("token");
        const tokens = JSON.parse(atob(token.split(".")[1]));
        localStorage.setItem("role", tokens.role);

        const role = localStorage.getItem("role");
        if (role === "user") {
          alert("login succesful!");
          window.location.href = "./order.html";
        } else {
          window.location.href = "./admin.html";
        }
      } else {
        alert(res.message)
        const emailError = document.querySelector(".errMsgs");
        emailError.innerHTML = res.errors.email;
        emailError.style.color = "red";

        const errName = document.querySelector(".nameError");
        errName.innerHTML = res.errors.name;
        errName.style.color = "red";
      }
    })
    .catch();

  document.querySelector(".name").addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value = e.target.value.trim();
  });
  document.querySelector(".email").addEventListener("input", function (e) {
    e.preventDefault();
    e.target.value = e.target.value.trim();
  });
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
  const pattern = /^(\+|00)[0-9]{1,3}[0-9]{7,14}(?:x.+)?$/;

  if (phone.match(pattern)) {
    errorMsg.innerHTML = "";
  } else {
    errorMsg.innerHTML =
      "Phone number should be atleast (8)characters! & should contain a country code";
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
  text.style.color = "red";
});

const email = document.querySelector(".email");
const emailError = document.querySelector(".errMsgs");
function emailvalid() {
  const email = document.querySelector(".email").value;
  const emailError = document.querySelector(".errMsgs");
  const patterns = /[A-Za-z0-9]{1,100}/;

  if (email.match(patterns)) {
    emailError.innerHTML = "";
  } else {
   /* emailError.innerHTML = "Invalid email address <br>(please input a valid email address)";
    emailError.style.color = "red";*/
  }
  if (email === "") {
    emailError.innerHTML = "";
  }
}
email.addEventListener("change",  () =>{
  emailvalid();
  words.innerHTML = "";
});
email.addEventListener("click", () => {
  words.style.color = "red";
})

document.querySelector(".signUp").addEventListener("click", register);
