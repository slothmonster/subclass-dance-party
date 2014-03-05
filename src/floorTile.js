var Floor = function(){
  this.tiles = [];
  var that = this;
  setTimeout(function(){
    that.init(); 
  }, 0);


};

Floor.prototype.init = function(){
  var floorWidth = window.innerWidth;
  var floorHeight = window.innerHeight;
  if(floorWidth < 200){
    this.width = floorWidth;
  } else if(floorWidth < 300){
    this.width = floorWidth/2;
  } else if(floorWidth < 400) {
    this.width = floorWidth/3;
  } else if(floorWidth < 600) {
    this.width = floorWidth/4;
  } else if(floorWidth < 900) {
    this.width = floorWidth/6;
  } else if(floorWidth < 1200) {
    this.width = floorWidth/8;
  } else {
    this.width = floorWidth/10;
  }

  if(floorHeight < 200){
    this.height = floorHeight;
  } else if(floorHeight < 300){
    this.height = floorHeight/2;
  } else if(floorHeight < 400) {
    this.height = floorHeight/3;
  } else if(floorHeight < 600) {
    this.height = floorHeight/4;
  } else if(floorHeight < 900) {
    this.height = floorHeight/6;
  } else if(floorHeight < 1200) {
    this.height = floorHeight/8;
  } else {
    this.height = floorHeight/10;
  }

  this.rows = floorHeight/this.height;
  this.columns = floorWidth/this.width;

  for(var i=0; i<this.rows; i++){
    for(var j=0; j<this.columns; j++){
      var obj = {};
      obj.$node = $('<div class="tile"></div>');
      obj.startColor = "rgb(" + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' +Math.ceil(Math.random() * 255) + ")";
      obj.endColor = "rgb(" + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ',' +Math.ceil(Math.random() * 255) + ")";
      obj.currentColor = 0;
      obj.$node.css({
        "height":this.height + "px",
        "width":this.width + "px",
        "top": (i * this.height) + "px",
        "left": (j * this.width) + "px",
        "background-color":obj.startColor
      });
      this.tiles.push(obj);
      $('.danceFloor').append(obj.$node);
    }
  }
  var that = this;
  $(window).on('resize', function(){
    that.reset();
  });
  this.step();
};

Floor.prototype.step = function(){
  var currentColor = (this.tiles[0].currentColor === 0)? 1 : 0;
  for(var i = 0; i<this.tiles.length; i++){
    this.tiles[i].currentColor = currentColor;
    if(currentColor === 1){
      this.tiles[i].$node.css('background-color', this.tiles[i].endColor);
    } else {
      this.tiles[i].$node.css('background-color', this.tiles[i].startColor);
    }
  }
  var that = this;
  setTimeout(function(){
    that.step();
  }, 1000);
}

Floor.prototype.reset = function(){
  for(var i=0; i<this.tiles.length; i++){
    this.tiles[i].$node.remove();
  }
  this.tiles = [];
  this.init();
};