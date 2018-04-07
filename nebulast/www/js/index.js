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






$(document).ready(function () {
    console.log("ready");
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

function loadMainMenu() {

    $('.page__background').css('background-color', '#000 !important');

    var self = this;

    self.$container = $('#mainMenu');

    self.$page = $("<ons-page class='mainMenu'></ons-page>");

    // Start Button
    spaceship().appendTo(self.$page).on('click', function () {
        $('#mainMenu').hide();
        loadSpaceScreen();
    });

    self.$container.append(self.$page);

    window.stats = {
        food: 5,
        water: 5,
        fuel: 5,
        crew: 5,
        credits: 200

    };

}


/*      
***************************************
*  
* Space Screen
* Interact with your spaceship, planets and spacestation and a blackhole
*
***************************************

<ons-page class="spaceScreen">
    
    <ons-button class="spaceShip">Space ship</ons-button>
    <ons-button class="spaceStation">Space station</ons-button>
    <ons-button class="planet_">Planet</ons-button>
    <ons-button class="blackHole">Black hole</ons-button>
    <div class="statsGroup">
        <div class='food'>Food: 3</div>
        <div class='water'>Water: 4</div>
        <div class='fuel'>Fuel: 10</div>
        <div class='crew'>Crew: 4</div>
        <div class='credits'>Credits: 5432 </div>
    </div>
            
</ons-page>

*/

function loadSpaceScreen() {

    loadScenario();


    $('.page__background').css('background-image', 'BG001.jpg');

    

    // stars().appendTo(self.$page);

    // $('.stars').css('background-image', 'stars.png');

    // $('.twinkling').css('background', 'twinkling.png');
    
    var self = this;
    
    self.$container = $('#spaceScreen');
    
    self.$page = $("<ons-page class='space-Screen'></ons-page>");
    
    spaceship().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceShipScreen();
    });
    spaceStation().appendTo(self.$page).on('click', function () {
        $('#spaceScreen').hide();
        loadSpaceStationScreen();
    });
    
    // On click the user will be asked if they want to start a scenario
    planet().appendTo(self.$page).on('click', function() {
            ons.notification.confirm({message: 'This is planet Zim 34, would you like to travel there?'})
                .then(function(index) {
             if( index > 0) {
                 console.log(index);
                 $('#spaceScreen').hide();
                 loadScenarioScreen();

             }
        });
                                
    });
    blackHole().appendTo(self.$page);


    
    // Stat group - will be loaded in via a function

    var list = List('statsGroup').appendTo(self.$page);
    
    ListHead().appendTo(list).on('click', function(){
        $(".stat-list").toggle();
    });

    var statsListContainer = hidingDiv('stat-list').appendTo(list);

    listItem('food', 'food', stats.food).appendTo(statsListContainer);
    listItem('water', 'water', stats.water).appendTo(statsListContainer);
    listItem('fuel', 'fuel', stats.fuel).appendTo(statsListContainer);
    listItem('crew', 'crew', stats.crew).appendTo(statsListContainer);
    listItem('money', 'credits', stats.credits).appendTo(statsListContainer);
 
    self.$container.append(self.$page);
    
    
}

