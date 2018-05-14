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
    // Loading all JSON on init
    loadScenario();
    loadShopData();
    loadBossBattle();

    // Loads main menu
    loadMainMenu();

    // Randomly places BG
    window.rando = randomBGInt();
    randomBGGen(rando);

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
    // If any stat reaches 0 triggers game over
    if (stats.food <= 0 || stats.water <= 0 || stats.fuel <= 0 || stats.crew <= 0) {
        loadGameOverScreen();
        $('#spaceScreen').html(' ');
        $('#scenarioScreen').html(' ');

    }

}

// Stats nav open
function openNav() {

    $(".sideNav").css("height", "80%");
    $(".sideNav").css("opacity", "0.8");

    setTimeout(function () {
        $(".sideNav").css("width", "50%");
    }, 700);
}

// Stats nav close
function closeNav() {

    $(".sideNav").css("width", "10px");

    setTimeout(function () {

        $(".sideNav").css('height', "0px");
        $(".sideNav").css("opacity", "0.0");
    }, 700);
}

// Load the main menu
function loadMainMenu() {

    // Background set to black
    $('body').css('background-color', '#000 !important');

    var self = this;

    // Container of the menu items
    self.$container = $('#mainMenu');

    // page that holds all of the content
    self.$page = $("<div class='mainMenu'></div>");
    menuBG().appendTo(self.$page);
    overlay().appendTo(self.$page).on('click', function () {

        $('.startOverlay').hide();


    });


    bgElements('body');


    // Start Button
    startButton('startButton', 'img/NewButton.png').appendTo(self.$page).on('click', function () {
        $('#mainMenu').hide();
        loadSpaceScreen();

    });


    // Load Button
    startButton('loadButton', 'img/LoadButton.png').appendTo(self.$page).on('click', function () {

    });
    // HTP Button
    startButton('htpButton', 'img/HTPButton.png').appendTo(self.$page).on('click', function () {

    });


    // Append everything to the page
    self.$container.append(self.$page);

    // Grey out unused buttons
    $('.loadButton').css('opacity', '0.2');
    $('.htpButton').css('opacity', '0.2');

    // Initialise the starting stats
    window.stats = {
        food: 5,
        water: 10,
        fuel: 5,
        crew: 1,
        credits: 200,
        galaxyCount: 0

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
        optionC: [],
        resultsA_dialogue: [],
        resultsA_number: [],
        resultsA_type: [],
        resultsB_dialogue: [],
        resultsB_number: [],
        resultsB_type: [],
        resultsC_dialogue: [],
        resultsC_number: [],
        resultsC_type: []

    };

    // Initialise the bossObj
    window.bossObj = {

        dialogue_1: undefined,
        dialogue_2: undefined,

        boss_loss_1: undefined,
        boss_loss_2: undefined,
        boss_loss_3: undefined,
        boss_win_1: undefined,
        boss_win_2: undefined,
        boss_win_3: undefined,


        diamond_loss_1: undefined,
        diamond_loss_2: undefined,
        diamond_loss_3: undefined,
        diamond_win_1: undefined,
        diamond_win_2: undefined,
        diamond_win_3: undefined,

        win_dialogue: undefined,
        win_dialogue2: undefined,
        loss_dialogue: undefined,
        loss_dialogue2: undefined


    };
}

// Adds the stars and twinkly stars
function bgElements(container) {
    stars().appendTo(container);
    twinkles().appendTo(container);


}

// Joshes boloved asteroid will be fixed eventually
// // Looping function that randomizes the position of the asteroid.
// function asteroidPos() {

//     $(".asteroid" + rando).css("right", asteroidRandom);


//     x = 5; //seconds

//     function asteroidRandom() {

//         randomNumber = Math.floor((Math.random() * 650) - 250);

//         return randomNumber


//     }

//     timer = setTimeout(asteroidPos, x * 1000);

// }


// Random number generator for randomly placing background
function randomBGGen(randomInt) {

    $("body").css("background-image", "url('img/BG00" + randomInt + ".jpg')");

    // $("<div class='asteroid'><img class='asteroid' src='img/Commet00"+ randomInt +".gif'></div>");

}

// Global BG variables
var exists = [],
    randomInt;
var bgCounter = 0;

