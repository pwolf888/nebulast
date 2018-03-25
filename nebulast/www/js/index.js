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
 */
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



var scenarioObj = {

    dialogue: undefined,
    optionA: undefined,
    optionB: undefined,
    resultA_dialogue:undefined,
    resultA_number: undefined,
    resultA_type: undefined,
    resultB_dialogue:undefined,
    resultB_number: undefined,
    resultB_type: undefined

};


$(document).ready(function () {
    console.log("ready");
    loadSpaceScreen();   
    
});



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

    $('.page__background').css('background-color', '#000 !important');
    
    var self = this;
    
    self.$container = $('#spaceScreen');
    
    self.$page = $("<ons-page class='space-Screen'></ons-page>");
    
    $("<ons-button class='space-Ship'>Space ship</ons-button>").appendTo(self.$page);
    $("<ons-button class='space-Station'>Space station</ons-button>").appendTo(self.$page);
    
    // On click the user will be asked if they want to start a scenario
    $("<ons-button class='space-planet-' cancelable>Planet</ons-button>").appendTo(self.$page).on('click', function() {
            ons.notification.confirm({message: 'This is plaent Zim 34, would you like to travel there?'})
                .then(function(index) {
             if( index > 0) {
                 console.log(index);
                 $('#spaceScreen').hide();
                 loadScenarioScreen();

             }
        });
            
        
                                
    });
    $("<ons-button class='space-Blackhole'>Black hole</ons-button>").appendTo(self.$page);
    
    // Stat group - will be loaded in via a function
    var list = $("<ons-list class='statsGroup' modifier='inset'></ons-list>").appendTo(self.$page);
    
    var header = $("<ons-list-header tappable>Stats</ons-list-header>").appendTo(list).on('click', function(){
        $(".stat-list").toggle();
    });
    
    var listItems = $("<div class='stat-list' hidden><ons-list-item class='food'modifier='nodivider'>Food: 3</ons-list-item><ons-list-item class='water' modifier='nodivider'>Water: 4</ons-list-item><ons-list-item class='fuel' modifier='nodivider'>Fuel: 10</ons-list-item><ons-list-item class='crew' modifier='nodivider'>Crew: 4</ons-list-item><ons-list-item class='credits' modifier='nodivider'>Credits: 5432 </ons-list-item></div>").appendTo(list);
 
    self.$container.append(self.$page);
    
    
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

    var dialogueRow = $("<ons-row class='scenario-dialogueRow'> </ons-row>").appendTo(self.$page);

    $("<ons-col width='20vw'><ons-card class='scenario-portrait'><ons-icon size='30px' icon='md-face'></ons-card></ons-col>").appendTo(dialogueRow);

    $("<ons-col width='80vw'><ons-card class='dialogue-box'><p class='name'>diamond.ai</p></ons-card></ons-col>").appendTo(dialogueRow);

    self.$container.append(self.$page);

    outputText();



}

function outputText() {

    console.log("this is the obj: " + scenarioObj.dialogue);

    $("<p class=\'dialogue\'>" + scenarioObj.dialogue + "</p>").appendTo('.dialogue-box');

}
            
/*        
***************************************
*  
* Space Station Screen
* 
*
***************************************
 */
            
 /* 
***************************************
*  
* Ship Screen
* 
*
***************************************
*/



// Test function to load a dummy scenario
function loadScenario() {



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
            console.log("this is the derp: " + json);
        }).fail(function (json) {
            // If any dictionaries fail to load, the application has failedy
            reject();
        });
    });

    return scenario;
}



// Alert dialogue functions





