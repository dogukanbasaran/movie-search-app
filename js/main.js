const inputSearch = document.querySelector(".search-area input");
const display = document.querySelector(".display-area");

inputSearch.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

const fetchData = async () => {
  const url = `https://www.omdbapi.com/?i=tt3896198&apikey=5f004e13&s=${inputSearch.value}`;
  const response = await fetch(url);
  if (!response.ok) {
    alert("Hata var.");
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

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(infos);
    display.appendChild(movieCard);
  }
};
