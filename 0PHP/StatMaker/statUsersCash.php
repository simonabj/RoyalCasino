<?php
$tilkobling = mysqli_connect("mysql.hostinger.com","u201393012_cr","1EjjQpVKmAMa","u201393012_cr"); /*Koble seg til databasen*/

/*Sette til utf8*/
if (!$tilkobling->set_charset("utf8")) {
    printf("", $tilkobling->error);
} else {
    printf("", $tilkobling->character_set_name());
}

/*Spørring for å finne antall brukere totalt*/
$sql2 = "SELECT * FROM users";
$result2 = mysqli_query($tilkobling, $sql2);
$antallBrukereTotalt = mysqli_num_rows($result2);

$query_run = mysqli_query($sql2);

$totalTokens= 0;
while ($num = mysqli_fetch_assoc ($query_run)) {
    $totalTokens += $num['balance'];
}

$averageTokens=$totalTokens/$antallBrukereTotalt;

/*Spørring til database.*/
$sql = sprintf("INSERT INTO stats(amountUSers, totalTokens, averageTokens) VALUES('%s','%s','%s')",
    $tilkobling->real_escape_string($antallBrukereTotalt),
    $tilkobling->real_escape_string($totalTokens),
    $tilkobling->real_escape_string($averageTokens)
);
$tilkobling->query($sql);
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Casino Royale | Statmaker</title>
</head>

<body>

</body>
</html>
