//feedback component
(function () {
  let feeds = JSON.parse(localStorage.getItem("feedback"));
  let img;
  for (let i = 0; i < feeds.length; i++) {
    img = i > 2 ? 0 : i;
    $("#feedimgswrapper").append(`<img
          src="./images/team-${img}.jpg"
          id="${i}"
          class="feedimg"
        />`);
    img++;
  }
})();
let rating;
$(".feedimg").click((e) => {
  let ind = e.target.id;
  let res = JSON.parse(localStorage.getItem("feedback"));
  rating = res[ind].rating;
  $("#feedname").text(res[ind].name);
  $("#feedbody").text(res[ind].feed);
  setRating(rating);
});
function setRating(n) {
  $("#rating").text("");
  for (let i = 0; i < Math.floor(n); i++) {
    $("#rating").append('<i class="fa-solid fa-star"></i>');
  }
  if (n % 1 !== 0) {
    $("#rating").append('<i class="fa-solid fa-star-half-stroke"></i>');
  }
}
$("#0").click();
