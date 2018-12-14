var sketch_bas = function(p) {

    p.setup = function() {
        var canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
        canvas.parent('background_sketch');
    }

    p.draw = function() {
        p.orbitControl();
        var bgColor = p.map(p.mouseY, 0, p.height, 0, 255);
        p.background(bgColor);
        p.translate(0, 0, -(p.width / 2));
        for (var i = 0; i <= 48; i++) {
            for (var j = 0; j <= 48; j++) {
                p.stroke(0); //No sirve de nada :P
                p.fill(220);
                p.push();
                var a = j / 48 * p.PI;
                var b = i / 48 * p.PI;
                p.translate(p.sin(2 * a) * (p.mouseX) * p.sin(b), p.cos(b) * (p.mouseX), p.cos(2 * a) * (p.mouseX) * p.sin(b));
                p.box((p.mouseY, p.mouseY, p.mouseY) / 10);
                p.pop();
            }
        }
    }
}
