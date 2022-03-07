import { User } from "./SystemClasses.js";

let feedback;
if (JSON.parse(localStorage.getItem("feedback"))) {
  feedback = JSON.parse(localStorage.getItem("feedback"));
} else {
  feedback = [
    {
      name: "Ahmad Mahmoud",
      feed: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      rating: 5,
    },
    {
      name: "Ali Gamal",
      feed: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
      rating: 3.5,
    },
    {
      name: "Fares Mustafa",
      feed: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.",
      rating: 2.5,
    },
  ];
  localStorage.setItem("feedback", JSON.stringify(feedback));
}

let employees;
if (JSON.parse(localStorage.getItem("employees"))) {
  employees = JSON.parse(localStorage.getItem("employees"));
} else {
  employees = [];
}

let users;
if (JSON.parse(localStorage.getItem("users"))) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
  let adminUser = new User(1, "skhamis", 123, true, false, true);
  users.push(adminUser);
  localStorage.setItem("users", JSON.stringify(users));
}

let attends;
if (JSON.parse(localStorage.getItem("attends"))) {
  attends = JSON.parse(localStorage.getItem("attends"));
} else {
  attends = [];
}

let missedTimes;
if (JSON.parse(localStorage.getItem("missedtimes"))) {
  missedTimes = JSON.parse(localStorage.getItem("missedtimes"));
} else {
  missedTimes = [];
}

export { employees, users, attends, missedTimes, feedback };
