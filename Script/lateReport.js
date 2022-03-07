import { employees } from "./SystemArrays.js";
import { getMonthlyReport, getUserBy } from "./SystemFunctions.js";

export function loadLateReport() {
  if ($("#late tbody").children().length == 0) {
    for (let i = 0; i < employees.length; i++) {
      let emp = employees[i];
      let monthly = getMonthlyReport(new Date(), emp.id);
      $("#late tbody").append(`
           <tr>
               <th scope="row">${getUserBy("id", emp.id).username}</th>
               <td>${emp.fname} ${emp.lname}</td>
               <td>${monthly.Lates}</td>
           </tr>`);
    }
  }
}
