<?php
/*Lage connection til databasen*/
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start(); /*Starte session og hente lagrede variabler for å kommunisere med databasen*/

require_once "../../0PHP/config.php"; /*Sjekk på at man er innlogget, hvis ikke blir man redirectet til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../../0PHP/login.php");
    exit;
}

$seBrukerID=$_SESSION["id"];
?>
<html>
<head>
    <title> Casino Royale | Guess The Number </title>
    <script src="/0JS/RoyaleSubsystem.js"></script>

    <link href="../../0CSS/universal.css" rel="stylesheet">

    <script src="../../0JS/universal_menu.js"></script>
    <link href="../../0CSS/universal_menu.css" rel="stylesheet">
</head>
<body>

<!-- Input for valgt tall, med minimum 1 og maximum 99 -->
<input type="number" id="valgtTall" placeholder="Hvilket tall tror du det blir?" max="99" min="1" style="width:200px;">

<!-- Valg av tokens man vil vedde -->
<select id="bet">
    <option value="1">1tokens</option>
    <option value="5">5tokens</option>
    <option value="10">10tokens</option>
</select>

<!-- Knapp for kjøring av funksjonen som oppdaterer databasen og forteller deg om du vinner. -->
<button onclick="kjorBet()">Guess!</button>

<h2 style="text-align:center;">The Number Is:</h2>
<p style="text-align:center;" id="vinnerTall">X</p>

<!-- Viser hendelsesforløpet, tap/vinn og balansen du har -->
<p id="hendelse"></p>
<p id="tokenCount">Balanse: <span id="tokenCount"></span></p>

<script>
    /*Definerer variablene man trenger*/
    var betEl=document.querySelector("#bet");
    var valgtTallEl=document.querySelector("#valgtTall");
    var balanceEl=document.querySelector("#balance");
    var hendelseEl=document.querySelector("#hendelse");

    var vinnerTallEl=document.getElementById("vinnerTall");

    var vinnertall; /*Definere variablen vinnertall*/

    init_royale();
    document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Vis balansen din av tokens på siden*/
    updateRmhTokenCount();

    /*Funksjonen som kjører når man klikker på knappen, denne kommuniserer med en annen fil som oppdaterer databasen*/
    function kjorBet() {
        if (valgtTallEl.value<100 && 0<valgtTallEl.value && (betEl.value==1 || betEl.value==5 || betEl.value==10)) {
            vinnerTall = Math.floor(Math.random() * 99 + 1); /*Valg av vinnertall*/
            vinnerTallEl.innerHTML=vinnerTall;

            if (vinnerTall == valgtTallEl.value) {
                hendelseEl.innerHTML = "You guessed the number " + valgtTallEl.value + ". And it was correct! You betted " + betEl.value + " and recieved 75x as much.";/*Tekst til eventuelt vinn*/
                user.tokenManager.addTokenAmount(75 * betEl.value); // Gi brukeren tokens hvis vinn
            } else {
                hendelseEl.innerHTML = "You guessed " + valgtTallEl.value + ". The number was " + vinnerTall + ". You lost " + betEl.value + " tokens.";/*Tekst til tap*/
                user.tokenManager.subTokenAmount(betEl.value);/* Fjern tokens hvis tap*/
            }

            saveUser(user); /*Oppdatere til session storage*/
            updateSQL(); /*Oppdater database*/
            document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Oppdater antall tokens brukeren har*/
            updateRmhTokenCount();/*Oppdater antall tokens i toppmeny*/
        } else {
            hendelseEl.innerHTML="The number must be between 1 and 99. And the bet value must be one of the selected ones.";
        }
    }

</script>

</body>
</html>
