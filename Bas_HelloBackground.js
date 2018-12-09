function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  orbitControl();
  var bgColor = map(mouseY,0,height,0,255);
  background(bgColor); 
  translate(0, 0, -(width/2));
  for (var i = 0; i <= 48; i++) {
    for (var j = 0; j <= 48; j++) {
      stroke(0);//No sirve de nada :P
      fill(220);
      push();
      var a = j/48 * PI;
      var b = i/48 * PI;
      translate(sin(2*a)*(mouseX)*sin(b), cos(b)*(mouseX), cos(2*a)*(mouseX)*sin(b));
      box((mouseY, mouseY, mouseY)/10);
      pop();
    }
  }
}
