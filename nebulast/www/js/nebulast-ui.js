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


window.portraitCol = function() {
    var portraitCol = $("<ons-col width=\'20vw\'></ons-col>");
    var portraitCard = card('scenario-Portrait').appendTo(portraitCol);
    $("<ons-icon size='30px' icon='md-face'>").appendTo(portraitCard);

    return portraitCol;
};

window.dialogueBox = function () {
    var dialogueBox = $("<ons-col width='80vw'></ons-card></ons-col>");
    var dialogueCard = $("<ons-card class='dialogue-box'></ons-card>").appendTo(dialogueBox);

    $("<p class='name'>diamond.ai</p><p class='dialogue'></p><p class='results' hidden></p><p class='resource-Update' hidden></p>").appendTo(dialogueCard);

    return dialogueBox;
};

window.optionButton = function(elementClass) {

    var option = uiCol(elementClass).attr('width', '100vw');
    var optionCard = card(' ').appendTo(option);

    $("<ons-button class='"+elementClass+"'></ons-button>").appendTo(optionCard);

    return option;
}

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
