<?php
session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

$sql = "SELECT * FROM userLogin WHERE userLogged=$seBrukerID ORDER BY Time";
$datasett = $tilkobling->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | Logged Devices</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <link href="stilark.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
    <style>
        body{
            font: 14px sans-serif;
            text-align: center;
        }
        h1 {
            color: white;
        }
    </style>
</head>
<body>

<h2 style="width:99%; text-align: left; margin-left:auto; margin-right:auto; font-size:20px; color:#337ab7;">Logins on this user - <a href="hackedUser.php" style="color: gray;">If any of the IP's or devices on the list isnt yours, click here.</a></h2>
<table id="ipForUser" border="0" style="text-align:center; background-color:white; width:99%;">
  <tbody>
  <tr>
    <th>IP:</th>
    <th>Enhet</th>
    <th>Land:</th>
    <th>Region:</th>
    <th>By:</th>
    <th>Dato-Tid:</th>
  </tr>
  <?php while($rad = mysqli_fetch_array($datasett)) { ?>
  <tr>
    <td><a href="https://www.iplocation.net/?query=<?php echo $rad['IP']; ?>" target="_blank" style="color:blue;"><?php echo $rad["IP"]; ?></a></td>
    <td><?php echo $rad["device"]; ?></td>
    <td><a href="https://countrycode.org/<?php echo $rad['countryConnection']; ?>" target="_blank"><img src="CountrycodeFlags/<?php echo strtolower($rad["countryConnection"]); ?>.png" /></a></td>
    <td><?php echo $rad["regionConnection"]; ?></td>
    <td><?php echo $rad["cityConnection"]; ?></td>
    <td><?php echo $rad["Time"]; ?></td>
  </tr>
  <?php } ?>
</tbody>
</table>

</body>
</html>
