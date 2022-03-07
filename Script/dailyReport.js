import { employees } from "./SystemArrays.js";
import { getDailyReport, getUserBy, isWeekend } from "./SystemFunctions.js";

export function loadDailyReport() {
  if ($("#daily tbody").children().length == 0) {
    let d = new Date().toLocaleDateString();
    if (isWeekend(d)) {
      $("#daily").css("display", "none");
      $("#daily")
        .parent()
        .append(`<h2 style='text-align:center;'>It's the <i>Weekend!</i></h2>`);
    } else {
      for (let i = 0; i < employees.length; i++) {
        let id = employees[i].id;
        let dayrep = getDailyReport(d, id);
        $("#daily tbody").append(`
                 <tr>
                    <th scope="row">${
                      getUserBy("id", employees[i].id).username
                    }</th>
                    <td>${employees[i].fname} ${employees[i].lname}</td>
                     <td>${dayrep.status}</td>
                     <td>${dayrep.in}</td>
                     <td>${dayrep.latein}</td>
                     <td>${dayrep.exin}</td>
                     <td>${dayrep.out}</td>
                     <td>${dayrep.lateout}</td>
                     <td>${dayrep.exout}</td>
                 </tr>`);
      }
    }
  }
}
