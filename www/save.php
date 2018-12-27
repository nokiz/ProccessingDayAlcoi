<?php

$host = "db757156369.db.1and1.com";
$db	  = "db757156369";
$user = "dbo757156369";
$pass = "@aE6jGg_yT";

$link = mysqli_connect($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
    die('<p>Error al conectar con servidor MySQL: '.mysqli_connect_error().'</p>');
} else {
    //echo '<p>Se ha establecido la conexión al servidor MySQL con éxito.</p >';
}

$nom   		 = mysqli_real_escape_string($link, $_POST["nom"]);
$email 		 = mysqli_real_escape_string($link, $_POST["email"]);
$activitats  = mysqli_real_escape_string($link, $_POST["activitats"]);
$experiencia = mysqli_real_escape_string($link, $_POST["experiencia"]);
$dia 		 = mysqli_real_escape_string($link, $_POST["dia"]);


$sql1 = "INSERT INTO enquesta (nom, activitats, experiencia, dia)
		 VALUES ('$nom', '$activitats', $experiencia, '$dia')";
$sql2 = "INSERT INTO email (email) VALUES ('$email')";

mysqli_query($link, $sql1);
mysqli_query($link, $sql2);

mysqli_close($link);

echo $_POST["activitats"];

?>
