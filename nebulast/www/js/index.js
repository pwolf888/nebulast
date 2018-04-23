/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 *
 ****************************
 __    _  _______  _______  __   __  ___      _______  _______  _______
 |  |  | ||       ||  _    ||  | |  ||   |    |   _   ||       ||       |
 |   |_| ||    ___|| |_|   ||  | |  ||   |    |  |_|  ||  _____||_     _|
 |       ||   |___ |       ||  |_|  ||   |    |       || |_____   |   |
 |  _    ||    ___||  _   | |       ||   |___ |       ||_____  |  |   |
 | | |   ||   |___ | |_|   ||       ||       ||   _   | _____| |  |   |
 |_|  |__||_______||_______||_______||_______||__| |__||_______|  |___|

    index.js
 * *************************/



// Cordova stuff Do not touch *************

var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


//*****************************




// Start project - loads the data from json and the main menu
$(document).ready(function () {
    console.log("ready");
    loadScenario();
    loadShopData();
    loadMainMenu();
    
});

/*
***************************************
*
* Menu
* Nebulast, Hiscore, Collectibles
*
***************************************
*/

// Game Over condition
function gameOver() {
    if(stats.food <= 0 || stats.water <= 0 || stats.fuel <= 0 || stats.crew <= 0) {
        loadGameOverScreen();
        $('#spaceScreen').html(' ');
        $('#scenarioScreen').html(' ');
        console.log('gameover');
    }

}

// Side nav open
function openNav() {
    $(".sideNav").css( "width", "50vw");
}

// side nav close
function closeNav() {
    $(".sideNav").css('width', "0px");
}

// Load the main menu
function loadMainMenu() {

    // Asteroid function - perhaps rename function - makes no sense..
    // asteroidPos();

    // Background set to black
    $('body').css('background-color', '#000 !important');
    $('body').removeClass('BGCLASS-02');
    $('body').addClass('BGCLASS-01');

    var self = this;

    // Container of the menu items
    self.$container = $('#mainMenu');

    // page that holds all of the content
    self.$page = $("<div class='mainMenu'></div>");
    bgElements('body');

    // Start Button
    spaceship().appendTo(self.$page).on('click', function () {
        $('#mainMenu').hide();
        loadSpaceScreen();


    });

    // Append everything to the page
    self.$container.append(self.$page);

    // Initialise the starting stats
    window.stats = {
        food: 5,
        water: 5,
        fuel: 5,
        crew: 5,
        credits: 200

    };


    // Other global variables

    window.loaded = false;
    window.number = 0;

    // Object to hold 3 scenarios at a time
    window.scenarioObj = {

        pImage: [],
        planetBlurb: [],
        dialogue: [],
        optionA: [],
        optionB: [],
        resultsA_dialogue:[],
        resultsA_number: [],
        resultsA_type: [],
        resultsB_dialogue:[],
        resultsB_number: [],
        resultsB_type: []

    };

    console.log(scenarioObj);
}

// Adds the asteroid, stars and twinkly stars
function bgElements(container) {
    stars().appendTo(container);
    twinkles().appendTo(container);
    // asteroid().appendTo(container);
}

// Looping function that randomizes the position of the asteroid.
function asteroidPos(){

    $(".asteroid").css("right", asteroidRandom);

    x = 6; //seconds

    function asteroidRandom(){

       randomNumber = Math.floor((Math.random() * 650) - 250);

       return randomNumber

    }

    setTimeout(asteroidPos , x*1000);

   }

/*      
***************************************
*  
* Space Screen
* Interact with your spaceship, planets and spacestation and a blackhole
*
***************************************
*/

