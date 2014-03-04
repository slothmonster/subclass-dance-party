var BlinkyDancer = function(top, left, timeBetweenSteps){
  //var blinkyDancer = makeDancer(top, left, timeBetweenSteps);
  if(!(this instanceof BlinkyDancer)){
    return new BlinkyDancer(top, left, timeBetweenSteps);
  }
  Dancer.call(this, top, left, timeBetweenSteps);
  
};

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;
BlinkyDancer.prototype.super = Dancer;

BlinkyDancer.prototype.step = function(){
  
  Dancer.prototype.step.apply(this, arguments);
  this.$node.toggle();
};