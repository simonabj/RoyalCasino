<?php
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'u201393012_CR');
define('DB_PASSWORD', '1EjjQpVKmAMa');
define('DB_NAME', 'u201393012_CR');

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
