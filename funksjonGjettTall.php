<?php
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr"); /*Kobling til databasen*/

session_start(); /*Starte session og hente ut verdiene som er lagret fra login.*/

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$riktigTall=mt_rand(1, 99); /*Velger hvilket tall som skal være vinneren*/
$gjettetTall=$_GET["gTall"]; /*Finner tallet du valgte du trodde skulle vinne*/
$bet=$_GET["bTall"]; /*Velger verdien du vedder*/

$seBrukerID=$_SESSION["id"];
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

/*Henter ut antallet tokens du har på konto*/
while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}

/*Sjekk på at man har nok tokens, og er innenfor lovlige verdier*/
if ($balanse<$bet OR 1>$gjettetTall AND $gjettetTall>100 OR ($bet!=50 AND $bet!=100 AND $bet!=200 AND $bet!=250) OR $gjettetTall=='') {

} else {
    /*Hvis man vinner ganges tallet du veddet med 75 og legges til på konto*/
    if ($riktigTall==$gjettetTall) {
        $balanse2=$balanse+$bet*75;
        $sql2 = sprintf("UPDATE users SET balance=%s WHERE id=%s",
            $tilkobling->real_escape_string($balanse2),
            $tilkobling->real_escape_string($seBrukerID)
        );
    } else {
        /*Taper man tas det man veddet vekk fra kontoen*/
        $balanse2=$balanse-$bet;
        $sql2 = sprintf("UPDATE users SET balance=%s WHERE id=%s",
            $tilkobling->real_escape_string($balanse2),
            $tilkobling->real_escape_string($seBrukerID)
        );
    }
    $tilkobling->query($sql2);
}
?>

<head>

</head>
<body>

</body>