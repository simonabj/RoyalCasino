<?php
/*Definering av alle passord og connection til database, dette vil være til hjelp senere*/
define('DB_SERVER', 'mysql.hostinger.com');
define('DB_USERNAME', 'u201393012_cr');
define('DB_PASSWORD', '1EjjQpVKmAMa');
define('DB_NAME', 'u201393012_cr');

$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);

if (!$link->set_charset("utf8")) {
    printf("", $link->error);
} else {
    printf("", $link->character_set_name());
}

?>
<html>
<head>
</head>
<body>

</body>
</html>
