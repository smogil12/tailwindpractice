$(document).ready(function () {
  console.log("test2");
  var queryURL =
    "https://static.www.turnto.com/sitedata/qM9izDb9x6YaGMxsite/AQ0001-002/d/exportjson/lhuniZNPTi1LiGZLtF6vsZHYgvHYauth";
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var results = response.events;

    for (var i = 0; i < results.length; i++) {
      console.log(results);
      var statdiv = $("<div>");

      var rating = results[i].rating;

      statdiv.prepend(rating);

      $("#skustats").prepend(statdiv);
      console.log(response.data);
    }
  });
});
