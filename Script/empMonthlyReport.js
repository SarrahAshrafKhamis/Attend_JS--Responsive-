import { getCurrentEmp, getMonthlyReport } from "./SystemFunctions.js";

export function loadEmpMonthlyReport() {
  if ($("#monthly tbody").children().length == 0) {
    let now = new Date();
    getMonthlyReport(now, getCurrentEmp().id, $("#monthly tbody"));
  }
}
