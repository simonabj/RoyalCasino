<?php
session_start(); /*Starte session*/
$_SESSION = array();
session_destroy(); /*Ødelegge session så man må logge inn igjen*/
?>
<html>
<head>
    <script src="/0JS/RoyaleSubsystem.js"></script>
</head>
<body>
<script>
    sessionStorage.clear();
    window.location.replace("/0PHP/login.php");
</script>
</body>
</html>
