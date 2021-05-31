const URL = "http://www.omdbapi.com/?apikey=f0d73960&",
  form = document.forms.form,
  searchInput = form.elements.search,
  typeSelect = form.elements.typesearch,
  moviesList = document.querySelector(".movieslist"),
  description = document.querySelector(".description"),
  pages = document.querySelector(".pages");

let results,
  a,
  initialParams = " ",
  pagesArr = [];

async function getRequest(url, params = "s=iron man") {
  try {
    let response = await fetch(url + params);
    return await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
}

document.addEventListener("DOMContentLoaded", loadFirstScring);

function loadFirstScring() {
  setInitialParams();
  renderFirstScring();
}

function setInitialParams() {
  initialParams = `s=${searchInput.value}`;
}

function renderFirstScring() {
  getRequest(URL, initialParams).then(renderMoviesPage);
}

function renderMoviesPage({ Search, totalResults }) {
  renderMoviesList(Search);
  getResults(totalResults);
  createPagesList(results);
  renderNewPage();
}

function renderMoviesList(arr) {
  moviesList.innerHTML = createMoviesList(arr);
}

function getResults(total) {
  return (results = Math.ceil(+total / 10));
}

function createPagesList(n) {
  let items = [];
  for (let i = 1; i < n; i++) {
    let div = createPagesItem(i);
    items.push(div);
  }
  return (pages.innerHTML = items.join(" "));
}

function createPagesItem(k) {
  return `
  <div class="page">${k}</div>
  `;
}

function createMoviesList(arr) {
  return arr.reduce((fragment, item) => fragment + createMoviesItem(item), " ");
}

function createMoviesItem({ Title, Year, Type, Poster, imdbID }) {
  return `
 <li class = "movie">
    <img src = ${Poster} alt='Poster'>
    <div class="info">
      <h2>${Title}</h2>
      <span>${Type}</span><br>
      <span>${Year}</span><br>
      <span class="detail" onclick = showDetail('${imdbID}')>${"Detail"}</span>
    </div>
  </li>
`;
}

////////////////////////////////////////////////////

function showDetail(imdb) {
  const par = `i=${imdb}`;

  getRequest(URL, par).then(renderDetail);
}

function renderDetail({
  Title,
  Year,
  Actors,
  Country,
  Genre,
  Runtime,
  Poster,
  Plot,
  Released,
  Director,
}) {
  showDescription();
  description.innerHTML = createDetail(
    Title,
    Year,
    Actors,
    Country,
    Genre,
    Runtime,
    Poster,
    Plot,
    Released,
    Director
  );
}

function createDetail(
  title,
  year,
  actors,
  country,
  genre,
  runtime,
  poster,
  plot,
  released,
  director
) {
  return `
  <div class="description__shadow">
  <img src = "${poster}" alt = "IMG">
  <div class="description__info">
  <h2>${title}</h2>
  <span>${genre}</span><br>
  <span>${"Director: " + director}</span><br>
  <span>${"Produced in " + year}</span>
  <span>${"  *  Released on " + released}</span><br>
  <span>${"Country: " + country}</span>
  <span>${"  *  runtime: " + runtime}</span><br>
  <p>${"Cast: " + actors}</p>
  <p>${plot}</p>
  </div>


  </div>
`;
}

function showDescription() {
  description.classList.add("show__description");
}

description.addEventListener("click", hideDescription);

function hideDescription() {
  description.classList.remove("show__description");
}

///////////////////////////////////////////////////////////

form.addEventListener("submit", onSubmitHandler);

function onSubmitHandler(e) {
  e.preventDefault();
  renderMovies();
}

function renderMovies() {
  //getDataForm();
  // validateForm();
  const params = createSearchParams(getDataForm());
  getRequest(URL, params).then(renderMoviesPage);
}

function getDataForm() {
  return {
    s: searchInput.value,
    type: typeSelect.value,
  };
}

/*function validateForm(obj) {
if(searchInput.value.length < 3) {
  return;
} else {return s.value = searchInput.value;}
}*/

function createSearchParams(params) {
  return Object.entries(params)
    .filter(([__, value]) => value.trim())
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}

function renderNewPage() {
  createPageesArr();
  addToPagesArrHidden(pagesArr);
  shiftPage();
  makeActive();
}

function createPageesArr() {
  pagesArr = document.querySelectorAll(".page");
}

function addToPagesArrHidden(arr) {
  arr.forEach((elem, index) => addToPageClassHidden(elem, index));
}
function addToPageClassHidden(e, i) {
  if (i > 10) {
    e.classList.add("hidden");
  }
}
function shiftPage() {
  pagesArr.forEach((e) => e.addEventListener("mousedown", getMoviesPage));
}

function getMoviesPage(event) {
  let point = event.target;
  let pageNumber = point.textContent;

  const params = createSearchParams(getDataForm()) + `&page=${pageNumber}`;

  getRequest(URL, params).then(renderMoviesPage);
}

function makeActive() {
  pages.addEventListener("mouseup", addRed);
}
function addRed(e) {
  e.target.classList.add("red");
  let pageSet = [...e.target.parentNode.children];
  let val = e.target.textContent;
  if (val > 8) {
    pageSet[val - 2].classList.add("hidden");
    pageSet[val - 3].classList.add("hidden");
    pageSet[val + 1].classList.remove("hidden");
    pageSet[val + 3].classList.remove("hidden");
  }
}
