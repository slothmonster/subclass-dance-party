// Creates and returns a new dancer object that can step
var Dancer = function(top, left, timeBetweenSteps){

  if(!(this instanceof Dancer)){
    return new Dancer(top,left,timeBetweenSteps);
  }

  this.$node = $('<span class="dancer"></span>');

  this._timeBetweenSteps = timeBetweenSteps;
  this.chaseMouse = false; 
  this.setPosition(top, left);
  this.step();
  window.dancers = window.dancers || [];
  window.dancers.push(this);
};

Dancer.prototype.step = function(){
  var that = this;
  setTimeout(function(){
    that.step();
  }, this._timeBetweenSteps);
  if(this.chaseMouse){
    var posY = parseInt(this.$node.css('top').replace('px','')) + ($(this.$node).height() / 2);
    var posX = parseInt(this.$node.css('left').replace('px',''))  + ($(this.$node).width() / 2);
    window.mouseX
    window.mouseY
    if(window.mouseX > posX) {
      this.$node.css('left', (parseInt(this.$node.css('left').replace('px', '')) + 10) + 'px');
    } else {
      this.$node.css('left', (parseInt(this.$node.css('left').replace('px', '')) - 10) + 'px');
    }
    if(window.mouseY > posY) {
      this.$node.css('top', (parseInt(this.$node.css('top').replace('px', '')) + 10) + 'px');
    } else {
      this.$node.css('top', (parseInt(this.$node.css('top').replace('px', '')) - 10) + 'px');
    }
  }
};
  

Dancer.prototype.setPosition = function(top, left){
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
};

Dancer.prototype.lineUp = function(){
  this.chaseMouse = false;
  this.$node.attr('data-left', this.$node.css("left"));
  this.$node.animate({ "left":"150px"}, 1000);
};

Dancer.prototype.goBack = function() {
  this.chaseMouse = false;
  this.$node.animate({ "left": this.$node.attr("data-left")}, 1000);
}

Dancer.prototype.moveRandomly = function() {
  this.chaseMouse = false;
  this.$node.animate({ 
    "left": ( Math.random() * window.innerWidth ) + "px",
    "top": ( Math.random() * window.innerHeight ) + "px"
  }, 1000);
}