// Load the space screen
function loadSpaceScreen() {

    // Make sure the Json is no read each time function is called
    if(!loaded) {
        // Preload Data
        loaded = true;

    }

    window.planetCount = 0;
    
    var self = this;

    // Container tha holds all of the spacescreen elements
    self.$container = $('#spaceScreen').show();

    // Page that holds all the space screen elements
    self.$page = $("<div class='space-Screen'></div>");

    // Spaceship button
    spaceship().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceShipScreen();
    });

    // Space station
    spaceStation().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceStationScreen();
    });

    // Create a hidden notification button
    var notification = notify().appendTo(self.$page);



    uiButton('ok', 'Ok').appendTo(notification).on('click', function () {
        notification.hide();
        $(".uiLabel").html(' ');
        $('#spaceScreen').hide();
        loadScenarioScreen();
    });

    // Append a cancel and an OK but to the notification area
    uiButton('cancel', 'Cancel').appendTo(notification).on('click', function () {
        $(".uiLabel").html(' ');
        notification.hide();
        $(".space-planet-.planet-"+ number +"").css({"pointer-events": 'auto', "opacity": '1.0'});
    });


    // On click the user will be asked if they want to start a scenario

    planet(scenarioObj.pImage[0], 'planet-0').appendTo(self.$page).on('click', function() {

        // Remove any content inside notify label
        $('label.uiLabel').html(' ');
        // Show the notification
        $(".notify").show();
        // Create the label with content

        // Specify the correct number to read from the scenarioObj object
        number = 0;
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notification);
        console.log(number);

        //Disable button on click
        $(".space-planet-.planet-0").css({"pointer-events": 'none', "opacity": '0.8'});
                                
    });
    planet(scenarioObj.pImage[1], 'planet-1').appendTo(self.$page).on('click', function() {

        $('label.uiLabel').html(' ');
        $(".notify").show();
        number = 1;
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notification);

        //Disable button on click
        $(".space-planet-.planet-1").css({"pointer-events": 'none', "opacity": '0.8'});
    });
    planet(scenarioObj.pImage[2], 'planet-2').appendTo(self.$page).on('click', function() {

        $('label.uiLabel').html(' ');
        $(".notify").show();
        number = 2;
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notification);

        //Disable button on click
        $(".space-planet-.planet-2").css({"pointer-events": 'none', "opacity": '0.8'});
    });

    // Black hole button
    blackHole().appendTo(self.$page).on('click', function () {


        // Black hole resets system and generating x amount of new planets
        $("#spaceScreen").html(' ');



        // Change background
        $('body').addClass('BGCLASS-02');
        // Change planets

        removePlanets();
        loadSpaceScreen();
        console.log(scenarioObj);
        // Enable space station


    });


    
    // Stat group - will be loaded in via a function

    hamburger().appendTo(self.$page).on('click', function () {
        openNav();
        // Refreshes the statistics and updates the table
        refreshStats();
    });

    // Add the side nav to the screen
    window.hiddenNav = sideNav().appendTo(self.$page);
    // Add the header title to the sidenav
    $("<div class='sideNavHeader'>Stats</div>").appendTo(hiddenNav);
    close().appendTo(hiddenNav).on('click', function () {
        closeNav();
    });

    // Add the stats to the side nav
    loadStats(hiddenNav);

    // Append all elements to container
    self.$container.append(self.$page);



}


function removePlanets() {


for(var i = 0; i< 3; i++) {



        scenarioObj.pImage.shift();
        scenarioObj.planetBlurb.shift();
        scenarioObj.dialogue.shift();
        scenarioObj.optionA.shift();
        scenarioObj.optionB.shift();

        scenarioObj.resultsA_dialogue.shift();
        scenarioObj.resultsA_number.shift();
        scenarioObj.resultsA_type.shift();
        scenarioObj.resultsB_dialogue.shift();
        scenarioObj.resultsB_number.shift();
        scenarioObj.resultsB_type.shift();
        }
        console.log(scenarioObj);




}
// Update the side nav with the most recent stats
function refreshStats () {

    $('.food').html(stats.food);
    $('.water').html(stats.water);
    $('.fuel').html(stats.fuel);
    $('.crew').html(stats.crew);
    $('.credits').html(stats.credits);


}


// Load stats group
function loadStats(container) {

    sideNavStat('food', stats.food ).appendTo(container);
    sideNavStat('water', stats.water).appendTo(container);
    sideNavStat('fuel', stats.fuel ).appendTo(container);
    sideNavStat('crew', stats.crew ).appendTo(container);
    sideNavStat('credits', stats.credits ).appendTo(container);

}

// Update the stats to the resource atainned or lost in the scenario
function updateStats(result, number) {

    var result = result;
    console.log(result);
    switch(result) {
        case "food":
            stats.food += number;
            break;
        case "water":
            stats.water += number;
            break;
        case "crew member":
            stats.crew += number;
            break;
        case "fuel":
            stats.fuel += number;
            break;
        case "credits":
            stats.credits += number;
            break;
        default:
            break;


    }

    gameOver();




}


 /*       
***************************************
*  
* Scenario Screen - clicking planet
* 
*
***************************************
*/

