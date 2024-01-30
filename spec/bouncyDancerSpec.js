describe('bouncyDancer', function() {

  var bouncyDancer, clock;
  var timeBetweenSteps = 100;

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    bouncyDancer = new makeBouncyDancer(10, 20, timeBetweenSteps);
  });

  it('should have a jQuery $node object', function() {
    expect(bouncyDancer.$node).to.be.an.instanceof(jQuery);
  });

  it('should have a step function that makes its node bounce', function() {
    var firstTop = bouncyDancer.$node.css('top');
    bouncyDancer.step();
    var secondTop = bouncyDancer.$node.css('top');
    bouncyDancer.step();
    var thirdTop = bouncyDancer.$node.css('top');
    expect(firstTop === secondTop).to.be.false;
    expect(firstTop === thirdTop).to.be.true;
  });

  describe('dance', function() {
    it('should call step at least once per second', function() {
      sinon.spy(bouncyDancer, 'step');
      expect(bouncyDancer.step.callCount).to.be.equal(0);
      clock.tick(timeBetweenSteps); // ? it seems an extra tick is necessary...
      clock.tick(timeBetweenSteps);

      expect(bouncyDancer.step.callCount).to.be.equal(1);

      clock.tick(timeBetweenSteps);
      expect(bouncyDancer.step.callCount).to.be.equal(2);
    });
  });
});