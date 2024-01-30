var makeSpinnyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);
  this.currRotation = 0;
};

makeSpinnyDancer.prototype = Object.create(makeDancer.prototype);
makeSpinnyDancer.prototype.constructor = makeSpinnyDancer;

makeSpinnyDancer.prototype.oldStep = function() {
  makeDancer.prototype.step.call(this);

};

makeSpinnyDancer.prototype.rotate = function() {
  //
  var styleRotate = {
    'transform': 'rotate(' + this.currRotation + 'deg)',
  };
  this.$node.css(styleRotate);
};

makeSpinnyDancer.prototype.step = function() {
  this.oldStep();
  this.currRotation += 45;
  this.rotate();
  if (this.currRotation >= 360) {
    this.currRotation = 0;
  }
};