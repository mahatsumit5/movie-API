let movie = [];
const displayElm = document.getElementById("movies");
const randomELm = document.getElementById("random");
const listMovies = document.getElementById("listMovies");
const genre = document.getElementById("genre").innerHTML.value;
console.log(genre);
const random = Math.floor(Math.random() * 100);
// console.log(displayElm);
const url = "https://imdb-top-100-movies.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "248de94f44mshef0e6efb0ba66fbp1abdafjsn2422e43de92f",
    "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
  },
};
const displayRandomMovie = (r) => {
  console.log("this function is workgin");
  const m = movie[random];
  console.log(m);
  let dis = `<div class="gap-5" style="width:500px"><h1>Today's Random Movies</h1>

  <h1> ${m.title}</h1>
  <h2>RATING: ${m.rating}</h2>
 
  <h5>Description: ${m.description}</h5>
  <p>Director: ${m.director}</p>
  <p>Release Year: ${m.year}</p>
 
  </div>

  <img src="${m.image}" class="img-fluid" alt="..."></img>`;
  randomELm.innerHTML = dis;
};

const movieData = async () => {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    movie = result;
    console.log(movie);
  } catch (error) {
    console.error(error);
  }
  displayRandomMovie();
};

movieData();

const displayMovie = (mooovie) => {
  let str = "";

  mooovie.forEach((m) => {
    str += `
   
    <div class="card  border-5 rounded" style="width: 25rem" id="movies">
    <img src="${m.image}" h-250 alt="..." />
    <div class="card-body">
      <h5 class="card-title">${m.title}</h5>
      <p>${m.description}
      </p>    
    </div>
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Director: ${m.director}</li>
    <li class="list-group-item">Genre: ${m.genre}</li>
    <li class="list-group-item">Rating: ${m.rating}</li>
  </ul>
  <div class="card-body">
    <a href="${m.trailer}" class="card-link" target="blank">Trailer</a>
    <a href="${m.thumbnail}" class="card-link">Thumbnail</a>
  </div>
    </div>
    <option value=""></option>
    
    `;
    displayRandomMovie.innerHTML = "";
  });

  displayElm.innerHTML = str;
};
const listMovie = (mooovie) => {
  let list = "";

  mooovie.forEach((m) => {
    list += `
  
    <h1>${m.rank}</h1>
    <h1>${m.title}</h1>
    <text>${m.description}</text>
    <span><i class="fa-duotone fa-star"></i> ${m.rating}</span>
  
    
    `;
  });

  displayElm.innerHTML = list;
};
document.getElementById("search").addEventListener("keyup", (event) => {
  // console.log(event.target.value);
  const { value } = event.target;
  const filteredMovie = movie.filter((m) => {
    const title = m.title.toLowerCase();

    return title.includes(value.toLowerCase());
  });
  console.log(filteredMovie);
  displayMovie(filteredMovie);
});
document.getElementById("genre").addEventListener("change", (e) => {
  const { value } = e.target; //e.target.value using destructing
  const filteredMovieByGenre = movie.filter((m) => {
    // console.log(m);
    const mov = m.genre;
    return mov.includes(value);
  });

  displayMovie(filteredMovieByGenre);
});