// function that randomly generates index and then cuts it out once used. 
function randomBGInt() {
    
    bgCounter++;
    for (var l = 0; l < 6; l++) {
        do {

            randomInt = Math.floor(Math.random() * 6 + 1);
        } while (exists[randomInt]);
        exists[randomInt] = true; {

            return randomInt;
        }

    }
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
    // Asteroid function - future purposes
    // asteroidPos();

    // Make sure the Json is no read each time function is called
    if (!loaded) {
        // Preload Data
        loaded = true;

    }

    // Keep track of Planets
    window.planetCount = 0;

    var self = this;

    // Container tha holds all of the spacescreen elements
    self.$container = $('#spaceScreen').show();

    // Page that holds all the space screen elements


    self.$page = $("<div class='space-Screen'></div>");
    // asteroidContainer().appendTo('#spaceScreen');
    // asteroid(rando).appendTo('.asteroidContainer');


    // Add hidden boss until the end of the game 6th galaxy
    bossButton('space-boss').appendTo(self.$page).on('click', function () {

        self.$container.hide();
        loadBossScreen();

    });

    // Spaceship button
    spaceship().appendTo(self.$page).on('click', function () {
        // Close the nav if open
        closeNav();

        // Ok - blow up the ship
        number = -2;

        // Remove any content inside notify label
        $('label.uiLabel, .not-diamond').remove();

        // Show the notification
        $(".notify").show();

        // Create the label with content
        uiLabel('Having trouble, Captain? We could blow up the ship and start again? :D').prependTo(notLabel);
        diamond().prependTo(notLabel);

        //Disable button on click
        $(".space-Ship").css({
            "pointer-events": 'none',
            "opacity": '0.8'
        });

        // Hide the resource cost - it is free to blow up ;)
        $('.resource-cost').hide();
    });

    // Space station
    spaceStation().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceStationScreen();
    });

    // Notification container
    var notification = $("<div class='notify-container'></div>").appendTo(self.$page);
    // Create a hidden notification button
    var notLabel = notify().appendTo(notification);

    // Row of resource cost
    var contentRowTop = $("<div class='resource-cost'></div>").appendTo(notLabel);
    sideNavStat('FoodIcon.png', 'food-cost', -stats.crew).appendTo(contentRowTop);
    sideNavStat('WaterIcon.png', 'water-cost', -stats.crew * 2).appendTo(contentRowTop);
    sideNavStat('FuelIcon.png', 'fuel-cost', -stats.crew).appendTo(contentRowTop);

    sideNavStat('CoinIcon.png', 'credit-gain', stats.crew * 100).appendTo(contentRowTop);
    $('.credit-gain').hide();

    // Ok Cancel container
    var notifyButtons = $('<div class="notify-buttons"></div>').appendTo(notLabel);

    // Ok button
    uiButton('ok', 'Ok').appendTo(notifyButtons).on('click', function () {

        // Planet cost check
        if (stats.food >= stats.crew + 1 && stats.water >= stats.crew * 2 && stats.fuel >= 2 && number >= 0) {
            notLabel.hide();
            $(".uiLabel").html(' ');
            $('#spaceScreen').hide();
            loadScenarioScreen();
            planetCost(stats.crew);

            // Black Hole cost check
        } else if (stats.food >= stats.crew + 2 && stats.water >= stats.crew * 4 && stats.fuel >= 2 && number === -1) {

            // Check if it is end game or the next galaxy
            if (stats.galaxyCount < 5) {
                planetCost(stats.crew);

                // Black hole resets system and generating x amount of new planets
                $("#spaceScreen").html(' ');
                // Randomly places BG
                if (bgCounter < 6) {
                    rando = randomBGInt();
                    randomBGGen(rando);
                }

                // Change planets
                removePlanets();
                loadSpaceScreen();

               // Show the boss if conditions are right
            } else {

                $('.space-Blackhole').hide();
                $('.space-boss').show();
            }

            // Blow up the ship
        } else if (number === -2) {
            $('.space-Screen').html(' ');
            loadGameOverScreen();

            // If not enough resources 
        } else {
            $(".uiLabel").remove();

            notLabel.hide();
            $(".space-planet-.planet-" + number + "").css({
                "pointer-events": 'auto',
                "opacity": '1.0'
            });
            $(".space-Blackhole").css({
                "pointer-events": 'auto',
                "opacity": '1.0'
            });
        }


    });

    // Cancel Button
    uiButton('cancel', 'Cancel').appendTo(notifyButtons).on('click', function () {
        $('.credit-gain').hide();
        $(".uiLabel").html(' ');
        notLabel.hide();
        $(".space-planet-.planet-" + number + "").css({
            "pointer-events": 'auto',
            "opacity": '1.0'
        });
        // Renable buttons on click
        $(".space-Blackhole").css({
            "pointer-events": 'auto',
            "opacity": '1.0'
        });
        $(".space-Ship").css({
            "pointer-events": 'auto',
            "opacity": '1.0'
        });
    });


    // On click the user will be asked if they want to start a scenario
    planet(scenarioObj.pImage[0], 'planet-0').appendTo(self.$page).on('click', function () {
        closeNav();
        $('.credit-gain').hide();
        // Planet 1 number 
        number = 0;
        costUpdate();
        // Remove any content inside notify label
        $('label.uiLabel, .not-diamond').remove();
        // Show the notification
        $(".notify").show();

        // Specify the correct number to read from the scenarioObj object
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);

        //Disable button on click
        $(".space-planet-.planet-0").css({
            "pointer-events": 'none',
            "opacity": '0.8'
        });

    });
    planet(scenarioObj.pImage[1], 'planet-1').appendTo(self.$page).on('click', function () {
        closeNav();
        $('.credit-gain').hide();
        number = 1;
        costUpdate();
        $('label.uiLabel, .not-diamond').remove();
        $(".notify").show();
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);
        //Disable button on click
        $(".space-planet-.planet-1").css({
            "pointer-events": 'none',
            "opacity": '0.8'
        });
    });
    planet(scenarioObj.pImage[2], 'planet-2').appendTo(self.$page).on('click', function () {
        closeNav();
        $('.credit-gain').hide();
        number = 2;
        costUpdate();
        $('label.uiLabel, .not-diamond').remove();
        $(".notify").show();
        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);
        //Disable button on click
        $(".space-planet-.planet-2").css({
            "pointer-events": 'none',
            "opacity": '0.8'
        });
    });

    // Black hole button
    blackHole().appendTo(self.$page).on('click', function () {
        // Close nav if open
        closeNav();
        // Black hole number
        number = -1;
        $('.credit-gain').css('display', 'inline-block');
        // Check resourse cost
        costUpdate();
        // Remove any content inside notify label
        $('label.uiLabel, .not-diamond').remove();
        // Show the notification
        $(".notify").show();
        // Create the label with content
        uiLabel('The Black Hole wil take us to a new solar system, enter the next galaxy, Captain?').prependTo(notLabel);
        diamond().prependTo(notLabel);

        //Disable button on click
        $(".space-Blackhole").css({
            "pointer-events": 'none',
            "opacity": '0.8'
        });

    });

    // Stats button
    hamburger().appendTo(self.$page).on('click', function () {
        openNav();
        // Refreshes the statistics and updates the table
        refreshStats();
    });

    // Add the stats nav to the screen
    window.hiddenNav = sideNav().appendTo(self.$page);

    // X button inside stats nav
    close().appendTo(hiddenNav).on('click', function () {
        closeNav();
    });

    // Add the stats to the stats nav
    loadStats(hiddenNav);

    // Append all elements to container
    self.$container.append(self.$page);



}

