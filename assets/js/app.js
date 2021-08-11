// genre array
const genres = [
    {
    "id": 28,
    "name": "Action"
    },
    {
    "id": 12,
    "name": "Adventure"
    },
    {
    "id": 16,
    "name": "Animation"
    },
    {
    "id": 35,
    "name": "Comedy"
    },
    {
    "id": 80,
    "name": "Crime"
    },
    {
    "id": 99,
    "name": "Documentary"
    },
    {
    "id": 18,
    "name": "Drama"
    },
    {
    "id": 10751,
    "name": "Family"
    },
    {
    "id": 14,
    "name": "Fantasy"
    },
    {
    "id": 36,
    "name": "History"
    },
    {
    "id": 27,
    "name": "Horror"
    },
    {
    "id": 10402,
    "name": "Music"
    },
    {
    "id": 9648,
    "name": "Mystery"
    },
    {
    "id": 10749,
    "name": "Romance"
    },
    {
    "id": 878,
    "name": "Science Fiction"
    },
    {
    "id": 10770,
    "name": "TV Movie"
    },
    {
    "id": 53,
    "name": "Thriller"
    },
    {
    "id": 10752,
    "name": "War"
    },
    {
    "id": 37,
    "name": "Western"
    }
]
//NYT API = "WDilG1tpWW3qKKxUPTbTdQFastfp54SN";

const apiKey = 'api_key=0284347479778309f6a7ae5d50f6e356';
const Url = 'https://api.themoviedb.org/3'
const frontPage = Url + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = Url + '/search/movie?' + apiKey;

const reviewUrl = "https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=";
const ReviewAPI = "&api-key=WDilG1tpWW3qKKxUPTbTdQFastfp54SN";

const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");
const logInBtn = document.getElementById("log-in");
var accounts = {
usernames: [],
passwords: []
};
var activeAccount = {
username: []
}
var logOut = false;



getMovie(frontPage);

function getMovie(url){
fetch(url)
.then(function(response) {
    response.json()
    .then(function(data){
        console.log(data)
        showMovie(data.results);
        
    });
});
}

var showMovie = function(data){
main.innerHTML = '';

data.forEach(function(movie){
    const singleMovie = document.createElement('a');
    
    singleMovie.classList.add('single');
    
    const moiveEl = document.createElement('div');
    moiveEl.classList.add('movie');
    const imgEl = document.createElement('img');
    imgEl.classList.add("movie-img");
    imgEl.src = imgUrl+movie.poster_path;
    
    const movieInfo = document.createElement('div');
    movieInfo.classList.add('movie-info');
    
    const movietitle = document.createElement('h3');
    movietitle.classList.add('movie-title');
    movietitle.innerText = movie.title;
    
    
    const rating = document.createElement('span');
    rating.classList.add(getRating(movie.vote_average))
    rating.innerText = movie.vote_average;
    
    
    movieInfo.appendChild(movietitle);
    movieInfo.appendChild(rating);
    moiveEl.appendChild(imgEl);
    moiveEl.appendChild(movieInfo);
    singleMovie.appendChild(moiveEl);
    main.appendChild(singleMovie);
    
    modal(singleMovie, movie);
})

}



//get model info 
var modal = function(singleM,movie){
const model = document.querySelector('.modals');
const modalBackground = document.querySelector('.modal-background');
const modalBody = document.querySelector('.modal-card-body');
const modalTitle = document.querySelector('.modal-card-title');
const closeBtn = document.querySelector('.delete');

 singleM.addEventListener('click', function(){
     model.classList.add('is-active');
     modalTitle.textContent =  movie.title;
     //the whole detail div
     const details = document.createElement('div');
     details.classList.add('overall');
     // the header to the "overview" of the movie
     const overviewHeader = document.createElement('h2');
     overviewHeader.classList.add('over-header');
     overviewHeader.innerText = 'Overview:';
     //the overview paragrph of the movie
     const overview = document.createElement('p');
     overview.classList.add('overviewP');
     overview.innerText = movie.overview;
     
     //release Date
     const DateHeader = document.createElement('h2');
     DateHeader.classList.add('over-header');
     DateHeader.innerText = "Release Date:";
     const releaseDate = document.createElement('h4');
     releaseDate.classList.add('date');
     releaseDate.innerText = movie.release_date;


     details.appendChild(overviewHeader);
     details.appendChild(overview);
     details.appendChild(DateHeader);
     details.appendChild(releaseDate);

     modalBody.appendChild(details);
 })
 
    modalBackground.addEventListener('click', function(){
     model.classList.remove('is-active');
     const details = document.querySelector('.overall');
     details.remove();
 })
    closeBtn.addEventListener('click', function(){
     model.classList.remove('is-active');
     const details = document.querySelector('.overall');
     details.remove();
 })
}



var getRating= function(vote){
if(vote >= 8){
    return 'green'
}
else if(vote >= 5){
    return 'orange'
}
else {
    return 'red'
}
}

//fitering by genre
var selected = [];
const tagsEl = document.getElementById('tags');
var setGenre = function(){
tagsEl.innerHTML = '';

genres.forEach(function(genre){
    const tag = document.createElement('option');
    tag.classList.add('tagg');
    tag.id = genre.id;
    
    tag.innerText = genre.name;
    tag.addEventListener('click', function(){
        if(selected.length == 0){
            selected.push(genre.id);
        }
        else{
            if(selected.includes(genre.id)){
                selected.forEach(function(id, index){
                    if(id === genre.id){
                        selected.splice(index, 1);
                    }
                })
            }else{
                selected.push(genre.id);
            }
        }
        console.log(selected);
        getMovie(frontPage + '&with_genres='+ encodeURI(selected.join(',')));
        highlight();
    })
    tagsEl.appendChild(tag);
})
}
setGenre();