function loadScenarioScreen() {


    var self = this;

    self.$container = $('#scenarioScreen').show();

    self.$page = $("<div class='scenario-Screen-page'></div>");



    // First row of the content that holds the dialogue and the portait
    var dialogueRow = uiRow('scenario-dialogueRow').appendTo(self.$page);

    portraitColNew(scenarioObj.pImage[number]).appendTo(dialogueRow);

    // Portrait and dialogue
    // portraitCol().appendTo(dialogueRow);

    // Dialogue
    // dialogueBox().appendTo(dialogueRow);

    // Options row holds the options
    var optionsRow = uiRow('scenario-OptionsRow').appendTo(self.$page);

    // Option A
    optionButton('option-A').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();

        // Output the results of the scenario
        var resourceUpdate = "You have gained " + scenarioObj.resultsA_number[number] + " " + scenarioObj.resultsA_type[number] + ".";
        outputText(scenarioObj.resultsA_dialogue[number], $('.results').show());
        outputText(resourceUpdate, $('.resource-Update').show());

        // Update the stats earned or lost
        updateStats(scenarioObj.resultsA_type[number], scenarioObj.resultsA_number[number]);

        // Back button disabled
        $('.back').prop('disabled', false);
    });

    // Option B
    optionButton('option-B').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();

        var resourceUpdate = "You have lost " + scenarioObj.resultsB_number[number] + " " + scenarioObj.resultsB_type[number] + ".";

        outputText(scenarioObj.resultsB_dialogue[number], $('p.results').show());
        outputText(resourceUpdate, $('p.resource-Update').show());

        updateStats(scenarioObj.resultsB_type[number], scenarioObj.resultsB_number[number]);

        $('.back').prop('disabled', false);

    });

    // Add the back button to the screen
    returnToShip('back', 'disabled').appendTo(self.$page).on('click', function () {

        planetCount++;

        $('#scenarioScreen').hide();

        $('#scenarioScreen').html(' ');
        $('#spaceScreen').show();


    });


    // Append all elements to the container
    self.$container.append(self.$page);

    // Output text one char at a time
    outputText(scenarioObj.dialogue[number], $('.dialogue'));

    outputText(scenarioObj.optionA[number], $('.option-A'));

    outputText(scenarioObj.optionB[number], $('.option-B'));




}

// Outputs text one char at a time.
function outputText(dialogue, element) {


    var text = dialogue;
    var elem = element;
    var delay = 50;

    // http://jsfiddle.net/8ZtqL/167/
    var outputTextSlowly = function(text,elem,delay){
        if(!elem){
            elem = $("body");
        }
        if(!delay){
            delay = 300;
        }
        if(text.length > 0){
            //append first character
            elem.append(text[0]);
            setTimeout(
                function(){
                    //Slice text by 1 character and call function again
                    outputTextSlowly(text.slice(1),elem,delay);
                },delay
            );
        }
    };


    outputTextSlowly(text,elem,delay);


}


/*        
***************************************
*  
* Space Station Screen
* 
*
***************************************
*/

function loadSpaceStationScreen() {

    var buyData = ""+ shopObj.Quantity +" "+ shopObj.dataTypeA + " = " + shopObj.buyPriceA +"cr</br>";
    buyData += ""+ shopObj.Quantity +" "+  shopObj.dataTypeB + " = " + shopObj.buyPriceB +"cr</br>";
    var sellData = ""+ shopObj.Quantity +" "+  shopObj.dataTypeA + " = " + shopObj.sellPriceA +"cr</br>";
    sellData += ""+ shopObj.Quantity +" "+  shopObj.dataTypeB + " = " + shopObj.sellPriceB +"cr</br>";

    var self = this;

    self.$container = $('#spaceStationScreen').show();

    self.$page = $("<div class='spaceStation-Screen'></div>");



    spaceStationBG('spaceStation').appendTo(self.$page);



    // Back Button
    returnToShip('back', 'active').appendTo(self.$page).on('click', function () {
        $('#spaceStationScreen').hide();
        $('#spaceStationScreen').html(' ');
        $('#spaceScreen').show();

    });

    // Josh's edit

    shopScreen().appendTo(self.$page);

    var shopCon = shopContainer().appendTo(self.$page);

    shopIcon('waterIcon').appendTo(shopCon);
    $("<div class='waterValue'></div>").appendTo(shopCon).html(stats.water);
    $("<div class='foodValue'></div>").appendTo(shopCon).html(stats.food);
    $("<div class='fuelValue'></div>").appendTo(shopCon).html(stats.fuel);
    $("<div class='coinValue'></div>").appendTo(shopCon).html(stats.credits);
    // shopIcon('waterMinusIcon').appendTo(shopcon);
    //shopIcon('waterPlusIcon').appendTo(shopCon);
    uiButton('waterPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceB) {
        creditUpdate('water', -shopObj.buyPriceB, 1);
        shopValUpdate('water', stats.water);
        shopValUpdate('coin', stats.credits);
        console.log(stats.water);
        }
        
    });
    uiButton('waterMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.water != 1) {
        creditUpdate('water', shopObj.sellPriceB, -1);
        shopValUpdate('water', stats.water);
        shopValUpdate('coin', stats.credits);
        console.log(stats.water);
        }
    });

    shopIcon('foodIcon').appendTo(shopCon);
    uiButton('foodPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceA) {
        creditUpdate('food', -shopObj.buyPriceA, 1);
        shopValUpdate('food', stats.food);
        shopValUpdate('coin', stats.credits);
        console.log(stats.food);
        }
    });

    uiButton('foodMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.food != 1) {
        creditUpdate('food',  shopObj.sellPriceA, -1);
        shopValUpdate('food', stats.food);
        shopValUpdate('coin', stats.credits);
        console.log(stats.food);
        }
    });   

    shopIcon('fuelIcon').appendTo(shopCon);
    uiButton('fuelPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceC) {
        creditUpdate('fuel', -shopObj.buyPriceC, 1);
        shopValUpdate('fuel', stats.fuel);
        shopValUpdate('coin', stats.credits);
        console.log(stats.food);
        }
    }); 
    
    uiButton('fuelMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.fuel != 1) {
        creditUpdate('fuel',  shopObj.sellPriceC, -1);
        shopValUpdate('fuel', stats.fuel);
        shopValUpdate('coin', stats.credits);
        console.log(stats.food);
        }
    });   


    

    shopIcon('coinIcon').appendTo(shopCon);
    

    // Add all elements to page
    self.$container.append(self.$page);


}

