const API_KEY = "cac778da";

var page = 1;
var searchTerm = "star wars";

var container = document.getElementById("movies-container");
var loadMoreButton = document.getElementById("load-more");
var searchInput = document.getElementById("search-input");

function loadMovies(clear) {

  if (clear === true) {
    container.innerHTML = "";
  }

  fetch("https://www.omdbapi.com/?apikey=" + API_KEY + "&s=" + searchTerm + "&page=" + page)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      if (data.Search == undefined) {
        return;
      }

      for (var i = 0; i < data.Search.length; i++) {

        var movie = data.Search[i];

        container.innerHTML =
          container.innerHTML +
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

searchInput.oninput = function (event) {

  if (event.target.value.trim() === "") {
    searchTerm = "avengers";
  } else {
    searchTerm = event.target.value;
  }

  page = 1;
  loadMovies(true);
};

loadMovies(true);
