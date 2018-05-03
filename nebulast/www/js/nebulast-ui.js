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

    var sideNav = $("<div class='sideNav' ></div>");



    return sideNav;


};

window.sideNavStat = function (image, type, data) {
    var stat = $("<div class='stats' ><img src='img/"+image+"'><div class='"+type+" dataVal'> "+data+"</div></div>");
    return stat;
};

window.hamburger = function () {

    var hamburger = $("<div class='hamburger' style=\"font-size:30px!important;cursor:pointer\"></div>");

    $("<img src='img/hamburger.gif'>").appendTo(hamburger);

    return hamburger;

};

window.sideNavDiamond = function () {


    var diamond = $("<div class='sideNav-diamond'><img src='img/diamondAi.gif' ><br><br></div>");

    return diamond;
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

    var spaceship = $("<div class='space-Ship' ><img src='img/Spaceship.gif' style= 'height: 120px; width: 180px;'></div>");
    return spaceship;
};

//
window.spaceStation = function () {

    var spaceStation = $("<div class='space-Station' modifier='outline' ><img src='img/spacestation-gif.gif' style= 'height: 125px; width: 125px;'></div>");
    return spaceStation;
};

window.planet = function (image, planetName) {

    var planet = $("<div class='space-planet-  "+planetName+"'><img src='"+image+"' style= 'height: 100px; width: 100px;'></div>");

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

window.asteroidContainer = function () {

    var asteroidContainer = $("<div class='asteroidContainer'></div>");

    return asteroidContainer;
}


window.asteroid = function (randomInt) {
    var asteroid = $("<div class='asteroid'><img class='asteroid"+ randomInt +"' src='img/Commet00" + randomInt + ".gif'></div>");
    return asteroid;
};

window.notify = function () {


    var notify = $("<div class='notify' hidden></div>");

    return notify;
};
window.diamond = function () {


    var diamond = $("<div class='not-diamond'><img src='img/diamondAi.gif' ><br><br></div>");

    return diamond;
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

    var dialogueBox = $("<div class='dialogueBox' style='background-color: #3ccaf2;'></div>");
    $("<img src='img/diamondAi.gif' class='portrait-image'>").appendTo(dialogueBox);
    $("<div class='p-box'><p class='name'>diamond.ai</p><br><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p></div>").appendTo(dialogueBox);

    $("<div class='planet-container'><img src='" + planet +"' class='portrait-image'></div>").appendTo(dialogueBox);

    return dialogueBox;
};



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
    var card = $("<div class='"+ elementClass +"-card'></div>");
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

/***************************************
 *
 * MainMenu Screen
 *
 *
 ***************************************/

window.startButton = function (elementClass, image) {

    var start = $("<div class='"+elementClass+"'><img src='"+image+"'></div>");

    return start;

};


window.overlay = function () {

    var overlay = $("<div class='startOverlay'><img src='img/StartScreen.jpg'></div>");
    return overlay;

};
window.menuBG = function () {

    var bg = $("<div class='menuScreen'><img src='img/MenuScreen.jpg'></div>");
    return bg;

};