// Update resource cost visually to the notification
function costUpdate() {

    // For black hole cost
    if (number === -1) {
        console.log('-1');
        $('.food-cost').html(-stats.crew - 1);
        $('.water-cost').html(-2 * (stats.crew + 1));
        $('.fuel-cost').html(-2);
        $('.credit-gain').html(stats.crew * 100);
    } else if (number >= 0) {
        console.log('1');
        // For planet
        $('.food-cost').html(-stats.crew);
        $('.water-cost').html(-stats.crew * 2);
        $('.fuel-cost').html(-1);
    }
}

// Remove the resources functionally
function planetCost(crew) {

    // Planets = 1 food * crew, 2 water * crew, 1 fuel
    // Black hole = 2 food * crew, 2 * (crew + 1) , 2 fuel.

    // Black hole money
    if (number === -1) {
        stats.food -= crew + 1;
        stats.water -= 2 * (crew + 1);
        stats.fuel -= 2;
        stats.credits += crew * 100;

        // Planet resources cost
    } else if (number >= 0) {
        stats.food -= crew;
        stats.water -= 2 * crew;
        stats.fuel -= 1;
    }

}

// Remove 3 planets visited expose the next 3
function removePlanets() {

    if (stats.galaxyCount < 5) {
        for (var i = 0; i < 3; i++) {

            scenarioObj.pImage.shift();
            scenarioObj.planetBlurb.shift();
            scenarioObj.dialogue.shift();
            scenarioObj.optionA.shift();
            scenarioObj.optionB.shift();
            scenarioObj.optionC.shift();

            scenarioObj.resultsA_dialogue.shift();
            scenarioObj.resultsA_number.shift();
            scenarioObj.resultsA_type.shift();
            scenarioObj.resultsB_dialogue.shift();
            scenarioObj.resultsB_number.shift();
            scenarioObj.resultsB_type.shift();
            scenarioObj.resultsC_dialogue.shift();
            scenarioObj.resultsC_number.shift();
            scenarioObj.resultsC_type.shift();
        }
    }
    stats.galaxyCount += 1;

}
// Update the side nav with the most recent stats
function refreshStats() {

    $('.food').html(stats.food);
    $('.water').html(stats.water);
    $('.fuel').html(stats.fuel);
    $('.crew').html(stats.crew);
    $('.credits').html(stats.credits);


}


