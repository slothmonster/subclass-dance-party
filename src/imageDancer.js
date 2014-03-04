var ImageDancer = function(top, left, timeBetweenSteps, imgUrl){

	if(!(this instanceof ImageDancer)){
		return new ImageDancer(top, left, timeBetweenSteps, imgUrl);
	}

	Dancer.call(this, top, left, timeBetweenSteps);
	this.display(imgUrl);
};

ImageDancer.prototype = Object.create(Dancer.prototype);
ImageDancer.prototype.constructor = ImageDancer;

ImageDancer.prototype.display = function(imgUrl){	
	var img = $('<img src="' + imgUrl + '">');
	var that = this;

	this.$node.removeClass('dancer').addClass('gif');

	img.on('load', function(){
		imgNode = img[0];
		var height = imgNode.height;
		var width = imgNode.width;

		that.$node.css({
			'height': height + 'px',
			'width': width + 'px',
			'background-image': 'url(' + imgUrl + ')'
		});
	});
};
