var sketch_nacho = function(p) {

    var loaded = false;
    var MAIN_COLOR, BG_COLOR;
    var tris = [];

    p.preload = function() {
        var script = document.createElement('script');
        script.src = 'https://cdn.rawgit.com/ironwallaby/delaunay/master/delaunay.js';
        script.onload = function() {
            loaded = true;
            p.initializeTriangulation();
        }
        document.body.appendChild(script);
    }

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        MAIN_COLOR = p.color('#F1F1F1');
        BG_COLOR = p.color('#7f5fce');

        p.initializeTriangulation();
    }

    p.initializeTriangulation = function() {
        if (!loaded) return;
        frameCount = 0;
        tris = [];
        var pts = [];
        // push canvas rect points
        pts.push(p.createVector(0, 0));
        pts.push(p.createVector(p.width, 0));
        pts.push(p.createVector(p.width, p.height));
        pts.push(p.createVector(0, p.height));

        // add a certain nb of pts proportionally to the size of the canvas
        // ~~ truncates a floating point number and keeps the integer part, like floor()
        var n = ~~(p.width / 300 * p.height / 300);
        for (var i = 0; i < n; i++) {
            pts.push(p.createVector(~~p.random(p.width), ~~p.random(p.height)));
        }

        // Now, let's use Delaunay.js
        // Delaunay.triangulate expect a list of vertices (which should be a bunch of two-element arrays, representing 2D Euclidean points)
        // and it will return you a giant array, arranged in triplets, representing triangles by indices into the passed array
        // Array.map function let us create an Array of 2 elements arrays [ [x,y],[x,y],..] from our array of PVector [ PVector(x,y), PVector(x,y), ... ]
        var triangulation = Delaunay.triangulate(pts.map(function(pt) {
            return [pt.x, pt.y];
        }));

        // create Triangles object using indices returned by Delaunay.triangulate
        for (var i = 0; i < triangulation.length; i += 3) {
            tris.push(new p.Triangle(
                pts[triangulation[i]],
                pts[triangulation[i + 1]],
                pts[triangulation[i + 2]]
            ));
        }
    }

    // class for keeping triangles from 3 PVectors
    p.Triangle = function(_a, _b, _c) {
        // PVectors
        this.a = _a;
        this.b = _b;
        this.c = _c;

        // used for fill using lerpColor
        this.r = p.random(0.8);

        // used for drawing lines on triangles
        // number of lines to draw proportionnally to the triangle size
        this.n = ~~(p.dist(
            _a.x, _a.y,
            (this.b.x + this.c.x) / 2, (this.b.y + this.c.y) / 2
        ) / p.random(25, 50)) + 1;
        // direction point for the lines
        this.drawTo = ~~p.random(3);

        this.draw = function() {
            p.noStroke();
            p.fill(p.lerpColor(BG_COLOR, MAIN_COLOR, this.r));

            p.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);

            switch (this.drawTo) {
                case 0:
                    this.drawLines(this.a, this.b, this.c);
                    break;
                case 1:
                    this.drawLines(this.c, this.a, this.b);
                    break;
                case 2:
                    this.drawLines(this.b, this.a, this.c);
                    break;
            }

            p.stroke(MAIN_COLOR);
            p.strokeJoin(p.BEVEL);
            p.strokeWeight(20);
            p.noFill();
            p.triangle(this.a.x, this.a.y, this.b.x, this.b.y, this.c.x, this.c.y);
        };

        this.drawLines = function(from, to1, to2) {
            var c = p.cos(p.frameCount / 360 * p.TWO_PI) / 2;

            for (var i = 1; i <= this.n; i++) {
                var p1 = p.createVector(
                    p.lerp(from.x, to1.x, (i - 1) / this.n),
                    p.lerp(from.y, to1.y, (i - 1) / this.n)
                );
                var p2 = p.createVector(
                    p.lerp(from.x, to2.x, (i - 1) / this.n),
                    p.lerp(from.y, to2.y, (i - 1) / this.n)
                );
                var p3 = p.createVector(
                    p.lerp(from.x, to2.x, (i - 0.5 + c) / this.n),
                    p.lerp(from.y, to2.y, (i - 0.5 + c) / this.n)
                );
                var p4 = p.createVector(
                    p.lerp(from.x, to1.x, (i - 0.5 + c) / this.n),
                    p.lerp(from.y, to1.y, (i - 0.5 + c) / this.n)
                );

                // p.line( p1.x, p1.y, p2.x, p2.y );

                p.noStroke();
                p.fill(MAIN_COLOR);
                p.quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
            }
        }
    }

    p.draw = function() {
        p.background(BG_COLOR);

        tris.forEach(t => t.draw());
        // if (p.frameCount % 720 == 0) p.initializeTriangulation();
    }

    p.mousePressed = function() {
        p.initializeTriangulation();
    }

    p.windowResized = function() {
        p.resizeCanvas(windowWidth, windowHeight);
        p.initializeTriangulation();
    }

}
