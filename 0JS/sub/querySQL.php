<?php

require_once($_SERVER['DOCUMENT_ROOT'].'/0PHP/config.php');

$sql = $_POST['query'];

$result = $link->query($sql);

if($result->num_rows > 0) {
    echo json_encode($result->fetch_all());
} else {
    return $link->error;
}