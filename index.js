const API_KEY = "cac778da";

var page = 1;
var searchTerm = "star wars";

var container = document.getElementById("movies-container");
var loadMoreButton = document.getElementById("load-more");

function loadMovies(clear) {

  if (clear === true) {
    container.innerHTML = "";
  }

  fetch("https://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + searchTerm + "&page=" + page)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      for (var i = 0; i < data.Search.length; i++) {

        var movie = data.Search[i];

        container.innerHTML = container.innerHTML +
          "<div class='movie'>" +
            "<img src='" + movie.Poster + "' alt='" + movie.Title + "'>" +
            "<h3>" + movie.Title + "</h3>" +
            "<a href='movie.html?id=" + movie.imdbID + "'>Details</a>" +
          "</div>";
      }

    });
}

loadMoreButton.onclick = function () {
  page = page + 1;
  loadMovies(false);
};

loadMovies(true);