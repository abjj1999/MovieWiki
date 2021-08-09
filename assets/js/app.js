//Url for the movie data Base
const apiKey = 'api_key=0284347479778309f6a7ae5d50f6e356';
const Url = 'https://api.themoviedb.org/3'
const frontPage = Url + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = Url + '/search/movie?' + apiKey;

//calling out the HTML element
const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");
const logInBtn = document.getElementById("log-in");



function getMovie(url){
    fetch(url)
    .then(function(response) {
        response.json()
        .then(function(data){
            console.log(data);
            showMovie(data.results);
        });
    });
}

var showMovie = function(data){
    main.innerHTML = '';

    data.forEach(function(movie){
        const moiveEl = document.createElement('div');
        moiveEl.classList.add('movie');
        moiveEl.innerHTML = `
            <img src="${imgUrl+movie.poster_path}" alt="${movie.title}">

            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <span class="${getRating(movie.vote_average)}">${movie.vote_average}</span>
            </div>

            <div class="overall">
                <h2>About!</h2>
                ${movie.overview};
            </div>
        `
        main.appendChild(moiveEl);
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

getMovie(frontPage);


form.addEventListener("submit", function(event){
    event.preventDefault();
    
    const searchTerm = search.value;
    console.log(searchTerm);
    if(searchTerm){
        getMovie(searchUrl + '&query=' + searchTerm);
    }
   
    search.value = '';
})

// Log In button was clicked
logInBtn.addEventListener("click", function(event) {
    event.preventDefault();

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
    console.log("test");
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