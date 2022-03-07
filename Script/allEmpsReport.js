import { employees } from "./SystemArrays.js";
import { getUserBy } from "./SystemFunctions.js";

export function loadAllEmpsReport() {
  for (let i = 0; i < employees.length; i++) {
    $("#allemps tbody").append(`
        <tr>
            <th scope="row">${getUserBy("id", employees[i].id).username}</th>
            <td>${employees[i].fname} ${employees[i].lname}</td>
            <td>${employees[i].address}</td>
            <td>${employees[i].email}</td>
            <td>${employees[i].age}</td>
        </tr>`);
  }
}
