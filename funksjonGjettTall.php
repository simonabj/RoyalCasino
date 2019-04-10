<?php
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$riktigTall=mt_rand(1, 99);
$gjettetTall=$_GET["gTall"];
$bet=$_GET["bTall"];

$seBrukerID=$_SESSION["id"];
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}

if ($balanse<$bet OR 1>$gjettetTall AND $gjettetTall>100 OR ($bet!=50 AND $bet!=100 AND $bet!=200 AND $bet!=250) OR $gjettetTall=='') {

} else {
    if ($riktigTall==$gjettetTall) {
        $balanse2=$balanse+$bet*75;
        $sql2 = sprintf("UPDATE users SET balance=%s WHERE id=%s",
            $tilkobling->real_escape_string($balanse2),
            $tilkobling->real_escape_string($seBrukerID)
        );
    } else {
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