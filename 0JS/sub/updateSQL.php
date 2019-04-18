<?php


$name = $_POST["username"];
$mail = $_POST["mail"];
$cash = $_POST["balance"];
$pic = $_POST["profilePicture"];
$inv = $_POST["amountInvites"];

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

$sql = "UPDATE users SET mail='$mail',balance=$cash,profilePicture='$pic',amountInvites=$inv WHERE username='$name'";

header('Content-Type: text/plain');

if($link->query($sql) === TRUE) {
    echo 1;
} else {
    echo 0;
}