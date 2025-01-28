const inputSearch = document.querySelector(".search-area input");
const display = document.querySelector(".display-area");

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

        movieCard.appendChild(poster);
        movieCard.appendChild(title);
        movieCard.appendChild(infos);
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
