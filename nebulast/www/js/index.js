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
    loadScenario();
    
    
    
    
});







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

            console.log(scenarioObj.dialogue);
            console.log(scenarioObj.options["a"]);
            console.log(scenarioObj.options["b"]);
            console.log(scenarioObj.results["a"]);
            console.log(scenarioObj.results["b"]);


    });

}
