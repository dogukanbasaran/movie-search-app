const inputSearch = document.querySelector(".search-area input");
const display = document.querySelector(".display-area");
const favoriteList = document.querySelector(".favorite-list");
const btnFavoriteList = document.querySelector(".btn-favorite-list");
const favoriteMovies = document.querySelector(".favorite-movies-container");

inputSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    display.innerHTML = "";
    fetchData();
  }
});

const fetchData = async () => {
  if (!inputSearch.value == "") {
    const url = `https://www.omdbapi.com/?i=tt3896198&apikey=5f004e13&s=${inputSearch.value}`;

    inputSearch.value = "";

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response Status: ${response.status}`);
      }

      const data = await response.json();
      for (let movie of data.Search) {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const poster = document.createElement("img");
        poster.classList.add("poster");
        poster.src = `${movie.Poster}`;

        const title = document.createElement("span");
        title.classList.add("title");
        title.textContent = `${movie.Title}`;

        const infos = document.createElement("div");
        infos.classList.add("infos");

        const year = document.createElement("span");
        year.textContent = `Year: ${movie.Year}`;
        infos.appendChild(year);

        const genre = document.createElement("span");
        genre.textContent = `Genre: ${movie.Type}`;
        infos.appendChild(genre);

        const btnAddFavorite = document.createElement("button");
        btnAddFavorite.classList.add("btn-add-favorite");
        btnAddFavorite.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        btnAddFavorite.addEventListener("click", () => {
          handleBtnAddFavorite(
            movie.Poster,
            movie.Title,
            movie.Year,
            movie.Type
          );
        });

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(infos);
        movieCard.appendChild(btnAddFavorite);
        display.appendChild(movieCard);
      }
    } catch (error) {
      displayError("Your input is invalid.");
    }
  } else {
    displayError("please try to write something.");
  }
};

const displayError = (msg) => {
  const errorBox = document.createElement("div");
  errorBox.classList.add("error-box");

  const message = document.createElement("span");
  message.textContent = `${msg}`;
  errorBox.appendChild(message);

  const btnClose = document.createElement("span");
  btnClose.classList.add("close-btn");
  btnClose.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  errorBox.appendChild(btnClose);
  display.appendChild(errorBox);

  btnClose.addEventListener("click", () => {
    errorBox.remove();
  });

  setTimeout(() => {
    errorBox.remove();
  }, 3000);
};

const handleBtnAddFavorite = (poster, title, year, genre) => {
  const newFavoriteMovie = {
    favorite_poster: poster,
    favorite_title: title,
    favorite_year: year,
    favorite_genre: genre,
  };

  console.log(newFavoriteMovie);

  const favMovieCard = document.createElement("div");
  favMovieCard.classList.add("movie-card");

  const favPoster = document.createElement("img");
  favPoster.classList.add("poster");
  favPoster.src = `${newFavoriteMovie.favorite_poster}`;

  const favTitle = document.createElement("span");
  favTitle.classList.add("title");
  favTitle.textContent = `${newFavoriteMovie.favorite_title}`;

  const favInfos = document.createElement("div");
  favInfos.classList.add("infos");

  const favYear = document.createElement("span");
  favYear.textContent = `Year: ${newFavoriteMovie.favorite_year}`;
  favInfos.appendChild(favYear);

  const favGenre = document.createElement("span");
  favGenre.textContent = `Genre: ${newFavoriteMovie.favorite_genre}`;
  favInfos.appendChild(favGenre);

  favMovieCard.appendChild(favPoster);
  favMovieCard.appendChild(favTitle);
  favMovieCard.appendChild(favInfos);

  favoriteMovies.appendChild(favMovieCard);
  console.log(favMovieCard.innerHTML);
};

favoriteList.classList.add("opened-favorite-list");

btnFavoriteList.addEventListener("click", () => {
  favoriteList.classList.contains("opened-favorite-list")
    ? favoriteList.classList.replace(
        "opened-favorite-list",
        "closed-favorite-list"
      )
    : favoriteList.classList.replace(
        "closed-favorite-list",
        "opened-favorite-list"
      );
});
