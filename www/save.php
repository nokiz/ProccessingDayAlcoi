<?php

$host = "";
$db	  = "";
$user = "";
$pass = "";

$link = mysqli_connect($host, $user, $pass, $db);
if (!$link) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
//echo 'Connected successfully';

$val1 = escape_string($link, $_POST[""]);

$sql = "INSERT INTO tabla () VALUES ()";

mysqli_query($link, $sql);

mysqli_close($link);