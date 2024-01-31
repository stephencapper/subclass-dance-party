$(document).ready(function() {
  window.dancers = [];

  $('.addDancerButton').on('click', function(event) {
    /* This function sets up the click handlers for the create-dancer
     * buttons on dancefloor.html. You should only need to make one small change to it.
     * As long as the "data-dancer-maker-function-name" attribute of a
     * class="addDancerButton" DOM node matches one of the names of the
     * maker functions available in the global scope, clicking that node
     * will call the function to make the dancer.
     */

    /* dancerMakerFunctionName is a string which must match
     * one of the dancer maker functions available in global scope.
     * A new object of the given type will be created and added
     * to the stage.
     */
    var dancerMakerFunctionName = $(this).data('dancer-maker-function-name');

    // get the maker function for the kind of dancer we're supposed to make
    var dancerMakerFunction = window[dancerMakerFunctionName];

    // make a dancer with a random position

    var dancer = new dancerMakerFunction(
      $("body").height() * Math.random(),
      $("body").width() * Math.random(),
      Math.random() * 1000
    );
    window.dancers.push(dancer);
    $('body').append(dancer.$node);
  });

  $('.lineUpDancers').on('click', function(event) {
    $('.dancer').detach();
    for (var i = 0; i < window.dancers.length; i++) {
      window.dancers[i].lineUp();
    }
  });

  $(document).on('click', '.dancer' , function() {
    var node = $(this);
    var position = $(this).offset();
    var clickedTop = position.top;
    var clickedLeft = position.left;
    //console.log('Top:', top, 'Left:', left);
    var closest, distToClosest, nextClosest, distToNextClosest;
    for (var i = 0; i < window.dancers.length; i++) {
      // calculate distance to dancer
      var currTop = window.dancers[i].top;
      var currLeft = window.dancers[i].left;
      //check if dancer is in same position (i.e. is the dancer we clicked)
      // if (clickedTop === currTop && clickedLeft === currLeft) {
      //   continue;
      // }
      var heightDiff = clickedTop - currTop;
      var baseDiff = clickedLeft - currLeft;
      var currDistance = 0.5 * (heightDiff * baseDiff);
      currDistance = Math.abs(currDistance);
      if (!distToClosest) {
        distToClosest = currDistance;
        closest = window.dancers[i];
      } else if (currDistance < distToClosest) {
        distToNextClosest = distToClosest;
        nextClosest = closest;
        distToClosest = currDistance;
        closest = window.dancers[i];
      } else if (!distToNextClosest || currDistance < distToNextClosest) {
        distToNextClosest = currDistance;
        nextClosest = window.dancers[i];
      }
      // window.dancers[i].lineUp();
    }
    //set position of dancer clicked to be same height as and 50 pixels right of closest
    $(this).offset({
      top: nextClosest.top,
      left: (nextClosest.left + 50)
    });
    setTimeout(function() {
      node.offset({
        top: clickedTop,
        left: (clickedLeft)
      });
    }, 1000);

  });

  $(document).on('mouseenter', '.dancer' , function() {
    var node = $(this);
    node.width('60px');
    node.height('76px');
  });

  $(document).on('mouseleave', '.dancer' , function() {
    var node = $(this);
    node.width('30px');
    node.height('38px');
  });

});

