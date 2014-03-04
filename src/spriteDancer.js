var SpriteDancer = function(top, left, timeBetweenSteps, imgUrl, height, width){
  
	if(!(this instanceof SpriteDancer)){
		return new SpriteDancer(top, left, timeBetweenSteps, imgUrl, height, width);
	}
	
	ImageDancer.call(this, top, left, timeBetweenSteps, imgUrl);
	this._height = height;
	this._width = width;
	this._positions = [];
	this._currentPosition = 0;
	this.display(imgUrl);

};

SpriteDancer.prototype = Object.create(ImageDancer.prototype);
SpriteDancer.prototype.constructor = SpriteDancer;

SpriteDancer.prototype.display = function(imgUrl){
	var img = $('<img src="' + imgUrl + '">');
	var that = this;

	this.$node.removeClass('dancer').addClass('gif').addClass('sprite');
	this.$node.css({
		'background-image' : 'url(' + imgUrl + ')'
	});

	
	img.on('load', function(){
		var imgNode = img[0];
		var imgHeight = imgNode.height;
		var imgWidth = imgNode.width;
		var horizontalFrames = Math.floor(imgWidth/that._width);
		var verticalFrames = Math.floor(imgHeight/that._height);
		for(var i=0; i<verticalFrames; i++){
			for(var j=0; j<horizontalFrames; j++){
				that._positions.push({
					"background-position": (j * that._width) + "px " + (i * that._height) + "px" 
				})
			}
		}

	});
};

SpriteDancer.prototype.step = function(){
  
  Dancer.prototype.step.apply(this, arguments);

  this.$node.css({
		height : this._height + 'px',
		width : this._width + 'px'
	});
  //console.log(this._positions, !!this._positions);
	if(!!this._positions) {
	  if(this._currentPosition < this._positions.length -1){
	  	this.$node.css(this._positions[++this._currentPosition]);
	  } else if(this._currentPosition === this._positions.length -1){
	  	this.$node.css(this._positions[0]);
	  	this._currentPosition = 0;
	  }
	}
};