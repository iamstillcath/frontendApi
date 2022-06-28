console.log("this is here")
const login = (e) => {
  e.preventDefault();

  const url="https://backfiles.herokuapp.com"

  fetch(`${url}/user/login`, {
    method: "POST",
    headers: {
      Accept: "application/json, text/plain, */*", "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      email: document.querySelector(".email").value,
      password: document.querySelector(".pass").value,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log("this is res",res)
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem('role', res.role);

        const role=localStorage.getItem('role');
        if(role ==="user"){
        alert("login succesful!");
        window.location.href = "./order.html"
        }else{ window.location.href = "./admin.html"
      }
      } else {
        alert(res.message);
      }
    })
    .catch() ;
};

document.querySelector(".loginBtn").addEventListener("click", login);
