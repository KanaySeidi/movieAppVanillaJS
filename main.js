const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_TOP100 =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_TOP100);

async function getMovies(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const responseData = await response.json();
  showMovies(responseData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "yellow";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesList = document.querySelector(".movies");

  (document.querySelector(".movies").innerHTML = ""),
    data.films.forEach((movie) => {
      const movieList = document.createElement("div");
      movieList.classList.add("movie");
      movieList.innerHTML = `
        <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" alt="${
        movie.nameRu
      }" class="movie_cover">
        <div class="movie__cover--darkened"></div>
    </div>
    <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
        <div class="movie__average movie__average--${getClassByRate(
          movie.rating
        )}">${movie.rating}</div>
    </div>
        `;
      moviesList.appendChild(movieList);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});
