<?php
/*Definering av alle passord og connection til database, dette vil være til hjelp senere*/
define('DB_SERVER', 'localhost'); /*Definering av server*/
define('DB_USERNAME', 'root'); /*Definering av brukernavn*/
define('DB_PASSWORD', ''); /*Definering av passord*/
define('DB_NAME', 'casinodb'); /*Definering av navn*/

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME); /*Definere connection til database som variablen $link*/

if (!$link->set_charset("utf8")) {
    echo $link->error;
}