import { Attendance, MissedTime } from "./SystemClasses.js";
import { users, attends, missedTimes } from "./SystemArrays.js";
import { isWeekend } from "./SystemFunctions.js";

export function loadEmpAttendance() {
  let user;
  let username = document.getElementById("username");
  let invalidusername = $("#invalidusername");
  let form = document.getElementById("attendanceform");
  form.addEventListener(
    "submit",
    function (event) {
      username.setCustomValidity("");
      username.classList.replace("is-invalid", "is-valid");
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        function getUser() {
          for (let i = 0; i < users.length; i++) {
            if (users[i].username == username.value) {
              user = users[i];
              break;
            }
          }
        }
        getUser();
        if (!user) {
          form.classList.remove("was-validated");
          username.setCustomValidity("not found");
          invalidusername.text("Username is not found.");
          username.classList.add("is-invalid");
          event.preventDefault();
          event.stopPropagation();
        } else {
          username.setCustomValidity("");
          username.classList.replace("is-invalid", "is-valid");
          if (username.value != "") {
            event.preventDefault();
            event.stopPropagation();
            console.log("attendance");
            let settings = JSON.parse(localStorage.getItem("settings"));
            let intime = settings.intime;
            let outtime = settings.outtime;
            let inH = parseInt(intime.substring(0, 2));
            let inM = parseInt(intime.substring(3));
            let outH = parseInt(outtime.substring(0, 2));
            let outM = parseInt(outtime.substring(3));

            function SignIn(time, id) {
              let nowdate = time.toLocaleDateString();
              let nowH = time.getHours();
              let nowM = time.getMinutes();
              let attend;
              if (nowH > outH || (nowH == outH && nowM > outM)) {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Work day has ended!",
                });
              } else {
                if (nowH < inH || (nowH == inH && nowM < inM)) {
                  attend = new Attendance(id, nowdate, inH, inM, -1, -1);
                } else {
                  attend = new Attendance(id, nowdate, nowH, nowM, -1, -1);
                  if (nowH > inH || (nowH == inH && nowM > inM)) {
                    let lateM = Math.floor(
                      (time -
                        new Date(
                          time.getFullYear(),
                          time.getMonth(),
                          time.getDate(),
                          inH,
                          inM
                        )) /
                        60000
                    );

                    let confExcuse;
                    Swal.fire({
                      title:
                        "Late attendance: Does this employee have an excuse?",
                      showDenyButton: true,
                      confirmButtonText: "Yes",
                      denyButtonText: `No`,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        confExcuse = true;
                      } else if (result.isDenied) {
                        confExcuse = false;
                      }
                      let late = new MissedTime(
                        id,
                        nowdate,
                        lateM,
                        true,
                        confExcuse
                      );
                      missedTimes.push(late);
                      localStorage.setItem(
                        "missedtimes",
                        JSON.stringify(missedTimes)
                      );
                    });
                  }
                }
                attends.push(attend);
                localStorage.setItem("attends", JSON.stringify(attends));
                Swal.fire("Signed in!", "", "success");
              }
            }

            function SignOut(time, id, i) {
              let nowdate = time.toLocaleDateString();
              let nowH = time.getHours();
              let nowM = time.getMinutes();
              if (nowH < outH || (nowH == outH && nowM < outM)) {
                let confExcuse;
                Swal.fire({
                  icon: "info",
                  title: "Early signout: Does this employee has an excuse?",
                  showDenyButton: true,
                  confirmButtonText: "Yes",
                  denyButtonText: `No`,
                }).then((result) => {
                  if (result.isConfirmed) {
                    confExcuse = true;
                  } else if (result.isDenied) {
                    confExcuse = false;
                  }
                  attends[i].signoutH = nowH;
                  attends[i].signoutM = nowM;

                  let earlyM = Math.floor(
                    (new Date(
                      time.getFullYear(),
                      time.getMonth(),
                      time.getDate(),
                      outH,
                      outM
                    ) -
                      time) /
                      60000
                  );
                  let earlyout = new MissedTime(
                    id,
                    nowdate,
                    earlyM,
                    false,
                    confExcuse
                  );

                  missedTimes.push(earlyout);
                  localStorage.setItem(
                    "missedtimes",
                    JSON.stringify(missedTimes)
                  );
                  localStorage.setItem("attends", JSON.stringify(attends));
                });
              }
            }

            function autoSignOut() {
              let now = new Date();
              let timeToAutoOut =
                new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate(),
                  outH,
                  outM
                ) - now;
              if (timeToAutoOut < 0) {
                timeToAutoOut == 0;
              }
              setTimeout(function () {
                for (let i = 0; i < attends.length; i++) {
                  if (attends[i].signoutH == -1) {
                    attends[i].signoutH = outH;
                    attends[i].signoutM = outM;
                    localStorage.setItem("attends", JSON.stringify(attends));
                  }
                }
              }, timeToAutoOut);
            }
            autoSignOut();
            if (isWeekend(new Date())) {
              Swal.fire({
                icon: "info",
                title: "Weedend",
                text: "It's the weekend!",
              });
            } else {
              let now = new Date();
              let nowdate = now.toLocaleDateString();
              if (attends.length == 0) {
                SignIn(now, user.id);
              } else {
                let signedin = false;
                for (let i = 0; i < attends.length; i++) {
                  if (
                    attends[i].date == nowdate &&
                    attends[i].empid == user.id
                  ) {
                    signedin = true;
                    if (attends[i].signoutH == -1) {
                      SignOut(now, user.id, i);
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Already signed out!",
                      });
                    }
                  }
                }
                if (!signedin) {
                  SignIn(now, user.id);
                }
              }
            }
          }
        }
      }
      form.classList.add("was-validated");
    },
    false
  );
}
