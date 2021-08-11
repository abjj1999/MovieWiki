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
var accounts = {
    usernames: [],
    passwords: []
};
var activeAccount = {
    username: []
}
var logOut = false;



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

getMovie(frontPage);
loadAccounts();


form.addEventListener("submit", function(event){
    event.preventDefault();
    
    const searchTerm = search.value;
    console.log(searchTerm);
    if(searchTerm){
        getMovie(searchUrl + '&query=' + searchTerm);
    }
   
    search.value = '';
})

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