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
    loadBossBattle();
    loadMainMenu();
    
    // Randomly places BG
    window.rando = randomBGInt();
    randomBGGen(rando);
    // randomly place asteroid






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



    }

}

// Side nav open
function openNav() {


    $(".sideNav").css( "height", "80%");
    $(".sideNav").css("opacity", "0.8");

    setTimeout(function(){
        $(".sideNav").css("width", "30%");


    },700);




}

// side nav close
function closeNav() {

    $(".sideNav").css("width", "10px");

    setTimeout(function(){

        $(".sideNav").css('height', "0px");
        $(".sideNav").css("opacity", "0.0");
    },700);




}

// Load the main menu
function loadMainMenu() {



    // Background set to black
    $('body').css('background-color', '#000 !important');
    // $('body').removeClass('BGCLASS-02');
    // $('body').addClass('BGCLASS-01');

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
        // $('#mainMenu').hide();
        // loadSpaceScreen();

    });
    // HTP Button
    startButton('htpButton', 'img/HTPButton.png').appendTo(self.$page).on('click', function () {
        // $('#mainMenu').hide();
        // loadSpaceScreen();

    });


    // Append everything to the page
    self.$container.append(self.$page);


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
        resultsA_dialogue:[],
        resultsA_number: [],
        resultsA_type: [],
        resultsB_dialogue:[],
        resultsB_number: [],
        resultsB_type: [],
        resultsC_dialogue:[],
        resultsC_number: [],
        resultsC_type: []

    };

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
        end_dialogue: undefined


    };
}

// Adds the asteroid, stars and twinkly stars
function bgElements(container) {
    stars().appendTo(container);
    twinkles().appendTo(container);


}

timer = 0;
// Looping function that randomizes the position of the asteroid.
function asteroidPos(){



    $(".asteroid"+rando).css("right", asteroidRandom);
    

    x = 5; //seconds

    function asteroidRandom(){

       randomNumber = Math.floor((Math.random() * 650) - 250);

       return randomNumber
       

    }

   timer = setTimeout(asteroidPos , x*1000);

   }
 
   // Random number generator for randomly placing background


function randomBGGen (randomInt) {

    $("body").css("background-image", "url('img/BG00" + randomInt + ".jpg')");

    // $("<div class='asteroid'><img class='asteroid' src='img/Commet00"+ randomInt +".gif'></div>");

    

}


var exists = [],
randomInt;
var bgCounter = 0;


