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
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

/*Finne balansen man har på konto for å bruke den senere i filen*/
while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}
?>
<html>
<head>
    <title> Casino Royale | Gjett Tallet </title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="/0JS/RoyaleSubsystem.js"></script>
</head>
<body>

<!-- Input for valgt tall, med minimum 1 og maximum 99 -->
<input type="number" id="valgtTall" placeholder="Hvilket tall tror du det blir?" max="99" min="1" style="width:200px;">

<!-- Valg av tokens man vil vedde -->
<select id="bet">
    <option value="50">50tokens</option>
    <option value="100">100tokens</option>
    <option value="200">200tokens</option>
    <option value="250">250tokens</option>
</select>

<!-- Knapp for kjøring av funksjonen som oppdaterer databasen og forteller deg om du vinner. -->
<button onclick="kjorBet()">Gjett!</button>

<!-- Viser hendelsesforløpet, tap/vinn og balansen du har -->
<p id="hendelse"></p>
<p id="tokenCount">Balanse: <span id="tokenCount"></span></p>

<script>
    /*Definerer variablene man trenger*/
    var betEl=document.querySelector("#bet");
    var valgtTallEl=document.querySelector("#valgtTall");
    var balanceEl=document.querySelector("#balance");
    var hendelseEl=document.querySelector("#hendelse");

    var vinnertall;

    /*Funksjonen som kjører når man klikker på knappen, denne kommuniserer med en annen fil som oppdaterer databasen*/
    function kjorBet() {
        vinnerTall=Math.floor(Math.random()*99+1);
        $.ajax({url:"funksjonGjettTall.php?gTall="+valgtTallEl.value+"&bTall="+betEl.value+"&vTall="+vinnerTall,success:function(){
                console.log("Gjett tall kjørt.");
                updateTokens();
            }
        })

        if (vinnerTall==valgtTallEl.value) { /*Tekst til eventuelt vinn*/
            hendelseEl.innerHTML="Tallet du gjettet "+valgtTallEl.value+" ble riktig! Du veddet "+betEl.value+" tokens og fikk 75x så mye satt inn på kontoen din.";
        } else { /*Tekst til tap*/
            hendelseEl.innerHTML="Tallet du gjettet "+valgtTallEl.value+" var desverre feil! Du tapte "+betEl.value+" tokens.";
        }

    }

    /*Token Count*/
    updateTokens();
    function updateTokens() {
        document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount();
    }
</script>

</body>
</html>
