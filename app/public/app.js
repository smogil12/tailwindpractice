$(document).ready(function () {
  var gifbuttons = [
    "Steph Curry",
    "Kevin Durrant",
    "Lebron James",
    "James Harden",
    "Kyrie Irving",
    "Kemba Walker",
    "Lou Will",
    "Ben Simmons",
    "Zion Williamson",
    "Russel Westbrook",
    "Anthony Davis",
    "Kawhi Leonard",
    "Paul George",
    "Joel Embiid",
    "Giannis Antetokounmpo",
  ];

  console.log(gifbuttons);

  for (var i = 0; i < gifbuttons.length; i++) {
    var buttons = $("<button>" + gifbuttons[i] + "</button>");
    $("#gifbutton").append(buttons);
    buttons.attr("data-buttonvalue", gifbuttons[i]);
    buttons.addClass("player-button");
  }

  $("#addPlayer").on("click", function (event) {
    event.preventDefault();
    var searchInput = $("#player-input").val();
    gifbuttons.push(searchInput);
    var button = $("<button>").text(searchInput);
    button.attr("data-buttonvalue", searchInput);
    button.addClass("player-button");
    $("#gifbutton").append(button);
    $("#player-input").val("");
    console.log(searchInput);
  });

  $(document).on("click", ".player-button", function () {
    var person = $(this).attr("data-buttonvalue");
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?q=" +
      person +
      "&api_key=lNEJ78XOZpezg21dhYnzrVW02tGAs3V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-state", "still");
        personImage.attr(
          "data-still",
          results[i].images.fixed_height_still.url
        );
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.addClass("showImage");

        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $("#gifs").prepend(gifDiv);
        console.log(response.data);
      }
    });
  });

  $(document).on("click", ".showImage", function () {
    var state = $(this).data("state");
    if (state == "still") {
      console.log("still image works");
      $(this).attr("src", $(this).data("animate")).data("state", "animate");
    } else {
      console.log("animated image works");
      $(this).attr("src", $(this).data("still")).data("state", "still");
    }
  });
});
