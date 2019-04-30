<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

header('Content-Type: application/json');

$sql = json_decode(file_get_contents('php://input'))->query;

$result = $link->query($sql);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    return $link->error;
}