// Load stats group
function loadStats(container) {


    sideNavDiamond().appendTo(container);
    var contentRowTop = $("<div class='stats-rowTop'></div>").appendTo(container);
    sideNavStat('FoodIcon.png', 'food', stats.food).appendTo(contentRowTop);
    sideNavStat('WaterIcon.png', 'water', stats.water).appendTo(contentRowTop);
    sideNavStat('FuelIcon.png', 'fuel', stats.fuel).appendTo(contentRowTop);

    var contentRowBottom = $("<div class='stats-rowBot'></div>").appendTo(container);

    sideNavStat('CrewIcon.png', 'crew', stats.crew).appendTo(contentRowBottom);
    sideNavStat('CoinIcon.png', 'credits', stats.credits).appendTo(contentRowBottom);
    sideNavStat('GalaxyIcon.png', 'galaxy', stats.galaxyCount).appendTo(contentRowBottom);

}

// Update the stats to the resource attained or lost in the scenario
function updateStats(result, number) {

    var result = result;

    switch (result) {
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

    // Check if game over
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

 // Load the scenario screen
function loadScenarioScreen() {


    var self = this;

    self.$container = $('#scenarioScreen').show();

    self.$page = $("<div class='scenario-Screen-page'></div>");

    // First row of the content that holds the dialogue and the portait
    var dialogueRow = uiRow('scenario-dialogueRow').appendTo(self.$page);

    // Planet image
    portraitColNew(scenarioObj.pImage[number]).appendTo(dialogueRow);

    // Options row holds the options
    var optionsRow = uiRow('scenario-OptionsRow').appendTo(self.$page);

    // Option A
    optionButton('option-A').appendTo(optionsRow).on('click', function () {

        // On click hide all options
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();
        $('.option-C-card').hide();

        // Output the results of the scenario
        var resourceUpdate = scenarioObj.resultsA_number[number] + " " + scenarioObj.resultsA_type[number] + ".";

        // Output results
        outputText(scenarioObj.resultsA_dialogue[number], $('.results').show(), function () {
            // Wait for first function to finish then output the resource update and check if gameover
            outputText(resourceUpdate, $('.resource-Update').show(), function () {

                // Wait a second before leaving screen if game over
                setTimeout(function () {
                    // Update the stats earned or lost
                    updateStats(scenarioObj.resultsA_type[number], scenarioObj.resultsA_number[number]);

                    // Back button disabled
                    $('.back, .back2').show();
                }, 1000);

            });

        });

    });

    // Option B
    optionButton('option-B').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();
        $('.option-C-card').hide();

        var resourceUpdate = scenarioObj.resultsB_number[number] + " " + scenarioObj.resultsB_type[number] + ".";

        outputText(scenarioObj.resultsB_dialogue[number], $('p.results').show(), function () {
            outputText(resourceUpdate, $('p.resource-Update').show(), function () {
                setTimeout(function () {
                    updateStats(scenarioObj.resultsB_type[number], scenarioObj.resultsB_number[number]);

                    $('.back, .back2').show();
                }, 1000);

            });

        });

    });

    // Option C
    optionButton('option-C').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();
        $('.option-C-card').hide();


        var resourceUpdate = scenarioObj.resultsC_number[number] + " " + scenarioObj.resultsC_type[number] + ".";

        outputText(scenarioObj.resultsC_dialogue[number], $('p.results').show(), function () {
            outputText(resourceUpdate, $('p.resource-Update').show(), function () {

                setTimeout(function () {
                    updateStats(scenarioObj.resultsC_type[number], scenarioObj.resultsC_number[number]);
                    $('.back, .back2').show();
                }, 1000);


            });
        });




    });

    // Add the back button to the screen - return to space screen
    returnToShip('back', 'hidden').appendTo(self.$page).on('click', function () {
        planetCount++;
        $('#scenarioScreen').hide();
        $('#scenarioScreen').html(' ');
        $('#spaceScreen').show();


    });

    // Append all elements to the container
    self.$container.append(self.$page);

    // Make option buttons unclickable 
    $(".option-A-card, .option-B-card, .option-C-card").css({
        "pointer-events": 'none',
        "opacity": '0.8'
    });

    // Output text one char at a time and once output enable the buttons
    outputText(scenarioObj.dialogue[number], $('.dialogue'), function () {
        outputText(scenarioObj.optionA[number], $('.option-A'), function () {
            $(".option-A-card").css({
                "pointer-events": 'auto',
                "opacity": '1.0'
            });
        });
        outputText(scenarioObj.optionB[number], $('.option-B'), function () {
            $(".option-B-card").css({
                "pointer-events": 'auto',
                "opacity": '1.0'
            });
        });
        outputText(scenarioObj.optionC[number], $('.option-C'), function () {
            $(".option-C-card").css({
                "pointer-events": 'auto',
                "opacity": '1.0'
            });
        });
    });




}



