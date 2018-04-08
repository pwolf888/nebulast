// // Random Stars
// var randomAseteroid = function(){
    
//     var $asteroid = $(".asteroid");
//     var iterator = 0;
    
//     while (iterator <= 5){
//         var xposition = Math.random();
//         var yposition = Math.random();
//         var position = {
//             "x" : $asteroid.width() * xposition,
//             "y" : $asteroid.height() * yposition,
//         };
        
//         $('<div class="asteroid"></div>').appendTo($asteroid).css({
//             "top" : position.y,
//             "left" : position.x
//         });
        
//         iterator++;
//     }
    
// };

// randomAseteroid();

function asteroidPosition(){

    Math.floor((Math.random() * 400) + 1);

    var min = -250
    var max = 400 
}

$(".asteroid").css("right", 400)

