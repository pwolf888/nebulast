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

window.uiRow = function(elementClass) {
    var uiRow = $("<ons-row class='"+ elementClass +"-card'></ons-row>");
    return uiRow;
};

window.uiCol = function(elementClass) {
    var uiCol = $("<ons-col class='"+ elementClass +"-card'></ons-col>");
    return uiCol;
};

window.paragraph = function(elementClass, content) {
    var paragraph = $("<p class='"+ elementClass +"-p'>" + content + "</p>");
    return paragraph;
};

window.uiButton = function (elementClass, content) {
    var uiButton = $("<ons-button class='" + elementClass + "-button' >"+ content +"</ons-button>");
    return uiButton;
}
/***************************************
*
* Ship elementClass
*
*
***************************************/
