// Get the entire array of wine recommendation
// Get a random wine array 
// Display wine recommendation to user as well as displaying the price and description of the wine
// Provide the link to where the wine can be bought

// Get wine with food pairing endpoint
// User can type in a food item and get a pairing of wine to go with their food
// the api will generate a random wine based on the search keyword and display a wine to go with user's food

// Create a namespace object
const app = {};

app.apiKey = `2f9f6caffa8e440db625f9425b60193a`
// Storing elements in variables for easier readability
app.generatorBtn = $('.generatorBtn');
app.wineReco = $('.wineRecommendation');

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
app.getWineWithFoodAPI = function() {
    const wineWithFoodAPI = $.ajax({
        url: 'https://api.spoonacular.com/food/wine/pairing?food=salmon',
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: app.apiKey,
            // food: 'salmon'
        }
    }) 
    return wineWithFoodAPI;
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
                <p class="wineName">${randomWineReco.title}</p>
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

app.displayWineForFood = function() {
    // Referencing the API call
    const wineForFoodAPI = app.getWineWithFoodAPI();

    wineForFoodAPI.then(function(wineReco) {
        
        console.log(wineReco);
        const wineRecoForFood = wineReco.productMatches;
        const wineRecoText = wineReco.pairingText;

        // console.log(wineRecoForFood);
        // console.log(wineRecoText);


        wineRecoForFood.forEach(function(wineRecoObj) {
            $('.winePairingText').text(wineRecoText)
            $('.wineName1').text(wineRecoObj.title)
            $('.wineDescription1').text(wineRecoObj.description)
            $('.winePrice1').text(wineRecoObj.price)
            $('.linkToBuyAnchor1').attr('href', wineRecoObj.link)
            $('.linkToBuyAnchor1').text('Link to buy')
            $('.wineRecommendationForFood').addClass('showHeight1')
        })    
    })
}

// Randomizer function to get a random index from an array (used for getting a random wine index)
app.getRandomWineFromArray = function(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

app.init = function() {

    app.displayWine();
    app.displayWineForFood();

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