// Outputs text one char at a time.
function outputText(dialogue, element, callback) {


    var text = dialogue;
    var elem = element;
    var delay = 20;

    // http://jsfiddle.net/8ZtqL/167/
    var outputTextSlowly = function (text, elem, delay) {
        if (!elem) {
            elem = $("body");
        }
        if (!delay) {
            delay = 300;
        }
        if (text.length > 0) {
            // Append first character
            elem.append(text[0]);
            setTimeout(
                function () {
                    // Slice text by 1 character and call function again
                    outputTextSlowly(text.slice(1), elem, delay);
                }, delay
            );
        } else {
            if (callback) {
                callback();
            }

        }
    };


    outputTextSlowly(text, elem, delay);


}


/*        
 ***************************************
 *  
 * Space Station Screen
 * 
 *
 ***************************************
 */

 // Shop screen
function loadSpaceStationScreen() {

    // Shop prices
    // var buyData = "" + shopObj.Quantity + " " + shopObj.dataTypeA + " = " + shopObj.buyPriceA + "cr</br>";
    // buyData += "" + shopObj.Quantity + " " + shopObj.dataTypeB + " = " + shopObj.buyPriceB + "cr</br>";
    // var sellData = "" + shopObj.Quantity + " " + shopObj.dataTypeA + " = " + shopObj.sellPriceA + "cr</br>";
    // sellData += "" + shopObj.Quantity + " " + shopObj.dataTypeB + " = " + shopObj.sellPriceB + "cr</br>";

    var self = this;

    self.$container = $('#spaceStationScreen').show();

    self.$page = $("<div class='spaceStation-Screen'></div>");

    // Add the space station background
    spaceStationBG('spaceStation').appendTo(self.$page);

    // Back Button
    returnToShip('back', 'active').appendTo(self.$page).on('click', function () {

        $('#spaceStationScreen').hide();
        $('#spaceStationScreen').html(' ');
        $('#spaceScreen').show();

    });

    // Add the shop screen with buttons and such
    shopScreen().appendTo(self.$page);
    var shopCon = shopContainer().appendTo(self.$page);

    // Add all contents into the shop container
    shopIcon('waterIcon').appendTo(shopCon);
    $("<div class='waterValue'></div>").appendTo(shopCon).html(stats.water);
    $("<div class='foodValue'></div>").appendTo(shopCon).html(stats.food);
    $("<div class='fuelValue'></div>").appendTo(shopCon).html(stats.fuel);
    $("<div class='coinValue'></div>").appendTo(shopCon).html(stats.credits);
 
    // Buy water
    uiButton('waterPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceB) {
            creditUpdate('water', -shopObj.buyPriceB, 1);
            shopValUpdate('water', stats.water);
            shopValUpdate('coin', stats.credits);

        }

    });
    // Sell water
    uiButton('waterMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.water != 1) {
            creditUpdate('water', shopObj.sellPriceB, -1);
            shopValUpdate('water', stats.water);
            shopValUpdate('coin', stats.credits);

        }
    });

    // Buy Food
    shopIcon('foodIcon').appendTo(shopCon);
    uiButton('foodPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceA) {
            creditUpdate('food', -shopObj.buyPriceA, 1);
            shopValUpdate('food', stats.food);
            shopValUpdate('coin', stats.credits);

        }
    });

    // Sell Food
    uiButton('foodMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.food != 1) {
            creditUpdate('food', shopObj.sellPriceA, -1);
            shopValUpdate('food', stats.food);
            shopValUpdate('coin', stats.credits);

        }
    });

    // Buy Fuel
    shopIcon('fuelIcon').appendTo(shopCon);
    uiButton('fuelPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceC) {
            creditUpdate('fuel', -shopObj.buyPriceC, 1);
            shopValUpdate('fuel', stats.fuel);
            shopValUpdate('coin', stats.credits);

        }
    });

    // Sell Fuel
    uiButton('fuelMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.fuel != 1) {
            creditUpdate('fuel', shopObj.sellPriceC, -1);
            shopValUpdate('fuel', stats.fuel);
            shopValUpdate('coin', stats.credits);

        }
    });



    // Show credits
    shopIcon('coinIcon').appendTo(shopCon);


    // Add all elements to page
    self.$container.append(self.$page);


}

