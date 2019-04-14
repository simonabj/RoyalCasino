<?php
session_start(); /*Starte session*/
$_SESSION = array();
session_destroy(); /*Ødelegge session så man må logge inn igjen*/

header("location: login.php"); /*Sende brukeren til innloggingssiden*/
exit;
?>
