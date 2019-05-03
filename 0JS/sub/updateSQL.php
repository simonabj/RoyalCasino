<?php


$name = $_POST["username"];
$mail = $_POST["mail"];
$cash = $_POST["balance"];
$gain = $_POST["gained"];
$lost = $_POST["lost"];
$pic = $_POST["profilePicture"];
$inv = $_POST["amountInvites"];

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

$sql = "UPDATE users SET mail='$mail',balance=$cash,tokensGained=$gain,tokensLost=$lost,profilePicture='$pic',amountInvites=$inv WHERE username='$name'";

header('Content-Type: text/plain');

if($link->query($sql) === TRUE) {
    echo 1;
} else {
    echo 0;
}