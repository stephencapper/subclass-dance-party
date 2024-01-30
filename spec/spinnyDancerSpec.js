describe('bouncyDancer', function() {

  var spinnyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    spinnyDancer = new makeSpinnyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(spinnyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node rotate', function() {
    var first = spinnyDancer.$node.css('transform');
    spinnyDancer.step();
    var second = spinnyDancer.$node.css('transform');
    spinnyDancer.step();
    var third = spinnyDancer.$node.css('transform');
    expect(second).to.be.equal('rotate(45deg)');
    expect(third).to.be.equal('rotate(90deg)');
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(spinnyDancer, 'step');
      expect(spinnyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);
      expect(spinnyDancer.step.callCount).to.be.equal(1);
      clock.tick(timeBetweenSteps);
      expect(spinnyDancer.step.callCount).to.be.equal(2);
    });
  });
});