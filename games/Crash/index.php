<?php
/*Lage connection til databasen*/
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
<div id="chartContainer" style="height: 360px; width: 100%;"></div>

<button id="button">Start</button> <!-- Knapp for å starte bettet -->
<button id="button2">Widraw</button> <!-- Knapp for å gi seg med profitt -->
<input type="number" id="bet" placeholder="Hvor mye vedder du?" /> <!-- Input for hvor mye penger du vedder -->
<p id="utfall"></p>
<p>Balanse: <span id="tokenCount"></span></p>

<script>
    /*Lage variabler for å kunne bruke dem senere i spillet*/
    var gangerEl=document.querySelector("#ganger");
    var utfallEl=document.querySelector("#utfall");
    var buttonEl=document.querySelector("#button");
    var button2El=document.querySelector("#button2");
    var betEl=document.querySelector("#bet");
    /*Event listeners for å kjøre funksjonene*/
    buttonEl.addEventListener("click", sluttVerdiFunksjon);
    /*Verdiene man trenger i oppgaven*/
    var n=1;
    var ganger2=1.00;
    var sluttVerdi;
    var betSatt;
    var stopp=false;

    init_royale();/*Definere user*/
    document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Vis balansen din av tokens på siden*/

    /*Funksjonen for å sette sluttverdien og ordne event listerne så man ikke kan gjenta flere prosesser*/
    function sluttVerdiFunksjon() {
        betSatt=betEl.value;
        sluttVerdi=1+0.01*Math.floor(Math.random() * 375)+0.25;
        sluttVerdi=sluttVerdi.toFixed(2);
        stopp=false;
        console.log(sluttVerdi);
        rullNummer();
        dataArray = [1]; /*Reset tabell verdien*/
        ganger2=1.00; /*Sette verdien tilbake til standard*/
        buttonEl.removeEventListener("click", sluttVerdiFunksjon);
        button2El.addEventListener("click", pullOut);
    }

    /*Funksjon for å øke tallet, og hvos tallet når slutt tallet stopper den og du taper*/
    var dataArray = [1];
    function rullNummer() {
        if (ganger2>=sluttVerdi) {
            buttonEl.addEventListener("click", sluttVerdiFunksjon);
            buttonEl.addEventListener("click", rullNummer);
            button2El.removeEventListener("click", pullOut);
            n=1;
            stopp=true; /*Ekstra stoppe for kjøring av funksjon*/
            utfallEl.innerHTML="Du trakk IKKE ut i tide, tapte "+betSatt+".";
            dataArray.push(0); /*Sette verdien i charten til 0, for å indikere tap*/
            
            /*Oppdater tabellen ved tap*/
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
            
            /*Kjøring av funksjon hvis man taper*/
            user.tokenManager.subTokenAmount(betSatt);/* Fjern tokens hvis tap*/
            saveUser(user); /*Oppdatere til session storage*/
            updateSQL(); /*Oppdater database*/
            document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Oppdater antall tokens brukeren har*/
        } else {
            ganger2=1+0.01*n;
            gangerEl.innerHTML=ganger2.toFixed(2);
            dataArray.push(ganger2); /*Legg til verdien i en array*/
            
            /*Oppdater charten ved hver kjøring*/
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
     
            if (stopp==false) { /*Hvis stopp er satt til ja på grunn av pullOut() stopper den å kjøre*/
                setTimeout(rullNummer, (300-0.4*n)); /*Gjenta prosessen, øk tallet raskere og raskere*/
                n++;
            }
        }
    }

    /*Funksjon for å stoppe prosessen og tjene tokens til kontoen din*/
    function pullOut() {
        button2El.removeEventListener("click", pullOut);
        buttonEl.addEventListener("click", sluttVerdiFunksjon);
        utfallEl.innerHTML="Du trakk deg ut i tide, veddet "+betSatt+" og tjente "+Number(betSatt*ganger2-betSatt)+" Tokens. Innsatsen din ble ganget med "+ganger2+".";
        /*Kjøring av funksjon hvis man vinner*/
        var verdi = betSatt*ganger2-betSatt;
        user.tokenManager.addTokenAmount(verdi); /*Gi brukeren tokens hvis vinn*/
        saveUser(user); /*Oppdatere til session storage*/
        updateSQL(); /*Oppdater database*/
        document.getElementById("tokenCount").innerHTML = getUser().tokenManager.getCount(); /*Oppdater antall tokens brukeren har*/
        n=0;
        stopp=true; /*Stopp kjøringen av funksjon*/
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
