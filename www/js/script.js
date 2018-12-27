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

        $("#envia").click(function() {

            // Comprobamos los datos
            var name = $('#form1 input[name=nom]').val();
            if (name == '') {
                alert("Por favor, rellane el campo del nombre.\nSi te lo inventas, al menos, que mole :D");
                return;
            }

            var email = $('#form1 input[name=email]').val();
            if (name == '') {
                alert("Por favor, rellane el campo del eMail, esto es fundamental.\n¿Cómo vamos a avisarte sino?");
                return;
            }

            var activitats = "";
            $('#form1 input[name="activitats[]"]:checked:enabled').each(function() {
                activitats = $(this).val() + "," + activitats;
            });

            var experiencia = "";
            $('#form1 input[name="experiencia[]"]:checked:enabled').each(function() {
                experiencia = $(this).val() + "," + experiencia;
            });
            if (experiencia == '') {
                alert("Nos falta: ¿Alguna vez has programado?");
                return;
            }

            var dia = "";
            $('#form1 input[name="dia[]"]:checked:enabled').each(function() {
                dia = $(this).val() + "," + dia;
            });

            /*
            console.log("Nom " + name);
            console.log("EMail " + email);
            console.log("Activitats " + activitats);
            console.log("Experiencia " + experiencia);
            console.log("Dia " + dia);
            console.log($("#form1").serialize());
            */

            $.ajax({
                method: "POST",
                url: "save.php",
                data: $("#form1").serialize(),
            })
            .done(function( msg ) {
                // console.log( "Data Saved: " + msg );
                // console.log( msg );
                alert("!Olé!\nRegistrado con éxito!\nTe informaremos de cualquier cosita relacionada con el evento ;)\nNada de spam, ni cosas raras.");

            })
            .fail(function( jqXHR, textStatus ) {
                //alert( "Request failed: " + textStatus );
            });
        });
    });
