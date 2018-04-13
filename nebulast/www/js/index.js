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
    refreshData();

    // Background set to black
    $('body').css('background-color', '#000 !important');

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

    // Other global variabls
    window.loaded = false;
    window.number = 0;

    console.log(scenarioObj);
}

// Adds the asteroid, stars and twinkly stars
function bgElements(container) {
    stars().appendTo(container);
    twinkles().appendTo(container);
    asteroid().appendTo(container);
}

// Looping function that randomizes the position of the asteroid.
function refreshData(){

    $(".asteroid").css("right", asteroidPosition);

    x = 6; //seconds

    function asteroidPosition(){

       randomNumber = Math.floor((Math.random() * 650) - 250);

       return randomNumber

    }

    setTimeout(refreshData, x*1000);

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
    // if(!loaded) {
    //     // Preload Data
    //
    //     loaded = true;
    //
    // }


    
    var self = this;

    // Container tha holds all of the spacescreen elements
    self.$container = $('#spaceScreen');

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
    var notifiy = notify().appendTo(self.$page);

    // Append a cancel and an OK but to the notification area
    uiButton('cancel', 'Cancel').appendTo(notifiy).on('click', function () {
        $(".uiLabel").html(' ');
        notifiy.hide();
    });

    uiButton('ok', 'Ok').appendTo(notifiy).appendTo(notifiy).on('click', function () {
        notifiy.hide();
        $(".uiLabel").html(' ');
        $('#spaceScreen').hide();
        loadScenarioScreen();
    });

    // On click the user will be asked if they want to start a scenario
    planet(scenarioObj.pImage[0], scenarioObj.planet[0]).appendTo(self.$page).on('click', function() {

        // Remove any content inside notify label
        $('label.uiLabel').html(' ');
        // Show the notification
        $(".notify").show();
        // Create the label with content
        uiLabel("This is planet Zim 34, would you like to travel there?").appendTo(notifiy);
        // Specify the correct number to read from the scenarioObj object
        number = 0;
        console.log(number);
                                
    });
    planet(scenarioObj.pImage[1], scenarioObj.planet[1]).appendTo(self.$page).on('click', function() {

        $('label.uiLabel').html(' ');
        $(".notify").show();
        uiLabel('This is planet Palethe 8, would you like to travel there?').appendTo(notifiy);
        number = 1;

    });
    planet(scenarioObj.pImage[2], scenarioObj.planet[2]).appendTo(self.$page).on('click', function() {

        $('label.uiLabel').html(' ');
        $(".notify").show();
        uiLabel('This is planet Dengel Jar IV, would you like to travel there?').appendTo(notifiy);
        number = 2;
    });

    // Black hole button
    blackHole().appendTo(self.$page);


    
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

    // Portrait
    portraitCol().appendTo(dialogueRow);

    // Dialogue
    dialogueBox().appendTo(dialogueRow);

    // Options row holds the options
    var optionsRow = uiRow('scenario-OptionsRow').appendTo(self.$page);

    // Option A
    optionButton('option-A').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();

        // Output the results of the scenario
        var resourceUpdate = "You have gained " + scenarioObj.resultsA_number[number] + " " + scenarioObj.resultsA_type[number] + ".";
        outputText(scenarioObj.resultsA_dialogue, $('.results').show());
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

        outputText(scenarioObj.resultsB_dialogue, $('.results').show());
        outputText(resourceUpdate, $('.resource-Update').show());

        updateStats(scenarioObj.resultsB_type[number], scenarioObj.resultsB_number[number]);

        $('.back').prop('disabled', false);

    });

    // Add the back button to the screen
    returnToShip('back', 'disabled').appendTo(self.$page).on('click', function () {
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
    stars().appendTo(self.$page);
    // Row 1 - BUY SELL
    var table = card('spaceStation').appendTo(self.$page);
    var row = uiRow('spaceStation').appendTo(table);
    var colLeft = uiCol('spaceStation').appendTo(row);
    var colRight = uiCol('spaceStation').appendTo(row);
    paragraph('spaceStation', 'Buy').appendTo(colLeft);
    paragraph('spaceStation', 'Sell').appendTo(colRight);

    paragraph('spaceStation', buyData).appendTo(colLeft);
    paragraph('spaceStation', sellData).appendTo(colRight);

    // Updating shopping list
    var foodRow = uiRow('spaceStation').appendTo(colLeft);
    var waterRow = uiRow('spaceStation').appendTo(colLeft);
    paragraph('spaceStation', shopObj.dataTypeA).appendTo(foodRow);

    // Minus resource button
    uiButton('spaceStation', '-').appendTo(foodRow).on('click', function () {
        creditUpdate(shopObj.dataTypeA, shopObj.sellPriceA, -1);
        loadSpaceStationScreen();
    });

    paragraph('spaceStation', stats.food).appendTo(foodRow);


    paragraph('stats-food', "food: " + stats.food).appendTo(colRight);
    paragraph('stats-water', "water: " + stats.water).appendTo(colRight);
    paragraph('stats-credits', "credits: " + stats.credits).appendTo(colRight);

    // Add resource button
    uiButton('spaceStation', '+').appendTo(foodRow).on('click', function () {
        creditUpdate(shopObj.dataTypeA, -shopObj.buyPriceA, 1);
        loadSpaceStationScreen();

    });

    paragraph('spaceStation', shopObj.dataTypeB).appendTo(waterRow);



    // Minus resource button
    uiButton('spaceStation', '-').appendTo(waterRow).on('click', function () {
        creditUpdate(shopObj.dataTypeB, shopObj.sellPriceB, -1);
        loadSpaceStationScreen();
    });
    paragraph('spaceStation', stats.water).appendTo(waterRow);

    // Add resource button
    uiButton('spaceStation', '+').appendTo(waterRow).on('click', function () {
        creditUpdate(shopObj.dataTypeB, -shopObj.buyPriceB, 1);
        loadSpaceStationScreen();
    });

    // Back Button
    returnToShip('back', 'active').appendTo(self.$page).on('click', function () {
        $('#spaceStationScreen').hide();
        $('#spaceScreen').show();

    });

    self.$container.append(self.$page);


}

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



// Test function to load a dummy scenario
function loadScenario() {

    window.scenarioObj = {

        pImage: [undefined,undefined,undefined],
        planet: [undefined,undefined,undefined],
        dialogue: [undefined,undefined,undefined],
        optionA: [undefined,undefined,undefined],
        optionB: [undefined,undefined,undefined],
        resultsA_dialogue:[undefined,undefined,undefined],
        resultsA_number: [undefined,undefined,undefined],
        resultsA_type: [undefined,undefined,undefined],
        resultsB_dialogue:[undefined,undefined,undefined],
        resultsB_number: [undefined,undefined,undefined],
        resultsB_type: [undefined,undefined,undefined]

    };

    var scenario = new Promise(function (resolve, reject) {
        // Fetch the nouns
        $.getJSON('json/scenario.json').done(function (json) {
            // Use the closured dictionary so we can easily access later without array parsing
            console.log(json);



            for(var i= 0; 0 < json.length; i++) {
                scenarioObj.pImage[i] = json[i].pImage;
                scenarioObj.planet[i] = json[i].planetStyle;
                scenarioObj.dialogue[i] = json[i].dialogue;
                scenarioObj.optionA[i] = json[i].options["a"];
                scenarioObj.optionB[i] = json[i].options["b"];

                scenarioObj.resultsA_dialogue[i] = json[i].results["a"][0];
                scenarioObj.resultsA_number[i] = json[i].results["a"][1];
                scenarioObj.resultsA_type[i] = json[i].results["a"][2];
                scenarioObj.resultsB_dialogue[i] = json[i].results["b"][0];
                scenarioObj.resultsB_number[i] = json[i].results["b"][1];
                scenarioObj.resultsB_type[i] = json[i].results["b"][2];
            }


            console.log("yo:"+ scenarioObj);
            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            console.log(json);
            reject();
        });
    });


}

// Test function to load a dummy scenario
function loadShopData() {

    window.shopObj = {
        dataTypeA: undefined,
        dataTypeB: undefined,
        Quantity: undefined,
        buyPriceA: undefined,
        buyPriceB: undefined,
        sellPriceA: undefined,
        sellPriceB: undefined

    };

    var shop = new Promise(function (resolve, reject) {
        // Fetch the nouns
        $.getJSON('json/shop.json').done(function (json) {
            // Use the closured dictionary so we can easily access later without array parsing
            console.log(json);
            shopObj.dataTypeA = json[0].dataType[0];
            shopObj.dataTypeB = json[0].dataType[1];
            shopObj.Quantity = json[0].quantity;
            shopObj.buyPriceA = json[0].buyPrice[0];
            shopObj.buyPriceB = json[0].buyPrice[0];
            shopObj.sellPriceA = json[0].sellPrice[1];
            shopObj.sellPriceB = json[0].sellPrice[1];

            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            reject();
        });
    });


}

// Alert dialogue functions





