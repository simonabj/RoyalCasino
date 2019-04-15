<?php
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Koble til database*/

/*Sett til utf8*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Velg mappe bildet skal lastes opp i*/
$target_dir = "ProfilePictures/";
$target_file = $target_dir . basename($_FILES["avatarToUpload"]["name"]); /*Sette filens lagringssted og navn*/
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
/*Sjekk på at alt er ok med bildet*/
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["avatarToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
}
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
/*Limitering av størelse på bildet*/
if ($_FILES["avatarToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}
/*Limitering av type bilde*/
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
    $uploadOk = 0;
}
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
} else {
    if (move_uploaded_file($_FILES["avatarToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename($_FILES["avatarToUpload"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}

session_start(); /*Starte session*/

require_once "config.php"; /*Hente konfigurasjonsfilen*/

/*Hvis man ikke er logget inn skal ingenting i databasen endres, da ledes du til innloggingssiden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

/*Lagring av session variabler til lettere senere bruk*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

$sql = "SELECT * FROM users WHERE id=$seBrukerID";

/*Endring av filnavn i database hvor bruker ID'en din er lik i databasen*/
if(isset($_POST["submit"]))
{
$sql = sprintf("UPDATE users SET profilePicture='%s' WHERE id=$seBrukerID",
        $tilkobling->real_escape_string($_FILES["avatarToUpload"]["name"])
        );
$tilkobling->query($sql);
header('Location: settings.php'); /*Ledes tilbake til innstillingene*/
}
?>
<head>
    <meta charset="utf-8">
    <title>Filmer | Lastet Opp Bilde</title>
    <link href="stilark.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
</head>
<body>
  
</body>