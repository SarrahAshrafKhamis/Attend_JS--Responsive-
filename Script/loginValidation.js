import { users } from "./SystemArrays.js";

let username = document.getElementById("username");
let password = document.getElementById("password");
let invalidusername = $("#invalidusername");
let invalidpassword = $("#invalidpassword");
let loginmodal = $("#loginmodal");
let user;
(function () {
  let form = document.getElementById("loginform");
  form.addEventListener(
    "submit",
    function (event) {
      username.setCustomValidity("");
      username.classList.replace("is-invalid", "is-valid");
      password.setCustomValidity("");
      password.classList.replace("is-invalid", "is-valid");
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        getUser();
        if (!user) {
          form.classList.remove("was-validated");
          username.setCustomValidity("not found");
          invalidusername.text("Username is not found.");
          username.classList.add("is-invalid");
          event.preventDefault();
          event.stopPropagation();
        } else if (isWrongPassword()) {
          form.classList.remove("was-validated");
          username.setCustomValidity("");
          username.classList.replace("is-invalid", "is-valid");
          password.setCustomValidity("wrong");
          invalidpassword.text("Wrong password.");
          password.classList.add("is-invalid");
          event.preventDefault();
          event.stopPropagation();
        } else if (isNotConfirmed()) {
          Swal.fire({
            icon: "error",
            title: "Can't login",
            text: "Your account is not confirmed yet!",
          });
          setTimeout(() => {
            Swal.close();
            loginmodal.modal("hide");
          }, 2000);
        } else {
          username.setCustomValidity("");
          password.setCustomValidity("");
          username.classList.replace("is-invalid", "is-valid");
          password.classList.replace("is-invalid", "is-valid");
          if (username.value != "" && password.value != "") {
            event.preventDefault();
            event.stopPropagation();
            console.log("loggedin");
            if (user.isAdmin) {
              setTimeout(() => {
                loginmodal.modal("hide");
                window.location.href = "admin.html";
              }, 500);
            } else {
              localStorage.setItem("currentuserid", user.id);
              window.location.href = "employee.html";
            }
          }
        }
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

function getUser() {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username == username.value) {
      user = users[i];
      break;
    }
  }
}

function isWrongPassword() {
  if (user.password == password.value) {
    return false;
  }
  return true;
}
function isNotConfirmed() {
  return !user.isConfirmed;
}