// Upadate the stats to our statsgroup table
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

    self.$page = $("<ons-page class='scenario-Screen'></ons-page>");

    var dialogueRow = uiRow('scenario-dialogueRow').appendTo(self.$page);

    portraitCol().appendTo(dialogueRow);

    dialogueBox().appendTo(dialogueRow);

    var optionsRow = uiRow('scenario-OptionsRow').appendTo(self.$page);

    optionButton('option-A').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();

        var resourceUpdate = "You have gained " + scenarioObj.resultsA_number + " " + scenarioObj.resultsA_type + ".";
        outputText(scenarioObj.resultsA_dialogue, $('.results').show());
        outputText(resourceUpdate, $('.resource-Update').show());

        updateStats(scenarioObj.resultsA_type, scenarioObj.resultsA_number);
        $('.back').prop('disabled', false);
    });

    optionButton('option-B').appendTo(optionsRow).on('click', function () {
        $('.dialogue').hide();
        $('.option-A-card').hide();
        $('.option-B-card').hide();



        var resourceUpdate = "You have lost " + scenarioObj.resultsB_number + " " + scenarioObj.resultsB_type + ".";

        outputText(scenarioObj.resultsB_dialogue, $('.results').show());
        outputText(resourceUpdate, $('.resource-Update').show());

        updateStats(scenarioObj.resultsB_type, scenarioObj.resultsB_number);

        $('.back').prop('disabled', false);

    });

    returnToShip('back').appendTo(self.$page).on('click', function () {
        $('#scenarioScreen').hide();
        loadSpaceScreen();
        $('#spaceScreen').show();

    });

    self.$container.append(self.$page);

    outputText(scenarioObj.dialogue, $('.dialogue'));

    outputText(scenarioObj.optionA, $('.option-A'));

    outputText(scenarioObj.optionB, $('.option-B'));


    console.log(scenarioObj.resultsA_dialogue);

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

    var buyData = '1 food = 50cr <br> 1 water = 40cr';
    var sellData = '1 food = 20cr <br> 1 water = 15cr';

    var self = this;

    self.$container = $('#spaceStationScreen').show();

    self.$page = $("<ons-page class='spaceStation-Screen'></ons-page>");

    // Row 1 - BUY SELL
    var table = card('spaceStation').appendTo(self.$page);
    var row = uiRow('spaceStation').appendTo(table);
    var colLeft = uiCol('spaceStation').appendTo(row);
    var colRight = uiCol('spaceStation').appendTo(row);
    paragraph('spaceStation', 'Buy').appendTo(colLeft);
    paragraph('spaceStation', 'Sell').appendTo(colRight);

    paragraph('spaceStation', buyData).appendTo(colLeft);
    paragraph('spaceStation', sellData).appendTo(colRight);

    var foodRow = uiRow('spaceStation').appendTo(colLeft);
    var waterRow = uiRow('spaceStation').appendTo(colLeft);
    paragraph('spaceStation', 'Food').appendTo(foodRow);
    uiButton('spaceStation', '-').appendTo(foodRow);
    paragraph('spaceStation', '5').appendTo(foodRow);
    uiButton('spaceStation', '+').appendTo(foodRow);

    paragraph('spaceStation', 'water').appendTo(waterRow);
    uiButton('spaceStation', '-').appendTo(waterRow);
    paragraph('spaceStation', '5').appendTo(waterRow);
    uiButton('spaceStation', '+').appendTo(waterRow);


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

function loadSpaceShipScreen() {
    var self = this;

    self.$container = $('#spaceShipScreen').show();

    self.$page = $("<ons-page class='spaceShip-Screen'></ons-page>");

    self.$container.append(self.$page);


}



// Test function to load a dummy scenario
function loadScenario() {

    window.scenarioObj = {

        dialogue: undefined,
        optionA: undefined,
        optionB: undefined,
        resultsA_dialogue:undefined,
        resultsA_number: undefined,
        resultsA_type: undefined,
        resultsB_dialogue:undefined,
        resultsB_number: undefined,
        resultsB_type: undefined

    };

    var scenario = new Promise(function (resolve, reject) {
        // Fetch the nouns
        $.getJSON('json/scenario.json').done(function (json) {
            // Use the closured dictionary so we can easily access later without array parsing
            scenarioObj.dialogue = json.dialogue;
            scenarioObj.optionA = json.options["a"];
            scenarioObj.optionB = json.options["b"];

            scenarioObj.resultsA_dialogue = json.results["a"][0];
            scenarioObj.resultsA_number = json.results["a"][1];
            scenarioObj.resultsA_type = json.results["a"][2];
            scenarioObj.resultsB_dialogue = json.results["b"][0];
            scenarioObj.resultsB_number = json.results["b"][1];
            scenarioObj.resultsB_type = json.results["b"][2];


            resolve();
            // console.log("Output: " + scenarioObj.resultsA_dialogue);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            reject();
        });
    });


}



// Alert dialogue functions





