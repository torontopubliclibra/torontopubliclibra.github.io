// create app
const app = {};

// flickr api key
app.key = `ba29e2524c03fb467cf6af47fca859df`;

// initialize the app
app.init = function(){
        
    // form submit function on click
    $(`#cities`).on(`click tap`, function(event){

        // prevent default reload
        event.preventDefault();

        // flickr api search address
        const flickrAPI = `https://api.flickr.com/services/rest/?method=flickr.photos.search&sort=relevance&format=json&nojsoncallback=1`;

        // city value from selection
        let selectedCity = $(`#cities`).val();

        // flickr search query (pigeon `city`)
        let pigeonSearch = `pigeon ${selectedCity}`

        // flickr api search options for 10 results
        const flickrOptions = {
            api_key: app.key,
            text: pigeonSearch,
            per_page: 10,
        };

        // display photos function using data
        function displayPhotos(data) {

            // random whole number between 0 and 9
            randomNumber = Math.floor(Math.random() * 10);

            // photo ID, server ID, photo secret, and photo alt (using random 0-9 result) from data
            let photoID = data.photos.photo[randomNumber].id;
            let serverID = data.photos.photo[randomNumber].server;
            let photoSecret = data.photos.photo[randomNumber].secret;
            let photoAlt = data.photos.photo[randomNumber].title;

            // turn info into a url
            let photoURL = `https://live.staticflickr.com/${serverID}/${photoID}_${photoSecret}.jpg`;

            // HTML to add to page
            let photoHTML = `<h3 class="city-label">${selectedCity}</h3><div class="image-container"><a href="${photoURL}" target="_blank"><img src="${photoURL}" alt="${photoAlt}" title="${photoAlt}" class="pigeon-image"></a></div>`;

            // image results section
            const imageResults = $(`#image-results`);

            // add HTML to the image results section
            imageResults.html(photoHTML);

            // reset city selector value
            $(`#cities`).val(``);
        };  

        // run json on click (only if a city is selected)
        if (selectedCity != null){
            $.getJSON(flickrAPI, flickrOptions, displayPhotos);
        };
    })

    $(`#random`).on(`click`, function(){
        $( "#cities" ).click();
    })
    
};

// run the app
$(document).ready(function () {
    app.init();
});
