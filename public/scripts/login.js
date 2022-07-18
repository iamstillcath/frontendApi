console.log("this is here");

const login = (e) => {
  e.preventDefault();

  const url = "https://backfiles.herokuapp.com";

  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: document.querySelector(".email").value,

      password: document.querySelector(".pass").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
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
        alert(res.message);
      }
    })
    .catch();
};


const email = document.querySelector(".email");
const emailError = document.querySelector(".errMsgs");
const words = document.querySelector(".word");
function emailvalid() {
  const email = document.querySelector(".email").value;
  const emailError = document.querySelector(".errMsgs");
  const patterns = /[A-Za-z0-9]{1,100}/;

  if (email.match(patterns)) {
    emailError.innerHTML = "";
  } else {
    emailError.innerHTML = "Invalid email address <br>(please input a valid email address)";
    emailError.style.color = "red";
  }
  if (email === "") {
    emailError.innerHTML = "";
  }
}
email.addEventListener("change", function () {
  emailvalid();
  words.innerHTML = "";
});
email.addEventListener("click", () => {
  words.style.color = "red";
})


document.querySelector("#loginpage").addEventListener("submit", login);