function randomBGInt() {
//New function that randomly generates index and then cuts it out once used. 
    bgCounter ++; 
    for(var l=0;l < 6;l++) {
        do {

        randomInt = Math.floor(Math.random()*6 + 1 );  
        } while (exists[randomInt]);
        exists[randomInt] = true;{
        
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

function planetCost(crew) {

// Planets = 1 food * crew, 2 water * crew, 1 fuel
// Black hole = 2 food * crew, 4 water * crew, 2 fuel. 

stats.food -= crew; 
stats.water -= 2 * crew;
stats.fuel -= 1;


}

// Load the space screen
function loadSpaceScreen() {
    // Asteroid function - perhaps rename function - makes no sense..
    // asteroidPos();

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
    // asteroidContainer().appendTo('#spaceScreen');
    // asteroid(rando).appendTo('.asteroidContainer');


    // Add hidden boss
    bossButton('space-boss').appendTo(self.$page).on('click', function () {

        self.$container.hide();
        loadBossScreen();

    });

    // Spaceship button
    spaceship().appendTo(self.$page).on('click', function () {
        // $('#spaceScreen').hide();
        // loadSpaceShipScreen();
    });

    // Space station
    spaceStation().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceStationScreen();
    });

    var notification = $("<div class='notify-container'></div>").appendTo(self.$page);
    // Create a hidden notification button
    var notLabel = notify().appendTo(notification);

    var contentRowTop = $("<div class='resource-cost'></div>").appendTo(notLabel);
    sideNavStat('FoodIcon.png','food-cost', -stats.crew ).appendTo(contentRowTop);
    sideNavStat('WaterIcon.png','water-cost', -stats.crew * 2).appendTo(contentRowTop);
    sideNavStat('FuelIcon.png','fuel-cost', -stats.crew).appendTo(contentRowTop);


    var notifyButtons = $('<div class="notify-buttons"></div>').appendTo(notLabel);


    uiButton('ok', 'Ok').appendTo(notifyButtons).on('click', function () {
        
        if(stats.food >= stats.crew + 1 && stats.water >= stats.crew * 2   && stats.fuel >= 2) {
            notLabel.hide();
            $(".uiLabel").html(' ');
            $('#spaceScreen').hide();
            loadScenarioScreen();
            planetCost(stats.crew);

        } else {
            $(".uiLabel").remove();

            notLabel.hide();
            $(".space-planet-.planet-"+ number +"").css({"pointer-events": 'auto', "opacity": '1.0'});
        }


    });

    // Append a cancel and an OK but to the notification area
    uiButton('cancel', 'Cancel').appendTo(notifyButtons).on('click', function () {
        $(".uiLabel").html(' ');
        notLabel.hide();
        $(".space-planet-.planet-"+ number +"").css({"pointer-events": 'auto', "opacity": '1.0'});
    });


    // On click the user will be asked if they want to start a scenario

    planet(scenarioObj.pImage[0], 'planet-0').appendTo(self.$page).on('click', function() {

        // Check resourse cost
        costUpate();
        // Remove any content inside notify label
        $('label.uiLabel, .not-diamond').remove();
        // Show the notification
        $(".notify").show();
        // Create the label with content

        // Specify the correct number to read from the scenarioObj object
        number = 0;

        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);


        //Disable button on click
        $(".space-planet-.planet-0").css({"pointer-events": 'none', "opacity": '0.8'});
                                
    });
    planet(scenarioObj.pImage[1], 'planet-1').appendTo(self.$page).on('click', function() {
        costUpate();
        $('label.uiLabel, .not-diamond').remove();
        $(".notify").show();
        number = 1;

        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);

        //Disable button on click
        $(".space-planet-.planet-1").css({"pointer-events": 'none', "opacity": '0.8'});
    });
    planet(scenarioObj.pImage[2], 'planet-2').appendTo(self.$page).on('click', function() {
        costUpate();
        $('label.uiLabel, .not-diamond').remove();
        $(".notify").show();
        number = 2;

        uiLabel(scenarioObj.planetBlurb[number]).prependTo(notLabel);
        diamond().prependTo(notLabel);

        //Disable button on click
        $(".space-planet-.planet-2").css({"pointer-events": 'none', "opacity": '0.8'});
    });

    // Black hole button
    blackHole().appendTo(self.$page).on('click', function () {
        if(stats.galaxyCount < 5){
            clearTimeout(timer);
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

            // Enable space station
        } else {

            $('.space-Blackhole').hide();
            $('.space-boss').show();
        }



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
    // $("<div class='sideNavHeader'>Stats</div>").appendTo(hiddenNav);

    close().appendTo(hiddenNav).on('click', function () {
        closeNav();
    });


    // Add the stats to the side nav
    loadStats(hiddenNav);

    // Append all elements to container
    self.$container.append(self.$page);



}

// Update resource cost
function costUpate() {
    $('.food-cost').html(-stats.crew);
    $('.water-cost').html(-stats.crew * 2);
    $('.fuel-cost').html(-stats.crew);
}


// Move to the next 3 planets in the array
function removePlanets() {

if(stats.galaxyCount < 5) {
    for(var i = 0; i< 3; i++) {

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
function refreshStats () {

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
    sideNavStat('FoodIcon.png','food', stats.food ).appendTo(contentRowTop);
    sideNavStat('WaterIcon.png','water', stats.water).appendTo(contentRowTop);
    sideNavStat('FuelIcon.png','fuel', stats.fuel ).appendTo(contentRowTop);

    var contentRowBottom = $("<div class='stats-rowBot'></div>").appendTo(container);

    sideNavStat('CrewIcon.png','crew', stats.crew ).appendTo(contentRowBottom);
    sideNavStat('CoinIcon.png','credits', stats.credits ).appendTo(contentRowBottom);
    sideNavStat('CoinIcon.png','galaxy', stats.galaxyCount ).appendTo(contentRowBottom);

}

// Update the stats to the resource atainned or lost in the scenario
function updateStats(result, number) {

    var result = result;

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
        $('.option-C-card').hide();

        // Output the results of the scenario
        var resourceUpdate = scenarioObj.resultsA_number[number] + " " + scenarioObj.resultsA_type[number] + ".";
        outputText(scenarioObj.resultsA_dialogue[number], $('.results').show());
        outputText(resourceUpdate, $('.resource-Update').show());

        // Update the stats earned or lost
        updateStats(scenarioObj.resultsA_type[number], scenarioObj.resultsA_number[number]);

        // Back button disabled
        $('.back, .back2').show();
    });

    // Option B
    optionButton('option-B').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();
        $('.option-C-card').hide();

        var resourceUpdate =  scenarioObj.resultsB_number[number] + " " + scenarioObj.resultsB_type[number] + ".";

        outputText(scenarioObj.resultsB_dialogue[number], $('p.results').show());
        outputText(resourceUpdate, $('p.resource-Update').show());

        updateStats(scenarioObj.resultsB_type[number], scenarioObj.resultsB_number[number]);

        $('.back, .back2').show();

    });

    // Option C
    optionButton('option-C').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();
        $('.option-C-card').hide();
        

        var resourceUpdate = scenarioObj.resultsC_number[number] + " " + scenarioObj.resultsC_type[number] + ".";

        outputText(scenarioObj.resultsC_dialogue[number], $('p.results').show());
        outputText(resourceUpdate, $('p.resource-Update').show());

        updateStats(scenarioObj.resultsC_type[number], scenarioObj.resultsC_number[number]);

        $('.back, .back2').show();

    });

    // // Add the back button to the screen
    returnToShip('back', 'hidden').appendTo(self.$page).on('click', function () {

        planetCount++;

        $('#scenarioScreen').hide();

        $('#scenarioScreen').html(' ');
        $('#spaceScreen').show();


    });


    // Append all elements to the container
    self.$container.append(self.$page);

    // Output text one char at a time
    outputText(scenarioObj.dialogue[number], $('.dialogue'), function () {
        outputText(scenarioObj.optionA[number], $('.option-A'));
        outputText(scenarioObj.optionB[number], $('.option-B'));
        outputText(scenarioObj.optionC[number], $('.option-C'));
    });




}



