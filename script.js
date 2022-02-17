// Get the entire array of wine recommendation
// Get a random wine array 
// Display wine recommendation to user as well as displaying the price and description of the wine
// Provide the link to where the wine can be bought

// Get wine with food pairing endpoint
// User can type in a food item and get a pairing of wine to go with their food
// the api will generate a random wine based on the search keyword and display a wine to go with user's food

// Create a namespace object
const app = {};

app.apiKey = `8b29708f68cd48448a5c1a0ed9ef5a85`
// Storing elements in variables for easier readability
app.generatorBtn = $('.generatorBtn');
app.wineReco = $('.wineRecommendation');
app.scrollWineReco = $('#scrollToWineRecommendation');
app.formElement = $('form');
app.scrollPairedWine = $('#scrollToPairedWineReco')
app.wineList = $('.wineList');
app.pairingText = $('.pairingText');
app.pairedWine = $('.pairedWine');

// Function to make API call
app.getWine = function() {
    const wineAPI = $.ajax({
        url: 'https://api.spoonacular.com/food/wine/recommendation',
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: app.apiKey,
            wine: 'wine',
            number: 58
        }
    }) 
    // Returning the data obtained from the API call so it can be accessed later
    return wineAPI;
}

// Function to make API call using user input
app.getPairedWine = function(query) {
    // console.log(query);
    const wineWithFoodAPI = $.ajax({
        url: `https://api.spoonacular.com/food/wine/pairing`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: app.apiKey,
            food: query
        }
    }) 
    return wineWithFoodAPI;
}

// Function to display random wine
app.displayWine = function() {
    // Referencing the API call 
    const wineAPI = app.getWine();

    // Fullfilling promise
    wineAPI.then(function(wineArr) {
        // console.log(wineArr.recommendedWines)

        // Generating a random wine using the randomizer function 
        const randomWineReco = app.getRandomWineFromArray(wineArr.recommendedWines);
        // console.log(randomWineReco);

        // Adding an event listener to generator which appends content to the wine recommendation element
        app.generatorBtn.on('click', function() {
            const recommendedWine = `
                <h2 class="wineName">${randomWineReco.title}</h2>
                <p class="wineDescription">${randomWineReco.description}</p>
                <p class="winePrice">${randomWineReco.price}</p>
                <a href="${randomWineReco.link}" class="linkToBuy"></a>
            `

            app.wineReco.html(recommendedWine)

            $('html, body').animate({
                scrollTop: scrollWineReco.offset().top
            }, 2000);
            
            // Calling the displayWine function so it runs after the event listener is triggered
            app.displayWine();

        })
    })
}

// Function to get user input and pass it as a parameter to the API call function
app.getUserInput = function() {
    // Attaching an event listener to the form element
    app.formElement.on('submit', function() {
        // Storing user input value in a variable
        const userInput = $('.searchBar').val();
        
        // Calling the API call function and passing user input as parameter
        const wineForFoodAPI = app.getPairedWine(userInput);

        // Fulfilling promise
        wineForFoodAPI.then(function(data) {
            console.log(data);
            app.displayWinePairing(data)
        })
    })
}

// Function to display wine pairing 
app.displayWinePairing = function(data) {
    // Storing data that is obtained from the API call in variable for easy access
    const winePairings = data.pairedWines;
    const winePairingText = data.pairingText;
    const winePairingReco = data.productMatches[0];

    // Looping through pairedWines array to append each item in the ul element
    for (let i=0; i < winePairings.length; i++) {
        const wineListItem = `
            <li>${winePairings[i]}</li>
        `
        app.wineList.append(wineListItem);
    }

    // Appending pairing text
    const pairingText = `
        <h2 class="pairingText">${winePairingText}</h2>
    `
    app.pairingText.append(pairingText);

    // Appending paired wine recommendation
    const pairedWineReco = `
        <h3 class="pairedWineTitle">${winePairingReco.title}</h3>
        <p class="pairedWineDescription">${winePairingReco.description}</p>
        <p class="pairedWinePrice">${winePairingReco.price}</p>
        <a href="${winePairingReco.link}" class="linkToBuyAnchor"></a>
    `
    app.pairedWine.append(pairedWineReco);
}

// Randomizer function to get a random index from an array (used for getting a random wine index)
app.getRandomWineFromArray = function(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

// Init function to initalize the app on page load
app.init = function() {
    app.getWine();
    app.displayWine();
    app.getUserInput();
}

// Document ready 
$(document).ready(function(){ 
    app.init();
});
