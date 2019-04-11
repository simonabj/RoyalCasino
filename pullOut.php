<head>
    <title>Counter</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>

<p><span id="ganger">1.00</span>x</p>

<button id="button">Start</button>
<button id="button2">Stopp</button>
<input type="number" id="bet" placeholder="Hvor mye vedder du?" />
<p id="utfall"></p>

<script>
    var gangerEl=document.querySelector("#ganger");
    var utfallEl=document.querySelector("#utfall");
    var buttonEl=document.querySelector("#button");
    var button2El=document.querySelector("#button2");
    var betEl=document.querySelector("#bet");
    buttonEl.addEventListener("click", rullNummer);
    buttonEl.addEventListener("click", sluttVerdiFunksjon);
    var n=1;
    var ganger2=1.00;
    var sluttVerdi;
    var betSatt;

    function sluttVerdiFunksjon() {
        betSatt=betEl.value;
        sluttVerdi=1+0.01*Math.floor(Math.random() * 375)+0.25;
        sluttVerdi=sluttVerdi.toFixed(2);
        console.log(sluttVerdi);
        buttonEl.removeEventListener("click", rullNummer);
        buttonEl.removeEventListener("click", sluttVerdiFunksjon);
        button2El.addEventListener("click", pullOut);
    }

    function rullNummer() {
        if (ganger2>=sluttVerdi) {
            buttonEl.addEventListener("click", rullNummer);
            buttonEl.addEventListener("click", sluttVerdiFunksjon);
            buttonEl.removeEventListener("click", pullOut);
            n=1;
            ganger2=1;
        } else {
            ganger2=1+0.01*n;
            gangerEl.innerHTML=ganger2.toFixed(2);
            n++;
            setTimeout(rullNummer, (300-0.4*n));
        }
    }

    function pullOut() {
        buttonEl.removeEventListener("click", pullOut);
        utfallEl.innerHTML="Du trakk deg ut i tide, veddet "+betSatt+" og tjente "+betSatt*ganger2+" Tokens. Innsatsen din ble ganget med "+ganger2+".";

        $.ajax({url:"funksjonPullOut.php?bTall="+betSatt.value+"&ganger="+ganger2,success:function(){
                console.log("Pull Out Kjørt.");
            }})

        n=1;
        ganger2=1;
    }
</script>
</body>