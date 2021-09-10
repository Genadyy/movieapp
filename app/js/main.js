/*const URL = "http://www.omdbapi.com/?apikey=f0d73960&",
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

/*function createSearchParams(params) {
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
}*/

const URL = "http://www.omdbapi.com/?apikey=f0d73960&",
  form = document.forms.form,
  searchInput = form.elements.search,
  typeSelect = form.elements.typesearch,
  moviesList = document.querySelector(".movieslist"),
  description = document.querySelector(".description"),
  pages = document.querySelector(".pages");

let results,
  initialParams = " ",
  pagesArr = [],
  lastSearch = "",
  pagesButtons = [];
let displayButtons = [];
let currentPage;

// Отправка запроса на сервер и получение данных
async function getRequest(url, params) {
  try {
    let response = await fetch(url + params);
    return await response.json();
  } catch (e) {
    return Promise.reject(e);
  }
}

//Загрузка начальной страницы
document.addEventListener("DOMContentLoaded", loadFirstScring);

function loadFirstScring() {
  setInitialParams();
  renderFirstScring();
}

function setInitialParams() {
  initialParams = `s=${searchInput.value}`;
}

function renderFirstScring() {
  getRequest(URL, initialParams).then(renderMoviesPage).then(renderPag);
}

///// Функция осуществляет получение новых данныз с сервера и загрузку их в браузер
function renderMoviesPage({ Search, totalResults }) {
  renderMoviesList(Search);
  results = getResults(totalResults);
  pagesButtons = createPagesList(results);

  renderNewPage();
}

function toggleCurrentPage(t) {
  currentPage = t.dataset.page;
  changeDisplayedPageButtons(currentPage);
}

function renderPag() {
  currentPage = 1;
  displayButtons = pagesButtons.slice(currentPage, currentPage + 9);
  const addDots = `<span class="dots">...</span>`;
  displayButtons.unshift(pagesButtons[0]);
  displayButtons.push(addDots);
  displayButtons.push(pagesButtons[pagesButtons.length - 1]);
  let u = displayButtons.join(" ");
  pages.innerHTML = u;
}

function changeDisplayedPageButtons(currPage) {
  if (currPage <= 8) {
    currPage = 1;
    displayButtons = pagesButtons.slice(currPage, currPage + 9);
    const addDots = `<span class="dots">...</span>`;
    displayButtons.unshift(pagesButtons[0]);
    displayButtons.push(addDots);
    displayButtons.push(pagesButtons[pagesButtons.length - 1]);
    let u = displayButtons.join(" ");
    pages.innerHTML = u;
  }

  if (currPage > 8) {
    displayButtons = pagesButtons.slice(currPage - 4, +currPage + 4);
    const addDots = `<span class="dots">...</span>`;
    displayButtons.unshift(addDots);
    displayButtons.unshift(pagesButtons[0]);
    displayButtons.push(addDots);
    displayButtons.push(pagesButtons[pagesButtons.length - 1]);
    let u = displayButtons.join(" ");
    pages.innerHTML = u;
  }

  if (currPage > pagesButtons.length - 8) {
    currPage = pagesButtons.length - 1;
    displayButtons = pagesButtons.slice(currPage - 8, +currPage + 1);
    const addDots = `<span class="dots">...</span>`;
    displayButtons.unshift(addDots);
    displayButtons.unshift(pagesButtons[0]);
    //displayButtons.push(addDots);
    //displayButtons.push(pagesButtons[pagesButtons.length - 1]);
    let u = displayButtons.join(" ");
    pages.innerHTML = u;
  }
}

//загружает полученные данные в браузер
function renderMoviesList(arr) {
  moviesList.innerHTML = createMoviesList(arr);
}

//определяет количество страниц в ответе на запрос
function getResults(total) {
  return Math.ceil(+total / 10);
}

//создаёт кнопки для пагинации и выводит на страницу
function createPagesList(n) {
  const items = [];
  for (let i = 1; i < n; i++) {
    let div = createPagesItem(i);
    items.push(div);
  }
  return items;
}
//создаёт отдельную кнопку пагинацц
function createPagesItem(k) {
  return `
  <div class="page" data-page=${k}>${k}</div>
  `;
}

//распределяет на странице блоки полученных данных
function createMoviesList(arr) {
  return arr.reduce((fragment, item) => fragment + createMoviesItem(item), " ");
}

//формирует блок из полученных данных с предварительной деструктуризацией
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

//////Отправляет запрос по ID блока, получает данные, загружает на страницу детальную информацию по блоку

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
  <div class="description__shadow description__el">
  <img class="description__el" src = "${poster}" alt = "IMG">
  <div class="description__info description__el">
  <h2 class="description__el">${title}</h2>
  <span class="description__el">${genre}</span><br>
  <span class="description__el">${"Director: " + director}</span><br>
  <span class="description__el">${"Produced in " + year}</span>
  <span class="description__el">${"  *  Released on " + released}</span><br>
  <span class="description__el">${"Country: " + country}</span>
  <span class="description__el">${"  *  runtime: " + runtime}</span><br>
  <p class="description__el">${"Cast: " + actors}</p>
  <p class="description__el">${plot}</p>
  </div>


  </div>
`;
}

function showDescription() {
  description.classList.add("show__description");
}

description.addEventListener("click", hideDescription);

function hideDescription({ target }) {
  if (target.classList.contains("description__el")) {
    description.classList.remove("show__description");
  }
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
  lastSearch = URL + params;
  getRequest(URL, params).then(renderMoviesPage).then(renderPag);
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
}

function createPageesArr() {
  pagesArr = document.querySelectorAll(".page");
}

pages.addEventListener("click", ({ target }) => {
  const attr = target.dataset.page;
  if (!attr) {
    return;
  }
  initialButtonColor();
  getMoviesPage(target);
  //toggleCurrentPage(target);
  //changeDisplayedPageButtons(currentPage);
  // makeActive(target, currentPage, pagesArr);
  //console.log(pagesArr);
});

function initialButtonColor() {
  pagesArr.forEach((e) => e.classList.remove("red"));
}

function getMoviesPage(t) {
  // let point = e.target;
  let pageNumber = t.textContent;

  const params = createSearchParams(getDataForm()) + `&page=${pageNumber}`;

  getRequest(URL, params)
    .then(renderMoviesPage)
    .then(() => toggleCurrentPage(t))
    .finally(() => makeActive(t));
}
function makeActive(t) {
  t.classList.add("red");
  console.log(t);
}
// function makeActive() {
//   pages.addEventListener("mouseup", addRed);
// }
// function addRed(e) {
//   e.target.classList.add("red");
//   let pageSet = [...e.target.parentNode.children];
//   console.log(pageSet);
//   pageSet[pageSet.length - 1].classList.remove("hidden");
//   let val = e.target.textContent;
//   if (val > 8) {
//     pageSet[+val - 4].classList.add("hidden");
//     pageSet[+val - 3].classList.add("hidden");
//     pageSet[+val - 2].classList.add("hidden");
//     pageSet[+val].classList.remove("hidden");
//     pageSet[+val + 1].classList.remove("hidden");
//     pageSet[+val + 2].classList.remove("hidden");
//     pageSet[+val + 3].classList.remove("hidden");
//     pageSet[+val + 4].classList.remove("hidden");
//   }
//
