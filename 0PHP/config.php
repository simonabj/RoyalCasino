<?php
/*Definering av alle passord og connection til database, dette vil være til hjelp senere*/
define('DB_SERVER', 'localhost'); /*Definering av server*/
define('DB_USERNAME', 'u201393012_cr'); /*Definering av brukernavn*/
define('DB_PASSWORD', '123321hhh'); /*Definering av passord*/
define('DB_NAME', 'u201393012_cr'); /*Definering av navn*/

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME); /*Definere connection til database som variablen $link*/

if (!$link->set_charset("utf8")) {
    echo $link->error;
}