// Outputs text one char at a time.
function outputText(dialogue, element, callback) {


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
                }, delay
            );
        } else {
            if(callback) {
                callback();
            }

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

        }
        
    });
    uiButton('waterMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.water != 1) {
        creditUpdate('water', shopObj.sellPriceB, -1);
        shopValUpdate('water', stats.water);
        shopValUpdate('coin', stats.credits);

        }
    });

    shopIcon('foodIcon').appendTo(shopCon);
    uiButton('foodPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceA) {
        creditUpdate('food', -shopObj.buyPriceA, 1);
        shopValUpdate('food', stats.food);
        shopValUpdate('coin', stats.credits);

        }
    });

    uiButton('foodMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.food != 1) {
        creditUpdate('food',  shopObj.sellPriceA, -1);
        shopValUpdate('food', stats.food);
        shopValUpdate('coin', stats.credits);

        }
    });   

    shopIcon('fuelIcon').appendTo(shopCon);
    uiButton('fuelPlusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.credits != 0 && stats.credits >= shopObj.buyPriceC) {
        creditUpdate('fuel', -shopObj.buyPriceC, 1);
        shopValUpdate('fuel', stats.fuel);
        shopValUpdate('coin', stats.credits);

        }
    }); 
    
    uiButton('fuelMinusIcon', ' ').appendTo(shopCon).on('click', function () {
        if (stats.fuel != 1) {
        creditUpdate('fuel',  shopObj.sellPriceC, -1);
        shopValUpdate('fuel', stats.fuel);
        shopValUpdate('coin', stats.credits);

        }
    });   


    

    shopIcon('coinIcon').appendTo(shopCon);
    

    // Add all elements to page
    self.$container.append(self.$page);


}

