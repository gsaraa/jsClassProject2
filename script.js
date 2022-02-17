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
app.formElement = $('form');
app.wineList = $('.wineList');
app.pairingText = $('.pairingText')
app.pairedWine = $('.pairedWine')

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
app.getWineWithFoodAPI = function(query) {
    // console.log(query);
    const wineWithFoodAPI = $.ajax({
        url: `https://api.spoonacular.com/food/wine/pairing?food=${query}`,
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: app.apiKey,
            // food: 'salmon'
        }
    }) 
    return wineWithFoodAPI;
    // .then(function(data) {
    //     console.log(data);
    // })
}

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

        // Calling the displayWine function so it runs after the event listener is triggered
        app.displayWine();

        // $('.wineName').text(randomWineReco.title)
        // $('.wineDescription').text(randomWineReco.description)
        // $('.winePrice').text(randomWineReco.price)
        // $('.linkToBuyAnchor').attr('href', randomWineReco.link)
        // $('.linkToBuyAnchor').text('Link to buy')
        // $('.wineRecommendation').addClass('showHeight')
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
        const wineForFoodAPI = app.getWineWithFoodAPI(userInput);

        wineForFoodAPI.then(function(data) {
            console.log(data);
            app.displayWinePairing(data)
        })
    })
}

// Function to display wine pairing 
app.displayWinePairing = function(data) {
    const winePairings = data.pairedWines;
    const winePairingText = data.pairingText;
    const winePairingReco = data.productMatches[0];

    console.log(winePairings);
    console.log(winePairingReco);

    for (let i=0; i < winePairings.length; i++) {
        const wineListItem = `
            <li>${winePairings[i]}</li>
        `
        app.wineList.append(wineListItem);
        console.log(wineListItem);
    }

    const pairingText = `
        <h2>${winePairingText}</h2>
    `
    app.pairingText.append(pairingText);

    const pairedWineReco = `
        <h3 class="pairedWineTitle">${winePairingReco.title}</h3>
        <p class="pairedWineDescription">${winePairingReco.description}</p>
        <p class="pairedWinePrice">${winePairingReco.price}</p>
        <a href="${winePairingReco.link}" class="linkToBuyAnchor"></a>
    `

    app.pairedWine.append(pairedWineReco);
    // wineForFoodAPI.then(function(wineReco) {
        
    //     console.log(wineReco);
    //     const wineRecoForFood = wineReco.productMatches;
    //     // const wineRecoText = wineReco.pairingText;

    //     // console.log(wineRecoForFood);
    //     // console.log(wineRecoText);


    //     wineRecoForFood.forEach(function(wineRecoObj) {
    //         console.log(wineRecoObj);
    //         // <p class="winePairingText"></p>
    //         //     <p class="wineName1"></p>
    //         //     <p class="wineDescription1"></p>
    //         //     <p class="winePrice1"></p>
    //         //     <a href="#" class="linkToBuyAnchor1"></a>
    //         $('.winePairingText').text(wineRecoText)
    //         $('.wineName1').text(wineRecoObj.title)
    //         $('.wineDescription1').text(wineRecoObj.description)
    //         $('.winePrice1').text(wineRecoObj.price)
    //         $('.linkToBuyAnchor1').attr('href', wineRecoObj.link)
    //         $('.linkToBuyAnchor1').text('Link to buy')
    //         $('.wineRecommendationForFood').addClass('showHeight1')
    //     })    
    // })
}

// Randomizer function to get a random index from an array (used for getting a random wine index)
app.getRandomWineFromArray = function(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

app.init = function() {

    app.displayWine();
    app.getUserInput();
    // app.displayWinePairing();
    // // let getNewReco = false;

    // $('.wineGenerator').on('click', function() {
    //     app.displayWine();

    // })
    // // app.displayWineForFood();
    // $('form').on('submit', function() {
    //     e.preventDefault();

    //     const userFoodInput = $('input[type=text]').val();
    //     app.displayWineForFood(userFoodInput);

    //     $('input[type=text]').val('');
    // })
    app.getWine();
}

$(document).ready(function(){ 
    app.init();
});
