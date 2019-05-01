<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

header('Content-Type: application/json');

$sql = json_decode(file_get_contents('php://input'))->query;

$result = $link->query($sql);

$stack = array();

if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        array_push($stack, $row);
    }
    echo json_encode($stack);
} else {
    echo $link->error;
}