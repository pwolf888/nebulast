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
    
    var self = this;
    
    self.$container = $('#spaceScreen');
    
    self.$page = $("<ons-page class='space-Screen'><div class='space-BG'></div></ons-page>");
    
    $("<ons-button class='space-Ship'>Space ship</ons-button>").appendTo(self.$page);
    $("<ons-button class='space-Station'>Space station</ons-button>").appendTo(self.$page);
    $("<ons-button class='space-planet-'>Planet</ons-button>").appendTo(self.$page);
    $("<ons-button class='blackHole'>Black hole</ons-button>").appendTo(self.$page);
    
    // Stat group - will be loaded in via a function
    var list = $("<ons-list class='statsGroup' modifier='inset'></ons-list>").appendTo(self.$page);
    
    var header = $("<ons-list-header>Stats</ons-list-header>").appendTo(list);
    
    var listItems = $("<ons-list-item class='food'modifier='nodivider'>Food: 3</ons-list-item><ons-list-item class='water' modifier='nodivider'>Water: 4</ons-list-item><ons-list-item class='fuel' modifier='nodivider'>Fuel: 10</ons-list-item><ons-list-item class='crew' modifier='nodivider'>Crew: 4</ons-list-item><ons-list-item class='credits' modifier='nodivider'>Credits: 5432 </ons-list-item>").appendTo(list);
 
    self.$container.append(self.$page);
    
    
}


            
 /*       
***************************************
*  
* Scenario Screen
* 
*
***************************************
 */
            
            
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

    var scenarioObj = {

        dialogue: undefined,
        options: {
                a: undefined,
                b: undefined
        },
        results: {
                a: [
                undefined,
                undefined,
                undefined
                ],
                b: [
                undefined,
                undefined,
                undefined
                ]
        }
    };


    // Load the json into my object
    $.getJSON("json/scenario.json", function (json) {
            
            scenarioObj.dialogue = json.dialogue;
            scenarioObj.options["a"] = json.options["a"];
            scenarioObj.options["b"] = json.options["b"];
            
                scenarioObj.results["a"][0] = json.results["a"][0];
                scenarioObj.results["b"][0] = json.results["b"][0];
                scenarioObj.results["a"][1] = json.results["a"][1];
                scenarioObj.results["b"][1] = json.results["b"][1];
                scenarioObj.results["a"][2] = json.results["a"][2];
                scenarioObj.results["b"][2] = json.results["b"][2];

//            console.log(scenarioObj.dialogue);
//            console.log(scenarioObj.options["a"]);
//            console.log(scenarioObj.options["b"]);
//            console.log(scenarioObj.results["a"]);
//            console.log(scenarioObj.results["b"]);


    });

}
