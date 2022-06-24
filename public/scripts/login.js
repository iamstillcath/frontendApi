const login = (e) => {
  e.preventDefault();

  fetch("/master--frontendapi.netlify.app/user/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
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
        localStorage.setItem('role', res.role);

        const role=localStorage.getItem('role');
        if(role==="user"){
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
