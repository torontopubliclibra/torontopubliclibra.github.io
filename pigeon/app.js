// create app
const app = {};

// cache flickr api key
app.key = `ba29e2524c03fb467cf6af47fca859df`;

// set flickr api address to call (search method, using api key, sorting by relevance, for 10 results, in json)
app.flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.key}&sort=relevance&per_page=10&format=json&dataType=json&nojsoncallback=1`;

// random array element function
app.getRandomElement = function(array){
    const index = Math.floor(Math.random() * array.length)
    return array[index]
};

// cities array to randomize
app.cities = [`toronto`, `vancouver`, `new york city`, `chicago`, `boston`, `washington, d.c.`, `london`, `glasgow`, `melbourne`, `paris`, `amsterdam`, `stockholm`, `venice`, `mumbai`, `cairo`];

// initialize the app
app.init = function(){

    // reset city selection
    $(`#cities`).val(``);
    app.selectedCity = ``;

    // disable submit button until city selection
    $(`#submit`).attr('disabled', true);
    $(`#cities`).on(`change`, function(){
        $(`#submit`).attr('disabled', false);
    })

    // enable random button
    $(`#random`).attr('disabled', false);
        
    // run function on submit button click
    $(`#submit`).on(`click`, function(){

        // disable submit button until a new selection is made
        $(`#submit`).attr('disabled', true);

        // pull city value from selection
        app.selectedCity = $(`#cities`).val();

        // set flickr api search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`};

        // run json call and then display photo function using ajax shorthand
        $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
    });

    // run function on random button click
    $(`#random`).on(`click`, function(){

        // disable buttons until photo is displayed
        $(`#random`).attr('disabled', true);
        $(`#submit`).attr('disabled', true);

        // randomize city value from cities array
        app.selectedCity = app.getRandomElement(app.cities);

        // set flickr api search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`};

        // run json call and then display photo function using ajax shorthand
        $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
    });
};

// display photos function
app.displayPhoto = function(data){

    // generate random whole number between 0 and 9 (for the 10 photos in each object)
    const randomNumber = Math.floor(Math.random() * 10);

    // pull randomized photo from data object
    const pigeon = data.photos.photo[randomNumber];

    // stitch info into urls using photo ID, server, secret, owner, and title from pigeon object
    const photoURL = `https://live.staticflickr.com/${pigeon.server}/${pigeon.id}_${pigeon.secret}.jpg`;
    const photoLink = `https://www.flickr.com/photos/${pigeon.owner}/${pigeon.id}/`;

    // HTML to add to page using URLs and title from pigeon object
    const photoHTML = `<h3 class="city-label">${app.selectedCity}</h3><div class="image-container"><a href="${photoLink}" target="_blank"><img src="${photoURL}" alt="${pigeon.title}" title="${pigeon.title}" class="pigeon-image"></a></div>`;

    // cache image results section
    app.imageResults = $(`#image-results`);

    // add HTML to the image results section
    app.imageResults.html(photoHTML);

    // reset city selection when image appears
    $(`#cities`).val(``);
    app.selectedCity = ``;

    // re-enable random button when image appears
    $(`#random`).attr('disabled', false);
};

// run the app
$(document).ready(function () {
    app.init();
});