// Show resource value
function shopValUpdate(resource, object) {
    $("." + resource + "Value").html(object);

}

// Update the credits when buying or selling resources
function creditUpdate(dataType, price, qty) {

    stats.credits += price;

    updateStats(dataType, qty);

}


/*
 ***************************************
 *  
 * Ship Screen
 * for future updates
 *
 ***************************************
 */


// function loadSpaceShipScreen() {
//     var self = this;

//     self.$container = $('#spaceShipScreen').show();

//     self.$page = $("<div class='spaceShip-Screen'></div>");
//     stars().appendTo(self.$page);
//     self.$container.append(self.$page);


// }


/*
 ***************************************
 *  
 * Game Over screen
 * 
 *
 ***************************************
 */
// Load Game over screen
function loadGameOverScreen() {

    // Reinitialise scenarioObj
    scenarioObj = {

        pImage: [],
        planetBlurb: [],
        dialogue: [],
        optionA: [],
        optionB: [],
        optionC: [],
        resultsA_dialogue: [],
        resultsA_number: [],
        resultsA_type: [],
        resultsB_dialogue: [],
        resultsB_number: [],
        resultsB_type: [],
        resultsC_dialogue: [],
        resultsC_number: [],
        resultsC_type: []

    };
    
    // Reinitialise Background globals
    exists = [],
        bgCounter = 0;
    existsPlanet = [];
    rando = randomBGInt();
    randomBGGen(rando);


    // Add all the content for the gameover screen
    var self = this;

    self.$container = $('#gameOverScreen').show();

    self.$page = $("<div class='gameOver-Screen'></div>");

    $("<div class='image-container' hidden><img src='img/GameOver.png'</div>").appendTo(self.$page).on('click', function () {

        $('#gameOverScreen').html(' ');

        loadScenario();

        $('#mainMenu').show();


    });

    // Show the end result stats
    var endgameStats = $("<div class='endGame-stats'></div>").appendTo(self.$page);
    loadStats(endgameStats);
    
   

    self.$container.append(self.$page);

    // Reset the stats
    stats = {
        food: 5,
        water: 10,
        fuel: 5,
        crew: 1,
        credits: 200,
        galaxyCount: 0

    };
    $('.image-container').fadeIn(1000);
    
    $('.sideNav-diamond').hide();
}

/*
 ***************************************
 *
 * Boss Screen
 *
 *
 ***************************************
 */
