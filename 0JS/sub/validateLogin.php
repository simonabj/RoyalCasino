<?php
session_start();

if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    echo json_encode(array("test"=>0));
} else {
    echo json_encode(array("test"=>1,"username"=>$_SESSION['username']));
}