function shopValUpdate (resource, object) {
    $("."+resource+"Value").html(object);
    
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


    stats = {
        food: 5,
        water: 10,
        fuel: 5,
        crew: 1,
        credits: 200,
        galaxyCount: 0

    };

    var self = this;

    self.$container = $('#gameOverScreen').show();

    self.$page = $("<div class='gameOver-Screen'></div>");

    $("<div class='image-container'><img src='img/GameOver.png'</div>").appendTo(self.$page).on('click', function () {

        $('#gameOverScreen').html(' ');

        existsPlanet = [];
        loadScenario();
        $('#mainMenu').show();


    });


    self.$container.append(self.$page);



}

/*
***************************************
*
* Ship Screen
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
    // Rock
    rpsButton('rock').appendTo(rpsContainer).on('click', function () {
        var rando = rpsRandomNumber();
        $('.diamond-rps').attr('src', 'img/rock.png');
        $('.boss-rps').attr('src', rpsArray[rando]);
        rpsNum = 0;
        if(rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if(rando === 2) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_1, bossObj.boss_loss_1));
        }else if(rando === 1) {
            //Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_1, bossObj.boss_win_1));
        }
    });

    // Paper
    rpsButton('paper').appendTo(rpsContainer).on('click', function () {
        var rando = rpsRandomNumber();
        $('.diamond-rps').attr('src', 'img/paper.png');

        $('.boss-rps').attr('src', rpsArray[rando]);
        rpsNum = 1;
        if(rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if(rando === 2) {
            // Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_2, bossObj.boss_win_2));
        }else if(rando === 0) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_2, bossObj.boss_loss_2));
        }
    });

    // Scissors
    rpsButton('scissors').appendTo(rpsContainer).on('click', function () {
        var rando = rpsRandomNumber();
        $('.diamond-rps').attr('src', 'img/scissors.png');
        $('.boss-rps').attr('src', rpsArray[rando]);
        rpsNum = 2;
        if(rando === rpsNum) {
            $('.dialogue').html('draw');
        } else if(rando === 1) {
            // Win
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_win_3, bossObj.boss_loss_3));
        }else if(rando === 0) {
            // Loss
            $('.dialogue').html(rpsWinLossDialogue(bossObj.diamond_loss_3, bossObj.boss_win_3));
        }

    });

    self.$container.append(self.$page);


    console.log(bossObj);
    outputText(bossObj.dialogue_1, $('.dialogue'), function () {

        setTimeout(function () {
            $('.dialogue').html(' ');
            outputText(bossObj.dialogue_2, $('.dialogue'));
        }, 3000);

        setTimeout(function () {
            $('.rpsButton-container').fadeIn();
        }, 5000);

    });

}

// Random RPS value - number between 0 and 2
function rpsRandomNumber() {
    var rando = Math.floor((Math.random() * 3));
    console.log(rando);
    return rando;
}

function rpsWinLossDialogue(diamond, boss) {

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
        }, 4000);


    });

}

// Loads in all data needed for boss scenario
function loadBossBattle() {



    var scenario = new Promise(function (resolve, reject) {

        // Fetch the scenarios
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

            bossObj.end_dialogue = json[0].end_dialogue;


            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
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

            // Use the closured dictionary so we can easily access later without array parsing
            //console.log(json);


            
            var numArray = [];
            var randomNumber = 0;



            for(var l=0;l < 18;l++){
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
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            console.log(json);
            reject();
        });
    });


}

var existsPlanet = [],
randomIntP;

function getRandomNumber() {
    for(var l=0;l <18;l++) {
        do {

        randomIntP = getRandomArbitrary(0,18); 
        } while (existsPlanet[randomIntP]);
        existsPlanet[randomIntP] = true;{
        
        return randomIntP;
        }
        
    }

  }

function  getRandomArbitrary(min,max) {
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





