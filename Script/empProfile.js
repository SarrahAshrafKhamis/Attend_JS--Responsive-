import { employees } from "./SystemArrays.js";
import { getCurrentEmp } from "./SystemFunctions.js";

export function loadEmpProfile() {
  let emp = getCurrentEmp();

  let fname = $("#fname");
  let lname = $("#lname");
  let address = $("#address");
  let email = $("#email");
  let age = $("#age");
  fname.html(emp.fname);
  lname.html(emp.lname);
  address.html(emp.address);
  email.html(emp.email);
  age.html(emp.age);

  let editbtn = $("#editbtn");

  editbtn.click(function () {
    fname.html(
      `<input type='text' class='fname form-control' value='${emp.fname}'/>`
    );
    lname.html(
      `<input type='text' class='lname form-control' value='${emp.lname}'/>`
    );
    address.html(
      `<input type='text' class='address form-control' value='${emp.address}'/>`
    );
    email.html(
      `<input type='email' class='email form-control' value='${emp.email}'/>`
    );
    age.html(
      `<input type='number' min='20' max='65' class='age form-control' value='${emp.age}'/>`
    );

    $(".fname").blur(validateFname);
    $(".lname").blur(validateLname);
    $(".address").blur(validateAddress);
    $(".email").blur(validateEmail);
    $(".age").blur(validateAge);

    editbtn.css("display", "none");
    editbtn
      .parent()
      .append(
        `<button id='cancelbtn' class="btn btn-outline-danger">Cancel</button>`
      );
    editbtn
      .parent()
      .append(
        `<button id='savebtn' class="btn btn-outline-success">Save</button>`
      );
    $("#cancelbtn").click(cancelClick);
    $("#savebtn").click(saveClick);
  });

  function cancelClick() {
    Swal.fire({
      icon: "question",
      title: "Discard changes?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }
  function saveClick() {
    if (
      isValidRegister(
        $(".fname").val(),
        $(".lname").val(),
        $(".address").val(),
        $(".email").val(),
        $(".age").val()
      )
    ) {
      for (let i = 0; i < employees.length; i++) {
        if (employees[i].id == emp.id) {
          employees[i].fname = $(".fname").val();
          employees[i].lname = $(".lname").val();
          employees[i].address = $(".address").val();
          employees[i].age = $(".age").val();
          employees[i].email = $(".email").val();
          localStorage.setItem("employees", JSON.stringify(employees));

          Swal.fire("Saved!", "", "success");
          setTimeout(() => {
            Swal.close();
            location.reload();
          }, 1500);
          break;
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Can't save",
        text: "Enter valid data!",
      });
      validateFname();
      validateLname();
      validateAddress();
      validateEmail();
      validateAge();
    }
  }

  let nameReg = /^[A-Za-z]+$/;
  let emailReg = /^(([\w\.-])+)@([a-zA-Z0-9\-])+\.([a-zA-Z]){2,3}$/;

  function isValidName(n) {
    return nameReg.test(n);
  }

  function isValidAddress(ad) {
    return ad != "";
  }

  function isValidEmail(em) {
    return emailReg.test(em);
  }

  function isValidAge(age) {
    return !(age == "" || age < 20 || age > 65);
  }

  function isValidRegister(fname, lname, address, email, age) {
    return (
      isValidName(fname) &&
      isValidName(lname) &&
      isValidAddress(address) &&
      isValidEmail(email) &&
      !isDuplicateEmail() &&
      isValidAge(age)
    );
  }

  function validateFname() {
    if (isValidName($(".fname").val())) {
      $("#fnameerrorrow").css("display", "none");
      $("#fnameerror").css("display", "none");
    } else {
      $("#fnameerrorrow").css("display", "");
      $("#fnameerror").css("display", "block");
    }
  }

  function validateLname() {
    if (isValidName($(".lname").val())) {
      $("#lnameerrorrow").css("display", "none");
      $("#lnameerror").css("display", "none");
    } else {
      $("#lnameerrorrow").css("display", "");
      $("#lnameerror").css("display", "block");
    }
  }

  function validateAddress() {
    if (isValidAddress($(".address").val())) {
      $("#addresserrorrow").css("display", "none");
      $("#addresserror").css("display", "none");
    } else {
      $("#addresserrorrow").css("display", "");
      $("#addresserror").css("display", "block");
    }
  }

  function isDuplicateEmail() {
    for (let i = 0; i < employees.length; i++) {
      if (
        $(".email").val() == employees[i].email &&
        emp.id != employees[i].id
      ) {
        return true;
      }
    }
    return false;
  }

  function validateEmail() {
    if (isDuplicateEmail()) {
      $("#emailerrorrow").css("display", "");
      $("#emailerror").text("Duplicated email");
      $("#emailerror").css("display", "block");
    } else if (isValidEmail($(".email").val())) {
      $("#emailerrorrow").css("display", "none");
      $("#emailerror").css("display", "none");
    } else {
      $("#emailerrorrow").css("display", "");
      $("#emailerror").text("Enter valid email");
      $("#emailerror").css("display", "block");
    }
  }

  function validateAge() {
    if (isValidAge($(".age").val())) {
      $("#ageerrorrow").css("display", "none");
      $("#ageerror").css("display", "none");
    } else {
      $("#ageerrorrow").css("display", "");
      $("#ageerror").css("display", "block");
    }
  }
}
