// create app
const app = {};

// flickr api key
app.key = `ba29e2524c03fb467cf6af47fca859df`;

// random element function
app.getRandomElement = function(array){
    const index = Math.floor(Math.random() * array.length)
    return array[index]
};

// flickr api address to call
app.flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&sort=relevance&format=json&nojsoncallback=1`;

// cities array to randomize
app.cities = [`new york city`, `toronto`, `chicago`, `london`, `glasgow`, `melbourne`, `paris`, `amsterdam`, `venice`, `mumbai`];

// function to display photos
app.displayPhotos = function(data) {
    console.log(data);
    // random whole number between 0 and 9
    app.randomNumber = Math.floor(Math.random() * 10);

    // photo ID, server ID, photo secret, and photo alt (using random 0-9 result) from data
    let photoID = data.photos.photo[app.randomNumber].id;
    let serverID = data.photos.photo[app.randomNumber].server;
    let photoSecret = data.photos.photo[app.randomNumber].secret;
    let photoAlt = data.photos.photo[app.randomNumber].title;

    // turn info into a url
    let photoURL = `https://live.staticflickr.com/${serverID}/${photoID}_${photoSecret}.jpg`;

    // HTML to add to page
    let photoHTML = `<h3 class="city-label">${app.selectedCity}</h3><div class="image-container"><a href="${photoURL}" target="_blank"><img src="${photoURL}" alt="${photoAlt}" title="${photoAlt}" class="pigeon-image"></a></div>`;

    // image results section
    app.imageResults = $(`#image-results`);

    // add HTML to the image results section
    app.imageResults.html(photoHTML);

    // reset city selector
    $(`#cities`).val(``);
};

// initialize the app
app.init = function(){
        
    // submit function on button click
    $(`.submit`).on(`click`, function(event){

        // prevent default reload
        event.preventDefault();

        // city value from selection
        app.selectedCity = $(`#cities`).val();

        // flickr search query (pigeon `city`)
        app.pigeonSearch = `pigeon ${app.selectedCity}`

        // flickr api search options for 10 results
        app.flickrOptions = {
            api_key: app.key,
            text: app.pigeonSearch,
            per_page: 10,
        };

        // run json using ajax shorthand (if selected city has a value)
        if (app.selectedCity != null){
            $.getJSON(app.flickrAPI, app.flickrOptions, app.displayPhotos);
        };
    });

    // randomize function on button click
    $(`.random`).on(`click`, function(){

        // randomize city value
        app.selectedCity = app.getRandomElement(app.cities);

        // flickr search query (pigeon `city`)
        app.pigeonSearch = `pigeon ${app.selectedCity}`;

        // flickr api search options for 10 results
        app.flickrOptions = {
            api_key: app.key,
            text: app.pigeonSearch,
            per_page: 10,
        };

        // run json using ajax shorthand (if selected city has a value)
        if (app.selectedCity != null){
            $.getJSON(app.flickrAPI, app.flickrOptions, app.displayPhotos);
        };
    });

};

// run the app
$(document).ready(function () {
    app.init();
});
