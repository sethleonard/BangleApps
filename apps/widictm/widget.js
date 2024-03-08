require("Font8x16").add(Graphics);

(() => {
  var width = 41; // width of the widget
  
  function draw() {
    g.reset(); // reset the graphics context to defaults (color/font/etc)
//    g.setFontAlign(0,0); // center fonts    
    g.setFont("8x16");
    // Use 'locale' module to get a shortened month name
    // in the correct language    
    var text = "ICTM";
    
    let color = '#';
    for (let i = 0; i < 3; i++) {
      color += Math.random() < 0.5 ? '00' : 'FF';
    }
    
//    g.setColor(color);
    
    g.drawRect(this.x+8, this.y+3, this.x+width-1, this.y+20); // check the bounds!
    
    g.drawString(text, this.x+11, this.y+4);
  }

  setInterval(function() {
    WIDGETS["widictm"].draw(WIDGETS["widictm"]);
  }, 15*60000); // update every 15 minutes

  // add your widget
  WIDGETS["widictm"]={
    area:"tl", // tl (top left), tr (top right), bl (bottom left), br (bottom right), be aware that not all apps support widgets at the bottom of the screen
    width: width, // how wide is the widget? You can change this and call Bangle.drawWidgets() to re-layout
    draw:draw // called to draw the widget
  };
})()
