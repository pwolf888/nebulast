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

// Space ship button
window.spaceship = function () {

    var spaceship = $("<div class='space-Ship' ><img src='img/spaceship-gif.gif'></div>");
    return spaceship;
};

//
window.spaceStation = function () {

    var spaceStation = $("<div class='space-Station' modifier='outline'><img src='img/spacestation-gif.gif'></div>");
    return spaceStation;
};

window.planet = function () {


    var planet = $("<div class='space-planet-'modifier='outline' cancelable><img src='img/scenario001.gif'></div>");

    return planet;

};

window.blackHole = function () {
    var blackHole = $("<div class='space-Blackhole' modifier='outline'><img src='img/blackhole.gif'></div>");
    return blackHole;
};

window.List = function (elementClass) {

    var List = $("<ons-list class='"+elementClass+"' modifier='inset'></ons-list>")
    return List;
};

window.ListHead = function () {

    var listHeader = $("<ons-list-header tappable>Stats</ons-list-header>");
    return listHeader;

};

window.hidingDiv = function (elementClass) {

    var hiddenDiv = $("<div class='"+elementClass+"' hidden></div>");
    return hiddenDiv;
};

window.listItem = function (elementClass, type, data) {

    var listItem = $("<ons-list-item class='"+ elementClass +"-listItem' modifier='nodivider'>"+type+": "+ data +"</ons-list-item>");
    return listItem;

};

// window.stars = function () {
//     var stars = $("<div id='stars'></div><div id='stars2'></div><div id='stars3'></div>");
//
//     return stars;
//
// }


window.twinkles = function() {

    var twinkles = $("<div></div>");
    for(var i = 1; i < 9; i++) {
        $("<div class=\'pixelStar"+i+"\'><img class=\'pixelStar"+i+"\'src=\'img/pixelstar.gif\'></div> ").appendTo(twinkles);
    }

    return twinkles;



};

window.asteroid = function () {
    var asteroid = $("<div class='asteroid'><img class='asteroid' src='img/Commet.gif'></div>");

    return asteroid;
};

/***************************************
*
* Scenario elementClass
*
*
***************************************/


window.portraitCol = function() {
    var portraitCol = $("<div ></div>");
    var portraitCard = card('scenario-Portrait').appendTo(portraitCol);
    $("<ons-icon size='30px' icon='md-face'>").appendTo(portraitCard);

    return portraitCol;
};

window.dialogueBox = function () {
    var dialogueBox = $("<div style='background-color: #fff;'></div>");
    var dialogueCard = $("<div class='dialogue-box'></div>").appendTo(dialogueBox);

    $("<p class='name'>diamond.ai</p><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p>").appendTo(dialogueCard);

    return dialogueBox;
};

window.optionButton = function(elementClass) {

    var option = uiCol(elementClass).attr('width', '100vw');
    var optionCard = card(' ').appendTo(option);

    $("<div class='"+elementClass+"'></div>").appendTo(optionCard);

    return option;
};

window.returnToShip = function(elementClass, active) {

    var backButton = $("<button style='background-color: #fff;' class='"+elementClass+"'"+active+">Back</button>");

    return backButton;
};




/***************************************
*
* Space Station elementClass
*
*
***************************************/

window.card = function(elementClass) {
    var card = $("<div class='"+ elementClass +"-card' style='background-color: #fff'></div>");
    return card;
};

window.uiRow = function(elementClass) {
    var uiRow = $("<div class='"+ elementClass +"-card'></div>");
    return uiRow;
};

window.uiCol = function(elementClass) {
    var uiCol = $("<div class='"+ elementClass +"-card'></div>");
    return uiCol;
};

window.paragraph = function(elementClass, content) {
    var paragraph = $("<p class='"+ elementClass +"-p'>" + content + "</p>");
    return paragraph;
};

window.uiButton = function (elementClass, content) {
    var uiButton = $("<div class='" + elementClass + "-button' >"+ content +"</div>");
    return uiButton;
};



/***************************************
*
* Ship elementClass
*
*
***************************************/


