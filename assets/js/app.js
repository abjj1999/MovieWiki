const apiKey = 'api_key=0284347479778309f6a7ae5d50f6e356';
const Url = 'https://api.themoviedb.org/3'
const frontPage = Url + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
const searchUrl = Url + '/search/movie?' + apiKey;


const main = document.getElementById('main');
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovie(frontPage);

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