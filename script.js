// Get the entire array of wine recommendation
// Get a random wine array 
// Display wine recommendation to user as well as displaying the price and description of the wine
// Provide the link to where the wine can be bought

// Get wine with food pairing endpoint
// User can type in a food item and get a pairing of wine to go with their food
// the api will generate a random wine based on the search keyword and display a wine to go with user's food


const app = {};
// OBJECT
app.getWineAPI = function() {
    const wineAPI = $.ajax({
        url: 'https://api.spoonacular.com/food/wine/recommendation',
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: 'ab692ac70e1b4738947cbbeeebef7a1b',
            wine: 'wine',
            number: 58
        }
    }) 
    return wineAPI;
}
app.getWineWithFoodAPI = function(query) {
    const wineWithFoodAPI = $.ajax({
        url: 'https://api.spoonacular.com/food/wine/pairing',
        method: 'GET',
        dataType: 'json',
        data: {
            apiKey: 'ab692ac70e1b4738947cbbeeebef7a1b',
            food: query
        }
    }) 
    return wineWithFoodAPI;
}

app.displayWine = function() {

    const api = app.getWineAPI();
    
    api.then(function(wineArr) {
        console.log(wineArr.recommendedWines)
        
        const randomWineReco = app.getRandomWineFromArray(wineArr.recommendedWines);
        console.log(randomWineReco);

    $('.generatorBtn').on('click', function() {
        $('.wineName').text(randomWineReco.title)
        $('.wineDescription').text(randomWineReco.description)
        $('.winePrice').text(randomWineReco.price)
        $('.linkToBuyAnchor').attr('href', randomWineReco.link)
        $('.linkToBuyAnchor').text('Link to buy')
        $('.wineRecommendation').addClass('showHeight')
    })
})
}

app.displayWineForFood = function(query) {
    const wineForFoodAPI = app.getWineWithFoodAPI(query);
    
    wineForFoodAPI.then(function(wineReco) {

        const wineRecoForFood = wineReco.productMatches;
        const wineRecoText = wineReco.pairingText;

        console.log(wineRecoForFood);
        console.log(wineRecoText);


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

app.getRandomWineFromArray = function(array) {
    const randomIndex = Math.floor(Math.random() * array.length);

    return array[randomIndex];
}

app.init = function() {

    app.displayWine();

    // let getNewReco = false;

    $('.wineGenerator').on('click', function() {
        app.displayWine();

    })
    // app.displayWineForFood();
    $('form').on('submit', function() {
        e.preventDefault();

        const userFoodInput = $('input[type=text]').val();
        app.displayWineForFood(userFoodInput);

        $('input[type=text]').val('');
    })
}

$(document).ready(function(){ 
    app.init();
});