function loadBossScreen() {

    var self = this;

    self.$container = $('#bossScreen').show();

    self.$page = $("<div class='Boss-Screen'></div>");


    // Dialogue section
    bossDialogue().appendTo(self.$page);

    // Action section
    bossAction().appendTo(self.$page);


    // Rock, Paper, Scissors container
    var rpsContainer = $("<div class='rpsButton-container' hidden></div>").appendTo(self.$page);

    // RPS - number to keep track who won
    var rpsNum = 0;
    var rpsArray = [
        "img/rock.png",
        "img/paper.png",
        "img/scissors.png"
    ];

    // Starting Score - 0 loses, 6 wins
    var diamondScore = 3;

    // Rock
    rpsButton('rock').appendTo(rpsContainer).on('click', function () {
        // Random number for rock paper scissors boss
        var rando = rpsRandomNumber();
        // Change image to corresponding picture
        $('.diamond-rps').attr('src', 'img/rock.png');
        $('.boss-rps').attr('src', rpsArray[rando]);
        // Init rps Number 
        rpsNum = 0;
        // If it is equal = draw
        if (rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if (rando === 2) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_1, bossObj.boss_loss_1));
            diamondScore += 1;
            bossBoxWidth(diamondScore);

        } else if (rando === 1) {
            //Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_1, bossObj.boss_win_1));
            diamondScore -= 1;
            bossBoxWidth(diamondScore);

        }

    });

    // Paper
    rpsButton('paper').appendTo(rpsContainer).on('click', function () {
        var rando = rpsRandomNumber();
        $('.diamond-rps').attr('src', 'img/paper.png');

        $('.boss-rps').attr('src', rpsArray[rando]);
        rpsNum = 1;
        if (rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if (rando === 2) {
            // Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_2, bossObj.boss_win_2));
            diamondScore -= 1;
            bossBoxWidth(diamondScore);


        } else if (rando === 0) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_2, bossObj.boss_loss_2));
            diamondScore += 1;
            bossBoxWidth(diamondScore);
        }

    });

    // Scissors
    rpsButton('scissors').appendTo(rpsContainer).on('click', function () {
        var rando = rpsRandomNumber();
        $('.diamond-rps').attr('src', 'img/scissors.png');
        $('.boss-rps').attr('src', rpsArray[rando]);
        rpsNum = 2;
        if (rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if (rando === 1) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_3, bossObj.boss_loss_3));
            diamondScore += 1;
            bossBoxWidth(diamondScore);
        } else if (rando === 0) {
            // Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_3, bossObj.boss_win_3));
            diamondScore -= 1;
            bossBoxWidth(diamondScore);
        }


    });

    self.$container.append(self.$page);

    // Starting dialogue for boss battle
    outputText(bossObj.dialogue_1, $('.dialogue'), function () {

        setTimeout(function () {
            $('.dialogue').html(' ');
            outputText(bossObj.dialogue_2, $('.dialogue'), function () {
                // Shows visual representaion of where the score is at 50% is middle
                $('.bossBox').css({
                    "transition": "2.0s",
                    "width": "50%"
                });
                setTimeout(function () {
                    $('.rpsButton-container').fadeIn();
                }, 1000);
            });
        }, 3000);



    });



}

// Random RPS value - number between 0 and 2
function rpsRandomNumber() {
    var rando = Math.floor((Math.random() * 3));
    console.log(rando);
    return rando;
}



// Switch - to check the width of the bosses virus
function bossBoxWidth(diamondScore) {

    switch (diamondScore) {

        // Loss condition 
        case 0:
            $('.bossBox').css('width', '100%');
            setTimeout(function () {
                $('#bossScreen').hide();
                endGameScreen(diamondScore);
            }, 5000);

            break;
        case 1:
            $('.bossBox').css('width', '90%');
            break;
        case 2:
            $('.bossBox').css('width', '70%');
            break;
        case 3:
            $('.bossBox').css('width', '50%');
            break;
        case 4:
            $('.bossBox').css('width', '35%');
            break;
        case 5:
            $('.bossBox').css('width', '18%');
            break;

            // Win condition
        case 6:
            $('.bossBox').css('width', '0%');
            setTimeout(function () {
                $('#bossScreen').hide();
                endGameScreen(diamondScore);
            }, 5000);
            break;
        default:
            break;

    }


}

// Dialogue output for boss fight
function rpsWinLossDialogue(diamond, boss) {

    $('.rock, .paper, .scissors').css('pointer-events', 'none');
    $('.rpsButton-container').fadeOut();

    // Remove dialogue from before
    $('.dialogue').html(' ');

    // Output diamonds text then boss text
    outputText(diamond, $('.dialogue'), function () {

        setTimeout(function () {
            $('.dialogue').html(' ');
            outputText(boss, $('.dialogue'));
        }, 1000);



        setTimeout(function () {
            $('.rpsButton-container').fadeIn();
            $('.rock, .paper, .scissors').css('pointer-events', 'auto');
        }, 4000);


    });

}
// End Game and Credits
function endGameScreen(score) {

    
    var self = this;

    self.$container = $('#endGame').show();

    self.$page = $("<div class='End-Game-Screen'></div>");
    if (score <= 0) {
        console.log('0');
        lossCredits().appendTo(self.$page);

    } else if (score > 0) {
        console.log('6');

        winCredits().appendTo(self.$page);

    }

    // // Add the back button to the screen
    returnToShip('back', ' ').appendTo(self.$page).on('click', function () {
        $('#bossScreen').html(' ');
        $('#endGame').html(' ');
        $('#mainMenu').show();


    });

    self.$container.append(self.$page);

    // Search for element is on the screen
    var $credits = self.$page.find('.credits-box');

    // Losing dialogue
    if (score <= 0) {
        outputText(bossObj.loss_dialogue, $credits, function () {

            setTimeout(function () {
                $credits.html(' ');
                outputText(bossObj.loss_dialogue2, $credits);
            }, 1000);

        });

        // Winning dialogue
    } else if (score >= 6) {
        outputText(bossObj.win_dialogue, $credits, function () {

            setTimeout(function () {
                $credits.html(' ');
                outputText(bossObj.win_dialogue2, $credits);
            }, 1000);

        });
    }
}



