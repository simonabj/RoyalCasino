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
<head>
    <title>DOCUMENTATION</title>
    <style>

        body {
            background: #414141;

            margin: 0;

            width: 100%;
            height: 100vh;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        #container {
            display: inline-flex;
            flex-direction: row;
            justify-content: space-evenly;
            align-items: center;
            min-width: 70%;
        }

        #container > a {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            text-align: center;

            box-shadow: #202020 0 1px 6px 0;

            width: 350px;
            height: 275px;

            border-radius: 75px;

            transition: all 200ms ease-out;
            text-decoration: none;
        }

        a:hover {
            transform: scale(1.05);
        }

        #container:hover > a:not(:hover) {
            filter: blur(2px);
        }

        #api {
            background-image: url("img/api.PNG");
            background-size: contain;
        }

        #package {
            background-image: url("img/RoyaleSubsystem_ClassDiagram.PNG");
            background-size: contain;
        }

        p {
            font-family: "Berlin Sans FB", sans-serif;
            font-size: 24pt;

            color: #efefef;
            background: rgba(0, 128, 128, .8);
            padding: 5px;
            border-radius: 12px;

            text-decoration: underline;
        }
    </style>
</head>
<body>

<div id="container">
    <a href="./API/index.html" id="api"><p>API Documentation</p></a>
    <br>
    <a href="./html-docs/index.html" id="package"><p>Package Structure</p></a>
</div>

</body>
</html>
