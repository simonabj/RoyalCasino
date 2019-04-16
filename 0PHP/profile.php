<?php
session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Database connection*/

/*Sett datatype til utf8*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Definering av session variabler til senere bruk*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];
$seBruker = $_GET["profileID"];

/*Spørringer for å hente ut informasjon om brukeren senere*/
$sql = "SELECT * FROM users WHERE id=$seBruker";
$datasett = $tilkobling->query($sql);
$datasett2 = $tilkobling->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User <?php while($rad = mysqli_fetch_array($datasett2)) { ?><?php echo $rad['username']; ?><?php } ?> | Casino Royale</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href="stilark.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>
        body {
            font: 14px sans-serif;
            text-align: center;
        }
        h1 {
            color: white;
        }
    </style>
</head>
<body>

<?php while($rad = mysqli_fetch_array($datasett)) { ?>

<h1 style="color:white;width:99vw;text-align:center;"><?php echo $rad["username"]; ?></h1>
<div id="profile" style="display:flex;flex-direction:row;width:99%;margin-left:16px;">

    <img src="ProfilePictures/<?php echo $rad['profilePicture']; ?>" style="width:210px;height:210px;border:5px solid black;" onerror="this.src='ProfilePictures/avatar1.png'" />
    <p style="display:inline;color:white;font-size:1.3vw;text-align:left;width:79vw;margin-left:1%;"><?php echo "About Person Here."; ?>
        <br/><?php echo "Invited ".$rad['amountInvites']." people to play."; ?>
        <br/><?php echo "Registred at ".$rad['created_at']."."; ?>
        <br/><?php echo "Invite link: <a style='color:blue;' href='https://theroyale.club/0PHP/register.php?userInvite=".$seBrukerID."'>https://theroyale.club/0PHP/register.php?userInvite=".$seBrukerID."</a>."; ?></p>

</div>

<?php } ?>

</body>
</html>