// create app
const app = {};

// flickr api key
app.key = `ba29e2524c03fb467cf6af47fca859df`;

// flickr api address to call (search method, using api key, sorting by relevance, for 10 photos, in json)
app.flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${app.key}&sort=relevance&per_page=10&format=json&dataType=json&nojsoncallback=1`;

// random array element function
app.getRandomElement = function(array){
    const index = Math.floor(Math.random() * array.length)
    return array[index]
};

// cities array to randomize
app.cities = [`toronto`, `vancouver`, `new york city`, `chicago`, `boston`, `washington, d.c.`, `london`, `glasgow`, `melbourne`, `paris`, `amsterdam`, `stockholm`, `venice`, `mumbai`, `cairo`];

// display photos function
app.displayPhoto = function(data){

    // generate random whole number between 0 and 9 (for the 10 photos in each object)
    const randomNumber = Math.floor(Math.random() * 10);

    // photo ID, server ID, photo secret, and photo alt (using random 0-9 result) from data object
    const photoID = data.photos.photo[randomNumber].id;
    const serverID = data.photos.photo[randomNumber].server;
    const photoSecret = data.photos.photo[randomNumber].secret;
    const photoAlt = data.photos.photo[randomNumber].title;

    // turn info into a url
    const photoURL = `https://live.staticflickr.com/${serverID}/${photoID}_${photoSecret}.jpg`;

    // HTML to add to page
    const photoHTML = `<h3 class="city-label">${app.selectedCity}</h3><div class="image-container"><a href="${photoURL}" target="_blank"><img src="${photoURL}" alt="${photoAlt}" title="${photoAlt}" class="pigeon-image"></a></div>`;

    // image results section
    app.imageResults = $(`#image-results`);

    // add HTML to the image results section
    app.imageResults.html(photoHTML);

    // reset city selection
    $(`#cities`).val(``);
    app.selectedCity = ``;
};

// initialize the app
app.init = function(){
        
    // run function on submit button click
    $(`.submit`).on(`click`, function(){

        // pull city value from selection
        app.selectedCity = $(`#cities`).val();

        // update flickr api search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`,};

        // run json and display photo using ajax shorthand (so long as app.selectedCity has a value)
        if (app.selectedCity != null){
            $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
        };
    });

    // run function on random button click
    $(`.random`).on(`click`, function(){

        // randomize city value from cities array
        app.selectedCity = app.getRandomElement(app.cities);

        // update flickr api search query using city value
        app.flickrQuery = {text: `pigeon ${app.selectedCity}`,};

        // run json and display photo using ajax shorthand
        $.getJSON(app.flickrAPI, app.flickrQuery, app.displayPhoto);
    });
};

// run the app
$(document).ready(function () {
    app.init();
});
