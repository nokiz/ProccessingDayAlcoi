<?php

$host = "";
$db   = "";
$user = "";
$pass = "";

$link = mysqli_connect($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
    die('<p>Error al conectar con servidor MySQL: '.mysqli_connect_error().'</p>');
} else {
    //echo '<p>Se ha establecido la conexión al servidor MySQL con éxito.</p >';
}

$nom   		 = mysqli_real_escape_string($link, $_POST["nom"]);
$email 		 = mysqli_real_escape_string($link, $_POST["email"]);
$activitats  = implode(", ", $_POST["activitats"]);
$experiencia = implode(", ", $_POST["experiencia"]);
$dia 		 = mysqli_real_escape_string($link, $_POST["dia"]);


$sql1 = "INSERT INTO enquesta (nom, activitats, experiencia, dia) 
		 VALUES ('$nom', '$activitats', $experiencia, '$dia')";
$sql2 = "INSERT INTO email (email) VALUES ('$email')";

mysqli_query($link, $sql1);
mysqli_query($link, $sql2);

mysqli_close($link);

?>
