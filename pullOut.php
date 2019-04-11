<?php
/*Lage connection til databasen*/
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start(); /*Starte session og hente lagrede variabler for å kommunisere med databasen*/

require_once "config.php"; /*Sjekk på at man er innlogget, hvis ikke blir man redirectet til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$seBrukerID=$_SESSION["id"];

/*Finne balansen man har på konto for å bruke den senere i filen*/
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);
while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}
?>

<head>
    <title>Counter</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> <!-- Koble til jQuery -->
</head>
<body>

<p><span id="ganger">1.00</span>x</p> <!-- Det som viser verdien til ganger tallet -->

<button id="button">Start</button> <!-- Knapp for å starte bettet -->
<button id="button2">Pull Out</button> <!-- Knapp for å gi seg med profitt -->
<input type="number" id="bet" placeholder="Hvor mye vedder du?" /> <!-- Input for hvor mye penger du vedder -->
<p id="utfall"></p>

<script>
    /*Lage variabler for å kunne bruke dem senere i spillet*/
    var gangerEl=document.querySelector("#ganger");
    var utfallEl=document.querySelector("#utfall");
    var buttonEl=document.querySelector("#button");
    var button2El=document.querySelector("#button2");
    var betEl=document.querySelector("#bet");
    /*Event listeners for å kjøre funksjonene*/
    buttonEl.addEventListener("click", rullNummer);
    buttonEl.addEventListener("click", sluttVerdiFunksjon);
    /*Verdiene man trenger i oppgaven*/
    var n=1;
    var ganger2=1.00;
    var sluttVerdi;
    var betSatt;

    /*Funksjonen for å sette sluttverdien og ordne event listerne så man ikke kan gjenta flere prosesser*/
    function sluttVerdiFunksjon() {
        betSatt=betEl.value;
        sluttVerdi=1+0.01*Math.floor(Math.random() * 375)+0.25;
        sluttVerdi=sluttVerdi.toFixed(2);
        console.log(sluttVerdi);
        buttonEl.removeEventListener("click", rullNummer);
        buttonEl.removeEventListener("click", sluttVerdiFunksjon);
        button2El.addEventListener("click", pullOut);
    }

    /*Funksjon for å øke tallet, og hvos tallet når slutt tallet stopper den og du taper*/
    function rullNummer() {
        if (ganger2>=sluttVerdi) {
            buttonEl.addEventListener("click", rullNummer);
            buttonEl.addEventListener("click", sluttVerdiFunksjon);
            buttonEl.removeEventListener("click", pullOut);
            n=1;
            ganger2=1;
            utfallEl.innerHTML="Du trakk IKKE ut i tide, tapte "+betSatt+".";

            $.ajax({url:"funksjonPullOut.php?bTall="+betSatt.value+"&ganger="+ganger2+"&utfall=tap",success:function(){
                    console.log("Tapt penger, funksjon kjørt.");
                }})

        } else {
            ganger2=1+0.01*n;
            gangerEl.innerHTML=ganger2.toFixed(2);
            n++;
            setTimeout(rullNummer, (300-0.4*n)); /*Gjenta prosessen, øk tallet raskere og raskere*/
        }
    }

    /*Funksjon for å stoppe prosessen og tjene tokens til kontoen din*/
    function pullOut() {
        buttonEl.removeEventListener("click", pullOut);
        utfallEl.innerHTML="Du trakk deg ut i tide, veddet "+betSatt+" og tjente "+betSatt*ganger2+" Tokens. Innsatsen din ble ganget med "+ganger2+".";

        $.ajax({url:"funksjonPullOut.php?bTall="+betSatt.value+"&ganger="+ganger2+"&utfall=vinn",success:function(){
                console.log("Pull Out Kjørt.");
            }})

        n=1;
        ganger2=1;
    }
</script>
</body>