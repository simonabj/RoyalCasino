<?php
session_start(); /*Starte en session for å hente verdiene lagret*/

require_once "config.php"; /*Hente konfigurasjonsbitene*/

/*Definere hvilken bruker som logger inn og iden, også IP'en*/
$seUser = $_SESSION["username"];
$seUserID = $_SESSION["id"];
$IP = $_SERVER['REMOTE_ADDR'];

/*Finne stedet innloggingen skjer fra*/
$ip = $_SERVER['REMOTE_ADDR'];
$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
$country = $details->country;
$region = $details->region;
$city = $details->city;

$iPod    = stripos($_SERVER['HTTP_USER_AGENT'],"iPod");
$iPhone  = stripos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$iPad    = stripos($_SERVER['HTTP_USER_AGENT'],"iPad");
$Android = stripos($_SERVER['HTTP_USER_AGENT'],"Android");
$NokiaSymbian = stripos($_SERVER['HTTP_USER_AGENT'],"NokiaSymbian");
$BlackBerry9down = stripos($_SERVER['HTTP_USER_AGENT'],"BlackBerry9down");
$BlackBerry10 = stripos($_SERVER['HTTP_USER_AGENT'],"BlackBerry10");

/*Finne ut hvilken enhet man logger seg på med*/
if ($iPod) {
    $deviceUsed = 'iPod';
} else if ($iPhone) {
    $deviceUsed = 'iPhone';
} else if ($iPad) {
    $deviceUsed = 'iPad';
} else if ($Android) {
    $deviceUsed = 'Android';
} else if ($NokiaSymbian) {
    $deviceUsed = 'Nokia';
} else if ($BlackBerry9down || $BlackBerry10) {
    $deviceUsed = 'BlackBerry';
} else {
    $deviceUsed = 'Computer';
}

$browser = $_SERVER['HTTP_USER_AGENT'];

$sporring = "SELECT * FROM userLogin WHERE userLogged=$seUserID AND device LIKE '%$deviceUsed%' AND browser LIKE '%$browser%' AND IP LIKE '%$IP%'";
$sporring2 = mysqli_query($link, $sporring);
$svar_sporring=mysqli_num_rows($sporring2);

/*Hvis det ikke finnes en maken innlogging, legg til personen som logger inn her.*/
if ($svar_sporring<1) {
    /*Lage en spørresetning for å legge til verdiene til databasen*/
    $sql = sprintf("INSERT INTO userLogin(IP, userLogged, countryConnection, regionConnection, cityConnection, device, browser) VALUES('%s','%s','%s','%s','%s','%s','%s')",
            $link->real_escape_string($IP),
            $link->real_escape_string($seUserID),
            $link->real_escape_string($country),
            $link->real_escape_string($region),
            $link->real_escape_string($city),
            $link->real_escape_string($deviceUsed),
            $link->real_escape_string($browser)
            );
    $link->query($sql); /*Oppdatere verdiene til databasen*/
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>CASINO ROYALE | SECURE PROFILE</title>
    <script src="/0JS/RoyaleSubsystem.js"></script>
</head>
<body>
<!-- INIT SUBSYSTEM -->
<script>
    window.onload = () => {

        let sessionFirstTime = "<?php echo ($_SESSION['firstTimeLogin'] === TRUE) ? 1 : 0;?>";
        save("firstTime", sessionFirstTime === "1");

        save("user", new User(
            "<?php echo $_SESSION["username"]?>",
            "<?php echo $_SESSION["mail"] ?>",
            "<?php echo $_SESSION["loggedin"]?>" === "1",
            Number("<?php echo $_SESSION["balance"] ?>"),
            "<?php echo $_SESSION["profilePicture"]?>",
            Number("<?php echo $_SESSION["amountInvites"]?>")
        ));
        window.location.replace("/hub/");
    }
</script>
</body>
</html>
