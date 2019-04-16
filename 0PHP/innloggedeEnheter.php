<?php
session_start(); /*Starte session*/

require_once "config.php"; /*Hente konfigurasjons koden*/

/*Hvis brukeren ikke er logget inn tas han/hun til innloggingssiden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

/*Settes til utf8*/
if (!$link->set_charset("utf8")) {
    printf($link->error, "");
} else {
    printf($link->character_set_name(), "");
}

/*Definering av session variabler*/
$seUser = $_SESSION["username"];
$seBrukerID = $_SESSION["id"];

/*Lage en spørresetning som brukes til å vise informasjon senere og definering av et datasett som vises for brukeren.*/
$sql = "SELECT * FROM userLogin WHERE userLogged=$seBrukerID ORDER BY Time";
$datasett = $link->query($sql); /*Utføring av spørringen*/
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Casino Royale | Logged Devices</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css"> <!-- CSS Eksternt -->
    <link href="stilark.css" rel="stylesheet" type="text/css"> <!-- CSS Lokalt Stilark -->
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

<!-- Visning av informasjon om innlogginger og tilbud om å sikre kontoen -->
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
  <!-- PhP kode for visning av all informasjonen nedover i tabellen -->
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
