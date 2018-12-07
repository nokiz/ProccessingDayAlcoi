/*Processing Day sketch*/
/*Form-Color-cursor-RGB*/
var a = 0.01;
var d = 30;
var curIndex = 0;
var c = [];
var i;
var ii;

function setup() {
  createCanvas(windowWidth, windowHeight);
  i=0;
  ii=1;
}

function draw() {
  c = [color(0, 0, 255), color(0, 255, 0), color(255, 0, 0)];
  //background(255);
  fill(255, 3);
  noStroke();
  rect(0, 0, width, height);
  b = color(0, 0, 255);
  r = color(255, 0, 0);
  fill(255);
  var pd = "ProcessingDayAlcoi";
  console.log(i , ii);
  push();
  translate(mouseX, mouseY);
  br = lerpColor(c[i], c[ii], map(mouseX, 0, width, 0, 0.99));
  stroke(br);
  text(pd.substring(curIndex, curIndex + 1), random(-3, 3) * sin(a) * d, random(-3, 3) * sin(a) * d);
  pop();
  curIndex++;
  if (curIndex > pd.length) {
    curIndex = 0;
  }
}

function mousePressed() {
  if (i > 1 || i < 0) {
    i = 0;
  } else {
    i = i + 1;
  }
  if (ii > 1 || ii < 0) {
    ii = 0;
  } else {
    ii = ii + 1;
  }
}