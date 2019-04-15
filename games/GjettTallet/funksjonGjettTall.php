<?php
/*Koble seg til databasen*/
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start();

require_once "../../0PHP/config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){ /*Sjekke om man er logget inn*/
    header("location: ../../0PHP/login.php");
    exit;
}

/*$riktigTall=mt_rand(1, 99); Alternativt riktig tall med php*/
$riktigTall=$_GET["vTall"];
$gjettetTall=$_GET["gTall"];
$bet=$_GET["bTall"];

$seBrukerID=$_SESSION["id"];
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

while ($row = mysqli_fetch_array($kjort)) { /*Hente verdien av collection*/
    $balanse=$row['balance'];
}

if ($balanse<$bet OR 1>$gjettetTall AND $gjettetTall>100 OR ($bet!=50 AND $bet!=100 AND $bet!=200 AND $bet!=250) OR $gjettetTall=='') { /*Kjøre en sjekk på om alle verdiene er verfisert*/

} else {
    if ($riktigTall==$gjettetTall) { /*Svare riktig*/
        $balanse2=$balanse+$bet*75;
        $sql2 = sprintf("UPDATE users SET balance=%s WHERE id=%s",
            $tilkobling->real_escape_string($balanse2),
            $tilkobling->real_escape_string($seBrukerID)
        );
    } else { /*Om du gjetter feil*/
        $balanse2=$balanse-$bet;
        $sql2 = sprintf("UPDATE users SET balance=%s WHERE id=%s",
            $tilkobling->real_escape_string($balanse2),
            $tilkobling->real_escape_string($seBrukerID)
        );
    }
    $tilkobling->query($sql2); /*Oppdatere databasen*/
}
?>

<head>

</head>
<body>

</body>