// Loads in all data needed for boss scenario
function loadBossBattle() {

    // Load the boss.json
    var scenario = new Promise(function (resolve, reject) {

        // Fetch the boss battle scenario
        $.getJSON('json/boss.json').done(function (json) {

            bossObj.dialogue_1 = json[0].dialogue_1;
            bossObj.dialogue_2 = json[0].dialogue_2;

            bossObj.boss_loss_1 = json[0].boss_loss[0];
            bossObj.boss_loss_2 = json[0].boss_loss[1];
            bossObj.boss_loss_3 = json[0].boss_loss[2];
            bossObj.boss_win_1 = json[0].boss_win[0];
            bossObj.boss_win_2 = json[0].boss_win[1];
            bossObj.boss_win_3 = json[0].boss_win[2];

            bossObj.diamond_loss_1 = json[0].diamond_loss[0];
            bossObj.diamond_loss_2 = json[0].diamond_loss[1];
            bossObj.diamond_loss_3 = json[0].diamond_loss[2];
            bossObj.diamond_win_1 = json[0].diamond_win[0];
            bossObj.diamond_win_2 = json[0].diamond_win[1];
            bossObj.diamond_win_3 = json[0].diamond_win[2];

            bossObj.win_dialogue = json[0].win_dialogue;
            bossObj.win_dialogue2 = json[0].win_dialogue2;
            bossObj.loss_dialogue = json[0].loss_dialogue;
            bossObj.loss_dialogue2 = json[0].loss_dialogue2;


            resolve();
           
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failed
            console.log(json);
            reject();
        });
    });
}


// Loads all scenarios
function loadScenario() {

    // Promise to load scenario.json file
    var scenario = new Promise(function (resolve, reject) {

        // Fetch the scenarios
        $.getJSON('json/scenario.json').done(function (json) {

            // Track what numbers have been used and find another random number until all 18 are used
            var numArray = [];
            var randomNumber = 0;

            // Push all item into the scenarioObj
            for (var l = 0; l < 18; l++) {
                randomNumber = getRandomNumber();

                numArray.push(randomNumber);


                scenarioObj.pImage.push(json[randomNumber].pImage);
                scenarioObj.planetBlurb.push(json[randomNumber].planetBlurb);
                scenarioObj.dialogue.push(json[randomNumber].dialogue);
                scenarioObj.optionA.push(json[randomNumber].options["a"]);
                scenarioObj.optionB.push(json[randomNumber].options["b"]);
                scenarioObj.optionC.push(json[randomNumber].options["c"]);


                scenarioObj.resultsA_dialogue.push(json[randomNumber].results["a"][0]);
                scenarioObj.resultsA_number.push(json[randomNumber].results["a"][1]);
                scenarioObj.resultsA_type.push(json[randomNumber].results["a"][2]);
                scenarioObj.resultsB_dialogue.push(json[randomNumber].results["b"][0]);
                scenarioObj.resultsB_number.push(json[randomNumber].results["b"][1]);
                scenarioObj.resultsB_type.push(json[randomNumber].results["b"][2]);
                scenarioObj.resultsC_dialogue.push(json[randomNumber].results["c"][0]);
                scenarioObj.resultsC_number.push(json[randomNumber].results["c"][1]);
                scenarioObj.resultsC_type.push(json[randomNumber].results["c"][2]);


            }

            resolve();
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failed
            console.log(json);
            reject();
        });
    });


}

// Random number generator to choose the planets
var existsPlanet = [],
    randomIntP;

function getRandomNumber() {
    for (var l = 0; l < 18; l++) {
        do {

            randomIntP = getRandomArbitrary(0, 18);
        } while (existsPlanet[randomIntP]);
        existsPlanet[randomIntP] = true; {

            return randomIntP;
        }

    }

}

// number between min and max
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
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
            
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failed
            reject();
        });
    });


}
