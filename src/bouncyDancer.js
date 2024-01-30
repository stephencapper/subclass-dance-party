var makeBouncyDancer = function(top, left, timeBetweenSteps) {
  makeDancer.call(this, top, left, timeBetweenSteps);

  this.top = top;
  this.bounceTop = this.top - 5;
  this.left = left;
  this.currPosition = 'top';

};

makeBouncyDancer.prototype = Object.create(makeDancer.prototype);
makeBouncyDancer.prototype.constructor = makeBouncyDancer;

makeBouncyDancer.prototype.oldStep = function() {
  makeDancer.prototype.step.call(this);

};

makeBouncyDancer.prototype.step = function() {
  this.oldStep();

  //make the node bounce
  if (this.currPosition === 'top') {
    this.setPosition(this.bounceTop, this.left);
    this.currPosition = 'bounceTop';
  } else {
    this.setPosition(this.top, this.left);
    this.currPosition = 'top';
  }
};