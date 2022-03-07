import { employees, users } from "./SystemArrays.js";
import { Employee, User } from "./SystemClasses.js";

let fname = $("#firstname");
let lname = $("#lastname");
let address = $("#address");
let email = document.getElementById("email");
let age = $("#age");
let emailinvalid = $("#emailinvalid");
let regmodal = $("#registermodal");

//register form validation
(function () {
  emailjs.init("user_dgo3TTIQXi20QOS4Y7iwB");
  let form = document.getElementById("registerform");
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (isDuplicateEmail()) {
        email.setCustomValidity("duplicated");
        emailinvalid.text("This email is already registered.");
        email.classList.add("is-invalid");
        event.preventDefault();
        event.stopPropagation();
      } else {
        email.setCustomValidity("");
        email.classList.replace("is-invalid", "is-valid");
        if (email.value != "") {
          let emp = new Employee(
            fname.val(),
            lname.val(),
            address.val(),
            email.value,
            age.val()
          );
          let username = Math.random().toString(36).substring(2, 9);
          let password = Math.random().toString(36).substring(2, 9);
          let user = new User(emp.id, username, password, false, false, false);
          users.push(user);
          employees.push(emp);
          localStorage.setItem("employees", JSON.stringify(employees));
          localStorage.setItem("users", JSON.stringify(users));
          Swal.fire("Success!", "You registered successfully!", "success");

          emailjs
            .send("service_wzbz90i", "template_49i44mg", {
              to_name: `${fname.val()} ${lname.val()}`,
              from_name: "Company team",
              message: `username: ${username} ///
                  password: ${password}`,
              to_email: `${email.value}`,
            })
            .then(() => {
              regmodal.modal("hide");
              Swal.close();
            });
        }
      }
      form.classList.add("was-validated");
    },
    false
  );
})();

function isDuplicateEmail() {
  for (let i = 0; i < employees.length; i++) {
    if (email.value == employees[i].email) {
      return true;
    }
  }
  return false;
}
