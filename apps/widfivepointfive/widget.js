(() => {
  var width = 27; // width of the widget
  let currentDirection = 1;
  let currentHeight = 0;

  function draw() {
    var date = new Date();
    g.reset(); // reset the graphics context to defaults (color/font/etc) 
    g.drawRect(this.x+5, this.y, this.x+26, this.y+21);
//    g.drawRect(this.x, this.y, this.x+2, this.y+2);

//    g.setColor(0x0000FF);
    if(currentDirection == 1) {
      if(currentHeight > 0) {
        g.fillRect(this.x+6, this.y+21-currentHeight, this.x+25, this.y+21-currentHeight+1);
      }
      currentHeight += 2;
      if(currentHeight > 20) {
        currentDirection = 0;
        currentHeight = 2;
      }
    } else {
      g.clearRect(this.x+6, this.y+currentHeight-1, this.x+25, this.y+currentHeight);
      currentHeight += 2;
      if(currentHeight > 20) {
        currentDirection = 1;
        currentHeight = 2;
      }
    }
    
  }

  setInterval(function() {
    WIDGETS["widfivepointfive"].draw(WIDGETS["widfivepointfive"]);
  }, 550); // update every .55 seconds

  Bangle.on('touch', function(button, xy) {
    if(xy.y < 21) {
      load("fivepointfive.app.js");
    }
  });

  // add your widget
  WIDGETS["widfivepointfive"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right), be aware that not all apps support widgets at the bottom of the screen
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()
