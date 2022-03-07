(function () {
  let feedback = [
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
  let img;
  for (let i = 0; i < feedback.length; i++) {
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
  let feedback = JSON.parse(localStorage.getItem("feedback"));
  rating = feedback[ind].rating;
  $("#feedname").text(feedback[ind].name);
  $("#feedbody").text(feedback[ind].feed);
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
