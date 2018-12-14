// By Mike Glover - 23/03/2017
// Using https://www.youtube.com/watch?v=S1TQCi9axzg
// Mod by Nando AM - 13/12/2018

var sketch_nokiz = function(p) {

    var symbolSize = 16;
    var fadeInterval = 1.5;
    var streams = [];

    p.setup = function() {
        /*
        createCanvas(
            window.innerWidth,
            window.innerHeight,
            P2D
        );
        */
        var canvas = p.createCanvas(p.windowWidth, p.windowHeight, p.P2D);
        canvas.parent('background_sketch');
        p.background(0);
        var x = 0;
        for (var i = 0; i <= p.width / symbolSize; i++) {
            var stream = new Stream();
            stream.generateSymbols(x, p.random(-1000, 0));
            streams.push(stream);
            x += symbolSize;
        }
        p.textSize(symbolSize);
        p.textAlign(p.CENTER);
        p.frameRate(30);
    }

    p.draw = function() {
        p.background(0, 150);
        streams.forEach(function(stream) {
            stream.render();
        });
        console.log(p.frameRate());
    }

    function Symbol(x, y, speed, first, opacity) {
        this.x = x;
        this.y = y;
        this.value;
        this.speed = speed;
        this.first = first;
        this.opacity = opacity;
        this.switchInterval = p.round(p.random(5, 20));

        this.setToRandomSymbol = function() {
            var charType = p.round(p.random(0, 20));
            if (p.frameCount % this.switchInterval == 0) {
                if (charType > 1) {
                    // set it to Katakana
                    this.value = String.fromCharCode(
                        0x30A0 + p.round(p.random(0, 95))
                    );
                } else {
                    // set it to a number
                    this.value = p.round(p.random(0, 9));
                }
            }
        }

        this.rain = function() {
            this.y = (this.y >= p.height) ? 0 : this.y += this.speed;
        }
    }

    function Stream() {
        this.symbols = [];
        this.totalSymbols = p.round(p.random(5, 30));
        this.speed = p.random(6, 12);

        this.generateSymbols = function(x, y) {
            var opacity = 255;
            var first = p.round(p.random(0, 2)) == 1;
            for (var i = 0; i <= this.totalSymbols; i++) {
                symbol = new Symbol(x, y, this.speed, first, opacity);
                symbol.setToRandomSymbol();
                this.symbols.push(symbol);
                opacity -= (255 / this.totalSymbols) / fadeInterval;
                y -= symbolSize;
                first = false;
            }
        }

        this.render = function() {
            this.symbols.forEach(function(symbol) {
                if (symbol.first) {
                    p.fill(180, 255, 180, symbol.opacity);
                } else {
                    p.fill(0, 255, 70, symbol.opacity);
                }
                p.text(symbol.value, symbol.x, symbol.y);
                symbol.rain();
                symbol.setToRandomSymbol();
            });
        }
    }
}
