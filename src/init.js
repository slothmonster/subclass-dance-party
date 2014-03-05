window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

$(document).ready(function(){
  window.dancers = [];
  window.sprites = [
    {
      "name": "mustache",
      "height": 128,
      "width": 128,
      "url": "images/sprite_mustache.png",
      interval: 66.6
    },
    {
      "name": "nes",
      "height": 32,
      "width": 32,
      "url": "images/sprite_nes.png",
      interval: 100
    },
    {
      "name": "doom",
      "height": 128,
      "width": 144,
      "url": "images/sprite_doom.png",
      interval: 100
    },
    {
      "name": "scorpion",
      "height": 65,
      "width": 37,
      "url": "images/sprite_scorpion.png",
      interval: 100
    },
    {
      "name": "contra",
      "height": 46,
      "width": 38,
      "url": "images/sprite_contra.png",
      interval: 100
    },
    {
      "name": "girl",
      "height": 128,
      "width": 110,
      "url": "images/sprite_girldance.png",
      interval: 60
    },
    {
      "name": "strawberry",
      "height": 32,
      "width": 32,
      "url": "images/sprite_strawberry.png",
      interval: 60
    },
    {
      "name": "boy",
      "height": 264,
      "width": 213,
      "url": "images/sprite_boydance.png",
      interval: 70
    }
  ];

  $(document).on('mousemove', function(e){
    window.mouseX = e.clientX;
    window.mouseY = e.clientY;
    var halfHeight = window.innerHeight / 2;
    var halfWidth = window.innerWidth / 2;
    window.persX = ((e.clientX - halfWidth)/6) + halfWidth;
    window.persY = ((e.clientY - halfHeight)/6) + halfHeight;    
  });

  var animLoop = function(){
    $('body').css({
      '-webkit-perspective-origin' : window.persX + "px " + window.persY + "px"
    });
    requestAnimationFrame(animLoop);
  };

  animLoop();


  var floor = new Floor();

  $(".addDancerButton").on("click", function(event){
    /* This function sets up the click handlers for the create-dancer
     * buttons on index.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position
    var dancer = dancerMakerFunction(
      ($("body").height()-100) * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    // window.dancers.push(dancer);
    $('.danceFloor').append(dancer.$node);
  });
  $(".addImageDancerButton").on("click", function(event){
      var imgUrl = prompt("Put in the URL of a gif");
      var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

      // get the maker function for the kind of dancer we're supposed to make
      var dancerMakerFunction = window[dancerMakerFunctionName];

      // make a dancer with a random position
      var dancer = dancerMakerFunction(
        ($("body").height()-100) * Math.random(),
        $("body").width() * Math.random(),
        Math.random() * 1000,
        imgUrl
      );
      // window.dancers.push(dancer);
      $('.danceFloor').append(dancer.$node);
    });

  $(".addSpriteDancerButton").on("click", function(event){
      var imgUrl = "images/sprite_mustache.png";
      var dancerMakerFunctionName = $(this).data("dancer-maker-function-name");

      // get the maker function for the kind of dancer we're supposed to make
      var dancerMakerFunction = window[dancerMakerFunctionName];
      var top = ($("body").height()-100) * Math.random();
      var left = $("body").width() * Math.random();
      var spriteNumber = Math.floor(Math.random() * window.sprites.length);
      // make a dancer with a random position
      //debugger;
      var dancer = dancerMakerFunction(
        top,
        left,
        window.sprites[spriteNumber].interval,
        window.sprites[spriteNumber].url, window.sprites[spriteNumber].height, window.sprites[spriteNumber].width
      );
      // window.dancers.push(dancer);
      $('.danceFloor').append(dancer.$node);
    });  
  $('.lineup').click(function(){
    window.dancers.forEach(function(dancer){
      dancer.lineUp();
    });
    $('.chase').attr('checked', false)
  });
  $('.goback').click(function(){
    window.dancers.forEach(function(dancer){
      dancer.goBack();
    });
    $('.chase').attr('checked', false)
  });
  $('.move').click(function(){
    window.dancers.forEach(function(dancer){
      dancer.moveRandomly();
    });
    $('.chase').attr('checked', false)
  });
  $('.chase').on('change', function(e){
    
    var isChecked = $(this).is(':checked');
    window.dancers.forEach(function(dancer){
      dancer.chaseMouse = isChecked;
    });
  });
});

