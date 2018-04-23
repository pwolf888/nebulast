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
 * STATS NAV
 * Interact with your spaceship, planets and spacestation and a blackhole
 *
 ***************************************/

window.sideNav = function () {

    var sideNav = $("<div class='sideNav'></div>");



    return sideNav;


};

window.sideNavStat = function (type, data) {
    var stat = $("<div class='stats' >"+type+"  ----  <div class='"+type+" dataVal'> "+data+"</div></div><br>");
    return stat;
};

window.hamburger = function () {

    var hamburger = $("<div class='hamburger' style=\"font-size:30px!important;cursor:pointer\">&#9776;</div>");

    return hamburger;

};

window.close = function () {

    var close = $("<div class='close' style='font-size:30px!important;cursor:pointer'>&times;</div>");

    return close;

};
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

    var spaceStation = $("<div class='space-Station' modifier='outline' ><img src='img/spacestation-gif.gif' style= 'height: 100px; width: 100px;'></div>");
    return spaceStation;
};

window.planet = function (image, planetName) {


    var planet = $("<div class='space-planet-  "+planetName+"'><img src='"+image+"'></div>");

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

window.stars = function () {
    var stars = $("<div id='stars'></div><div id='stars2'></div><div id='stars3'></div>");

    return stars;

};


window.twinkles = function() {

    var twinkles = $("<div></div>");
    for(var i = 1; i < 9; i++) {
        $("<div class=\'pixelStar"+i+"\'><img class=\'pixelStar"+i+"\'src=\'img/pixelstar.gif\'></div> ").appendTo(twinkles);
    }

    return twinkles;



};

window.asteroid = function () {
    var asteroid = $("<div class='asteroid'><img class='asteroid' src='img/Commet001.gif'></div>");

    return asteroid;
};

window.notify = function () {


    var notify = $("<div class='notify' hidden></div>");

    return notify;
};


window.uiLabel = function (text) {

    var uiLabel = $("<label class='uiLabel'>"+text+"</label>");

    return uiLabel
};
/***************************************
*
* Scenario elementClass
*
*
***************************************/


window.portraitColNew = function (planet) {

    var dialogueBox = $("<div class='dialogueBox' style='background-color: #fff;'></div>");
    $("<img src='img/diamondAi.png' class='portrait-image'>").appendTo(dialogueBox);
    $("<div class='p-box'><p class='name'>diamond.ai</p><br><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p></div>").appendTo(dialogueBox);

    $("<div class='planet-container'><img src='" + planet +"' class='portrait-image'></div>").appendTo(dialogueBox);

    return dialogueBox;
};


// window.portraitCol = function() {
//     var portraitCol = $("<div class='dialogueRow' ></div>");
//     var portraitCard = card('scenario-Portrait').appendTo(portraitCol);
//     $("<img src='img/diamondAi.png' class='portrait-image'>").appendTo(portraitCard);
//
//     var dialogueBox = $("<div class='dialogueRow' style='background-color: #fff;'></div>").appendTo(portraitCol);
//     var dialogueCard = $("<div class='dialogue-box'></div>").appendTo(dialogueBox);
//
//     $("<p class='name'>diamond.ai</p><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p>").appendTo(dialogueCard);
//
//     return portraitCol;
// };

// window.dialogueBox = function () {
//     var dialogueBox = $("<div class='dialogueRow' style='background-color: #fff;'></div>");
//     var dialogueCard = $("<div class='dialogue-box'></div>").appendTo(dialogueBox);
//
//     $("<p class='name'>diamond.ai</p><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p>").appendTo(dialogueCard);
//
//     return dialogueBox;
// };

window.optionButton = function(elementClass) {

    var option = uiCol(elementClass);
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

window.spaceStationBG = function () {

    var bg = $("<div class='spaceStation_background'><img class='spaceStation_background' src='img/SSbackground2.gif'></div>");

    return bg;


};


// Joshes SS
window.shopScreen = function () {
    
    var shopScreen = $("<div class='shopScreen'></div>");

    return shopScreen;

};


window.shopContainer = function () {
    
    var shopContainer = $("<div class='shopContainer'></div>");

    return shopContainer

};

window.shopIcon = function (elementClass) {

    var shopIcon = $("<div class='"+ elementClass +"'></div>");
    
    return shopIcon;
};

/***************************************
*
* Ship elementClass
*
*
***************************************/