var highlight= function(){
const tags = document.querySelectorAll('.tagg');
tags.forEach(function(tag){
    tag.classList.remove('highlight');
})
if(selected.length != 0){
    selected.forEach(function(id){
        const highlightTag = document.getElementById(id);
        highlightTag.classList.add('highlight');
    })
}
}
form.addEventListener("submit", function(event){
event.preventDefault();

const searchTerm = search.value;
console.log(searchTerm);
if(searchTerm){
    getMovie(searchUrl + '&query=' + searchTerm);
    
    
}
else{
    getMovie(frontPage);
}
search.value = '';
})
//filter btn 
document.querySelectorAll('.filterbtn').forEach(function(btn){
btn.addEventListener("click", function(){
    const content = btn.nextElementSibling;
    btn.classList.toggle("filterbtn--active");

    if(btn.classList.contains('filterbtn--active')){
        content.style.maxHeight = content.scrollHeight + 'rem';
    }
    else{
        content.style.maxHeight = 0;
    }
})
})

// loads all accounts from localStorage and creates accounts variable
// if none are found.
var loadAccounts = function() {
accounts = JSON.parse(localStorage.getItem("accounts"));
activeAccount = JSON.parse(localStorage.getItem("activeAccount"));

if (!accounts) {
    accounts = {
        usernames: [],
        passwords: []
    }
}

if (!activeAccount) {
    activeAccount = {
        username: []
    }
    document.getElementById("log-in-out")
    .innerHTML = "Log In";

    return;
} else {
    document.getElementById("log-in-out")
    .innerHTML = "Log Out";

    logOut = true;

    document.getElementById("user-welcome")
    .innerHTML = "Hello " + activeAccount.username + "!";
}
console.log(accounts);
}

// Adds created account to localStorage
var saveAccounts = function() {
localStorage.setItem("accounts", JSON.stringify(accounts));
location.reload();
};

// Adds created username and password to accounts
var createAccount = function(username, password) {
console.log(username, password);
accounts["usernames"].push(username);
accounts["passwords"].push(password);

saveAccounts();
}

// Confirms username and password exist in local storage
var logIn = function(userInput, pwInput) {
for (i=0; i < accounts.usernames.length; i++) {
    if (userInput === accounts.usernames[i] &&
        pwInput === accounts.passwords[i]) {
        console.log("successful log-in");
        activeAccount.username.push(userInput);
        localStorage.setItem("activeAccount", JSON.stringify(activeAccount));
        location.reload();
        return;
    } 
}
document.querySelector(".warning-log-2")
.innerHTML = "Incorrect username or password.";
}


loadAccounts();

// Log In/out button was clicked
logInBtn.addEventListener("click", function(event) {
event.preventDefault();
// If currently logged in, will log out current user. Otherwise will 
// pull up log-in modal.
if (logOut) {
    localStorage.removeItem("activeAccount");
    location.reload();
}
var logInMenu = document.getElementById("log-in-form");
console.log(logInMenu);
logInMenu.classList.add("is-active");
})

// Log In modal background was clicked (to close)
document.querySelector(".modal-background")
.addEventListener("click", function() {
document.getElementById("log-in-form")
.classList.remove("is-active");
})

// Sign Up button was clicked in Log In modal
document.querySelector(".sign-up-button")
.addEventListener("click", function() {

document.getElementById("log-in-form")
.classList.remove("is-active");

document.getElementById("sign-up-form")
.classList.add("is-active");
})

// Sign Up modal background was clicked (to close)
document.querySelector("#sign-up-background")
.addEventListener("click", function() {
document.getElementById("sign-up-form")
.classList.remove("is-active");
})

// Submit in sign-up modal was clicked
document.querySelector(".sign-up-submit")
.addEventListener("click", function() {
var username = document.querySelector(".choose-username")
.value.trim();

var password = document.querySelector(".create-password")
.value.trim();

var confirm = document.querySelector(".confirm-password")
.value.trim();

// Checks for empty inputs and accurate confirmation
if (username === "") {
    document.querySelector(".warning-submit-1")
    .innerHTML = "Must choose username.";
} else {
    document.querySelector(".warning-submit-1")
    .innerHTML = "";
}

if (password === "") {
    document.querySelector(".warning-submit-2")
    .innerHTML = "Must create password.";
} else {
    document.querySelector(".warning-submit-2")
    .innerHTML = "";
}

if (confirm === "") {
    document.querySelector(".warning-submit-3")
    .innerHTML = "Must confirm password.";
} else {
    document.querySelector(".warning-submit-3")
    .innerHTML = "";
}

if (username === "" ||
    password === "" ||
    confirm === "") {
    return;
} else if (confirm === password) {
    createAccount(username, password);
} else {
    var warning = document.querySelector(".warning-submit-3");
    warning.innerHTML = "";
    warning.innerHTML = "Confirmation does not match password entered. Please try again.";
}
})

// Submit button pushed in log-in modal
document.querySelector(".log-in-submit")
.addEventListener("click", function() {
var username = document.querySelector(".username")
.value.trim();

var password = document.querySelector(".password")
.value.trim();

// Checks for empty input fields in log-in modal
if (username === "") {
    document.querySelector(".warning-log-1")
    .innerHTML = "Please enter username.";
} else {
    document.querySelector(".warning-log-1")
    .innerHTML = "";
}

if (password === "") {
    document.querySelector(".warning-log-2")
    .innerHTML = "Please enter password.";
} else {
    document.querySelector(".warning-log-2")
    .innerHTML = "";
}

logIn(username, password);
})