// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  if(!(this instanceof Dancer)){
    return new Dancer(top,left,timeBetweenSteps);
  }

  this.$node = $('<span class="dancer"></span>');

  this._timeBetweenSteps = timeBetweenSteps;
  
  this.setPosition(top, left);
  this.step();
};

Dancer.prototype.step = function(){
  var that = this;
  setTimeout(function(){
    that.step();
  }, this._timeBetweenSteps);
};
  

Dancer.prototype.setPosition = function(top, left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};