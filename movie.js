const API_KEY = "cac778da";

var params = new URLSearchParams(window.location.search);
var movieId = params.get("id");

var container = document.getElementById("movie-container");

if (movieId == null) {
  container.innerHTML = "Film introuvable.";
}

function formatDate(date) {

  if (date == undefined || date == "N/A") {
    return "Non disponible";
  } else {
    var d = new Date(date);
    return d.toLocaleDateString("fr-FR");
  }
}

function loadMovie() {

  container.innerHTML = "Chargement...";

  fetch("https://www.omdbapi.com/?apikey=" + API_KEY + "&i=" + movieId + "&plot=full")
    .then(function (response) {
      return response.json();
    })
    .then(function (movie) {

      container.innerHTML =
        "<h1>" + movie.Title + "</h1>" +
        "<img src='" + movie.Poster + "' alt='" + movie.Title + "'>" +

        "<p><strong>Genre :</strong> " + movie.Genre + "</p>" +
        "<p><strong>Acteurs :</strong> " + movie.Actors + "</p>" +
        "<p><strong>Résumé :</strong> " + movie.Plot + "</p>" +
        "<p><strong>Sortie DVD :</strong> " + formatDate(movie.DVD) + "</p>" +

        "<h3>Notes :</h3>";

      if (movie.Ratings != undefined) {

        for (var i = 0; i < movie.Ratings.length; i++) {
          container.innerHTML =
            container.innerHTML +
            "<p>" + movie.Ratings[i].Source + " : " + movie.Ratings[i].Value + "</p>";
        }
      }
    });
}

loadMovie();
