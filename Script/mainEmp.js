import { loadEmpDailyReport } from "./empDailyReport.js";
import { loadEmpMonthlyReport } from "./empMonthlyReport.js";
import { loadEmpProfile } from "./empProfile.js";
import { loadEmpAttendance } from "./empAttendance.js";
import { getCurrentUser, getCurrentEmp } from "./SystemFunctions.js";

$(function () {
  $("#linkdaily").click();
  let currentuser = getCurrentUser();
  let currentemp = getCurrentEmp();
  if (!currentuser.isSecurity) {
    $("#linkattendance").css("display", "none");
  }
  $("#namebtn").text(`${currentemp.fname} ${currentemp.lname}`);
  $("#namebtn").css("textTransform", "capitalize");
});

$("a").click((e) => {
  $("#empwrapper")
    .children()
    .each((i, el) => {
      $(el).css("display", "none");
    });

  switch (e.target.id) {
    case "linkdaily":
      $("#daily").css("display", "");
      loadEmpDailyReport();
      break;

    case "linkmonthly":
      $("#monthly").css("display", "");
      loadEmpMonthlyReport();
      break;

    case "linkprofile":
      $("#profile").css("display", "");
      loadEmpProfile();
      break;

    case "linkattendance":
      $("#attendance").css("display", "");
      loadEmpAttendance();
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
});
