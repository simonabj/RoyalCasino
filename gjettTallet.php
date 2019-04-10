<?php
$tilkobling = mysqli_connect("mysql.hostinger.com", "u201393012_cr", "1EjjQpVKmAMa", "u201393012_cr");

session_start();

require_once "config.php";
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

$seBrukerID=$_SESSION["id"];
$sql="SELECT * FROM users WHERE id=$seBrukerID";
$kjort=mysqli_query($tilkobling, $sql);

while ($row = mysqli_fetch_array($kjort)) {
    $balanse=$row['balance'];
}
?>
<html>
<head>
    <title> Casino Royale | Gjett Tallet </title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
</head>
<body>
<input type="number" id="valgtTall" placeholder="Hvilket tall tror du det blir?" max="99" min="1" style="width:200px;">

<select id="bet">
    <option value="50">50kr</option>
    <option value="100">100kr</option>
    <option value="200">200kr</option>
    <option value="250">250kr</option>
</select>

<button onclick="kjorBet()">Gjett!</button>

<p><span id="hendelse">Balanse: </span><span id="balance"><?php echo $balanse; ?></span></p>

<script>
    var betEl=document.querySelector("#bet");
    var valgtTallEl=document.querySelector("#valgtTall");
    var balanceEl=document.querySelector("#balance");
    var hendelseEl=document.querySelector("#hendelse");

    var vinnertall;

    function kjorBet() {
        vinnerTall=Math.floor(Math.random()*99+1);
        $.ajax({url:"funksjonGjettTall.php?gTall="+valgtTallEl.value+"&bTall="+betEl.value+"&vTall="+vinnerTall,success:function(){
                console.log("Gjett tall kjørt.");
            }
        })

        if (vinnerTall==valgtTallEl.value) {
            balanceEl.innerHTML=Number(balanceEl.innerHTML)+Number(betEl.value)*75;
            hendelseEl.innerHTML="Tallet du gjettet "+valgtTallEl.value+" ble riktig! Du veddet "+betEl.value+" tokens og har nå ";
        } else {
            balanceEl.innerHTML=Number(balanceEl.innerHTML)-Number(betEl.value);
            hendelseEl.innerHTML="Tallet du gjettet "+valgtTallEl.value+" var desverre feil! Du tapte "+betEl.value+" tokens og har nå ";
        }

    }

</script>

</body>
</html>