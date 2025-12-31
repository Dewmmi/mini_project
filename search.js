document.addEventListener("DOMContentLoaded", function () {

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

        if (!data.Search) return;

        for (var i = 0; i < data.Search.length; i++) {

          var movie = data.Search[i];

          container.innerHTML +=
            "<div class='movie'>" +
              "<img src='" + movie.Poster + "' alt='" + movie.Title + "'>" +
              "<h3>" + movie.Title + "</h3>" +
              "<a href='movie.html?id=" + movie.imdbID + "'>Details</a>" +
            "</div>";
        }
      });
  }

  loadMoreButton.onclick = function () {
    page++;
    loadMovies(false);
  };

  searchInput.oninput = function (event) {
    searchTerm = event.target.value.trim() || "avengers";
    page = 1;
    loadMovies(true);
  };

  loadMovies(true);

});
