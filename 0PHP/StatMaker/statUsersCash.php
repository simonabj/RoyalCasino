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

/*Spørring til database.*/
$sql = sprintf("INSERT INTO stats(amountUSers) VALUES('%s')",
    $tilkobling->real_escape_string($antallBrukereTotalt)
);
$tilkobling->query($sql);

/*Legg til totalt tokens world wide. Og totalt antall invites.*/
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
