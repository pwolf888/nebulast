/**************************

 __    _  _______  _______  __   __  ___      _______  _______  _______
 |  |  | ||       ||  _    ||  | |  ||   |    |   _   ||       ||       |
 |   |_| ||    ___|| |_|   ||  | |  ||   |    |  |_|  ||  _____||_     _|
 |       ||   |___ |       ||  |_|  ||   |    |       || |_____   |   |
 |  _    ||    ___||  _   | |       ||   |___ |       ||_____  |  |   |
 | | |   ||   |___ | |_|   ||       ||       ||   _   | _____| |  |   |
 |_|  |__||_______||_______||_______||_______||__| |__||_______|  |___|

 UI Framework
 * *************************/



/***************************************
*
* Space elementClass
* Interact with your spaceship, planets and spacestation and a blackhole
*
***************************************/




/***************************************
*
* Scenario elementClass
*
*
***************************************/



/***************************************
*
* Space Station elementClass
*
*
***************************************/

window.card = function(elementClass) {
    var card = $("<ons-card class='"+ elementClass +"-card'></ons-card>");
    return card;
};

window.row = function(elementClass) {
    var row = $("<ons-row class='"+ elementClass +"-card'></ons-row>");
    return row;
};

window.col = function(elementClass, content) {
    var col = $("<ons-col class='"+ elementClass +"-card'>" + content + "</ons-col>");
    return col;
};

window.paragraph = function(elementClass, content) {
    var paragraph = $("<p class='"+ elementClass +"-p'>" + content + "</p>");
    return paragraph;
};

window.uiButton = function (elementClass) {
    var uiButton = $("<ons-button class='" + elementClass + "-button' ></ons-button>");
    return uiButton;
}
/***************************************
*
* Ship elementClass
*
*
***************************************/
