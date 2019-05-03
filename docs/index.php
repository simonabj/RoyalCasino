<?php

session_start();

require_once($_SERVER['DOCUMENT_ROOT'] . '/0PHP/config.php');

if (!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true) {
    header("location: /logout/");
} else {
    if ($_SESSION["username"] != "admin") {
        header("location: /hub/");
    }
}
?>

<html>
<head></head>
<body>

<div>

    <a href="./API/index.html">API DOCS</a>
    <br>
    <a href="./html-docs/index.html">Package Structure</a>

</div>

</body>
</html>