function shopValUpdate (resource, object) {
    $("."+resource+"Value").html(object);
    
}

// function resourceValidation () {
//     if (stats.water == 1  

// }



// Update the credits when buying or selling resources
function creditUpdate(dataType, price, qty) {

    stats.credits += price;

    updateStats(dataType, qty);

}


/*
***************************************
*  
* Ship Screen
* 
*
***************************************
*/

function loadSpaceShipScreen() {
    var self = this;

    self.$container = $('#spaceShipScreen').show();

    self.$page = $("<div class='spaceShip-Screen'></div>");
    stars().appendTo(self.$page);
    self.$container.append(self.$page);


}

function loadGameOverScreen() {


    var self = this;

    self.$container = $('#gameOverScreen').show();

    self.$page = $("<div class='gameOver-Screen'></div>");

    $("<div style='color: #fff;'>GAME OVER MAN</div>").appendTo(self.$page);

    // Add the back button to the screen
    returnToShip('backToMainMenu', 'active').appendTo(self.$page).on('click', function () {

        $('#gameOverScreen').html(' ');
        loadMainMenu();
        loadScenario();
        $('#mainMenu').show();


    });


    self.$container.append(self.$page);



}

// Test function to load a dummy scenario
function loadScenario() {



    // Promise to load scenario.json file
    var scenario = new Promise(function (resolve, reject) {

        // Fetch the scenarios
        $.getJSON('json/scenario.json').done(function (json) {

            // Use the closured dictionary so we can easily access later without array parsing
            console.log(json);


            // // iterate through all items in json and assign them to the scenarioObj
            for(var i= 0; i < json.length; i++) {
                scenarioObj.pImage.push(json[i].pImage);
                scenarioObj.planetBlurb.push(json[i].planetBlurb);
                scenarioObj.dialogue.push(json[i].dialogue);
                scenarioObj.optionA.push(json[i].options["a"]);
                scenarioObj.optionB.push(json[i].options["b"]);

                scenarioObj.resultsA_dialogue.push(json[i].results["a"][0]);
                scenarioObj.resultsA_number.push(json[i].results["a"][1]);
                scenarioObj.resultsA_type.push(json[i].results["a"][2]);
                scenarioObj.resultsB_dialogue.push(json[i].results["b"][0]);
                scenarioObj.resultsB_number.push(json[i].results["b"][1]);
                scenarioObj.resultsB_type.push(json[i].results["b"][2]);
            }
            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            console.log(json);
            reject();
        });
    });


}

// Load the shop data
function loadShopData() {

    window.shopObj = {
        dataTypeA: undefined,
        dataTypeB: undefined,
        dataTypeC: undefined,
        Quantity: undefined,
        buyPriceA: undefined,
        buyPriceB: undefined,
        buyPriceC: undefined,
        sellPriceA: undefined,
        sellPriceB: undefined,
        sellPriceC: undefined

    };

    var shop = new Promise(function (resolve, reject) {
        // Fetch the shopdata
        $.getJSON('json/shop.json').done(function (json) {
            // Use the closured dictionary so we can easily access later without array parsing
            console.log(json);
            shopObj.dataTypeA = json[0].dataType[0];
            shopObj.dataTypeB = json[0].dataType[1];
            shopObj.dataTypeC = json[0].dataType[2];
            shopObj.Quantity = json[0].quantity;
            shopObj.buyPriceA = json[0].buyPrice[0];
            shopObj.buyPriceB = json[0].buyPrice[1];
            shopObj.buyPriceC = json[0].buyPrice[2];
            shopObj.sellPriceA = json[0].sellPrice[0];
            shopObj.sellPriceB = json[0].sellPrice[1];
            shopObj.sellPriceC = json[0].sellPrice[2];

            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            reject();
        });
    });


}

// Alert dialogue functions





