import { loadRegRequests } from "./regRequests.js";
import { loadDailyReport } from "./dailyReport.js";
import { loadAllEmpsReport } from "./allEmpsReport.js";
import { loadMonthlyReport } from "./monthlyReport.js";
import { loadLateReport } from "./lateReport.js";
import { loadExecuseReport } from "./execuseReport.js";
import { loadEmpBriefReport } from "./empBrief.js";

$(function () {
  $("#linkreqreq").click();
});

$("a").click((e) => {
  if (e.target.id != "navbarDropdownMenuLink" && e.target.id != "linkregsec") {
    $("#adminwrapper")
      .children()
      .each((i, el) => {
        $(el).css("display", "none");
      });

    switch (e.target.id) {
      case "linkreqreq":
        $("#regrequests").css("display", "");
        loadRegRequests();
        break;

      case "linkallemps":
        $("#allemps").css("display", "");
        loadAllEmpsReport();
        break;

      case "linkdaily":
        $("#daily").css("display", "");
        loadDailyReport();
        break;

      case "linkmonthly":
        $("#monthly").css("display", "");
        loadMonthlyReport();
        break;

      case "linklate":
        $("#late").css("display", "");
        loadLateReport();
        break;

      case "linkexecuse":
        $("#execuse").css("display", "");
        loadExecuseReport();
        break;

      case "linkbrief":
        $("#briefdiv").css("display", "");
        loadEmpBriefReport();
        break;

      case "linksettings":
        $("#settings").css("display", "");
        break;
    }
  }
});
