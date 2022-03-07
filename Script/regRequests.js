import { users } from "./SystemArrays.js";
import { getEmpBy } from "./SystemFunctions.js";

export function loadRegRequests() {
  if ($("#regrequests tbody").children().length == 0) {
    for (let i = 0; i < users.length; i++) {
      if (!users[i].isConfirmed) {
        let emp = getEmpBy("id", users[i].id);
        $("#regrequests tbody").append(`<tr>
              <th scope="row">${emp.id}</th>
              <td>${emp.fname} ${emp.lname}</td>
              <td><input type="radio" class="btn-check check" name="options-outlined" id="conf${i}" autocomplete="off">
              <label class="btn btn-outline-success" for="conf${i}">Confirm</label></td>
            </tr>`);
      }
    }
    $(".check").click(function () {
      if ($(this).is(":checked")) {
        let conf = confirm("Do you want to confirm this employee?");
        if (conf) {
          let confId = $(this).parent().parent().children(":first").text();
          for (let i = 0; i < users.length; i++) {
            if (confId == users[i].id) {
              users[i].isConfirmed = true;
              localStorage.setItem("users", JSON.stringify(users));
              break;
            }
          }
          $(this).parent().parent().hide(500);
        } else {
          $(this).prop("checked", false);
        }
      }
    });
  }
}
