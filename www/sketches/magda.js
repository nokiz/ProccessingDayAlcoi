/*Processing Day sketch*/
/*Form-Color-cursor-RGB*/
var sketch_magda = function(p) {

    var a = 0.01;
    var d = 30;
    var curIndex = 0;
    var c = [];
    var i;
    var ii;

    p.setup = function() {
        var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.parent('background_sketch');
        i = 0;
        ii = 1;
    }

    p.draw = function() {
        c = [p.color(0, 0, 255), p.color(0, 255, 0), p.color(255, 0, 0)];
        //background(255);
        p.fill(255, 3);
        p.noStroke();
        p.rect(0, 0, p.width, p.height);
        b = p.color(0, 0, 255);
        r = p.color(255, 0, 0);
        p.fill(255);
        var pd = "ProcessingDayAlcoi";
        console.log(i, ii);
        p.push();
        p.translate(p.mouseX, p.mouseY);
        br = p.lerpColor(c[i], c[ii], p.map(p.mouseX, 0, p.width, 0, 0.99));
        p.stroke(br);
        p.text(pd.substring(curIndex, curIndex + 1), p.random(-3, 3) * p.sin(a) * d, p.random(-3, 3) * p.sin(a) * d);
        p.pop();
        curIndex++;
        if (curIndex > pd.length) {
            curIndex = 0;
        }
    }

    p.mousePressed = function() {
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
}
