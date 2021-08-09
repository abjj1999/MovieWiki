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

var modal = function(singleM,movie){
 //get model info 
 const model = document.querySelector('.modal');
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
/*const tagsEl = document.getElementById('tags');
var setGenre = function(){
tagsEl.innerHTML = '';

genres.forEach(function(genre){
    const tag = document.createElement('div');
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
    })
    tagsEl.appendChild(tag);
})
}
setGenre();
*/

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
