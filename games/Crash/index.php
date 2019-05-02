<?php
session_start(); /*Starte session og hente lagrede variabler for å kommunisere med databasen*/
require_once "../../0PHP/config.php"; /*Sjekk på at man er innlogget, hvis ikke blir man redirectet til login siden*/
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: ../../0PHP/login.php");
    exit;
}
?>

<head>
    <title>Casino Royale | Crash</title>
    <script src="https://canvasjs.com/assets/script/canvasjs.min.js"> </script><!-- Hente chart koden -->
    <script src="/0JS/RoyaleSubsystem.js"></script> <!-- Subsystem -->
</head>
<body>

  <p style="text-align:center;font-size:40px;"><span id="ganger">1.00</span>x</p> <!-- Det som viser verdien til ganger tallet -->
  <div id="chartContainer" style="height: 360px; width: 100%;"></div> <!-- Viser Charten av økingen -->

  <button id="button">Start</button> <!-- Knapp for å starte bettet -->
  <button id="button2">Widraw</button> <!-- Knapp for å gi seg med profitt -->

  <input type="number" id="bet" placeholder="Hvor mye vedder du?" /> <!-- Input for hvor mye penger du vedder -->
  <p id="utfall"></p>
  <p>Balanse: <span id="tokenCount"></span></p>

  <script>
      /*Lage variabler for å kunne bruke dem senere i spillet*/
      var gangerEl=document.querySelector("#ganger");
      var utfallEl=document.querySelector("#utfall");
      var startEl=document.querySelector("#button");
      var widrawEl=document.querySelector("#button2");
      var betEl=document.querySelector("#bet");

      startEl.addEventListener("click", startCrash);

      var betVerdi; /*Definere variablen til verdien av hva du vedder*/
      var sluttVerdi; /*Definere variablen sluttverdi så man kan bruke den i resten av oppgaven.*/
      var n=1.00; /*Verdien av ganger nåtid.*/
      var running=false; /*Variabel som sier noe om funksjonen skal fortsette å kjøre.*/
      var dataArray = [1]; /*Definere arrayen av verdiene i charten.*/

      document.getElementById("tokenCount").innerHTML=getUser().tokenManager.getCount(); /*Sett verdien av antall tokens*/
      init_royale();/*Definere user*/

      function startCrash() {
        /*Definere antall tokens på brukeren ved en variabel.*/
        var balanse = getUser().tokenManager.getCount();
        /*Ta en hvis test på om verdien du vedder er gjeldende.*/
        if (0<Number(betEl.value) && Number(betEl.value)<Number(balanse) && betEl.value!=="" && isNaN(betEl.value)==false) {
          betVerdi=betEl.value; /*Lagre original vedde verdien for at man ikke skal kunne endre underveis.*/
          startEl.removeEventListener("click", startCrash); /*Fjerne ny start.*/
          widrawEl.addEventListener("click", widrawFunc); /*Legge til mulighet til å trekke seg.*/

          sluttVerdi=(1+0.01*Math.floor(Math.random() * 375)).toFixed(2); /*Definere sluttverdien med 2 desimaler.*/

          dataArray = [1]; /*Sette startverdien av arrayen.*/
          n=1.00; /*Resette startverdien.*/

          gangerEl.innerHTML=n.toFixed(2); /*Endre tallet på toppen som viser n i nåtid*/

          running=true;
          makeGraph();
        } else {
          utfallEl.innerHTML="You have placed an unacceptable bet value. Remember that you need to have enough tokens."; /*Melding om at noe er feil.*/
        }
      }

      function makeGraph() {
        if (running==true) {
          if (n>=sluttVerdi) {
            running=false;
            utfallEl.innerHTML="You didnt make it out in time and lost "+betVerdi+" tokens.";

            gangerEl.innerHTML=n.toFixed(2); /*Endre tallet på toppen som viser n i nåtid*/

            startEl.addEventListener("click", startCrash); /*Åpner for å starte igjen.*/
            widrawEl.removeEventListener("click", widrawFunc); /*Fjerner muligheten til å trekke seg.*/

            /*Fjerning av tokens fra balanse.*/
            user.tokenManager.subTokenAmount(Math.floor(Number(betVerdi)));/* Fjern tokens hvis tap*/
            saveUser(user); /*Oppdatere til session storage*/
            updateSQL(); /*Oppdater database*/
            document.getElementById("tokenCount").innerHTML = user.tokenManager.getCount(); /*Oppdater antall tokens brukeren har*/

            dataArray.push(0);
          } else {
            n = n+0.01; /*Plusse på 0.01 til verdien av ganger utfallet.*/
            gangerEl.innerHTML=n.toFixed(2); /*Endre tallet på toppen som viser n i nåtid*/
            dataArray.push(n); /*Legg til verdien i en array.*/

            /*Oppdater charten ved hver kjøring*/
            var dps = [];   //dataPoints.
            var chart = new CanvasJS.Chart("chartContainer", {
                title: {
                    text: "Crash"
                },
                axisX: {
                    title: ""
                },
                axisY: {
                    title: "X times bet"
                },
                data: [{
                    type: "line",
                    dataPoints: dps
                }]
            });
            function parseDataPoints() {
                for (var i = 0; i <= dataArray.length; i++)
                    dps.push({y: dataArray[i]});
            };
            parseDataPoints();
            chart.options.data[0].dataPoints = dps;
            chart.render();

            setTimeout(makeGraph, 300); /*Repeat function.*/
          }
        }
      }

      function widrawFunc() {
        startEl.addEventListener("click", startCrash); /*Fjerne ny start.*/
        widrawEl.removeEventListener("click", widrawFunc); /*Legge til mulighet til å trekke seg.*/

        gangerEl.innerHTML=n.toFixed(2); /*Endre tallet på toppen som viser n i nåtid*/

        user.tokenManager.addTokenAmount(Number(Math.floor(betVerdi*n-betVerdi))); /*Gi brukeren tokens hvis vinn*/
        saveUser(user); /*Oppdatere til session storage*/
        updateSQL(); /*Oppdater database*/
        document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Oppdater antall tokens brukeren har*/

        /*Melding om vinn.*/
        utfallEl.innerHTML="You managed to get out in time, you placed a bet on "+betVerdi+" tokens and earned "+Number(betVerdi*n-betVerdi).toFixed(2)+" Tokens. Your bet was multiplied by "+n.toFixed(2)+".";

        running=false; /*Skru av kjøringen av videre tabellagning.*/
      }

      /*Kjøring av funksjon for tabell on load*/
      var dps = [];   //dataPoints.
      var chart = new CanvasJS.Chart("chartContainer",{
          title :{
              text: "Crash"
          },
          axisX: {
              title: ""
          },
          axisY: {
              title: "X times bet"
          },
          data: [{
              type: "line",
              dataPoints : dps
          }]
      });
      function parseDataPoints () {
          for (var i = 0; i <= dataArray.length; i++)
              dps.push({y: dataArray[i]});
      };
      parseDataPoints();
      chart.options.data[0].dataPoints = dps;
      chart.render();
    </script>
</body>
