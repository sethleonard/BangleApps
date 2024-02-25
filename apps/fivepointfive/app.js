Graphics.prototype.setFontRoboto = function() {
  // Actual height 20 (19 - 0)
  return this.setFontCustom(
    atob('AAAAAAPAAAPAAAPAAAPAAAAAAAAAAAHwAA/wAH/wA//AD/4Af/AA/4AA/AAA4AAAAAAAH/4AP/+Af//A///A+APA8APA8APA/AfA///Af/+AP/+AD/4AAAAAAAAAPAAAPAAAPAAAfAAAf//Af//A///A///AAAAAAAAAAAAAAAAAAAAABAAAPgPAfgfAfg/A/B/A8D/A8H/A8f/A//vA//PAf+PAP4PAHgPAAAAAGAcAPA+AfA/A/A/A+efA8ePA8ePA+/PA///Af//Af/+APz8AAAwAAAAAAD4AAH4AAf4AB/4AD/4AP54Afx4A///A///A///A///AAB4AABwAAAAAAAQAf88A/8+A/8/A/8fA88PA88PA88PA8//A8//A8f+A8P8AADwAAAAAAAAAB/4AH/+AP/+Af//Af8fA+8PA+8PA8+fA8//A8//AAf+AAP8AAAAA8AAA8AAA8AHA8AfA8B/A8H/A8f+A//4A//gA/8AA/wAA/AAA8AAAAAAADB4APz+Af/+A///A///A8ePA8ePA++PA///Af//Af/+APz8AAA4AAAAAAgAAH8AAP/AAf/HA//vA+PvA8HvA8H/A/v+A//+Af/8AP/4AD/gAAAAAAAAADwPAD4PAD4PABwPAAAAAAAAA'),
    46,
    atob("BwkODg4ODg4ODg4OBw=="),
    24|65536
  );
}

var width = 100;
var height = 42;

let currentDirection = 1;
let currentHeight = 0;

var step = (height-2)/10;

const x = (176-width) / 2, y = (176-height) / 2;

// timeout used to update every minute
var drawTimeout;

// schedule a draw for the next minute
function queueDrawTime() {
  if (drawTimeout) clearTimeout(drawTimeout);
  drawTimeout = setTimeout(function() {
    drawTimeout = undefined;
    drawTime();
  }, 60000 - (Date.now() % 60000));
}

function drawTime() {
    var date = new Date();
    var timeStr = require("locale").time(date,1);

    // clear the background
    g.clearRect(0,y+ height + 1,g.getWidth(),y+g.getHeight()); 
  
    g.setFontAlign(0,0).setFont("Roboto");
    g.drawString(timeStr,g.getWidth()/2,y+ height + 20);
  
    // queue draw in one minute
    queueDrawTime();
}

function draw() {
    if(currentDirection == 1) {
      if(currentHeight > 0) {
        g.fillRect(x+1, y+height-currentHeight-1, x+width-2, y+height-currentHeight+step-1);
      }
      currentHeight += step;
      if(currentHeight > height-2) {
        currentDirection = 0;
        currentHeight = 0;
        Bangle.buzz(200,0.1);
      }
    } else {
      g.clearRect(x+1, y+currentHeight+1, x+width-2, y+currentHeight+step);
      currentHeight += step;
      if(currentHeight >= height-2) {
        currentDirection = 1;
        currentHeight = step;
        Bangle.buzz(150,0.1);
      }
    }
}

// Clear the screen once, at startup
g.clear();

// Draw container
g.drawRect(x, y, x+width-1, y+height-1);

Bangle.buzz(150,0.1);

// draw immediately at first
draw();
drawTime();

// now draw every second
var secondInterval = setInterval(draw, 550);