    var sketch_number = 2;
    var myp5;

    $(document).ready(function() {
        $("#bg_selector li span").click(function() {
            var clicked_index = $("#bg_selector li span").index(this);
            sketch_number = clicked_index;
            console.log("Clicked: " + clicked_index);

            switch (sketch_number) {
                case 0:
                    console.log("Cargamos sketch de Magda");
                    if (typeof(myp5) !== 'undefined') myp5.remove();
                    myp5 = new p5(sketch_magda, 'background_sketch');
                    break;
                case 1:
                    console.log("Cargamos sketch de Bas");
                    if (typeof(myp5) !== 'undefined') myp5.remove();
                    myp5 = new p5(sketch_bas, 'background_sketch');
                    break;
                case 2:
                    console.log("Cargamos sketch de Nokiz");
                    if (typeof(myp5) !== 'undefined') myp5.remove();
                    myp5 = new p5(sketch_nokiz, 'background_sketch');
                    break;
                case 3:
                    console.log("Cargamos sketch de Frankz");
                    if (typeof(myp5) !== 'undefined') myp5.remove();
                    myp5 = new p5(sketch_frankz, 'background_sketch');
                    break;
                case 4:
                    console.log("Cargamos sketch de Nacho");
                    if (typeof(myp5) !== 'undefined') myp5.remove();
                    myp5 = new p5(sketch_nacho, 'background_sketch');
                    break;
                default:
            }
        });
    });
